"""
Comprehensive unit & integration tests for AI Platform, Multi-Provider AI Gateway,
Enterprise RAG, Vector Stores, Multi-Agent Framework, and MCP.
"""

import pytest
from app.ai.mcp_client import mcp_client
from app.ai.multi_agent import multi_agent_orchestrator
from app.ai.provider_manager import llm_provider_manager
from app.ai.rag_engine import rag_engine
from app.ai.vector_store import vector_store_manager


@pytest.mark.asyncio
async def test_ai_gateway_generation_and_fallback():
    messages = [{"role": "user", "content": "Explain enterprise microservice resilience patterns."}]
    res = await llm_provider_manager.generate_response(messages, model="gpt-4o")

    assert res["provider"] == "openai"
    assert "Enterprise Reasoning Output" in res["content"]
    assert res["tokens_used"] > 0

    # Test streaming
    chunks = []
    async for chunk in llm_provider_manager.generate_stream(messages, model="claude-3-5-sonnet"):
        chunks.append(chunk)
    assert len(chunks) > 0


@pytest.mark.asyncio
async def test_enterprise_rag_and_vector_store():
    doc_id = "doc_test_101"
    content = "AIFlow Enterprise features robust OpenTelemetry metrics, SQLAlchemy async pools, and FastAPI security."

    chunks_count = await rag_engine.ingest_document(
        document_id=doc_id,
        document_name="Architecture_Guide.pdf",
        content=content,
        file_type="pdf",
    )
    assert chunks_count > 0

    citations = await rag_engine.search_vector_memory("OpenTelemetry metrics")
    assert len(citations) > 0
    assert citations[0].document_name is not None


@pytest.mark.asyncio
async def test_multi_agent_framework_orchestration():
    res = await multi_agent_orchestrator.execute_workflow_graph("Build an automated CI/CD security pipeline")
    assert res["status"] == "completed"
    assert len(res["execution_graph"]) == 4
    assert res["total_messages"] > 0


@pytest.mark.asyncio
async def test_mcp_client_tool_discovery():
    tools = mcp_client.list_tools()
    assert len(tools) >= 2

    call_res = await mcp_client.call_tool("web_search", {"query": "AI observability"})
    assert call_res["status"] == "success"
    assert "Executed MCP Tool" in call_res["result"]
