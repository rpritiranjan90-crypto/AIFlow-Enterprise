from typing import Any, Dict, List


class PredictiveEngine:
    def get_insights(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "pred_capacity_1",
                "insight_type": "capacity",
                "severity": "warning",
                "prediction_json": {"message": "GPU cluster US-East projected to reach 95% capacity in 48 hours."},
                "confidence_score": 0.89,
                "created_at": "2026-07-29T10:00:00Z"
            }
        ]

predictive_engine = PredictiveEngine()
