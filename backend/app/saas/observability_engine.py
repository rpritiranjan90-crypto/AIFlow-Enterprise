from typing import Any, Dict


class ObservabilityEngine:
    def get_global_health(self) -> Dict[str, Any]:
        return {
            "global_uptime_pct": 99.99,
            "active_regions": [
                {"name": "us-east-1", "status": "healthy"},
                {"name": "eu-west-1", "status": "healthy"}
            ],
            "avg_latency_ms": 42
        }

observability_engine = ObservabilityEngine()
