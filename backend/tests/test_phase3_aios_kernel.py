import pytest
from app.ai.on_edge_quantization import OnEdgeQuantizationEngine
from app.security.quantum_audit_trail import QuantumResistantAuditTrail


def test_on_edge_quantization_loading():
    engine = OnEdgeQuantizationEngine()
    session = engine.optimize_and_load_local_model("Llama-3-8B-Instruct", "GGUF_Q4_K_M")
    assert session["status"] == "READY_LOCAL_INFERENCE"
    assert session["zero_cloud_leakage"] is True
    assert session["quantization_format"] == "GGUF_Q4_K_M"

    output = engine.execute_local_inference("Summarize financial fraud risk", session)
    assert output["latency_ms"] < 50
    assert output["generated_tokens"] > 0


def test_quantum_resistant_audit_trail():
    trail = QuantumResistantAuditTrail()

    # Append events
    block1 = trail.append_audit_event("CISO_AGENT", "REVOKE_API_KEY", {"key_id": "key_9940"})
    block2 = trail.append_audit_event("CEO_AGENT", "APPROVE_ACQUISITION", {"amount_usd": 5000000})

    assert block1["index"] == 1
    assert block2["index"] == 2
    assert block2["previous_hash"] == block1["quantum_hash"]

    # Verify integrity
    verification = trail.verify_chain_integrity()
    assert verification["is_valid"] is True
    assert verification["total_blocks_verified"] == 2
