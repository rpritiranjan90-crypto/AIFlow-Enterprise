import sys
import os
import pytest

# Add repository root to python path to locate sdk module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from sdk.python.aiflow_sdk.client import AIFlowClient


def test_aiflow_python_sdk_initialization():
    client = AIFlowClient(api_key="aiflow_live_test_key_9940", base_url="http://localhost:8000")
    assert client.api_key == "aiflow_live_test_key_9940"
    assert client.base_url == "http://localhost:8000"


def test_aiflow_python_sdk_trigger_workflow():
    client = AIFlowClient(api_key="aiflow_live_test_key_9940")
    res = client.trigger_workflow("wf_fraud_01", {"account_id": "acc_994"})
    assert res["status"] == "success"
    assert "execution_id" in res


def test_aiflow_python_sdk_health():
    client = AIFlowClient(api_key="aiflow_live_test_key_9940")
    health = client.get_system_health()
    assert health["status"] == "healthy"
