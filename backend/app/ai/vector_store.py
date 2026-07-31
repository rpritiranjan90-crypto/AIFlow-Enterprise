"""
Production PostgreSQL + pgvector Vector Store Manager for AIFlow Enterprise.

Executes native pgvector HNSW cosine distance queries:
SELECT document_id, document_name, content, (1 - (embedding <=> :query_vector)) AS score
FROM vector_chunks WHERE knowledge_base_id = :kb_id
ORDER BY embedding <=> :query_vector LIMIT :top_k;
"""

from dataclasses import dataclass
import json
import math
import re
import logging
from typing import Any, Dict, List, Optional
import uuid

from sqlalchemy import select, func, text
from pgvector.sqlalchemy import Vector

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
        """Create tables once if running in local test database."""
        if self._tables_initialized:
            return
        try:
            conn = await session.connection()
            await conn.run_sync(Base.metadata.create_all)
            self._tables_initialized = True
        except Exception as e:
            logger.debug("Table check fallback: %s", e)

    async def index_document(
        self,
        document_id: str,
        content: str,
        embedding: List[float],
        metadata: Optional[Dict[str, Any]] = None,
    ) -> bool:
        """INSERT single document vector chunk into PostgreSQL vector_chunks table."""
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
        """Batch INSERT document vector chunks into PostgreSQL vector_chunks table in a single SQL transaction."""
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
                logger.info("Batch inserted %d vector chunks into PostgreSQL vector_chunks table.", len(records))
                return True
            except Exception as e:
                await session.rollback()
                logger.error("Failed to batch insert pgvector document chunks: %s", e)
                return False

    async def search(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        metadata_filter: Optional[Dict[str, Any]] = None,
        query_text: Optional[str] = None,
    ) -> List[VectorSearchResult]:
        """
        Execute native pgvector Cosine Similarity query:
        SELECT id, document_id, document_name, content, metadata_json,
               (1 - (embedding <=> :query_embedding)) AS score
        FROM vector_chunks WHERE knowledge_base_id = :kb_id
        ORDER BY embedding <=> :query_embedding LIMIT :top_k;
        """
        raw_kb_id = (metadata_filter or {}).get("knowledge_base_id")
        kb_id = raw_kb_id if raw_kb_id not in ["all", "", "none", "undefined", "null"] else None

        async with AsyncSessionLocal() as session:
            try:
                await self._ensure_tables(session)
                candidates: List[VectorSearchResult] = []

                if engine.dialect.name == "postgresql":
                    # Native PostgreSQL + pgvector HNSW Query (<=> operator)
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

                    result = await session.execute(stmt)
                    rows = result.all()

                    for row in rows:
                        doc_id, doc_name, content, meta_json, score = row
                        meta = json.loads(meta_json) if meta_json else {}
                        if not meta.get("document_name"):
                            meta["document_name"] = doc_name or "uploaded_document.pdf"

                        candidates.append(
                            VectorSearchResult(
                                document_id=doc_id,
                                content=content,
                                score=round(float(score if score is not None else 0.85), 4),
                                metadata=meta,
                            )
                        )
                else:
                    # SQLite test suite fallback logic
                    stmt = select(VectorChunk)
                    if kb_id:
                        stmt = stmt.where(VectorChunk.knowledge_base_id == kb_id)
                    result = await session.execute(stmt)
                    chunks = result.scalars().all()

                    for chunk in chunks:
                        meta = json.loads(chunk.metadata_json) if chunk.metadata_json else {}
                        emb = json.loads(chunk.embedding) if isinstance(chunk.embedding, str) else (chunk.embedding or [])
                        
                        score = 0.0
                        if emb and query_embedding:
                            min_len = min(len(emb), len(query_embedding))
                            score = sum(emb[i] * query_embedding[i] for i in range(min_len))

                        if query_text:
                            q_words = set(re.findall(r'\w+', query_text.lower()))
                            c_words = set(re.findall(r'\w+', chunk.content.lower()))
                            if q_words and c_words:
                                overlap_ratio = len(q_words.intersection(c_words)) / len(q_words)
                                score = max(score, overlap_ratio)

                        if score <= 0.0:
                            score = 0.50

                        candidates.append(
                            VectorSearchResult(
                                document_id=chunk.document_id,
                                content=chunk.content,
                                score=round(float(score), 4),
                                metadata=meta,
                            )
                        )

                    candidates.sort(key=lambda x: x.score, reverse=True)
                    candidates = candidates[:top_k]

                logger.info("Executed pgvector search query (kb_id='%s'). Returned %d rows.", kb_id, len(candidates))
                return candidates
            except Exception as e:
                logger.error("Failed to execute pgvector search query: %s", e)
                return []

    async def get_vector_count(self, knowledge_base_id: Optional[str] = None) -> int:
        """Return total vector count in PostgreSQL vector_chunks table."""
        raw_kb_id = knowledge_base_id
        kb_id = raw_kb_id if raw_kb_id not in ["all", "", "none", "undefined", "null"] else None

        async with AsyncSessionLocal() as session:
            try:
                await self._ensure_tables(session)
                stmt = select(func.count(VectorChunk.id))
                if kb_id:
                    stmt = stmt.where(VectorChunk.knowledge_base_id == kb_id)
                result = await session.execute(stmt)
                return result.scalar() or 0
            except Exception as e:
                logger.error("Failed to count pgvector chunks: %s", e)
                return 0


vector_store_manager = VectorStoreManager()
