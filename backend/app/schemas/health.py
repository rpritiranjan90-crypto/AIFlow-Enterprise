from typing import Optional
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "1.0.0"
    database: str = "connected"
    timestamp: str
    postgres_version: Optional[str] = None
    pgvector_enabled: Optional[bool] = None
    hnsw_index_present: Optional[bool] = None
    knowledge_base_count: Optional[int] = None
    document_count: Optional[int] = None
    vector_chunk_count: Optional[int] = None
