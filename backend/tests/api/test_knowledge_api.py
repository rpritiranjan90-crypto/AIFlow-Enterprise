import pytest
from fastapi.testclient import TestClient
import os

from app.main import app

@pytest.fixture
def client():
    # Using 'with TestClient(app)' guarantees that startup lifespan events
    # (including pgvector enabling and Base.metadata.create_all) are executed.
    with TestClient(app) as c:
        yield c


def test_list_knowledge_bases(client):
    response = client.get("/api/v1/knowledge-bases")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    assert any(kb["id"] == "kb_01" for kb in data)
    assert any(kb["id"] == "kb_02" for kb in data)


def test_create_knowledge_base(client):
    response = client.post(
        "/api/v1/knowledge-bases",
        json={"name": "Test Collection", "description": "Test description", "tags": "Test"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Collection"
    assert data["description"] == "Test description"
    assert data["id"].startswith("kb_")


def test_list_documents_empty(client):
    response = client.get("/api/v1/documents", params={"knowledge_base_id": "kb_test_none"})
    assert response.status_code == 200
    assert response.json() == []


def test_upload_document_success(client):
    file_content = b"This is some test content for security guidelines and compliance guidelines."
    response = client.post(
        "/api/v1/documents/upload",
        data={"knowledge_base_id": "kb_01"},
        files={"file": ("test_file.txt", file_content, "text/plain")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["file_name"] == "test_file.txt"
    assert data["status"] == "indexed"
    assert data["chunks_created"] > 0

    # Retrieve documents and check that the new doc exists
    doc_response = client.get("/api/v1/documents", params={"knowledge_base_id": "kb_01"})
    assert doc_response.status_code == 200
    doc_data = doc_response.json()
    assert len(doc_data) > 0
    assert any(doc["file_name"] == "test_file.txt" for doc in doc_data)


def test_vector_search_success(client):
    # Pre-upload a document first to search
    file_content = b"The main idea of this document is quantum computing and supercomputers."
    upload_resp = client.post(
        "/api/v1/documents/upload",
        data={"knowledge_base_id": "kb_02"},
        files={"file": ("quantum.txt", file_content, "text/plain")}
    )
    assert upload_resp.status_code == 200

    # Run vector search
    response = client.post(
        "/api/v1/search",
        json={"query": "quantum computing", "knowledge_base_id": "kb_02", "top_k": 2}
    )
    assert response.status_code == 200
    data = response.json()
    assert "query" in data
    assert len(data["results"]) > 0
    assert data["results"][0]["document_name"] == "quantum.txt"
