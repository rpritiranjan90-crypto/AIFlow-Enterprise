import uuid
from datetime import datetime

from sqlalchemy import JSON, Boolean, Column, DateTime, Float, ForeignKey, String

from app.core.database import Base


def generate_uuid():
    return str(uuid.uuid4())

class EnterpriseGraph(Base):
    __tablename__ = "platform_enterprise_graphs"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    tenant_id = Column(String, nullable=False, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class PlatformNode(Base):
    __tablename__ = "platform_nodes"
    id = Column(String, primary_key=True, default=generate_uuid)
    graph_id = Column(String, ForeignKey("platform_enterprise_graphs.id"))
    node_type = Column(String, nullable=False) # user, agent, workflow, application, policy
    entity_id = Column(String, nullable=False)
    metadata_json = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

class PlatformRelationship(Base):
    __tablename__ = "platform_relationships"
    id = Column(String, primary_key=True, default=generate_uuid)
    graph_id = Column(String, ForeignKey("platform_enterprise_graphs.id"))
    source_node_id = Column(String, ForeignKey("platform_nodes.id"))
    target_node_id = Column(String, ForeignKey("platform_nodes.id"))
    relationship_type = Column(String, nullable=False) # manages, executes, uses, belongs_to
    weight = Column(Float, default=1.0)
    created_at = Column(DateTime, default=datetime.utcnow)

class GlobalSearchIndex(Base):
    __tablename__ = "platform_search_indices"
    id = Column(String, primary_key=True, default=generate_uuid)
    entity_type = Column(String, nullable=False)
    entity_id = Column(String, nullable=False)
    content = Column(String, nullable=False)
    vector_embedding = Column(JSON, nullable=True) # Mock vector representation
    tags = Column(JSON, default=[])
    created_at = Column(DateTime, default=datetime.utcnow)

class EnterpriseTwin(Base):
    __tablename__ = "platform_enterprise_twins"
    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    twin_type = Column(String, nullable=False) # infrastructure, business_process, data, application
    state_json = Column(JSON, default={})
    last_synced_at = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

class PredictiveInsight(Base):
    __tablename__ = "platform_predictive_insights"
    id = Column(String, primary_key=True, default=generate_uuid)
    insight_type = Column(String, nullable=False) # capacity, cost, incident, usage
    severity = Column(String, default="info") # info, warning, critical
    prediction_json = Column(JSON, default={})
    confidence_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

class PlatformSnapshot(Base):
    __tablename__ = "platform_snapshots"
    id = Column(String, primary_key=True, default=generate_uuid)
    tenant_id = Column(String, nullable=False, index=True)
    version = Column(String, nullable=False)
    configuration_json = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

class PlatformRelease(Base):
    __tablename__ = "platform_releases"
    id = Column(String, primary_key=True, default=generate_uuid)
    version = Column(String, nullable=False, unique=True)
    release_notes = Column(String)
    is_active = Column(Boolean, default=True)
    deployed_at = Column(DateTime, default=datetime.utcnow)

class PlatformDependency(Base):
    __tablename__ = "platform_dependencies"
    id = Column(String, primary_key=True, default=generate_uuid)
    component_name = Column(String, nullable=False)
    required_version = Column(String, nullable=False)
    is_satisfied = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ExecutiveReport(Base):
    __tablename__ = "platform_executive_reports"
    id = Column(String, primary_key=True, default=generate_uuid)
    report_type = Column(String, nullable=False) # ceo, cio, ciso, cfo
    period = Column(String, nullable=False) # weekly, monthly, quarterly
    metrics_json = Column(JSON, default={})
    ai_summary = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
