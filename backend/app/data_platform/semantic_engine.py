from typing import Any, Dict, List


class SemanticEngine:
    """
    Semantic Layer Manager.
    Computes reusable business metrics, dimensions, measures, and KPI definitions.
    """
    def list_metrics(self) -> List[Dict[str, Any]]:
        return [
            {"id": "sem_01", "name": "ARR Revenue", "measure_sql": "SUM(total_amount)", "dimension_name": "Region", "category": "Financial KPIs"},
            {"id": "sem_02", "name": "Active Subscriptions", "measure_sql": "COUNT(DISTINCT tenant_id)", "dimension_name": "Tier", "category": "Growth KPIs"},
        ]

semantic_engine = SemanticEngine()
