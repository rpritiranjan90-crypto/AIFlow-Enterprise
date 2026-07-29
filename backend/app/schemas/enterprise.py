from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CompliancePolicyResponse(BaseModel):
    id: str
    name: str
    framework: str
    status: str
    last_audit_at: datetime

    class Config:
        from_attributes = True

class PolicyCreateRequest(BaseModel):
    name: str
    framework: str = "SOC 2 Type II"
    policy_rules_json: Optional[str] = "{}"

class PartnerResponse(BaseModel):
    id: str
    name: str
    tier: str
    commission_pct: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class PartnerCreateRequest(BaseModel):
    name: str
    tier: str = "Platinum Partner"
    commission_pct: float = 20.0

class SupportTicketResponse(BaseModel):
    id: str
    subject: str
    priority: str
    sla_status: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class TicketCreateRequest(BaseModel):
    subject: str
    priority: str = "P1 - Critical"

class CustomerHealthResponse(BaseModel):
    id: str
    org_id: str
    health_score: float
    churn_risk: str
    nps_score: int
    updated_at: datetime

    class Config:
        from_attributes = True

class PlatformStatusResponse(BaseModel):
    global_health: str
    multi_region_clusters: int
    active_monitored_tenants: int
    compliance_score: float
    platform_version: str
