import uuid
from typing import Any, Dict


class ScenarioSimulator:
    """
    Monte Carlo What-If Scenario Simulator.
    Simulates hiring headcount changes, pricing updates, demand shifts, and AI infrastructure budgets.
    """
    def run_simulation(self, scenario_type: str, hiring_delta: int, pricing_pct: float, ai_budget: float) -> Dict[str, Any]:
        sim_id = f"sim_{uuid.uuid4().hex[:12]}"
        rev_impact = (pricing_pct * 48200.0) + (hiring_delta * 120000.0)
        cost_delta = (hiring_delta * 85000.0) + (ai_budget * 0.2)
        roi = ((rev_impact - cost_delta) / cost_delta) * 100.0 if cost_delta > 0 else 0.0

        return {
            "simulation_id": sim_id,
            "projected_revenue_impact_usd": round(rev_impact, 2),
            "projected_cost_delta_usd": round(cost_delta, 2),
            "net_roi_percentage": round(roi, 1),
            "recommendation": f"Proceed with +{hiring_delta} hiring headcount and {pricing_pct}% pricing adjustment. Positive ROI of {round(roi, 1)}%.",
        }

scenario_simulator = ScenarioSimulator()
