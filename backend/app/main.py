"""
AIFlow Enterprise Core Backend Application Entry Point.

Configures FastAPI application lifespan, CORS, middleware, API routes, database,
and centralized Prometheus/OpenTelemetry monitoring telemetry system.
"""

import asyncio
from contextlib import asynccontextmanager
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.openapi.docs import get_redoc_html
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis

from app.api.metrics import router as metrics_router
from app.api.v1.router import api_v1_router
from app.core.config import settings
from app.core.database import Base, engine
from app.logging.logger import logger
from app.middleware.rate_limit import RateLimiterMiddleware
from app.middleware.request_id import RequestIDMiddleware
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.models import *  # noqa: F401,F403
from app.monitoring import (
    AIMetrics,
    BusinessMetrics,
    DatabaseMetrics,
    MonitoringMetrics,
    MonitoringMiddleware,
    MonitoringRegistry,
    RedisMetrics,
)

# ------------------------------------------------------------------
# Optional Prometheus & OpenTelemetry Integration
# ------------------------------------------------------------------

try:
    from prometheus_fastapi_instrumentator import Instrumentator
except ImportError:
    Instrumentator = None

try:
    from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
except ImportError:
    FastAPIInstrumentor = None


# ------------------------------------------------------------------
# Application Lifespan
# ------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle startup and shutdown events."""
    start_time = time.perf_counter()
    logger.info("Initializing AIFlow Enterprise Backend Engine & Telemetry System...")

    # 1. Initialize Monitoring System in strict order
    try:
        monitoring_metrics = MonitoringMetrics.initialize(namespace="aiflow")
        db_metrics = DatabaseMetrics.initialize(slow_query_threshold_seconds=0.5)
        redis_metrics = RedisMetrics.initialize(default_cache_name="redis")
        ai_metrics = AIMetrics.initialize(default_provider="openai")
        business_metrics = BusinessMetrics.initialize()

        # Health Validation of Monitoring Components
        registry = MonitoringRegistry()
        collector_reg = registry.registry()
        metrics_list = registry.list_metrics()

        if not registry or not collector_reg or len(metrics_list) == 0:
            raise RuntimeError("MonitoringRegistry or CollectorRegistry failed health validation check.")

        init_duration_ms = (time.perf_counter() - start_time) * 1000.0
        logger.info(
            "Monitoring telemetry system initialized successfully in %.2f ms (%d metrics registered).",
            init_duration_ms,
            len(metrics_list),
        )

        try:
            from opentelemetry import trace
            tracer = trace.get_tracer(__name__)
            with tracer.start_as_current_span("monitoring_system_startup") as span:
                span.set_attribute("monitoring.initialization_duration_ms", init_duration_ms)
                span.set_attribute("monitoring.metrics_count", len(metrics_list))
        except Exception:
            pass

    except Exception as exc:
        logger.critical("Fatal error during monitoring system initialization: %s", exc, exc_info=True)
        raise RuntimeError(f"Aborting application startup due to monitoring initialization failure: {exc}") from exc

    # 2. Attach database engine to DatabaseMetrics
    try:
        if hasattr(engine, "sync_engine"):
            db_metrics.register_engine(engine.sync_engine, database_name="postgresql")
        else:
            db_metrics.register_engine(engine, database_name="postgresql")
    except Exception as exc:
        logger.warning("Could not attach DatabaseMetrics to engine sync_engine: %s", exc)

    # 3. Enable pgvector extension FIRST (required before create_all on PostgreSQL),
    #    then create all tables including vector_chunks with VECTOR(1536) column.
    from sqlalchemy import text as sa_text
    async with engine.begin() as conn:
        if engine.dialect.name == "postgresql":
            try:
                await conn.execute(sa_text("CREATE EXTENSION IF NOT EXISTS vector;"))
                logger.info("[Startup] pgvector extension enabled (CREATE EXTENSION IF NOT EXISTS vector)")
            except Exception as pg_ext_err:
                logger.warning(
                    "[Startup] pgvector extension creation warning (may already exist): %s", pg_ext_err
                )
        await conn.run_sync(Base.metadata.create_all)

    # 4. Mark VectorStoreManager tables as initialized (startup just did it)
    try:
        from app.ai.vector_store import vector_store_manager
        vector_store_manager._tables_initialized = True
        logger.info(
            "[Startup] VectorStoreManager tables confirmed: dialect=%s", engine.dialect.name
        )
    except Exception as e:
        logger.warning("[Startup] Could not confirm VectorStoreManager tables: %s", e)

    # 4. Initialize Redis Cache
    try:
        redis = aioredis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
        )

        await redis.ping()

        FastAPICache.init(
            RedisBackend(redis),
            prefix="aiflow-cache",
        )

        redis_metrics.register_client(redis, cache_name="redis")
        logger.info("Redis cache initialized successfully.")

    except Exception as e:
        logger.warning(f"Redis unavailable. Continuing without cache. Error: {e}")

    yield

    # ------------------------------------------------------------------
    # Shutdown Sequence
    # ------------------------------------------------------------------
    shutdown_start = time.perf_counter()
    logger.info("Initiating graceful shutdown of AIFlow Enterprise Telemetry and Engine...")

    try:
        DatabaseMetrics().shutdown()
        RedisMetrics().shutdown()
        AIMetrics().shutdown()
        BusinessMetrics().shutdown()

        shutdown_duration_ms = (time.perf_counter() - shutdown_start) * 1000.0
        logger.info("Monitoring telemetry system shut down cleanly in %.2f ms.", shutdown_duration_ms)

        try:
            from opentelemetry import trace
            tracer = trace.get_tracer(__name__)
            with tracer.start_as_current_span("monitoring_system_shutdown") as span:
                span.set_attribute("monitoring.shutdown_duration_ms", shutdown_duration_ms)
        except Exception:
            pass
    except Exception as exc:
        logger.error("Error during monitoring shutdown: %s", exc, exc_info=True)

    await asyncio.sleep(2)
    await engine.dispose()

    logger.info("Database connections closed.")
    logger.info("AIFlow Enterprise shutdown complete.")


# ------------------------------------------------------------------
# FastAPI Application
# ------------------------------------------------------------------

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AIFlow Enterprise Backend API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None,
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# ------------------------------------------------------------------
# Middleware Pipeline
# ------------------------------------------------------------------

app.add_middleware(MonitoringMiddleware)

app.add_middleware(RequestIDMiddleware)

app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    RateLimiterMiddleware,
    max_requests=120,
    window_seconds=60,
)

app.add_middleware(
    GZipMiddleware,
    minimum_size=1000,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000",
        "https://ai-flow-enterprise-hvz4.vercel.app",
        "https://aiflow.vercel.app",
        "https://aiflow-enterprise.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------
# Routers
# ------------------------------------------------------------------

app.include_router(metrics_router)
app.include_router(api_v1_router)

# ------------------------------------------------------------------
# Monitoring Instrumentation Hooks
# ------------------------------------------------------------------

if Instrumentator:
    Instrumentator().instrument(app).expose(app)

if FastAPIInstrumentor:
    FastAPIInstrumentor.instrument_app(app)

# ------------------------------------------------------------------
# Root Endpoint
# ------------------------------------------------------------------

@app.get("/", tags=["System"])
async def root():
    return {
        "service": settings.PROJECT_NAME,
        "status": "operational",
        "version": app.version,
        "docs": "/docs",
        "redoc": "/redoc",
        "health": "/health",
        "api_health": f"{settings.API_V1_STR}/health",
    }


# ------------------------------------------------------------------
# Health Endpoints
# ------------------------------------------------------------------

@app.get("/health", tags=["System"])
async def health():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": app.version,
    }


@app.get(f"{settings.API_V1_STR}/health", tags=["System"])
async def api_health():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": app.version,
    }


# ------------------------------------------------------------------
# Custom ReDoc
# ------------------------------------------------------------------

@app.get("/redoc", include_in_schema=False)
async def custom_redoc():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title=f"{app.title} - ReDoc",
        redoc_js_url="https://cdn.jsdelivr.net/npm/redoc@2.1.5/bundles/redoc.standalone.js",
    )
