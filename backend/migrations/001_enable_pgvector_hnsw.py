"""
PostgreSQL + pgvector Alembic Migration: 001_enable_pgvector_hnsw.py

Enables pgvector extension, updates vector_chunks table, and builds HNSW index.
"""

from alembic import op
import sqlalchemy as sa
from pgvector.sqlalchemy import Vector


revision = '001_enable_pgvector_hnsw'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Step 1: Enable pgvector extension
    op.execute("CREATE EXTENSION IF NOT EXISTS vector;")

    # Step 2: Add embedding VECTOR(1536) column to vector_chunks table if not present
    op.execute("ALTER TABLE vector_chunks ADD COLUMN IF NOT EXISTS embedding VECTOR(1536);")

    # Step 3: Create HNSW Index for sub-millisecond Cosine Similarity Search
    op.execute("""
        CREATE INDEX IF NOT EXISTS vector_chunks_embedding_hnsw
        ON vector_chunks
        USING hnsw (embedding vector_cosine_ops);
    """)


def downgrade():
    op.execute("DROP INDEX IF EXISTS vector_chunks_embedding_hnsw;")
    op.execute("ALTER TABLE vector_chunks DROP COLUMN IF EXISTS embedding;")
