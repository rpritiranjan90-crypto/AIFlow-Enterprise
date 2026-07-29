from datetime import datetime

from pydantic import BaseModel


class RegionResponse(BaseModel):
    id: str
    name: str
    code: str
    is_primary: bool
    status: str

    class Config:
        from_attributes = True

class ClusterResponse(BaseModel):
    id: str
    name: str
    region_id: str
    provider: str
    nodes_count: int
    k8s_version: str
    status: str

    class Config:
        from_attributes = True

class DeploymentResponse(BaseModel):
    id: str
    release_version: str
    strategy: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class BackupResponse(BaseModel):
    id: str
    workspace_id: str
    backup_type: str
    size_bytes: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class FeatureFlagResponse(BaseModel):
    id: str
    flag_key: str
    is_enabled: bool
    description: str
    percentage_rollout: int

    class Config:
        from_attributes = True

class CloudMetricsResponse(BaseModel):
    total_clusters: int
    total_nodes: int
    global_traffic_rps: int
    avg_region_latency_ms: int
    cpu_utilization_pct: float
    memory_utilization_pct: float
    active_canary_deployments: int
