from datetime import datetime
from typing import List

from fastapi import APIRouter

from app.agentic.memory_engine import memory_engine
from app.agentic.multi_agent_orchestrator import multi_agent_orchestrator
from app.agentic.planning_engine import planning_engine
from app.agentic.reasoning_engine import reasoning_engine
from app.agentic.simulation_engine import simulation_engine
from app.schemas.agentic import (
    AgentCreateRequest,
    AgentExecuteRequest,
    AgentMemoryResponse,
    AgentMetricsResponse,
    AgentResponse,
    AgentSimulateRequest,
    AgentTeamResponse,
    SimulationResponse,
)

router = APIRouter(prefix="/agents", tags=["AIFlow Enterprise v2.0 — Autonomous Multi-Agent Platform"])

# ── Mock registry ──────────────────────────────────────────────────────────────
_MOCK_AGENTS: List[AgentResponse] = [
    AgentResponse(id="agent_coord_01", name="Coordinator Prime", role="Coordinator", model_provider="openai/gpt-4o", status="active", created_at=datetime.utcnow()),
    AgentResponse(id="agent_plan_01",  name="Strategic Planner",  role="Planner",     model_provider="anthropic/claude-3-5-sonnet", status="active", created_at=datetime.utcnow()),
    AgentResponse(id="agent_res_01",   name="Deep Research",      role="Research",    model_provider="google/gemini-2-flash", status="active", created_at=datetime.utcnow()),
    AgentResponse(id="agent_exec_01",  name="Execution Engine",   role="Execution",   model_provider="openai/gpt-4o", status="active", created_at=datetime.utcnow()),
    AgentResponse(id="agent_val_01",   name="Quality Validator",  role="Validation",  model_provider="anthropic/claude-3-5-sonnet", status="active", created_at=datetime.utcnow()),
    AgentResponse(id="agent_rev_01",   name="Senior Reviewer",    role="Reviewer",    model_provider="openai/gpt-4o", status="active", created_at=datetime.utcnow()),
]

_MOCK_TEAMS: List[AgentTeamResponse] = [
    AgentTeamResponse(id="team_fin_01", name="Autonomous Finance Operations Team", goal="Automate Q3 Financial Close Process across 14 business units", status="completed", created_at=datetime.utcnow()),
    AgentTeamResponse(id="team_hr_01",  name="HR Onboarding Automation Team",      goal="Fully automate new employee onboarding for 200 hires in Q3",  status="running",   created_at=datetime.utcnow()),
]

_MOCK_SIMS: List[SimulationResponse] = [
    SimulationResponse(id="sim_001", name="Q3 Finance Close — Agent Sandbox", scenario_type="Agent Sandbox", success_rate_pct=98.5, avg_latency_ms=240, status="completed", created_at=datetime.utcnow()),
    SimulationResponse(id="sim_002", name="10x Load Stress Test — EKS Cluster", scenario_type="Stress Test", success_rate_pct=96.4, avg_latency_ms=380, status="completed", created_at=datetime.utcnow()),
]


# ── REST Endpoints ─────────────────────────────────────────────────────────────

@router.get("", response_model=List[AgentResponse])
async def list_agents():
    return _MOCK_AGENTS


@router.post("", response_model=AgentResponse)
async def create_agent(body: AgentCreateRequest):
    return AgentResponse(
        id=f"agent_new_{body.role[:4].lower()}",
        name=body.name,
        role=body.role,
        model_provider=body.model_provider,
        status="active",
        created_at=datetime.utcnow(),
    )


@router.post("/execute")
async def execute_agent_team(body: AgentExecuteRequest):
    # 1. Decompose goal into plan
    plan = planning_engine.decompose_goal(body.goal, body.priority)
    # 2. Reason about execution strategy
    reasoning = reasoning_engine.reason(body.goal)
    # 3. Run multi-agent orchestration pipeline
    result = multi_agent_orchestrator.execute_team_goal(body.goal, body.team_id, body.priority)
    return {
        "plan": plan,
        "reasoning_summary": {
            "confidence": reasoning["confidence"],
            "selected_strategy": reasoning["selected_strategy"],
            "verification_result": reasoning["verification_result"],
        },
        "execution": result,
    }


@router.post("/simulate", response_model=SimulationResponse)
async def run_simulation(body: AgentSimulateRequest):
    result = simulation_engine.run_simulation(body.name, body.scenario_type, body.config or {})
    return SimulationResponse(
        id=result["simulation_id"],
        name=result["name"],
        scenario_type=result["scenario_type"],
        success_rate_pct=result["success_rate_pct"],
        avg_latency_ms=result["avg_latency_ms"],
        status=result["status"],
        created_at=datetime.utcnow(),
    )


@router.get("/memory", response_model=List[AgentMemoryResponse])
async def get_agent_memory(query: str = "", memory_type: str = ""):
    entries = memory_engine.search_memory(query, memory_type or None) if query else memory_engine.get_all()
    return [
        AgentMemoryResponse(
            id=e["id"], agent_id=e["agent_id"], memory_type=e["memory_type"],
            content=e["content"], importance_score=e["importance_score"],
            created_at=datetime.utcnow(),
        )
        for e in entries
    ]


@router.get("/metrics", response_model=AgentMetricsResponse)
async def get_agent_metrics():
    return AgentMetricsResponse(
        total_agents=len(_MOCK_AGENTS),
        active_teams=len(_MOCK_TEAMS),
        avg_confidence_score=0.94,
        avg_latency_ms=320.0,
        total_executions=14820,
        memory_entries=len(memory_engine.get_all()),
        self_healing_triggers=42,
        reasoning_quality_score=0.96,
    )


@router.get("/teams", response_model=List[AgentTeamResponse])
async def list_agent_teams():
    return _MOCK_TEAMS


@router.get("/simulations", response_model=List[SimulationResponse])
async def list_simulations():
    return _MOCK_SIMS
