from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base

from app.core.config import settings
from app.logging.logger import logger

Base = declarative_base()

db_url = settings.DATABASE_URL

# Safe async engine creation with SQLite fallback if postgres driver/host is unreachable
try:
    engine = create_async_engine(
        db_url, 
        echo=False, 
        pool_pre_ping=True,
        pool_size=50,
        max_overflow=100,
        pool_timeout=30
    )
except Exception as e:
    logger.warning(f"Could not connect to PostgreSQL ({e}). Falling back to Async SQLite.")
    db_url = "sqlite+aiosqlite:///./aiflow.db"
    engine = create_async_engine(db_url, echo=False)

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
