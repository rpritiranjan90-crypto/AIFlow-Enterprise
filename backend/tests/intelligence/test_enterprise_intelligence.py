"""
Comprehensive unit & integration tests for Enterprise Intelligence Platform,
Decision Engine, Forecasting, Scenario Simulator, and Executive Copilot.
"""

import pytest
from app.intelligence.decision_engine import decision_engine
from app.intelligence.executive_copilot import executive_copilot
from app.intelligence.scenario_simulator import scenario_simulator


def test_decision_engine_and_forecasting():
    recs = decision_engine.generate_recommendations()
    assert len(recs) >= 3
    assert recs[0]["confidence_score"] > 0.9

    forecast = decision_engine.forecast_metrics("revenue", horizon_days=30)
    assert forecast["metric"] == "revenue"
    assert len(forecast["data_points"]) == 30


def test_scenario_simulator_what_if():
    sim_res = scenario_simulator.run_what_if_simulation(
        traffic_multiplier=2.5,
        primary_model="claude-3-5-sonnet",
        enable_prompt_caching=True,
    )
    assert sim_res.projected_cost_usd > 0
    assert sim_res.sla_compliance_rate >= 0.98


@pytest.mark.asyncio
async def test_executive_copilot_insights_and_board_report():
    q_res = await executive_copilot.query_executive_insight("What caused the recent spike in API throughput?")
    assert q_res["confidence_score"] > 0.9
    assert len(q_res["data_sources"]) >= 2

    report = await executive_copilot.generate_board_report()
    assert report["mrr_usd"] > 100000.0
    assert "99.99%" in report["system_uptime_sla"]
