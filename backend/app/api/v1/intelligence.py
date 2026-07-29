from datetime import datetime
from typing import List

from fastapi import APIRouter

from app.intelligence.decision_engine import decision_engine
from app.intelligence.forecasting_engine import forecasting_engine
from app.intelligence.knowledge_graph_engine import knowledge_graph_engine
from app.intelligence.kpi_engine import kpi_engine
from app.intelligence.scenario_simulator import scenario_simulator
from app.schemas.intelligence import (
    AnomalyResponse,
    DigitalTwinResponse,
    ExecutiveReportResponse,
    KPIResponse,
    RecommendationResponse,
    SimulationRequest,
    SimulationResponse,
)

router = APIRouter(prefix="/intelligence", tags=["Enterprise Decision Intelligence"])

mock_kpis: List[KPIResponse] = [
    KPIResponse(id="kpi_arr", name="ARR Annual Recurring Revenue", category="Revenue", current_value=4820000.0, target_value=5000000.0, status="on_track", updated_at=datetime.utcnow()),
    KPIResponse(id="kpi_gross_margin", name="Gross Operating Margin", category="Finance", current_value=84.2, target_value=85.0, status="on_track", updated_at=datetime.utcnow()),
    KPIResponse(id="kpi_ai_efficiency", name="AI Cost per Execution", category="AI Spend", current_value=0.0035, target_value=0.0050, status="on_track", updated_at=datetime.utcnow()),
]

mock_anomalies: List[AnomalyResponse] = [
    AnomalyResponse(id="anom_01", metric_name="LLM API Latency Spike", severity="medium", message="Anthropic Claude 3.5 latency spiked +120ms during 14:00 EST window", detected_at=datetime.utcnow()),
]

mock_twins: List[DigitalTwinResponse] = [
    DigitalTwinResponse(id="dt_fin_ops", name="Finance Operations Department Twin", entity_type="Department", health_score=0.98, created_at=datetime.utcnow()),
    DigitalTwinResponse(id="dt_lead_pipeline", name="Salesforce Lead Processing Twin", entity_type="Process", health_score=0.99, created_at=datetime.utcnow()),
]

mock_reports: List[ExecutiveReportResponse] = [
    ExecutiveReportResponse(id="rep_board_q3", title="Q3 Executive Board Performance Summary", report_type="Board Report", report_url="https://aiflow.enterprise.io/reports/board_q3_2026.pdf", created_at=datetime.utcnow()),
]

@router.get("/dashboard")
async def get_executive_dashboard():
    return {
        "kpis": kpi_engine.calculate_kpis(),
        "summary": "Q3 Enterprise ARR on track ($4.82M). AI cost efficiency performing +30% above target.",
    }

@router.get("/kpis", response_model=List[KPIResponse])
async def list_kpis():
    return mock_kpis

@router.get("/forecast")
async def get_forecast(metric: str = "ARR Revenue"):
    return forecasting_engine.generate_forecast(metric)

@router.post("/simulate", response_model=SimulationResponse)
async def run_scenario_simulation(body: SimulationRequest):
    res = scenario_simulator.run_simulation(
        body.scenario_type, body.hiring_headcount_delta, body.pricing_change_pct, body.ai_budget_cap_usd
    )
    return SimulationResponse(
        simulation_id=res["simulation_id"],
        projected_revenue_impact_usd=res["projected_revenue_impact_usd"],
        projected_cost_delta_usd=res["projected_cost_delta_usd"],
        net_roi_percentage=res["net_roi_percentage"],
        recommendation=res["recommendation"],
    )

@router.get("/anomalies", response_model=List[AnomalyResponse])
async def list_anomalies():
    return mock_anomalies

@router.get("/recommendations", response_model=List[RecommendationResponse])
async def list_recommendations():
    return decision_engine.generate_recommendations()

@router.get("/knowledge-graph")
async def get_knowledge_graph():
    return knowledge_graph_engine.get_graph_data()

@router.get("/reports", response_model=List[ExecutiveReportResponse])
async def list_executive_reports():
    return mock_reports

@router.get("/twins", response_model=List[DigitalTwinResponse])
async def list_digital_twins():
    return mock_twins
