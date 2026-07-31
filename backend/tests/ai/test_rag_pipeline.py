"""
Comprehensive Integration & Regression Test for Production RAG Retrieval Pipeline.

Verifies end-to-end flow: Document Upload -> Text Extraction -> Vector Chunking -> Embedding Storage -> Real Semantic Search.
"""

import uuid
import pytest
from app.ai.rag_engine import rag_engine
from app.ai.vector_store import vector_store_manager


@pytest.mark.asyncio
async def test_rag_end_to_end_ingestion_and_retrieval():
    kb_id = f"kb_test_{uuid.uuid4().hex[:6]}"
    initial_vectors = await vector_store_manager.get_vector_count(kb_id)

    paper_content = (
        "Can AI Follow in Einstein's Footsteps? This research explores automated scientific discovery. "
        "AlphaFold revolutionizes 3D protein structure prediction by mapping amino acid sequences to atomic coordinates. "
        "GraphCast provides medium-range global weather forecasting using graph neural networks. "
        "Category C discovery represents autonomous AI hypothesis generation and experimental validation without human intervention."
    )

    doc_id = f"doc_{uuid.uuid4().hex[:8]}"
    doc_name = "ai_test_report.pdf"

    chunks_created = await rag_engine.ingest_document(
        document_id=doc_id,
        document_name=doc_name,
        content=paper_content,
        file_type="pdf",
        knowledge_base_id=kb_id,
    )

    assert chunks_created > 0

    vectors_after = await vector_store_manager.get_vector_count(kb_id)
    assert vectors_after == initial_vectors + chunks_created

    test_queries = [
        "What is the main idea of the paper Can AI Follow in Einstein's Footsteps?",
        "What is AlphaFold?",
        "What is GraphCast?",
        "What is Category C discovery?",
        "Summarize the uploaded paper.",
    ]

    for query in test_queries:
        citations = await rag_engine.search_vector_memory(
            query=query,
            knowledge_base_id=kb_id,
            top_k=2,
        )

        assert len(citations) > 0, f"Query '{query}' returned no citations!"
        top_citation = citations[0]

        assert top_citation.document_name == doc_name, (
            f"Query '{query}' expected doc '{doc_name}', but got '{top_citation.document_name}'!"
        )
        assert top_citation.score > 0.0, f"Query '{query}' returned 0 score!"
        assert doc_id in top_citation.id
