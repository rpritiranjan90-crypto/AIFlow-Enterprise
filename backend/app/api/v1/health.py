from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text as sa_text, select, func

from app.core.database import get_db, engine
from app.models.ai import KnowledgeBase, KnowledgeDocument, VectorChunk
from app.schemas.health import HealthResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check(db: AsyncSession = Depends(get_db)):
    db_connected = "connected"
    pg_version = None
    pgvector_enabled = False
    hnsw_present = False
    kb_count = 0
    doc_count = 0
    chunk_count = 0

    try:
        # Check connection
        await db.execute(sa_text("SELECT 1;"))

        # Query counts safely using declarative models or direct SQL
        try:
            kb_res = await db.execute(select(func.count(KnowledgeBase.id)))
            kb_count = kb_res.scalar() or 0
        except Exception:
            pass

        try:
            doc_res = await db.execute(select(func.count(KnowledgeDocument.id)))
            doc_count = doc_res.scalar() or 0
        except Exception:
            pass

        try:
            chunk_res = await db.execute(select(func.count(VectorChunk.id)))
            chunk_count = chunk_res.scalar() or 0
        except Exception:
            pass

        if engine.dialect.name == "postgresql":
            # PostgreSQL version
            try:
                pg_ver_res = await db.execute(sa_text("SELECT version();"))
                pg_version = pg_ver_res.scalar()
            except Exception:
                pg_version = "PostgreSQL (unknown version)"

            # pgvector status
            try:
                ext_res = await db.execute(sa_text("SELECT count(*) FROM pg_extension WHERE extname = 'vector';"))
                pgvector_enabled = (ext_res.scalar() or 0) > 0
            except Exception:
                pgvector_enabled = False

            # HNSW index status
            try:
                idx_res = await db.execute(sa_text("SELECT count(*) FROM pg_indexes WHERE indexname = 'vector_chunks_embedding_hnsw';"))
                hnsw_present = (idx_res.scalar() or 0) > 0
            except Exception:
                hnsw_present = False
        else:
            pg_version = "SQLite fallback"
            pgvector_enabled = False
            hnsw_present = False

    except Exception as e:
        db_connected = f"disconnected ({str(e)})"

    return HealthResponse(
        status="ok" if "disconnected" not in db_connected else "error",
        version="1.0.0",
        database=db_connected,
        timestamp=datetime.utcnow().isoformat() + "Z",
        postgres_version=pg_version,
        pgvector_enabled=pgvector_enabled,
        hnsw_index_present=hnsw_present,
        knowledge_base_count=kb_count,
        document_count=doc_count,
        vector_chunk_count=chunk_count,
    )
