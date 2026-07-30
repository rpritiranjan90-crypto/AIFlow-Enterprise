"""
AI-Powered Customer Health Scoring Engine for AIFlow Enterprise v3.0.

Calculates composite customer health scores (0 - 100) based on login frequency, feature adoption,
AI token usage, support ticket frequency, team growth, and billing history.
"""

from dataclasses import dataclass
import logging
from typing import Any, Dict

logger = logging.getLogger(__name__)


@dataclass
class CustomerMetrics:
    logins_last_30d: int
    features_active_count: int
    ai_tokens_used_30d: int
    open_support_tickets: int
    team_members_count: int
    is_payment_past_due: bool = False


class CustomerHealthEngine:
    """Calculates AI-driven customer health scores and churn risk indicators."""

    def calculate_health_score(self, tenant_id: str, metrics: CustomerMetrics) -> Dict[str, Any]:
        """Compute 0 - 100 customer health score."""
        score = 100

        # Login Frequency
        if metrics.logins_last_30d < 5:
            score -= 25
        elif metrics.logins_last_30d < 15:
            score -= 10

        # Feature Adoption
        if metrics.features_active_count < 2:
            score -= 20

        # Open Support Tickets
        if metrics.open_support_tickets > 3:
            score -= 15

        # Payment Past Due Penalty
        if metrics.is_payment_past_due:
            score -= 30

        final_score = max(0, min(100, score))
        risk_level = "low"
        if final_score < 40:
            risk_level = "high_churn_risk"
        elif final_score < 70:
            risk_level = "medium"

        logger.info("Calculated Health Score [%d/100] Risk [%s] for tenant '%s'", final_score, risk_level, tenant_id)
        return {
            "tenant_id": tenant_id,
            "health_score": final_score,
            "risk_level": risk_level,
            "logins_30d": metrics.logins_last_30d,
            "active_features": metrics.features_active_count,
        }


customer_health_engine = CustomerHealthEngine()
