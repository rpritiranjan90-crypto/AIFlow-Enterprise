import json
from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.ai import PromptCreateRequest, PromptResponse, PromptUpdateRequest

router = APIRouter(prefix="/prompts", tags=["Prompt Library"])

mock_prompts: List[PromptResponse] = [
    PromptResponse(
        id="pmpt_01",
        workspace_id="ws_prod_01",
        name="Salesforce Lead Enrichment System Prompt",
        category="Agent",
        system_prompt="You are an expert enterprise sales intelligence agent. Extract company size, revenue, and technology stack.",
        user_prompt="Enrich lead {{lead_name}} from {{company}}.",
        variables_json=json.dumps(["lead_name", "company"]),
        version="1.2.0",
        created_at=datetime.utcnow(),
    ),
    PromptResponse(
        id="pmpt_02",
        workspace_id="ws_prod_01",
        name="Code Vulnerability Scanner Prompt",
        category="Classifier",
        system_prompt="You are a senior security engineer. Scan git diffs for hardcoded secrets, API tokens, and SQL injections.",
        user_prompt="Analyze commit diff:\n{{diff}}",
        variables_json=json.dumps(["diff"]),
        version="1.0.0",
        created_at=datetime.utcnow(),
    ),
]

@router.get("", response_model=List[PromptResponse])
async def list_prompts():
    return mock_prompts

@router.post("", response_model=PromptResponse)
async def create_prompt(body: PromptCreateRequest):
    new_pmpt = PromptResponse(
        id=f"pmpt_{datetime.utcnow().strftime('%M%S')}",
        workspace_id="ws_prod_01",
        name=body.name,
        category=body.category or "General",
        system_prompt=body.system_prompt,
        user_prompt=body.user_prompt,
        variables_json=json.dumps(body.variables or []),
        version="1.0.0",
        created_at=datetime.utcnow(),
    )
    mock_prompts.append(new_pmpt)
    return new_pmpt

@router.patch("/{id}", response_model=PromptResponse)
async def update_prompt(id: str, body: PromptUpdateRequest):
    for p in mock_prompts:
        if p.id == id:
            if body.name:
                p.name = body.name
            if body.system_prompt:
                p.system_prompt = body.system_prompt
            return p
    raise HTTPException(status_code=404, detail="Prompt template not found")
