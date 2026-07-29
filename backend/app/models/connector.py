import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text

from app.core.database import Base


class ConnectorDefinition(Base):
    __tablename__ = "connector_definitions"

    id = Column(String, primary_key=True) # e.g. conn_salesforce, conn_slack
    name = Column(String, nullable=False)
    category = Column(String, nullable=False) # AI, CRM, Communication, Storage, DevTools, DB, Finance
    provider = Column(String, nullable=False)
    auth_type = Column(String, default="OAuth2") # OAuth2, APIKey, Basic, ConnectionString
    icon_name = Column(String, default="Blocks")
    version = Column(String, default="1.0.0")
    description = Column(Text, nullable=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class InstalledConnector(Base):
    __tablename__ = "installed_connectors"

    id = Column(String, primary_key=True, default=lambda: f"inst_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id"), index=True, nullable=False, default="ws_prod_01")
    connector_id = Column(String, ForeignKey("connector_definitions.id"), nullable=False)
    name = Column(String, nullable=False)
    status = Column(String, default="connected", index=True) # connected, expired, error, disconnected
    health = Column(String, default="healthy")
    credential_id = Column(String, ForeignKey("credential_vault.id"), nullable=True)
    installed_at = Column(DateTime, default=datetime.utcnow)

class WorkflowTemplateCatalog(Base):
    __tablename__ = "workflow_templates_catalog"

    id = Column(String, primary_key=True, default=lambda: f"tmpl_{uuid.uuid4().hex[:12]}")
    title = Column(String, nullable=False)
    category = Column(String, default="Automation")
    description = Column(Text, nullable=True)
    graph_json = Column(Text, nullable=False)
    required_connectors_json = Column(Text, nullable=True) # JSON array of connector_ids
    install_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
