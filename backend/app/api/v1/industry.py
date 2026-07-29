from typing import Any, Dict, List

from fastapi import APIRouter

from app.industry.copilot_engine import copilot_engine
from app.industry.deployment_engine import deployment_engine
from app.industry.solutions_engine import solutions_engine
from app.schemas.industry import (
    CopilotChatRequest,
    CopilotChatResponse,
    SolutionDeployRequest,
    SolutionDeployResponse,
)

router = APIRouter(prefix="/industry", tags=["AIFlow Enterprise v2.0 — Industry Solutions Platform"])


@router.get("/solutions", response_model=List[Dict[str, Any]])
async def list_solutions():
    return solutions_engine.get_catalog()


@router.get("/solutions/{industry}", response_model=List[Dict[str, Any]])
async def list_industry_solutions(industry: str):
    return solutions_engine.get_industry_solutions(industry)


@router.post("/solutions/deploy", response_model=SolutionDeployResponse)
async def deploy_solution(body: SolutionDeployRequest):
    return deployment_engine.deploy_solution(
        tenant_id=body.tenant_id,
        workspace_id=body.workspace_id,
        solution_id=body.solution_id,
        version_id=body.version_id,
        industry=body.industry
    )


@router.get("/copilots")
async def list_copilots():
    return copilot_engine.get_copilots()


@router.post("/copilots/chat", response_model=CopilotChatResponse)
async def chat_with_copilot(body: CopilotChatRequest):
    return copilot_engine.process_chat(
        copilot_id=body.copilot_id,
        industry=body.industry,
        query=body.query
    )
