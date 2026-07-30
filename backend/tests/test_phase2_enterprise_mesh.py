import pytest
from app.compliance.eu_ai_act_engine import EUAIActComplianceEngine
from app.cloud.multi_region_mesh import MultiRegionMeshManager


def test_eu_ai_act_risk_classification():
    engine = EUAIActComplianceEngine()

    # Test High Risk System (Financial / Credit Scoring)
    high_risk_eval = engine.classify_ai_system_risk({"domain": "credit_scoring", "autonomous_financial": True})
    assert high_risk_eval["risk_level"] == "HIGH_RISK"
    assert high_risk_eval["compliance_status"] == "STRICT_CONFORMITY_REQUIRED"
    assert high_risk_eval["mandatory_controls"]["risk_management_system"] is True

    # Test Minimal Risk System
    minimal_risk_eval = engine.classify_ai_system_risk({"domain": "internal_search"})
    assert minimal_risk_eval["risk_level"] == "MINIMAL_RISK"
    assert minimal_risk_eval["compliance_status"] == "COMPLIANT"


def test_eu_ai_act_model_bias_audit():
    engine = EUAIActComplianceEngine()
    audit = engine.audit_model_bias_and_fairness({"sample_size": 10000, "disparity_ratio": 0.94})
    assert audit["fairness_verdict"] == "PASSED"
    assert audit["mitigation_required"] is False


def test_eu_ai_act_conformity_certificate():
    engine = EUAIActComplianceEngine()
    eval_res = engine.classify_ai_system_risk({"domain": "credit_scoring"})
    cert = engine.generate_conformity_certificate("Credit Scoring Agent v1.0", eval_res)
    assert cert["conformance_status"] == "CERTIFIED_COMPLIANT"
    assert "CE-EU-AI" in cert["certificate_id"]


def test_multi_region_mesh_routing():
    mesh = MultiRegionMeshManager()
    status = mesh.get_mesh_status()
    assert status["total_regions"] == 3
    assert status["replication_lag_ms"] < 5.0

    route_eu = mesh.route_request_optimal_region("Frankfurt, Germany")
    assert route_eu["assigned_region"] == "europe-west1"
    assert route_eu["cloud_provider"] == "GCP"

    route_us = mesh.route_request_optimal_region("New York, USA")
    assert route_us["assigned_region"] == "us-east-1"
    assert route_us["cloud_provider"] == "AWS"
