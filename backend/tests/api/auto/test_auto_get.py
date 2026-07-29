import pytest
from fastapi.testclient import TestClient
from app.main import app
client = TestClient(app)

def test_auto_get_root():
    try:
        client.get("/")
    except Exception:
        pass
