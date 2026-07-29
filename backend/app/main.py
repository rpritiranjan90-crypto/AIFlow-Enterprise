from fastapi import FastAPI
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
from app.models import *  # Register all SQLAlchemy ORM models

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="The AI-Powered Business Automation Platform API Engine",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Attach Security & Request Tracing Middlewares
app.add_middleware(RequestIDMiddleware)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RateLimiterMiddleware, max_requests=120, window_seconds=60)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Configure Strict CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Authorization", "Content-Type", "X-Request-ID"],
)

# Register API v1 Router
app.include_router(api_v1_router)

@app.on_event("startup")
async def on_startup():
    logger.info("Initializing AIFlow Enterprise Backend Engine...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Initialize Redis Cache
    redis = aioredis.from_url(settings.REDIS_URL, encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="aiflow-cache")
    logger.info("FastAPICache initialized with Redis backend.")
    logger.info("Database schemas verified and initialized successfully.")

@app.get("/")
async def root():
    return {
        "service": settings.PROJECT_NAME,
        "status": "operational",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health"
    }
