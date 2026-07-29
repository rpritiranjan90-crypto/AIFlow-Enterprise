from typing import Any, Dict


class DigitalTwinEngine:
    def get_twins(self) -> list:
        return [
            {
                "id": "twin_infra_1",
                "tenant_id": "t_master",
                "twin_type": "infrastructure",
                "state_json": {"cpu_load": 45, "network_throughput": "850Mbps"},
                "last_synced_at": "2026-07-29T10:00:00Z"
            }
        ]

    def simulate(self, payload: dict) -> Dict[str, Any]:
        twin_type = payload.get("twin_type", "unknown")
        scenario = payload.get("scenario", "default")
        return {
            "simulation_id": f"sim_{twin_type}_{scenario}",
            "twin_type": twin_type,
            "result_json": {"impact": "minimal", "cost_delta": "+$150"},
            "completed_at": "2026-07-29T10:05:00Z"
        }

digital_twin_engine = DigitalTwinEngine()
