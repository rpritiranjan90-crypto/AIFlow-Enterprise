from typing import Any, Dict, List


class ExecutiveEngine:
    def get_reports(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "rep_ceo_q3",
                "report_type": "ceo",
                "period": "quarterly",
                "metrics_json": {"revenue_growth": "+15%", "ai_adoption_rate": "82%"},
                "ai_summary": "Strong growth driven by increased AI workflow adoption in the manufacturing sector.",
                "created_at": "2026-07-29T10:00:00Z"
            }
        ]

executive_engine = ExecutiveEngine()
