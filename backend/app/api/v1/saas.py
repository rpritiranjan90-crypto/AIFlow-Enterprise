from datetime import datetime
from typing import List

from fastapi import APIRouter

from app.saas.api_gateway_engine import api_gateway_engine
from app.saas.control_plane_engine import control_plane_engine
from app.saas.finops_engine import finops_engine
from app.saas.managed_services_engine import managed_services_engine
from app.saas.observability_engine import observability_engine
from app.saas.tenant_engine import tenant_engine
from app.schemas.saas import (
    QuotaUpdateRequest,
    SaaSBackupRequest,
    SaaSCostResponse,
    SaaSHealthResponse,
    SaaSOperationsResponse,
    SaaSProvisionRequest,
    SaaSRestoreRequest,
    SaaSTenantCreateRequest,
    SaaSTenantResponse,
    SaaSTenantUpdateRequest,
    SaaSUsageResponse,
)

router = APIRouter(prefix="/saas", tags=["AIFlow Enterprise v2.0 — Global SaaS Platform"])

# ── Mock Data ─────────────────────────────────────────────────────────────────
_MOCK_TENANTS: List[SaaSTenantResponse] = [
    SaaSTenantResponse(id="tenant_001", name="Acme Corp Global", domain="acme.aiflow.com", tier="global", region="us-east-1", status="active", created_at=datetime.utcnow()),
    SaaSTenantResponse(id="tenant_002", name="TechNova Inc", domain="technova.aiflow.com", tier="enterprise", region="eu-west-1", status="active", created_at=datetime.utcnow())
]

# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/tenants", response_model=List[SaaSTenantResponse])
async def list_tenants():
    return _MOCK_TENANTS


@router.post("/tenants", response_model=SaaSTenantResponse)
async def create_tenant(body: SaaSTenantCreateRequest):
    return SaaSTenantResponse(
        id="tenant_new",
        name=body.name,
        domain=body.domain,
        tier=body.tier,
        region=body.region,
        status="provisioning",
        created_at=datetime.utcnow()
    )


@router.get("/tenant/{id}", response_model=SaaSTenantResponse)
async def get_tenant(id: str):
    return _MOCK_TENANTS[0]


@router.patch("/tenant/{id}", response_model=SaaSTenantResponse)
async def update_tenant(id: str, body: SaaSTenantUpdateRequest):
    return _MOCK_TENANTS[0]


@router.delete("/tenant/{id}")
async def delete_tenant(id: str):
    return {"status": "deleted", "id": id}


@router.get("/operations", response_model=SaaSOperationsResponse)
async def get_operations():
    return control_plane_engine.get_operations_metrics()


@router.get("/health", response_model=SaaSHealthResponse)
async def get_health():
    return observability_engine.get_global_health()


@router.get("/costs", response_model=SaaSCostResponse)
async def get_costs():
    return finops_engine.get_costs()


@router.get("/usage", response_model=SaaSUsageResponse)
async def get_usage():
    return finops_engine.get_usage()


@router.post("/provision")
async def provision_resource(body: SaaSProvisionRequest):
    return tenant_engine.provision_tenant(body.name, body.region, body.tier)


@router.get("/quotas")
async def get_quotas():
    return {"max_users": 1000, "max_storage_gb": 5000, "max_workflows": 10000}


@router.patch("/quotas")
async def update_quotas(body: QuotaUpdateRequest):
    return {"status": "updated", "quotas": body.dict(exclude_unset=True)}


@router.get("/regions")
async def list_regions():
    return api_gateway_engine.get_regions()


@router.get("/maintenance")
async def list_maintenance_windows():
    return managed_services_engine.get_maintenance_windows()


@router.post("/backup")
async def trigger_backup(body: SaaSBackupRequest):
    return managed_services_engine.trigger_backup(body.tenant_id, body.region)


@router.post("/restore")
async def trigger_restore(body: SaaSRestoreRequest):
    return managed_services_engine.trigger_restore(body.tenant_id, body.backup_id)
