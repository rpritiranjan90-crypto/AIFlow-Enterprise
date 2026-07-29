import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def get_auth_headers():
    login_resp = client.post(
        "/api/v1/auth/login",
        json={"email": "alex.architect@enterprise.io", "password": "secure"}
    )
    token = login_resp.json().get("access_token")
    return {"Authorization": f"Bearer {token}"}

def test_list_workflows():
    headers = get_auth_headers()
    response = client.get("/api/v1/workflows", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_create_workflow():
    headers = get_auth_headers()
    response = client.post(
        "/api/v1/workflows",
        headers=headers,
        json={
            "name": "Test Workflow",
            "description": "Integration test workflow",
            "tags": "test"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Workflow"
    assert "id" in data

def test_get_workflow_by_id():
    headers = get_auth_headers()
    response = client.get("/api/v1/workflows/wf_demo_999", headers=headers)
    assert response.status_code in (200, 404)  # depends on if wf_demo_999 exists in mock db

def test_unauthorized_access():
    response = client.get("/api/v1/workflows")
    assert response.status_code in (401, 403)
