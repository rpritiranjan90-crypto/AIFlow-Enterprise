import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, String, Text

from app.core.database import Base


class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(String, primary_key=True, default=lambda: f"wf_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False, default="ws_prod_01")
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    version = Column(String, default="1.0.0")
    is_favorite = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=False)
    tags = Column(String, default="Automation,AI")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class WorkflowNode(Base):
    __tablename__ = "workflow_nodes"

    id = Column(String, primary_key=True, default=lambda: f"node_{uuid.uuid4().hex[:12]}")
    workflow_id = Column(String, ForeignKey("workflows.id", index=True), nullable=False)
    node_type = Column(String, nullable=False) # e.g. 'manual_trigger', 'ai_agent', 'webhook'
    name = Column(String, nullable=False)
    position_x = Column(Float, default=0.0)
    position_y = Column(Float, default=0.0)
    config_json = Column(Text, nullable=True) # JSON string of configuration options

class WorkflowEdge(Base):
    __tablename__ = "workflow_edges"

    id = Column(String, primary_key=True, default=lambda: f"edge_{uuid.uuid4().hex[:12]}")
    workflow_id = Column(String, ForeignKey("workflows.id", index=True), nullable=False)
    source_node_id = Column(String, nullable=False)
    source_handle = Column(String, nullable=True)
    target_node_id = Column(String, nullable=False)
    target_handle = Column(String, nullable=True)

class WorkflowVersion(Base):
    __tablename__ = "workflow_versions"

    id = Column(String, primary_key=True, default=lambda: f"ver_{uuid.uuid4().hex[:12]}")
    workflow_id = Column(String, ForeignKey("workflows.id", index=True), nullable=False)
    version_number = Column(String, nullable=False)
    graph_json = Column(Text, nullable=False)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class WorkflowTemplate(Base):
    __tablename__ = "workflow_templates"

    id = Column(String, primary_key=True, default=lambda: f"tmpl_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, default="General")
    graph_json = Column(Text, nullable=False)
