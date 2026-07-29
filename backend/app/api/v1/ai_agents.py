import uuid
from datetime import datetime

from fastapi import APIRouter

from app.ai.agent_runtime import agent_runtime
from app.schemas.ai import AgentChatRequest, AgentRunResponse, ChatMessageResponse

router = APIRouter(prefix="/agents", tags=["AI Agents"])

@router.get("")
async def list_agents():
    return [
        {"id": "ag_01", "name": "Customer Support Agent", "model": "gpt-4o", "status": "active", "tools": ["slack", "email", "web_search"]},
        {"id": "ag_02", "name": "Lead Enrichment Agent", "model": "claude-3-5-sonnet", "status": "active", "tools": ["salesforce", "http_request"]},
        {"id": "ag_03", "name": "Code Security Auditor", "model": "gemini-1-5-pro", "status": "idle", "tools": ["github", "code_runner"]},
    ]

@router.post("/chat", response_model=ChatMessageResponse)
async def chat_with_agent(body: AgentChatRequest):
    session_id = f"sess_{uuid.uuid4().hex[:8]}"
    res = await agent_runtime.run_agent(
        session_id=session_id,
        user_message=body.message,
        model=body.model or "gpt-4o",
        knowledge_base_id=body.knowledge_base_id,
        enable_tools=body.enable_tools or True,
    )

    return ChatMessageResponse(
        id=f"msg_{uuid.uuid4().hex[:8]}",
        role="assistant",
        content=res["output"],
        citations=res["citations"],
        tokens_used=res["tokens_used"],
        created_at=datetime.utcnow(),
    )

@router.post("/run", response_model=AgentRunResponse)
async def run_autonomous_agent(body: AgentChatRequest):
    session_id = f"sess_{uuid.uuid4().hex[:8]}"
    res = await agent_runtime.run_agent(
        session_id=session_id,
        user_message=body.message,
        model=body.model or "gpt-4o",
        knowledge_base_id=body.knowledge_base_id,
        enable_tools=body.enable_tools or True,
    )

    return AgentRunResponse(
        session_id=res["session_id"],
        agent_name=res["agent_name"],
        model=res["model"],
        reasoning_steps=res["reasoning_steps"],
        output=res["output"],
        citations=res["citations"],
    )
