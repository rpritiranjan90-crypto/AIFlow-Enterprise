import pytest
from app.ai.self_evolving_dag import SelfEvolvingDAGEngine
from app.security.zkp_privacy_protocol import ZeroKnowledgePrivacyProtocol


def test_self_evolving_dag_optimization():
    engine = SelfEvolvingDAGEngine()
    current_dag = {
        "id": "wf_finance_01",
        "nodes": [
            {"id": "node1", "type": "webhook"},
            {"id": "node2", "type": "llm_agent"},
            {"id": "node3", "type": "vector_search"},
        ],
    }
    telemetry = {"avg_latency_ms": 1450}

    result = engine.optimize_dag_topology(current_dag, telemetry)
    assert result["autonomously_deployed"] is True
    assert result["performance_gain"]["previous_latency_ms"] == 1450
    assert result["performance_gain"]["projected_latency_ms"] < 1450
    assert result["optimized_dag"]["nodes"][1]["execution_mode"] == "PARALLEL"


def test_zkp_privacy_protocol():
    zkp = ZeroKnowledgePrivacyProtocol()
    secret_payload = {"revenue_usd": 45000000, "credit_score": 820}
    statement = "Tenant revenue exceeds $10M and credit score is above 750"

    proof = zkp.generate_zkp_proof(secret_payload, statement)
    assert proof["zero_data_revealed"] is True
    assert "zkp-" in proof["proof_id"]

    verification = zkp.verify_zkp_proof(proof)
    assert verification["is_valid"] is True
    assert verification["raw_data_privacy_guaranteed"] is True
