from contextlib import asynccontextmanager
import asyncio

from fastapi import FastAPI
from fastapi.openapi.docs import get_redoc_html
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis

from app.api.v1.router import api_v1_router
from app.core.config import settings
from app.core.database import Base, engine
from app.logging.logger import logger
from app.middleware.rate_limit import RateLimiterMiddleware
from app.middleware.request_id import RequestIDMiddleware
from app.middleware.security_headers import SecurityHeadersMiddleware

# Import all SQLAlchemy models
from app.models import *  # noqa: F401,F403

# ------------------------------------------------------------------
# Prometheus
# ------------------------------------------------------------------

try:
    from prometheus_fastapi_instrumentator import Instrumentator
except ImportError:
    Instrumentator = None

# ------------------------------------------------------------------
# OpenTelemetry
# ------------------------------------------------------------------

try:
    from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
except ImportError:
    FastAPIInstrumentor = None


# ------------------------------------------------------------------
# Application Lifespan
# ------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing AIFlow Enterprise Backend Engine...")

    # Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Initialize Redis Cache
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

        logger.info("Redis cache initialized successfully.")

    except Exception as e:
        logger.warning(f"Redis unavailable. Continuing without cache. Error: {e}")

    yield

    logger.info("Initiating graceful shutdown...")

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
# Middleware
# ------------------------------------------------------------------

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
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------
# Routers
# ------------------------------------------------------------------

app.include_router(api_v1_router)

# ------------------------------------------------------------------
# Monitoring
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
