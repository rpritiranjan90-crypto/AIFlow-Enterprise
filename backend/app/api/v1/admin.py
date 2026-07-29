from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter

from app.core.metrics import metrics_collector
from app.core.security_vault import security_vault
from app.schemas.admin import (
    AdminAuditLogResponse,
    CredentialCreateRequest,
    CredentialResponse,
    SystemMetricsResponse,
)

router = APIRouter(prefix="/admin", tags=["Enterprise Admin"])

mock_credentials: List[CredentialResponse] = [
    CredentialResponse(
        id="cred_01",
        workspace_id="ws_prod_01",
        name="Production OpenAI Master Key",
        credential_type="OpenAI_API_Key",
        masked_value="sk-proj-4a...9b12",
        is_rotated=True,
        last_used_at=datetime.utcnow() - timedelta(minutes=5),
        created_at=datetime.utcnow(),
    ),
    CredentialResponse(
        id="cred_02",
        workspace_id="ws_prod_01",
        name="Slack Production Bot Token",
        credential_type="Slack_OAuth",
        masked_value="xoxb-99...8812",
        is_rotated=False,
        last_used_at=datetime.utcnow() - timedelta(hours=2),
        created_at=datetime.utcnow(),
    ),
]

mock_audits: List[AdminAuditLogResponse] = [
    AdminAuditLogResponse(
        id="aud_01",
        user="alex@enterprise.io",
        action="USER_LOGIN",
        resource="IAM / SAML SSO",
        status="SUCCESS",
        ip_address="192.168.1.42",
        timestamp=datetime.utcnow() - timedelta(minutes=2),
    ),
    AdminAuditLogResponse(
        id="aud_02",
        user="alex@enterprise.io",
        action="WORKFLOW_PUBLISH",
        resource="Salesforce AI Enrichment Pipeline",
        status="SUCCESS",
        ip_address="192.168.1.42",
        timestamp=datetime.utcnow() - timedelta(minutes=15),
    ),
    AdminAuditLogResponse(
        id="aud_03",
        user="devops@enterprise.io",
        action="CREDENTIAL_ROTATE",
        resource="Production OpenAI Master Key",
        status="SUCCESS",
        ip_address="10.0.4.101",
        timestamp=datetime.utcnow() - timedelta(hours=1),
    ),
]

@router.get("/system", response_model=SystemMetricsResponse)
async def get_system_overview():
    return metrics_collector.get_system_metrics()

@router.get("/health")
async def get_system_health():
    return {
        "liveness": "pass",
        "readiness": "pass",
        "database": "postgresql_connected",
        "redis_queue": "connected",
        "celery_workers": 8,
    }

@router.get("/audit", response_model=List[AdminAuditLogResponse])
async def list_audit_logs():
    return mock_audits

@router.get("/metrics")
async def get_prometheus_metrics():
    return (
        "# HELP aiflow_http_requests_total Total HTTP requests\n"
        "# TYPE aiflow_http_requests_total counter\n"
        'aiflow_http_requests_total{code="200",method="POST"} 14205\n'
        'aiflow_workflow_executions_total{status="completed"} 8940\n'
        'aiflow_celery_workers_active 8\n'
    )

@router.get("/users")
async def list_enterprise_users():
    return [
        {"id": "usr_01", "email": "alex@enterprise.io", "role": "Owner", "sso": "Okta SAML", "status": "active"},
        {"id": "usr_02", "email": "devops@enterprise.io", "role": "Admin", "sso": "Google Workspace", "status": "active"},
        {"id": "usr_03", "email": "sarah@enterprise.io", "role": "Developer", "sso": "Azure AD", "status": "active"},
    ]

@router.post("/roles")
async def create_custom_role(payload: dict):
    return {"status": "created", "role": payload.get("role_name", "Custom Role")}

@router.get("/credentials", response_model=List[CredentialResponse])
async def list_credentials():
    return mock_credentials

@router.post("/credentials", response_model=CredentialResponse)
async def create_credential(body: CredentialCreateRequest):
    enc_val, masked_val = security_vault.encrypt_secret(body.secret_value)
    new_cred = CredentialResponse(
        id=f"cred_{datetime.utcnow().strftime('%M%S')}",
        workspace_id="ws_prod_01",
        name=body.name,
        credential_type=body.credential_type,
        masked_value=masked_val,
        is_rotated=False,
        last_used_at=None,
        created_at=datetime.utcnow(),
    )
    mock_credentials.append(new_cred)
    return new_cred

@router.patch("/settings")
async def update_admin_settings(settings: dict):
    return {"status": "updated", "settings": settings}
