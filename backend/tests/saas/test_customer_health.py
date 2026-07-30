"""
Unit tests for Customer Health Scoring Engine.
"""

from app.saas.customer_health_engine import CustomerMetrics, customer_health_engine


def test_customer_health_scoring():
    # Healthy Tenant
    healthy_metrics = CustomerMetrics(
        logins_last_30d=45,
        features_active_count=6,
        ai_tokens_used_30d=500000,
        open_support_tickets=0,
        team_members_count=12,
        is_payment_past_due=False,
    )
    res_healthy = customer_health_engine.calculate_health_score("tenant_good", healthy_metrics)
    assert res_healthy["health_score"] == 100
    assert res_healthy["risk_level"] == "low"

    # High Risk Tenant
    at_risk_metrics = CustomerMetrics(
        logins_last_30d=2,
        features_active_count=1,
        ai_tokens_used_30d=1000,
        open_support_tickets=5,
        team_members_count=2,
        is_payment_past_due=True,
    )
    res_risk = customer_health_engine.calculate_health_score("tenant_risk", at_risk_metrics)
    assert res_risk["health_score"] < 40
    assert res_risk["risk_level"] == "high_churn_risk"
