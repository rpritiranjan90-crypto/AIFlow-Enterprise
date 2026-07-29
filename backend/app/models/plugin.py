import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class Plugin(Base):
    __tablename__ = "plugins"

    id = Column(String, primary_key=True) # e.g. plugin_custom_ocr, plugin_stripe_v2
    name = Column(String, nullable=False)
    version = Column(String, default="1.0.0")
    author = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String, default="Workflow Node") # Workflow Node, AI Agent, Connector, UI Extension
    license = Column(String, default="MIT")
    digital_signature = Column(String, nullable=True)
    status = Column(String, default="verified", index=True) # verified, pending, rejected
    is_official = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class PluginVersion(Base):
    __tablename__ = "plugin_versions"

    id = Column(String, primary_key=True, default=lambda: f"pv_{uuid.uuid4().hex[:12]}")
    plugin_id = Column(String, ForeignKey("plugins.id"), nullable=False)
    version = Column(String, nullable=False)
    manifest_json = Column(Text, nullable=False)
    package_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class PluginDependency(Base):
    __tablename__ = "plugin_dependencies"

    id = Column(String, primary_key=True, default=lambda: f"dep_{uuid.uuid4().hex[:12]}")
    plugin_id = Column(String, ForeignKey("plugins.id"), nullable=False)
    dependency_name = Column(String, nullable=False)
    version_range = Column(String, default=">=1.0.0")

class PluginPermission(Base):
    __tablename__ = "plugin_permissions"

    id = Column(String, primary_key=True, default=lambda: f"perm_{uuid.uuid4().hex[:12]}")
    plugin_id = Column(String, ForeignKey("plugins.id"), nullable=False)
    permission_key = Column(String, nullable=False) # vault:read, http:outbound, workflow:execute
    description = Column(Text, nullable=True)

class PluginInstallation(Base):
    __tablename__ = "plugin_installations"

    id = Column(String, primary_key=True, default=lambda: f"pinst_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False, default="ws_prod_01")
    plugin_id = Column(String, ForeignKey("plugins.id"), nullable=False)
    version = Column(String, nullable=False)
    installed_at = Column(DateTime, default=datetime.utcnow)

class PluginMetrics(Base):
    __tablename__ = "plugin_metrics"

    id = Column(String, primary_key=True, default=lambda: f"pm_{uuid.uuid4().hex[:12]}")
    plugin_id = Column(String, ForeignKey("plugins.id"), nullable=False)
    execution_count = Column(Integer, default=0)
    avg_latency_ms = Column(Integer, default=0)
    error_rate = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow)
