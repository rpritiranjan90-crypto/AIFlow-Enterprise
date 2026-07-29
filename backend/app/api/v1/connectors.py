from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, HTTPException

from app.connectors.registry import CONNECTORS_CATALOG
from app.core.security_vault import security_vault
from app.schemas.connector import (
    ConnectorInstallRequest,
    ConnectorResponse,
    InstalledConnectorResponse,
    MarketplaceSummaryResponse,
    WorkflowTemplateCatalogResponse,
)

router = APIRouter(tags=["Integration Marketplace"])

mock_installed_connectors: List[InstalledConnectorResponse] = [
    InstalledConnectorResponse(
        id="inst_01",
        workspace_id="ws_prod_01",
        connector_id="conn_salesforce",
        name="Salesforce CRM",
        status="connected",
        health="healthy",
        credential_id="cred_01",
        installed_at=datetime.utcnow(),
    ),
    InstalledConnectorResponse(
        id="inst_02",
        workspace_id="ws_prod_01",
        connector_id="conn_slack",
        name="Slack Bot",
        status="connected",
        health="healthy",
        credential_id="cred_02",
        installed_at=datetime.utcnow(),
    ),
    InstalledConnectorResponse(
        id="inst_03",
        workspace_id="ws_prod_01",
        connector_id="conn_openai",
        name="OpenAI GPT-4o",
        status="connected",
        health="healthy",
        credential_id="cred_01",
        installed_at=datetime.utcnow(),
    ),
]

mock_templates: List[WorkflowTemplateCatalogResponse] = [
    WorkflowTemplateCatalogResponse(
        id="tmpl_01",
        title="Salesforce Lead AI Enrichment & Slack Notice",
        category="Sales CRM",
        description="Triggered on new Salesforce lead creation, enriches lead data using OpenAI GPT-4o and dispatches Slack alert",
        graph_json="{}",
        required_connectors=["conn_salesforce", "conn_openai", "conn_slack"],
        install_count=1420,
        created_at=datetime.utcnow(),
    ),
    WorkflowTemplateCatalogResponse(
        id="tmpl_02",
        title="GitHub PR AI Security Code Auditor Bot",
        category="DevOps & Security",
        description="Scans incoming PR commits for hardcoded secrets and posts automated security code review comments",
        graph_json="{}",
        required_connectors=["conn_github", "conn_openai", "conn_jira"],
        install_count=890,
        created_at=datetime.utcnow(),
    ),
    WorkflowTemplateCatalogResponse(
        id="tmpl_03",
        title="Stripe Invoice Settlement to PostgreSQL ETL",
        category="Finance & Data Sync",
        description="Cron schedule every midnight to reconcile payment transactions into analytical PostgreSQL database",
        graph_json="{}",
        required_connectors=["conn_stripe", "conn_postgres"],
        install_count=450,
        created_at=datetime.utcnow(),
    ),
]

@router.get("/connectors", response_model=List[ConnectorResponse])
async def list_connectors(category: Optional[str] = None):
    installed_ids = [i.connector_id for i in mock_installed_connectors]
    res = []
    for c in CONNECTORS_CATALOG:
        if category and c["category"].lower() != category.lower():
            continue
        res.append(ConnectorResponse(**c, is_installed=(c["id"] in installed_ids)))
    return res

@router.get("/connectors/{id}", response_model=ConnectorResponse)
async def get_connector(id: str):
    installed_ids = [i.connector_id for i in mock_installed_connectors]
    for c in CONNECTORS_CATALOG:
        if c["id"] == id:
            return ConnectorResponse(**c, is_installed=(c["id"] in installed_ids))
    raise HTTPException(status_code=404, detail="Connector not found")

@router.post("/connectors/install", response_model=InstalledConnectorResponse)
async def install_connector(body: ConnectorInstallRequest):
    # Store credentials in Vault
    enc_val, masked_val = security_vault.encrypt_secret(body.credential_payload.get("token", "secret_token_123"))

    target_conn = next((c for c in CONNECTORS_CATALOG if c["id"] == body.connector_id), None)
    conn_name = target_conn["name"] if target_conn else body.connector_id

    installed = InstalledConnectorResponse(
        id=f"inst_{datetime.utcnow().strftime('%M%S')}",
        workspace_id="ws_prod_01",
        connector_id=body.connector_id,
        name=conn_name,
        status="connected",
        health="healthy",
        credential_id="cred_vault_gen",
        installed_at=datetime.utcnow(),
    )
    mock_installed_connectors.append(installed)
    return installed

@router.delete("/connectors/{id}")
async def uninstall_connector(id: str):
    global mock_installed_connectors
    mock_installed_connectors = [c for c in mock_installed_connectors if c.id != id and c.connector_id != id]
    return {"message": "Connector uninstalled successfully"}

@router.get("/templates", response_model=List[WorkflowTemplateCatalogResponse])
async def list_templates():
    return mock_templates

@router.post("/templates/install")
async def install_template(template_id: str):
    return {"status": "installed", "workflow_id": f"wf_tmpl_{template_id}", "message": "Template instantiated into visual builder workflow canvas."}

@router.get("/marketplace", response_model=MarketplaceSummaryResponse)
async def get_marketplace_summary():
    installed_ids = [i.connector_id for i in mock_installed_connectors]
    featured = [
        ConnectorResponse(**c, is_installed=(c["id"] in installed_ids))
        for c in CONNECTORS_CATALOG if c.get("is_featured")
    ]
    categories = list({c["category"] for c in CONNECTORS_CATALOG})
    return MarketplaceSummaryResponse(
        total_connectors=len(CONNECTORS_CATALOG),
        categories=categories,
        featured_connectors=featured,
        popular_templates=mock_templates,
    )
