from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base

from app.core.config import settings
from app.logging.logger import logger

Base = declarative_base()

db_url = settings.DATABASE_URL

is_postgresql = db_url.startswith("postgresql") if db_url else False

if is_postgresql:
    try:
        engine = create_async_engine(
            db_url,
            echo=False,
            pool_pre_ping=True,
            pool_size=50,
            max_overflow=100,
            pool_timeout=30
        )
        logger.info("[Database] Instantiated PostgreSQL Async engine (asyncpg).")
    except Exception as e:
        if settings.ENVIRONMENT == "production":
            logger.critical(f"[Database] Fatal: Failed to initialize PostgreSQL engine in production: {e}")
            raise RuntimeError(f"Database initialization failed in production: {e}") from e
        logger.warning(f"Could not connect to PostgreSQL ({e}). Falling back to Async SQLite.")
        db_url = "sqlite+aiosqlite:///./aiflow.db"
        engine = create_async_engine(db_url, echo=False)
else:
    # Safe SQLite engine creation without PostgreSQL-specific pool parameters
    db_url = "sqlite+aiosqlite:///./aiflow.db"
    engine = create_async_engine(db_url, echo=False)
    logger.info("[Database] Instantiated SQLite Async engine (aiosqlite) at aiflow.db.")

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
