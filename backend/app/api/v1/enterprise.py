from datetime import datetime
from typing import List

from fastapi import APIRouter

from app.enterprise.compliance_engine import compliance_engine
from app.enterprise.customer_success_engine import customer_success_engine
from app.enterprise.white_label_engine import white_label_engine
from app.schemas.enterprise import (
    CompliancePolicyResponse,
    CustomerHealthResponse,
    PartnerCreateRequest,
    PartnerResponse,
    PlatformStatusResponse,
    PolicyCreateRequest,
    SupportTicketResponse,
    TicketCreateRequest,
)

router = APIRouter(tags=["Global Enterprise Platform"])

mock_compliance_policies: List[CompliancePolicyResponse] = [
    CompliancePolicyResponse(id="cpol_soc2", name="SOC 2 Type II Security Controls", framework="SOC 2 Type II", status="compliant", last_audit_at=datetime.utcnow()),
    CompliancePolicyResponse(id="cpol_hipaa", name="HIPAA Health Data Privacy Guard", framework="HIPAA", status="compliant", last_audit_at=datetime.utcnow()),
    CompliancePolicyResponse(id="cpol_gdpr", name="GDPR User Data Erasure Policy", framework="GDPR", status="compliant", last_audit_at=datetime.utcnow()),
]

mock_partners: List[PartnerResponse] = [
    PartnerResponse(id="part_01", name="Global Cloud Systems Inc", tier="Platinum Partner", commission_pct=20.0, status="active", created_at=datetime.utcnow()),
    PartnerResponse(id="part_02", name="Apex MSP Automation Group", tier="MSP Partner", commission_pct=25.0, status="active", created_at=datetime.utcnow()),
]

mock_tickets: List[SupportTicketResponse] = [
    SupportTicketResponse(id="tkt_9901", subject="Dedicated EKS Cluster Migration Support", priority="P1 - Critical", sla_status="within_sla", status="in_progress", created_at=datetime.utcnow()),
]

@router.get("/api/v1/compliance/dashboard")
async def get_compliance_dashboard():
    return {
        "policies": mock_compliance_policies,
        "overall_compliance_score": 100.0,
        "signed_evidence": compliance_engine.export_audit_evidence("SOC 2 Type II"),
    }

@router.get("/api/v1/policies", response_model=List[CompliancePolicyResponse])
async def list_policies():
    return mock_compliance_policies

@router.post("/api/v1/policies", response_model=CompliancePolicyResponse)
async def create_policy(body: PolicyCreateRequest):
    return CompliancePolicyResponse(
        id="cpol_new",
        name=body.name,
        framework=body.framework,
        status="compliant",
        last_audit_at=datetime.utcnow(),
    )

@router.get("/api/v1/partners", response_model=List[PartnerResponse])
async def list_partners():
    return mock_partners

@router.post("/api/v1/partners", response_model=PartnerResponse)
async def create_partner(body: PartnerCreateRequest):
    return PartnerResponse(
        id="part_new",
        name=body.name,
        tier=body.tier,
        commission_pct=body.commission_pct,
        status="active",
        created_at=datetime.utcnow(),
    )

@router.get("/api/v1/support/tickets", response_model=List[SupportTicketResponse])
async def list_support_tickets():
    return mock_tickets

@router.post("/api/v1/support/tickets", response_model=SupportTicketResponse)
async def create_support_ticket(body: TicketCreateRequest):
    return SupportTicketResponse(
        id="tkt_new",
        subject=body.subject,
        priority=body.priority,
        sla_status="within_sla",
        status="open",
        created_at=datetime.utcnow(),
    )

@router.get("/api/v1/customer-success", response_model=CustomerHealthResponse)
async def get_customer_success():
    health = customer_success_engine.calculate_health_scores()
    return CustomerHealthResponse(
        id="chealth_01",
        org_id="org_enterprise_01",
        health_score=health["account_health_score"],
        churn_risk=health["churn_risk"],
        nps_score=health["nps_score"],
        updated_at=datetime.utcnow(),
    )

@router.get("/api/v1/platform/status", response_model=PlatformStatusResponse)
async def get_platform_status():
    return PlatformStatusResponse(
        global_health="OPERATIONAL",
        multi_region_clusters=4,
        active_monitored_tenants=1420,
        compliance_score=100.0,
        platform_version="v15.0.0 Global Enterprise Edition",
    )

@router.get("/api/v1/whitelabel")
async def get_whitelabel_config(org_id: str = "org_enterprise_01"):
    return white_label_engine.get_white_label_config(org_id)
