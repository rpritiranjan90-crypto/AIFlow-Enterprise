from datetime import datetime, timedelta
from typing import List

from fastapi import APIRouter, HTTPException

from app.aiops.benchmark_runner import benchmark_runner
from app.aiops.evaluation_engine import evaluation_engine
from app.schemas.aiops import (
    AgentMetricsResponse,
    AIModelResponse,
    ApprovalRequestResponse,
    CostAnalyticsResponse,
    GovernancePolicyResponse,
    ModelComparisonRequest,
    ModelComparisonResponse,
    PromptEvaluationResponse,
    RAGMetricsResponse,
)

router = APIRouter(prefix="/aiops", tags=["Enterprise AIOps"])

mock_models: List[AIModelResponse] = [
    AIModelResponse(id="gpt-4o", name="OpenAI GPT-4o", provider="OpenAI", version="2026-05", context_window=128000, pricing_per_1k_input=0.005, pricing_per_1k_output=0.015, status="available"),
    AIModelResponse(id="claude-3-5-sonnet", name="Anthropic Claude 3.5 Sonnet", provider="Anthropic", version="2026-06", context_window=200000, pricing_per_1k_input=0.003, pricing_per_1k_output=0.015, status="available"),
    AIModelResponse(id="gemini-1-5-pro", name="Google Gemini 1.5 Pro", provider="Google", version="1.5", context_window=2000000, pricing_per_1k_input=0.00125, pricing_per_1k_output=0.005, status="available"),
    AIModelResponse(id="deepseek-r1", name="DeepSeek R1", provider="DeepSeek", version="1.0", context_window=64000, pricing_per_1k_input=0.00055, pricing_per_1k_output=0.00219, status="available"),
]

mock_evaluations: List[PromptEvaluationResponse] = [
    PromptEvaluationResponse(
        id="eval_01",
        prompt_id="pmpt_01",
        accuracy_score=0.96,
        completeness_score=0.94,
        groundedness_score=0.98,
        hallucination_rate=0.015,
        latency_ms=420,
        cost_usd=0.0042,
        overall_score=0.96,
        eval_status="passed",
        created_at=datetime.utcnow(),
    )
]

mock_agent_metrics: List[AgentMetricsResponse] = [
    AgentMetricsResponse(id="agm_01", agent_id="ag_01", agent_name="Salesforce Lead AI Agent", execution_count=1420, avg_runtime_ms=840, success_rate=99.8, tool_calls_count=2840, token_consumption=4205000),
    AgentMetricsResponse(id="agm_02", agent_id="ag_02", agent_name="GitHub Security Code Auditor", execution_count=890, avg_runtime_ms=620, success_rate=100.0, tool_calls_count=1780, token_consumption=2670000),
]

mock_approvals: List[ApprovalRequestResponse] = [
    ApprovalRequestResponse(
        id="appr_01",
        workflow_id="wf_01",
        workflow_name="Salesforce Lead AI Enrichment Pipeline",
        execution_id="exec_9901",
        node_name="Manager Approval Gate",
        status="pending",
        requested_by="Salesforce Lead Webhook",
        created_at=datetime.utcnow() - timedelta(minutes=10),
    )
]

@router.get("/models", response_model=List[AIModelResponse])
async def list_ai_models():
    return mock_models

@router.get("/evaluations", response_model=List[PromptEvaluationResponse])
async def list_evaluations():
    return mock_evaluations

@router.post("/evaluations/run", response_model=PromptEvaluationResponse)
async def run_prompt_evaluation(payload: dict):
    res = evaluation_engine.evaluate_prompt(payload.get("prompt_text", ""))
    eval_record = PromptEvaluationResponse(
        id=f"eval_{datetime.utcnow().strftime('%M%S')}",
        prompt_id=payload.get("prompt_id", "pmpt_01"),
        accuracy_score=res["accuracy_score"],
        completeness_score=res["completeness_score"],
        groundedness_score=res["groundedness_score"],
        hallucination_rate=res["hallucination_rate"],
        latency_ms=res["latency_ms"],
        cost_usd=res["cost_usd"],
        overall_score=res["overall_score"],
        eval_status=res["status"],
        created_at=datetime.utcnow(),
    )
    mock_evaluations.insert(0, eval_record)
    return eval_record

@router.get("/costs", response_model=CostAnalyticsResponse)
async def get_cost_analytics():
    return CostAnalyticsResponse(
        total_spend_usd=482.50,
        tokens_consumed=84200000,
        forecasted_monthly_usd=1450.00,
        spend_by_provider={"OpenAI": 280.00, "Anthropic": 140.00, "Google": 62.50},
        spend_by_agent={"Salesforce AI Agent": 210.00, "Security Auditor": 180.00, "RAG Assistant": 92.50},
    )

@router.get("/agents", response_model=List[AgentMetricsResponse])
async def get_agent_metrics():
    return mock_agent_metrics

@router.get("/rag", response_model=RAGMetricsResponse)
async def get_rag_metrics():
    return RAGMetricsResponse(
        documents_indexed=22,
        total_vectors=2270,
        retrieval_accuracy=98.4,
        citation_coverage_rate=99.1,
        avg_similarity_score=0.92,
        failed_retrievals_count=2,
    )

@router.get("/governance", response_model=GovernancePolicyResponse)
async def get_governance_policy():
    return GovernancePolicyResponse(
        id="gov_01",
        workspace_id="ws_prod_01",
        max_monthly_spend=5000.0,
        max_token_limit=100000000,
        require_human_approval=True,
        restricted_models=["unapproved_local_model"],
    )

@router.patch("/governance", response_model=GovernancePolicyResponse)
async def update_governance_policy(body: dict):
    return GovernancePolicyResponse(
        id="gov_01",
        workspace_id="ws_prod_01",
        max_monthly_spend=body.get("max_monthly_spend", 5000.0),
        max_token_limit=body.get("max_token_limit", 100000000),
        require_human_approval=body.get("require_human_approval", True),
        restricted_models=[],
    )

@router.post("/compare", response_model=ModelComparisonResponse)
async def compare_llm_models(body: ModelComparisonRequest):
    return await benchmark_runner.compare_models(body.prompt_text, body.models)

@router.get("/approvals", response_model=List[ApprovalRequestResponse])
async def list_approvals():
    return mock_approvals

@router.post("/approvals/{id}/action")
async def process_approval_action(id: str, action: str):
    for a in mock_approvals:
        if a.id == id:
            a.status = action
            return {"id": id, "status": action, "message": f"Approval gate status updated to {action}"}
    raise HTTPException(status_code=404, detail="Approval request not found")

@router.get("/reports/download")
async def download_executive_report(format: str = "pdf"):
    return {"format": format, "report_url": "https://aiflow.enterprise.io/reports/exec_summary_2026.pdf"}
