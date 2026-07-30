import pytest
from app.financial.autonomous_revenue_engine import AutonomousRevenueEngine
from app.compliance.sox_iso_audit_engine import InstitutionalAuditEngine


def test_autonomous_provider_token_arbitrage():
    engine = AutonomousRevenueEngine()

    # Test high latency tolerance => Claude Haiku
    arb1 = engine.optimize_provider_token_arbitrage({"tokens": 1000000, "max_latency_ms": 500})
    assert "Anthropic" in arb1["selected_provider"]
    assert arb1["savings_percent"] > 50.0

    # Test low latency constraint => Local Quantized
    arb2 = engine.optimize_provider_token_arbitrage({"tokens": 50000, "max_latency_ms": 50})
    assert "Local" in arb2["selected_provider"]


def test_arr_expansion_forecasting():
    engine = AutonomousRevenueEngine()
    forecast = engine.forecast_arr_expansion({"mrr_usd": 150000, "nrr_percent": 135.0})
    assert forecast["current_arr_usd"] == 1800000
    assert forecast["projected_arr_12m_usd"] == 2430000.0
    assert forecast["ipo_readiness_score"] > 90.0


def test_institutional_audit_evidence():
    audit = InstitutionalAuditEngine()
    evidence = audit.collect_audit_evidence({
        "tls_enforced": True,
        "db_encrypted": True,
        "rbac_tier_count": 8,
        "mfa_enforced": True,
    })

    assert evidence["overall_audit_readiness_score"] == 98.6
    assert evidence["compliance_summary"]["SOX_404_Financial_Controls"] == "VERIFIED_PASSED"
    assert evidence["compliance_summary"]["ISO_27001_Information_Security"] == "VERIFIED_PASSED"
