"""
Production PostgreSQL + pgvector Vector Store Manager for AIFlow Enterprise.

Native pgvector HNSW cosine distance query:
SELECT document_id, document_name, content, metadata_json,
       (1 - (embedding <=> :query_vector)) AS score
FROM vector_chunks
WHERE knowledge_base_id = :kb_id
ORDER BY embedding <=> :query_vector
LIMIT :top_k;
"""

from dataclasses import dataclass
import json
import re
import logging
from typing import Any, Dict, List, Optional
import uuid

from sqlalchemy import select, func, text
from sqlalchemy.exc import OperationalError, ProgrammingError

from app.core.database import AsyncSessionLocal, engine, Base
from app.models.ai import VectorChunk

logger = logging.getLogger(__name__)


@dataclass
class VectorSearchResult:
    document_id: str
    content: str
    score: float
    metadata: Dict[str, Any]


class VectorStoreManager:
    """Native PostgreSQL + pgvector Vector Database Store Manager."""

    def __init__(self) -> None:
        self.provider = "pgvector"
        self._tables_initialized = False

    async def _ensure_tables(self, session) -> None:
        """Create tables once — only runs first time per process."""
        if self._tables_initialized:
            return
        try:
            conn = await session.connection()
            if engine.dialect.name == "postgresql":
                # Enable pgvector extension before create_all
                await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
                await session.commit()
            await conn.run_sync(Base.metadata.create_all)
            self._tables_initialized = True
            logger.info("[VectorStore] Tables ensured. Dialect: %s", engine.dialect.name)
        except Exception as e:
            logger.warning("[VectorStore] Table check warning (non-fatal): %s", e)
            self._tables_initialized = True  # avoid retry storms

    async def index_document(
        self,
        document_id: str,
        content: str,
        embedding: List[float],
        metadata: Optional[Dict[str, Any]] = None,
    ) -> bool:
        """INSERT single document vector chunk into vector_chunks table."""
        return await self.index_documents_batch([
            {
                "document_id": document_id,
                "content": content,
                "embedding": embedding,
                "metadata": metadata or {},
            }
        ])

    async def index_documents_batch(
        self,
        chunks_data: List[Dict[str, Any]],
    ) -> bool:
        """Batch INSERT document vector chunks in a single SQL transaction."""
        if not chunks_data:
            return True

        is_pg = engine.dialect.name == "postgresql"
        records = []
        for item in chunks_data:
            doc_id = item["document_id"]
            content = item["content"]
            embedding = item["embedding"]
            meta = item.get("metadata", {})
            kb_id = meta.get("knowledge_base_id", "kb_01")
            doc_name = meta.get("document_name", "unknown")

            records.append(
                VectorChunk(
                    id=f"vec_{uuid.uuid4().hex[:12]}",
                    document_id=doc_id,
                    knowledge_base_id=kb_id,
                    document_name=doc_name,
                    content=content,
                    metadata_json=json.dumps(meta),
                    embedding=embedding if is_pg else json.dumps(embedding),
                )
            )

        async with AsyncSessionLocal() as session:
            try:
                await self._ensure_tables(session)
                session.add_all(records)
                await session.commit()
                logger.info(
                    "[VectorStore] Batch inserted %d chunks. kb_id=%s doc=%s dialect=%s",
                    len(records),
                    records[0].knowledge_base_id if records else "?",
                    records[0].document_name if records else "?",
                    engine.dialect.name,
                )
                return True
            except Exception as e:
                await session.rollback()
                logger.error("[VectorStore] Batch insert FAILED: %s", e, exc_info=True)
                return False

    async def search(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        metadata_filter: Optional[Dict[str, Any]] = None,
        query_text: Optional[str] = None,
    ) -> List[VectorSearchResult]:
        """
        Execute cosine similarity search against vector_chunks.

        PostgreSQL path: native pgvector <=> operator (HNSW index).
        SQLite path: dot-product + keyword overlap fallback.
        """
        _skip = {"all", "", "none", "undefined", "null", None}
        raw_kb_id = (metadata_filter or {}).get("knowledge_base_id")
        kb_id = raw_kb_id if raw_kb_id not in _skip else None

        logger.info(
            "[VectorStore] Search: kb_id=%s top_k=%d embedding_dim=%d dialect=%s",
            kb_id, top_k, len(query_embedding), engine.dialect.name,
        )

        async with AsyncSessionLocal() as session:
            await self._ensure_tables(session)

            # ---------------------------------------------------------
            # Diagnostic: log row count before search
            # ---------------------------------------------------------
            count_stmt = select(func.count(VectorChunk.id))
            if kb_id:
                count_stmt = count_stmt.where(VectorChunk.knowledge_base_id == kb_id)
            count_result = await session.execute(count_stmt)
            row_count = count_result.scalar() or 0
            logger.info("[VectorStore] Row count in vector_chunks (kb_id=%s): %d", kb_id, row_count)

            candidates: List[VectorSearchResult] = []

            if engine.dialect.name == "postgresql":
                # ----------------------------------------------------------
                # Native pgvector HNSW cosine distance query
                # SQL: SELECT ... (1 - embedding <=> :v) AS score FROM vector_chunks
                #      WHERE knowledge_base_id = :kb ORDER BY embedding <=> :v LIMIT :k
                # ----------------------------------------------------------
                try:
                    stmt = select(
                        VectorChunk.document_id,
                        VectorChunk.document_name,
                        VectorChunk.content,
                        VectorChunk.metadata_json,
                        (1 - VectorChunk.embedding.cosine_distance(query_embedding)).label("score"),
                    )
                    if kb_id:
                        stmt = stmt.where(VectorChunk.knowledge_base_id == kb_id)
                    stmt = stmt.order_by(VectorChunk.embedding.cosine_distance(query_embedding)).limit(top_k)

                    logger.info("[VectorStore] Executing pgvector SQL: %s", str(stmt.compile(engine)))
                    result = await session.execute(stmt)
                    rows = result.all()
                    logger.info("[VectorStore] pgvector returned %d rows.", len(rows))

                    for row in rows:
                        doc_id, doc_name, content, meta_json, score = row
                        meta = json.loads(meta_json) if meta_json else {}
                        meta.setdefault("document_name", doc_name or "unknown.pdf")
                        candidates.append(VectorSearchResult(
                            document_id=doc_id,
                            content=content,
                            score=round(float(score if score is not None else 0.5), 4),
                            metadata=meta,
                        ))
                except (OperationalError, ProgrammingError) as pg_err:
                    # pgvector extension missing or table schema mismatch — log fully, don't swallow
                    logger.error(
                        "[VectorStore] pgvector SQL FAILED (extension/schema error): %s", pg_err, exc_info=True
                    )
                    # Fall through to keyword-based rescue search below
                    candidates = await self._sqlite_search(session, kb_id, query_embedding, query_text, top_k)
                except Exception as e:
                    logger.error("[VectorStore] pgvector search FAILED (unexpected): %s", e, exc_info=True)
                    candidates = await self._sqlite_search(session, kb_id, query_embedding, query_text, top_k)
            else:
                candidates = await self._sqlite_search(session, kb_id, query_embedding, query_text, top_k)

        logger.info(
            "[VectorStore] Search complete. kb_id=%s returned=%d top_score=%s",
            kb_id, len(candidates),
            candidates[0].score if candidates else "N/A",
        )
        return candidates

    async def _sqlite_search(
        self,
        session,
        kb_id: Optional[str],
        query_embedding: List[float],
        query_text: Optional[str],
        top_k: int,
    ) -> List[VectorSearchResult]:
        """SQLite fallback: dot-product + keyword overlap similarity search."""
        stmt = select(VectorChunk)
        if kb_id:
            stmt = stmt.where(VectorChunk.knowledge_base_id == kb_id)
        result = await session.execute(stmt)
        chunks = result.scalars().all()
        logger.info("[VectorStore] SQLite fallback: scanning %d chunks.", len(chunks))

        candidates = []
        for chunk in chunks:
            meta = json.loads(chunk.metadata_json) if chunk.metadata_json else {}
            raw_emb = chunk.embedding
            emb = json.loads(raw_emb) if isinstance(raw_emb, str) else (raw_emb or [])

            score = 0.0
            if emb and query_embedding:
                min_len = min(len(emb), len(query_embedding))
                score = sum(emb[i] * query_embedding[i] for i in range(min_len))

            if query_text:
                q_words = set(re.findall(r'\w+', query_text.lower()))
                c_words = set(re.findall(r'\w+', chunk.content.lower()))
                if q_words and c_words:
                    overlap = len(q_words & c_words) / len(q_words)
                    score = max(score, overlap)

            if score <= 0.0:
                score = 0.50

            candidates.append(VectorSearchResult(
                document_id=chunk.document_id,
                content=chunk.content,
                score=round(float(score), 4),
                metadata=meta,
            ))

        candidates.sort(key=lambda x: x.score, reverse=True)
        return candidates[:top_k]

    async def get_vector_count(self, knowledge_base_id: Optional[str] = None) -> int:
        """Return total row count in vector_chunks."""
        _skip = {"all", "", "none", "undefined", "null", None}
        kb_id = knowledge_base_id if knowledge_base_id not in _skip else None

        async with AsyncSessionLocal() as session:
            try:
                await self._ensure_tables(session)
                stmt = select(func.count(VectorChunk.id))
                if kb_id:
                    stmt = stmt.where(VectorChunk.knowledge_base_id == kb_id)
                result = await session.execute(stmt)
                return result.scalar() or 0
            except Exception as e:
                logger.error("[VectorStore] get_vector_count FAILED: %s", e)
                return 0


vector_store_manager = VectorStoreManager()
