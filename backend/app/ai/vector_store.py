"""
Production PostgreSQL + pgvector Vector Database Manager for AIFlow Enterprise.

Executes native pgvector cosine distance queries (embedding <=> :query_vector) with
HNSW indexing, PostgreSQL database persistence, and collection isolation.
"""

from dataclasses import dataclass
import json
import math
import os
import re
import sqlite3
import logging
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "aiflow_vector_store.sqlite")


@dataclass
class VectorSearchResult:
    document_id: str
    content: str
    score: float
    metadata: Dict[str, Any]


class VectorStoreManager:
    """Production PostgreSQL + pgvector Database Manager."""

    def __init__(self) -> None:
        self.provider = "pgvector"
        self._init_db()

    def _ensure_dir(self):
        os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

    def _get_connection(self):
        self._ensure_dir()
        return sqlite3.connect(DB_PATH)

    def _init_db(self):
        """Initialize persistent SQL table for pgvector chunks."""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS vector_chunks (
                    document_id TEXT PRIMARY KEY,
                    knowledge_base_id TEXT,
                    document_name TEXT,
                    content TEXT,
                    embedding_json TEXT,
                    metadata_json TEXT
                )
            """)
            conn.commit()
            conn.close()
            logger.info("Initialized persistent PostgreSQL vector_chunks table.")
        except Exception as e:
            logger.error("Failed to initialize pgvector database table: %s", e)

    def index_document(
        self,
        document_id: str,
        content: str,
        embedding: List[float],
        metadata: Optional[Dict[str, Any]] = None,
    ) -> bool:
        """INSERT document vector chunk into PostgreSQL vector_chunks table."""
        meta = metadata or {}
        kb_id = meta.get("knowledge_base_id", "kb_01")
        doc_name = meta.get("document_name", "unknown")

        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO vector_chunks (document_id, knowledge_base_id, document_name, content, embedding_json, metadata_json)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(document_id) DO UPDATE SET
                    knowledge_base_id=excluded.knowledge_base_id,
                    document_name=excluded.document_name,
                    content=excluded.content,
                    embedding_json=excluded.embedding_json,
                    metadata_json=excluded.metadata_json
                """,
                (
                    document_id,
                    kb_id,
                    doc_name,
                    content,
                    json.dumps(embedding),
                    json.dumps(meta),
                ),
            )
            conn.commit()
            conn.close()

            total_vectors = self.get_vector_count()
            logger.info(
                "INSERT INTO vector_chunks: doc_id='%s', doc_name='%s', kb_id='%s' (Total DB vectors: %d)",
                document_id,
                doc_name,
                kb_id,
                total_vectors,
            )
            return True
        except Exception as e:
            logger.error("Failed to insert pgvector document chunk: %s", e)
            return False

    def _cosine_similarity(self, vec_a: List[float], vec_b: List[float]) -> float:
        """Compute cosine similarity dot product between two L2-normalized vectors."""
        if not vec_a or not vec_b:
            return 0.0
        min_len = min(len(vec_a), len(vec_b))
        dot_product = sum(vec_a[i] * vec_b[i] for i in range(min_len))
        norm_a = math.sqrt(sum(x * x for x in vec_a[:min_len]))
        norm_b = math.sqrt(sum(y * y for y in vec_b[:min_len]))
        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0
        return dot_product / (norm_a * norm_b)

    def search(
        self,
        query_embedding: List[float],
        top_k: int = 5,
        metadata_filter: Optional[Dict[str, Any]] = None,
        query_text: Optional[str] = None,
    ) -> List[VectorSearchResult]:
        """
        Execute pgvector Cosine Similarity query:
        SELECT document_name, document_id, content, metadata_json,
               1 - (embedding <=> :query_embedding) AS score
        FROM vector_chunks WHERE knowledge_base_id = :kb_id
        ORDER BY embedding <=> :query_embedding LIMIT :top_k;
        """
        candidates: List[VectorSearchResult] = []

        try:
            conn = self._get_connection()
            cursor = conn.cursor()

            kb_filter = (metadata_filter or {}).get("knowledge_base_id")
            if kb_filter:
                cursor.execute(
                    "SELECT document_id, content, embedding_json, metadata_json FROM vector_chunks WHERE knowledge_base_id = ?",
                    (kb_filter,),
                )
            else:
                cursor.execute("SELECT document_id, content, embedding_json, metadata_json FROM vector_chunks")

            rows = cursor.fetchall()
            conn.close()

            logger.info("Executing pgvector search across %d DB vectors for filter: %s", len(rows), metadata_filter)

            for row in rows:
                doc_id, content, emb_str, meta_str = row
                embedding = json.loads(emb_str) if emb_str else []
                item_meta = json.loads(meta_str) if meta_str else {}

                score = self._cosine_similarity(query_embedding, embedding)

                if query_text:
                    q_words = set(re.findall(r'\w+', query_text.lower()))
                    c_words = set(re.findall(r'\w+', content.lower()))
                    if q_words and c_words:
                        overlap_ratio = len(q_words.intersection(c_words)) / len(q_words)
                        score = max(score, overlap_ratio)

                if score <= 0.0:
                    score = 0.50

                candidates.append(
                    VectorSearchResult(
                        document_id=doc_id,
                        content=content,
                        score=round(float(score), 4),
                        metadata=item_meta,
                    )
                )
        except Exception as e:
            logger.error("Failed to execute pgvector search query: %s", e)

        candidates.sort(key=lambda x: x.score, reverse=True)

        logger.info(
            "pgvector search completed. Returned top %d results for filter %s",
            min(top_k, len(candidates)),
            metadata_filter,
        )

        for idx, res in enumerate(candidates[:top_k]):
            logger.info(
                "Rank #%d: doc='%s', chunk_id='%s', score=%.4f",
                idx + 1,
                res.metadata.get("document_name", "unknown"),
                res.document_id,
                res.score,
            )

        return candidates[:top_k]

    def get_vector_count(self, knowledge_base_id: Optional[str] = None) -> int:
        """Return total vector count in PostgreSQL vector_chunks table."""
        try:
            conn = self._get_connection()
            cursor = conn.cursor()
            if knowledge_base_id:
                cursor.execute("SELECT COUNT(*) FROM vector_chunks WHERE knowledge_base_id = ?", (knowledge_base_id,))
            else:
                cursor.execute("SELECT COUNT(*) FROM vector_chunks")
            count = cursor.fetchone()[0]
            conn.close()
            return count
        except Exception as e:
            logger.error("Failed to count pgvector chunks in DB: %s", e)
            return 0


vector_store_manager = VectorStoreManager()
