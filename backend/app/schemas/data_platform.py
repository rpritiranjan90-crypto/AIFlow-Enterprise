from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class DatasetResponse(BaseModel):
    id: str
    name: str
    dataset_schema_json: str
    storage_type: str
    row_count: int
    size_bytes: int
    created_at: datetime

    class Config:
        from_attributes = True

class DataPipelineResponse(BaseModel):
    id: str
    name: str
    schedule: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class IngestionRequest(BaseModel):
    source_type: str = "PostgreSQL"
    source_table: str = "orders"
    destination_dataset: str = "lakehouse_sales_orders"
    mode: str = "CDC" # CDC, Batch, Streaming

class QueryRequest(BaseModel):
    sql_text: str = "SELECT * FROM lakehouse_sales_orders WHERE status = 'completed' LIMIT 100;"

class QueryResponse(BaseModel):
    query_id: str
    sql_text: str
    execution_time_ms: int
    rows_returned: int
    columns: List[str]
    data: List[Dict[str, Any]]
    status: str

class CatalogEntryResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    owner: str
    tags_json: str
    pii_flag: bool
    created_at: datetime

    class Config:
        from_attributes = True

class QualityMetricResponse(BaseModel):
    id: str
    dataset_id: str
    completeness_score: float
    validity_score: float
    freshness_sec: int
    status: str
    checked_at: datetime

    class Config:
        from_attributes = True

class SemanticMetricResponse(BaseModel):
    id: str
    name: str
    measure_sql: str
    dimension_name: str
    category: str
    created_at: datetime

    class Config:
        from_attributes = True
