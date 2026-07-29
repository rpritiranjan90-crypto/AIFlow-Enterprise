from typing import Any, Dict


class FinOpsEngine:
    def get_costs(self) -> Dict[str, Any]:
        return {
            "total_mrr_usd": 1250000.0,
            "compute_cost_usd": 180000.0,
            "storage_cost_usd": 45000.0,
            "ai_inference_cost_usd": 320000.0,
            "month": "2026-07"
        }

    def get_usage(self) -> Dict[str, Any]:
        return {
            "total_api_calls": 42000000,
            "total_workflows_executed": 150000,
            "active_users": 18500
        }

finops_engine = FinOpsEngine()
