import uuid
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text

from app.core.database import Base


class Region(Base):
    __tablename__ = "regions"

    id = Column(String, primary_key=True) # e.g. us-east-1, eu-central-1
    name = Column(String, nullable=False)
    code = Column(String, nullable=False)
    is_primary = Column(Boolean, default=False)
    status = Column(String, default="healthy", index=True) # healthy, degraded, maintenance
    created_at = Column(DateTime, default=datetime.utcnow)

class Cluster(Base):
    __tablename__ = "clusters"

    id = Column(String, primary_key=True) # e.g. cluster_us_east_prod
    name = Column(String, nullable=False)
    region_id = Column(String, ForeignKey("regions.id"), nullable=False)
    provider = Column(String, default="EKS") # EKS, GKE, AKS
    nodes_count = Column(Integer, default=12)
    k8s_version = Column(String, default="1.30")
    status = Column(String, default="active", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Deployment(Base):
    __tablename__ = "cloud_deployments"

    id = Column(String, primary_key=True, default=lambda: f"dep_{uuid.uuid4().hex[:12]}")
    release_version = Column(String, nullable=False)
    strategy = Column(String, default="Canary") # Blue/Green, Canary, Rolling
    status = Column(String, default="succeeded", index=True) # in_progress, succeeded, rolled_back
    created_at = Column(DateTime, default=datetime.utcnow)

class DeploymentHistory(Base):
    __tablename__ = "deployment_histories"

    id = Column(String, primary_key=True, default=lambda: f"dh_{uuid.uuid4().hex[:12]}")
    deployment_id = Column(String, ForeignKey("cloud_deployments.id"), nullable=False)
    action = Column(String, nullable=False)
    status = Column(String, default="success", index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

class Backup(Base):
    __tablename__ = "backups"

    id = Column(String, primary_key=True, default=lambda: f"bak_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False, default="ws_prod_01")
    backup_type = Column(String, default="Snapshot") # Snapshot, Full, Incremental
    size_bytes = Column(Integer, default=4200000000)
    status = Column(String, default="completed", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class RestoreJob(Base):
    __tablename__ = "restore_jobs"

    id = Column(String, primary_key=True, default=lambda: f"rst_{uuid.uuid4().hex[:12]}")
    backup_id = Column(String, ForeignKey("backups.id"), nullable=False)
    target_region = Column(String, nullable=False, default="eu-central-1")
    status = Column(String, default="completed", index=True)
    started_at = Column(DateTime, default=datetime.utcnow)

class FeatureFlag(Base):
    __tablename__ = "feature_flags"

    id = Column(String, primary_key=True, default=lambda: f"ff_{uuid.uuid4().hex[:12]}")
    flag_key = Column(String, nullable=False, unique=True)
    is_enabled = Column(Boolean, default=True)
    description = Column(Text, nullable=True)
    percentage_rollout = Column(Integer, default=100)
    created_at = Column(DateTime, default=datetime.utcnow)

class EnvironmentProfile(Base):
    __tablename__ = "environment_profiles"

    id = Column(String, primary_key=True, default=lambda: f"env_{uuid.uuid4().hex[:12]}")
    env_name = Column(String, nullable=False) # production, staging
    config_json = Column(Text, nullable=False)

class TenantRegion(Base):
    __tablename__ = "tenant_regions"

    id = Column(String, primary_key=True, default=lambda: f"tr_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id", index=True), nullable=False)
    primary_region = Column(String, nullable=False, default="us-east-1")
    replica_region = Column(String, nullable=False, default="eu-central-1")

class InfrastructureEvent(Base):
    __tablename__ = "infrastructure_events"

    id = Column(String, primary_key=True, default=lambda: f"ie_{uuid.uuid4().hex[:12]}")
    cluster_id = Column(String, nullable=False)
    event_type = Column(String, nullable=False) # Failover, Scaling, Upgrade
    severity = Column(String, default="info") # info, warning, critical
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
