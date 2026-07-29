import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, String, Text

from app.core.database import Base


class BusinessMetric(Base):
    __tablename__ = "business_metrics"

    id = Column(String, primary_key=True, default=lambda: f"bm_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    category = Column(String, default="Revenue") # Revenue, Operations, Finance, HR, AI
    value = Column(Float, default=0.0)
    unit = Column(String, default="USD")
    timestamp = Column(DateTime, default=datetime.utcnow)

class KPI(Base):
    __tablename__ = "kpis"

    id = Column(String, primary_key=True, default=lambda: f"kpi_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    category = Column(String, default="Finance")
    current_value = Column(Float, default=0.0)
    target_value = Column(Float, default=100.0)
    status = Column(String, default="on_track", index=True) # on_track, warning, critical
    updated_at = Column(DateTime, default=datetime.utcnow)

class Forecast(Base):
    __tablename__ = "forecasts"

    id = Column(String, primary_key=True, default=lambda: f"fc_{uuid.uuid4().hex[:12]}")
    metric_name = Column(String, nullable=False)
    forecasted_values_json = Column(Text, nullable=False)
    confidence_level = Column(Float, default=0.95)
    created_at = Column(DateTime, default=datetime.utcnow)

class SimulationRun(Base):
    __tablename__ = "simulation_runs"

    id = Column(String, primary_key=True, default=lambda: f"sim_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    scenario_type = Column(String, default="Hiring & Budget")
    input_params_json = Column(Text, nullable=False)
    output_results_json = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(String, primary_key=True, default=lambda: f"rec_{uuid.uuid4().hex[:12]}")
    category = Column(String, default="Cost Reduction")
    title = Column(String, nullable=False)
    impact_usd = Column(Float, default=0.0)
    confidence_score = Column(Float, default=0.92)
    status = Column(String, default="suggested", index=True) # suggested, applied, dismissed
    created_at = Column(DateTime, default=datetime.utcnow)

class Anomaly(Base):
    __tablename__ = "anomalies"

    id = Column(String, primary_key=True, default=lambda: f"anom_{uuid.uuid4().hex[:12]}")
    metric_name = Column(String, nullable=False)
    severity = Column(String, default="medium") # low, medium, high, critical
    message = Column(Text, nullable=False)
    detected_at = Column(DateTime, default=datetime.utcnow)

class KnowledgeGraphNode(Base):
    __tablename__ = "knowledge_graph_nodes"

    id = Column(String, primary_key=True) # e.g. node_user_01, node_wf_01
    node_type = Column(String, nullable=False) # User, Department, Workflow, Agent, Document
    label = Column(String, nullable=False)
    properties_json = Column(Text, nullable=True)

class KnowledgeGraphEdge(Base):
    __tablename__ = "knowledge_graph_edges"

    id = Column(String, primary_key=True, default=lambda: f"edge_{uuid.uuid4().hex[:12]}")
    source_node_id = Column(String, ForeignKey("knowledge_graph_nodes.id"), nullable=False)
    target_node_id = Column(String, ForeignKey("knowledge_graph_nodes.id"), nullable=False)
    relationship_type = Column(String, nullable=False) # OWNS, EXECUTES, CONSUMES, CONTAINS

class ExecutiveReport(Base):
    __tablename__ = "executive_reports"

    id = Column(String, primary_key=True, default=lambda: f"rep_{uuid.uuid4().hex[:12]}")
    title = Column(String, nullable=False)
    report_type = Column(String, default="Board Summary")
    report_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class DigitalTwin(Base):
    __tablename__ = "digital_twins"

    id = Column(String, primary_key=True, default=lambda: f"dt_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    entity_type = Column(String, default="Department") # Department, Process, Asset
    health_score = Column(Float, default=0.98)
    created_at = Column(DateTime, default=datetime.utcnow)
