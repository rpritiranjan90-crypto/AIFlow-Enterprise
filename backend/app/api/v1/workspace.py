from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.workspace import (
    WorkspaceCreateRequest,
    WorkspaceMemberResponse,
    WorkspaceResponse,
    WorkspaceUpdateRequest,
)

router = APIRouter(prefix="/workspaces", tags=["Workspaces"])

mock_workspaces = [
    WorkspaceResponse(
        id="ws_prod_01",
        organization_id="org_acme_enterprise",
        name="Production Core",
        slug="production-core",
        description="Mission-critical enterprise automations and AI pipelines",
        role="owner",
        created_at=datetime.utcnow(),
    ),
    WorkspaceResponse(
        id="ws_eng_02",
        organization_id="org_acme_enterprise",
        name="DevOps & Infrastructure",
        slug="devops-infra",
        description="CI/CD automation, cloud monitoring & GitHub bots",
        role="admin",
        created_at=datetime.utcnow(),
    ),
]

@router.get("", response_model=List[WorkspaceResponse])
async def list_workspaces():
    return mock_workspaces

@router.post("", response_model=WorkspaceResponse)
async def create_workspace(body: WorkspaceCreateRequest):
    new_ws = WorkspaceResponse(
        id=f"ws_{body.slug}",
        organization_id="org_acme_enterprise",
        name=body.name,
        slug=body.slug,
        description=body.description,
        role="owner",
        created_at=datetime.utcnow(),
    )
    mock_workspaces.append(new_ws)
    return new_ws

@router.patch("/{workspace_id}", response_model=WorkspaceResponse)
async def update_workspace(workspace_id: str, body: WorkspaceUpdateRequest):
    for ws in mock_workspaces:
        if ws.id == workspace_id:
            if body.name:
                ws.name = body.name
            if body.description:
                ws.description = body.description
            return ws
    raise HTTPException(status_code=404, detail="Workspace not found")

@router.get("/{workspace_id}/members", response_model=List[WorkspaceMemberResponse])
async def list_workspace_members(workspace_id: str):
    return [
        WorkspaceMemberResponse(id="m1", name="Alex Mercer", email="alex.architect@enterprise.io", role="Owner", status="Active"),
        WorkspaceMemberResponse(id="m2", name="Elena Rostova", email="elena@enterprise.io", role="Admin", status="Active"),
    ]
