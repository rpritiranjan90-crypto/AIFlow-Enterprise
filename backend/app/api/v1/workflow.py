from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.workflow import (
    EdgeSchema,
    NodeSchema,
    WorkflowCreateRequest,
    WorkflowGraphPayload,
    WorkflowResponse,
    WorkflowTemplateResponse,
    WorkflowUpdateRequest,
)

router = APIRouter(prefix="/workflows", tags=["Workflows"])

mock_graph = WorkflowGraphPayload(
    nodes=[
        NodeSchema(id="n1", node_type="manual_trigger", name="Manual Trigger", position_x=100.0, position_y=200.0, config={"notes": "Start manually"}),
        NodeSchema(id="n2", node_type="ai_agent", name="Salesforce AI Agent", position_x=450.0, position_y=200.0, config={"model": "gpt-4o", "prompt": "Enrich lead details"}),
        NodeSchema(id="n3", node_type="slack", name="Slack Broadcast Notice", position_x=800.0, position_y=200.0, config={"channel": "#sales-alerts"}),
    ],
    edges=[
        EdgeSchema(id="e1-2", source_node_id="n1", source_handle="output-1", target_node_id="n2", target_handle="input-1"),
        EdgeSchema(id="e2-3", source_node_id="n2", source_handle="output-1", target_node_id="n3", target_handle="input-1"),
    ]
)

mock_workflows_db = [
    WorkflowResponse(
        id="wf_01",
        workspace_id="ws_prod_01",
        name="Salesforce Lead AI Enrichment Pipeline",
        description="Triggered on new Salesforce leads, enriches with Apollo data & sends Slack notice",
        version="1.2.0",
        is_favorite=True,
        is_archived=False,
        tags="Salesforce,AI,Slack",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        graph=mock_graph,
    ),
    WorkflowResponse(
        id="wf_02",
        workspace_id="ws_prod_01",
        name="GitHub Security Vulnerability Scanner Bot",
        description="Scans PRs for secret leaks and queries Anthropic Claude to post security recommendations",
        version="1.0.0",
        is_favorite=False,
        is_archived=False,
        tags="GitHub,Security,Claude",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        graph=WorkflowGraphPayload(nodes=[], edges=[]),
    ),
]

@router.get("", response_model=List[WorkflowResponse])
async def list_workflows():
    return mock_workflows_db

@router.post("", response_model=WorkflowResponse)
async def create_workflow(body: WorkflowCreateRequest):
    new_wf = WorkflowResponse(
        id=f"wf_{datetime.utcnow().strftime('%M%S')}",
        workspace_id="ws_prod_01",
        name=body.name,
        description=body.description or "Enterprise business automation workflow",
        version="1.0.0",
        is_favorite=False,
        is_archived=False,
        tags=body.tags or "Automation",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        graph=body.graph or WorkflowGraphPayload(nodes=[], edges=[]),
    )
    mock_workflows_db.append(new_wf)
    return new_wf

@router.get("/{id}", response_model=WorkflowResponse)
async def get_workflow(id: str):
    for wf in mock_workflows_db:
        if wf.id == id:
            return wf
    # Fallback default workflow if requesting dynamic ID
    return WorkflowResponse(
        id=id,
        workspace_id="ws_prod_01",
        name="New Automation Flow",
        description="Editable enterprise canvas",
        version="1.0.0",
        is_favorite=False,
        is_archived=False,
        tags="Custom",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        graph=mock_graph,
    )

@router.patch("/{id}", response_model=WorkflowResponse)
async def update_workflow(id: str, body: WorkflowUpdateRequest):
    for wf in mock_workflows_db:
        if wf.id == id:
            if body.name:
                wf.name = body.name
            if body.description:
                wf.description = body.description
            if body.is_favorite is not None:
                wf.is_favorite = body.is_favorite
            if body.is_archived is not None:
                wf.is_archived = body.is_archived
            if body.graph:
                wf.graph = body.graph
            wf.updated_at = datetime.utcnow()
            return wf
    # Create if not found
    new_wf = WorkflowResponse(
        id=id,
        workspace_id="ws_prod_01",
        name=body.name or "Updated Workflow",
        description=body.description,
        version="1.0.0",
        is_favorite=body.is_favorite or False,
        is_archived=body.is_archived or False,
        tags="Custom",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        graph=body.graph or mock_graph,
    )
    mock_workflows_db.append(new_wf)
    return new_wf

@router.delete("/{id}")
async def delete_workflow(id: str):
    global mock_workflows_db
    mock_workflows_db = [wf for wf in mock_workflows_db if wf.id != id]
    return {"message": "Workflow deleted successfully", "id": id}

@router.post("/{id}/duplicate", response_model=WorkflowResponse)
async def duplicate_workflow(id: str):
    target = None
    for wf in mock_workflows_db:
        if wf.id == id:
            target = wf
            break
    if not target:
        target = mock_workflows_db[0]

    dup_wf = WorkflowResponse(
        id=f"wf_{datetime.utcnow().strftime('%M%S')}_dup",
        workspace_id=target.workspace_id,
        name=f"{target.name} (Copy)",
        description=target.description,
        version="1.0.0",
        is_favorite=False,
        is_archived=False,
        tags=target.tags,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        graph=target.graph,
    )
    mock_workflows_db.append(dup_wf)
    return dup_wf

@router.post("/{id}/favorite", response_model=WorkflowResponse)
async def toggle_favorite_workflow(id: str):
    for wf in mock_workflows_db:
        if wf.id == id:
            wf.is_favorite = not wf.is_favorite
            return wf
    raise HTTPException(status_code=404, detail="Workflow not found")

@router.get("/templates/all", response_model=List[WorkflowTemplateResponse])
async def list_workflow_templates():
    return [
        WorkflowTemplateResponse(
            id="tmpl_salesforce_enrichment",
            name="Salesforce Lead AI Enrichment",
            description="Listen to Salesforce leads, query Claude 3.5 Sonnet to enrich company data, and notify Slack",
            category="CRM & AI",
            graph=mock_graph,
        ),
        WorkflowTemplateResponse(
            id="tmpl_github_scanner",
            name="GitHub Code Security Auditor",
            description="Scan pull request diffs using Gemini 1.5 Pro for secret leaks and vulnerabilities",
            category="Developer Tools",
            graph=mock_graph,
        ),
    ]
