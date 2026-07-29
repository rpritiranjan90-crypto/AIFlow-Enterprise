from datetime import datetime
from typing import List

from fastapi import APIRouter

from app.data_platform.catalog_engine import catalog_engine
from app.data_platform.etl_engine import etl_engine
from app.data_platform.lakehouse_engine import lakehouse_engine
from app.data_platform.query_engine import query_engine
from app.data_platform.semantic_engine import semantic_engine
from app.schemas.data_platform import (
    CatalogEntryResponse,
    DataPipelineResponse,
    DatasetResponse,
    IngestionRequest,
    QualityMetricResponse,
    QueryRequest,
    QueryResponse,
    SemanticMetricResponse,
)

router = APIRouter(prefix="/data", tags=["Enterprise Data Platform"])

mock_datasets: List[DatasetResponse] = [
    DatasetResponse(id="ds_sales_orders", name="lakehouse_sales_orders", dataset_schema_json='{"columns": ["id", "customer_name", "total_amount", "status"]}', storage_type="Hot Parquet", row_count=1450000, size_bytes=450000000, created_at=datetime.utcnow()),
    DatasetResponse(id="ds_user_activity", name="lakehouse_user_telemetry", dataset_schema_json='{"columns": ["user_id", "event_type", "timestamp"]}', storage_type="Delta Lake", row_count=8900000, size_bytes=1200000000, created_at=datetime.utcnow()),
]

mock_pipelines: List[DataPipelineResponse] = [
    DataPipelineResponse(id="pipe_cdc_orders", name="PostgreSQL Orders CDC Sync", schedule="Continuous CDC", status="active", created_at=datetime.utcnow()),
    DataPipelineResponse(id="pipe_hourly_metrics", name="Hourly ARR Metric Rollup", schedule="0 * * * *", status="active", created_at=datetime.utcnow()),
]

mock_catalog: List[CatalogEntryResponse] = [
    CatalogEntryResponse(id="cat_01", name="lakehouse_sales_orders", description="Production sales transactions and revenue events", owner="Data Engineering Team", tags_json='["Finance", "Core", "Revenue"]', pii_flag=True, created_at=datetime.utcnow()),
]

mock_quality: List[QualityMetricResponse] = [
    QualityMetricResponse(id="dq_01", dataset_id="ds_sales_orders", completeness_score=0.998, validity_score=0.999, freshness_sec=12, status="healthy", checked_at=datetime.utcnow()),
]

@router.get("/catalog", response_model=List[CatalogEntryResponse])
async def list_catalog():
    return mock_catalog

@router.get("/datasets", response_model=List[DatasetResponse])
async def list_datasets():
    return mock_datasets

@router.post("/ingest")
async def trigger_ingestion(body: IngestionRequest):
    return etl_engine.execute_ingestion_job(body.source_type, body.source_table, body.destination_dataset, body.mode)

@router.post("/pipelines", response_model=DataPipelineResponse)
async def create_pipeline(name: str = "New Pipeline", schedule: str = "Every 15 min"):
    return DataPipelineResponse(id="pipe_new", name=name, schedule=schedule, status="active", created_at=datetime.utcnow())

@router.get("/pipelines", response_model=List[DataPipelineResponse])
async def list_pipelines():
    return mock_pipelines

@router.post("/query", response_model=QueryResponse)
async def run_sql_query(body: QueryRequest):
    res = query_engine.execute_sql(body.sql_text)
    return QueryResponse(
        query_id=res["query_id"],
        sql_text=res["sql_text"],
        execution_time_ms=res["execution_time_ms"],
        rows_returned=res["rows_returned"],
        columns=res["columns"],
        data=res["data"],
        status=res["status"],
    )

@router.get("/quality", response_model=List[QualityMetricResponse])
async def get_data_quality():
    return mock_quality

@router.get("/lineage")
async def get_data_lineage():
    return catalog_engine.get_lineage_graph()

@router.get("/semantic", response_model=List[SemanticMetricResponse])
async def list_semantic_metrics():
    metrics = semantic_engine.list_metrics()
    return [
        SemanticMetricResponse(
            id=m["id"],
            name=m["name"],
            measure_sql=m["measure_sql"],
            dimension_name=m["dimension_name"],
            category=m["category"],
            created_at=datetime.utcnow(),
        )
        for m in metrics
    ]

@router.get("/telemetry")
async def get_lakehouse_telemetry():
    return lakehouse_engine.get_lakehouse_telemetry()
