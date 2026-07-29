from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CredentialCreateRequest(BaseModel):
    name: str
    credential_type: str
    secret_value: str

class CredentialResponse(BaseModel):
    id: str
    workspace_id: str
    name: str
    credential_type: str
    masked_value: str
    is_rotated: bool
    last_used_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True

class SSOProviderResponse(BaseModel):
    id: str
    workspace_id: str
    provider_type: str
    client_id: str
    issuer_url: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class SystemMetricsResponse(BaseModel):
    status: str
    uptime_seconds: int
    active_workers: int
    queue_depth: int
    memory_usage_mb: float
    cpu_percent: float
    requests_per_sec: float
    active_executions: int

class AdminAuditLogResponse(BaseModel):
    id: str
    user: str
    action: str
    resource: str
    status: str
    ip_address: str
    timestamp: datetime

class EnterpriseQuotaResponse(BaseModel):
    id: str
    organization_id: str
    max_workflows: int
    max_executions_per_month: int
    max_storage_gb: int
    max_tokens_per_month: int
    used_workflows: int
    used_executions_month: int
    created_at: datetime

    class Config:
        from_attributes = True
