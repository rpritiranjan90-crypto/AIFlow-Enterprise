import uuid
from datetime import datetime

from sqlalchemy import JSON, Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text

from app.core.database import Base


class SaaSTenant(Base):
    __tablename__ = "saas_tenants"

    id = Column(String, primary_key=True, default=lambda: f"tenant_{uuid.uuid4().hex[:12]}")
    name = Column(String, nullable=False)
    domain = Column(String, nullable=True, unique=True)
    tier = Column(String, default="enterprise")  # startup, professional, enterprise, global
    region = Column(String, default="us-east-1")
    status = Column(String, default="active", index=True)  # provisioning, active, suspended, deleted
    settings = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class SaaSWorkspace(Base):
    __tablename__ = "saas_workspaces"

    id = Column(String, primary_key=True, default=lambda: f"sws_{uuid.uuid4().hex[:12]}")
    tenant_id = Column(String, ForeignKey("saas_tenants.id", index=True), nullable=False)
    name = Column(String, nullable=False)
    type = Column(String, default="production")  # development, staging, production
    status = Column(String, default="active", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class SaaSProvisioningJob(Base):
    __tablename__ = "saas_provisioning_jobs"

    id = Column(String, primary_key=True, default=lambda: f"prov_{uuid.uuid4().hex[:12]}")
    target_id = Column(String, nullable=False)  # Tenant ID or Workspace ID
    target_type = Column(String, default="tenant")
    steps = Column(JSON, default=list)
    status = Column(String, default="pending", index=True)  # pending, running, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)


class SaaSMaintenanceWindow(Base):
    __tablename__ = "saas_maintenance_windows"

    id = Column(String, primary_key=True, default=lambda: f"maint_{uuid.uuid4().hex[:12]}")
    region = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    status = Column(String, default="scheduled", index=True)  # scheduled, in_progress, completed, canceled
    created_at = Column(DateTime, default=datetime.utcnow)


class SaaSPlatformMetric(Base):
    __tablename__ = "saas_platform_metrics"

    id = Column(String, primary_key=True, default=lambda: f"pmet_{uuid.uuid4().hex[:12]}")
    metric_name = Column(String, nullable=False)
    metric_value = Column(Float, nullable=False)
    region = Column(String, nullable=False)
    tags = Column(JSON, default=list)
    timestamp = Column(DateTime, default=datetime.utcnow)


class SaaSCostRecord(Base):
    __tablename__ = "saas_cost_records"

    id = Column(String, primary_key=True, default=lambda: f"scost_{uuid.uuid4().hex[:12]}")
    tenant_id = Column(String, ForeignKey("saas_tenants.id", index=True), nullable=False)
    resource_type = Column(String, nullable=False)  # compute, storage, bandwidth, ai_inference
    amount_usd = Column(Float, default=0.0)
    month = Column(String, nullable=False)  # YYYY-MM
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)


class SaaSUsageRecord(Base):
    __tablename__ = "saas_usage_records"

    id = Column(String, primary_key=True, default=lambda: f"susage_{uuid.uuid4().hex[:12]}")
    tenant_id = Column(String, ForeignKey("saas_tenants.id", index=True), nullable=False)
    metric_type = Column(String, nullable=False)  # api_calls, storage_gb, active_users, workflows_executed
    value = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow)


class SaaSRegionalEndpoint(Base):
    __tablename__ = "saas_regional_endpoints"

    id = Column(String, primary_key=True, default=lambda: f"rend_{uuid.uuid4().hex[:12]}")
    region = Column(String, nullable=False)
    service_name = Column(String, nullable=False)
    endpoint_url = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    latency_ms = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
