import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class Dataset(Base):
    __tablename__ = "data_datasets"

    id = Column(String, primary_key=True, default=lambda: f"ds_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    dataset_schema_json = Column(Text, nullable=False)
    storage_type = Column(String, default="Hot Parquet") # Hot Parquet, Cold S3, Delta Lake
    row_count = Column(Integer, default=1450000)
    size_bytes = Column(Integer, default=450000000) # bytes
    created_at = Column(DateTime, default=datetime.utcnow)

class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(String, primary_key=True, default=lambda: f"src_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    type = Column(String, default="PostgreSQL") # PostgreSQL, MySQL, Kafka, S3, Webhook
    connection_uri = Column(String, nullable=False)
    status = Column(String, default="connected", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class DataPipeline(Base):
    __tablename__ = "data_pipelines"

    id = Column(String, primary_key=True, default=lambda: f"pipe_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    source_id = Column(String, ForeignKey("data_sources.id"), nullable=True)
    destination_id = Column(String, ForeignKey("data_datasets.id"), nullable=True)
    schedule = Column(String, default="Every 15 min")
    status = Column(String, default="active", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class PipelineRun(Base):
    __tablename__ = "data_pipeline_runs"

    id = Column(String, primary_key=True, default=lambda: f"prun_{uuid.uuid4().hex[:12]}")
    pipeline_id = Column(String, ForeignKey("data_pipelines.id"), nullable=False)
    status = Column(String, default="succeeded", index=True)
    rows_processed = Column(Integer, default=45000)
    latency_ms = Column(Integer, default=1250)
    created_at = Column(DateTime, default=datetime.utcnow)

class CatalogEntry(Base):
    __tablename__ = "data_catalog_entries"

    id = Column(String, primary_key=True, default=lambda: f"cat_{uuid.uuid4().hex[:12]}")
    dataset_id = Column(String, ForeignKey("data_datasets.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    owner = Column(String, default="Data Platform Team")
    tags_json = Column(Text, default='["Finance", "Production"]')
    pii_flag = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class LineageNode(Base):
    __tablename__ = "data_lineage_nodes"

    id = Column(String, primary_key=True) # e.g. node_pg_orders, node_delta_sales
    dataset_id = Column(String, nullable=True)
    node_type = Column(String, nullable=False) # Source, Pipeline, Lakehouse Table, Semantic Model
    label = Column(String, nullable=False)

class LineageEdge(Base):
    __tablename__ = "data_lineage_edges"

    id = Column(String, primary_key=True, default=lambda: f"ledge_{uuid.uuid4().hex[:12]}")
    source_node_id = Column(String, ForeignKey("data_lineage_nodes.id"), nullable=False)
    target_node_id = Column(String, ForeignKey("data_lineage_nodes.id"), nullable=False)
    transformation_type = Column(String, default="CDC Stream") # CDC Stream, SQL Transform, Join

class QualityMetric(Base):
    __tablename__ = "data_quality_metrics"

    id = Column(String, primary_key=True, default=lambda: f"dq_{uuid.uuid4().hex[:12]}")
    dataset_id = Column(String, ForeignKey("data_datasets.id"), nullable=False)
    completeness_score = Column(Float, default=0.995)
    validity_score = Column(Float, default=0.998)
    freshness_sec = Column(Integer, default=45)
    status = Column(String, default="healthy", index=True)
    checked_at = Column(DateTime, default=datetime.utcnow)

class SemanticMetric(Base):
    __tablename__ = "data_semantic_metrics"

    id = Column(String, primary_key=True, default=lambda: f"sem_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    measure_sql = Column(Text, nullable=False)
    dimension_name = Column(String, default="Region")
    category = Column(String, default="Financial KPIs")
    created_at = Column(DateTime, default=datetime.utcnow)

class QueryHistory(Base):
    __tablename__ = "data_query_history"

    id = Column(String, primary_key=True, default=lambda: f"qhist_{uuid.uuid4().hex[:12]}")
    sql_text = Column(Text, nullable=False)
    execution_time_ms = Column(Integer, default=180)
    rows_returned = Column(Integer, default=250)
    status = Column(String, default="succeeded", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
