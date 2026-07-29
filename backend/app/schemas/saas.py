from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class SaaSTenantResponse(BaseModel):
    id: str
    name: str
    domain: Optional[str]
    tier: str
    region: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class SaaSTenantCreateRequest(BaseModel):
    name: str
    domain: Optional[str] = None
    tier: str = "enterprise"
    region: str = "us-east-1"


class SaaSTenantUpdateRequest(BaseModel):
    name: Optional[str] = None
    domain: Optional[str] = None
    tier: Optional[str] = None
    region: Optional[str] = None
    status: Optional[str] = None


class QuotaUpdateRequest(BaseModel):
    max_users: Optional[int] = None
    max_storage_gb: Optional[int] = None
    max_workflows: Optional[int] = None


class SaaSProvisionRequest(BaseModel):
    name: str
    target_type: str = "tenant"
    region: str = "us-east-1"
    tier: str = "enterprise"


class SaaSOperationsResponse(BaseModel):
    total_tenants: int
    active_regions: int
    system_health: float
    open_incidents: int
    upcoming_maintenances: int


class SaaSHealthResponse(BaseModel):
    global_uptime_pct: float
    active_regions: List[Dict[str, Any]]
    avg_latency_ms: int


class SaaSCostResponse(BaseModel):
    total_mrr_usd: float
    compute_cost_usd: float
    storage_cost_usd: float
    ai_inference_cost_usd: float
    month: str


class SaaSUsageResponse(BaseModel):
    total_api_calls: int
    total_workflows_executed: int
    active_users: int


class SaaSBackupRequest(BaseModel):
    tenant_id: str
    region: str


class SaaSRestoreRequest(BaseModel):
    tenant_id: str
    backup_id: str
