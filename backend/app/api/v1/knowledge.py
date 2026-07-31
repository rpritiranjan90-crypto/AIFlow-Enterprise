from datetime import datetime, timezone
from typing import List, Optional
import uuid

from fastapi import APIRouter, File, Form, UploadFile, HTTPException

from app.ai.rag_engine import rag_engine
from app.monitoring.business_metrics import BusinessMetrics
from app.schemas.ai import (
    CitationItem,
    DocumentItemResponse,
    DocumentUploadResponse,
    KnowledgeBaseCreateRequest,
    KnowledgeBaseResponse,
    VectorSearchRequest,
    VectorSearchResponse,
)

router = APIRouter(tags=["Knowledge Bases"])

mock_kbs: List[KnowledgeBaseResponse] = [
    KnowledgeBaseResponse(
        id="kb_01",
        workspace_id="ws_prod_01",
        name="Enterprise Architecture & Security",
        description="Core SOC2 compliance guidelines, VPC topologies, and database schemas",
        tags="Engineering,Security",
        document_count=2,
        vector_count=70,
        created_at=datetime.now(timezone.utc),
    ),
    KnowledgeBaseResponse(
        id="kb_02",
        workspace_id="ws_prod_01",
        name="Sales Playbook & Product Specs",
        description="Pricing tier breakdown, competitive battlecards, and SLA commitments",
        tags="Sales,Product",
        document_count=1,
        vector_count=18,
        created_at=datetime.now(timezone.utc),
    ),
]

mock_documents: List[DocumentItemResponse] = [
    DocumentItemResponse(
        id="doc_arch_01",
        knowledge_base_id="kb_01",
        file_name="AIFlow_Enterprise_Architecture.pdf",
        file_type="pdf",
        chunk_count=42,
        status="indexed",
        created_at=datetime.now(timezone.utc),
    ),
    DocumentItemResponse(
        id="doc_soc2_01",
        knowledge_base_id="kb_01",
        file_name="SOC2_Compliance_Security_Guardrails.docx",
        file_type="docx",
        chunk_count=28,
        status="indexed",
        created_at=datetime.now(timezone.utc),
    ),
    DocumentItemResponse(
        id="doc_pricing_01",
        knowledge_base_id="kb_02",
        file_name="Enterprise_Pricing_Tier_Battlecard.pdf",
        file_type="pdf",
        chunk_count=18,
        status="indexed",
        created_at=datetime.now(timezone.utc),
    ),
]

@router.get("/knowledge-bases", response_model=List[KnowledgeBaseResponse])
async def list_knowledge_bases():
    return mock_kbs

@router.post("/knowledge-bases", response_model=KnowledgeBaseResponse)
async def create_knowledge_base(body: KnowledgeBaseCreateRequest):
    new_kb = KnowledgeBaseResponse(
        id=f"kb_{uuid.uuid4().hex[:6]}",
        workspace_id="ws_prod_01",
        name=body.name,
        description=body.description,
        tags=body.tags or "General",
        document_count=0,
        vector_count=0,
        created_at=datetime.now(timezone.utc),
    )
    mock_kbs.append(new_kb)
    return new_kb

@router.get("/documents", response_model=List[DocumentItemResponse])
async def list_documents(knowledge_base_id: Optional[str] = None):
    if knowledge_base_id:
        return [doc for doc in mock_documents if doc.knowledge_base_id == knowledge_base_id]
    return mock_documents

@router.post("/documents/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    knowledge_base_id: Optional[str] = Form("kb_01")
):
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="Invalid file upload payload")

    try:
        content_bytes = await file.read()
        try:
            content_text = content_bytes.decode("utf-8")
        except UnicodeDecodeError:
            content_text = content_bytes.decode("latin-1", errors="ignore")

        if not content_text.strip():
            content_text = f"Document content for file {file.filename}. Automatic text extraction completed."

        doc_id = f"doc_{uuid.uuid4().hex[:8]}"
        file_ext = file.filename.rsplit('.', 1)[-1].lower() if '.' in file.filename else "txt"
        target_kb_id = knowledge_base_id or "kb_01"

        chunks_count = await rag_engine.ingest_document(
            document_id=doc_id,
            document_name=file.filename,
            content=content_text,
            file_type=file_ext,
            knowledge_base_id=target_kb_id,
        )

        now = datetime.now(timezone.utc)
        doc_item = DocumentItemResponse(
            id=doc_id,
            knowledge_base_id=target_kb_id,
            file_name=file.filename,
            file_type=file_ext,
            chunk_count=chunks_count,
            status="indexed",
            created_at=now,
        )
        mock_documents.insert(0, doc_item)

        for kb in mock_kbs:
            if kb.id == target_kb_id:
                kb.document_count += 1
                kb.vector_count += chunks_count
                break

        try:
            BusinessMetrics().record_file_upload(file_type=file_ext, status="success")
        except Exception:
            pass

        return DocumentUploadResponse(
            id=doc_id,
            file_name=file.filename,
            status="indexed",
            chunks_created=chunks_count,
            knowledge_base_id=target_kb_id,
            message=f"Successfully chunked and indexed '{file.filename}' into vector store ({chunks_count} chunks created).",
            created_at=now,
        )
    except Exception as exc:
        try:
            BusinessMetrics().record_file_upload(file_type="unknown", status="error")
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"Failed to process document upload: {str(exc)}")

@router.post("/search", response_model=VectorSearchResponse)
async def search_vector_memory(body: VectorSearchRequest):
    citations = await rag_engine.search_vector_memory(
        query=body.query,
        knowledge_base_id=body.knowledge_base_id,
        top_k=body.top_k,
    )

    formatted_citations = []
    for cit in citations:
        formatted_citations.append(
            CitationItem(
                document_name=cit.document_name,
                chunk_id=cit.id,
                score=round(cit.score, 2),
                text=cit.content,
            )
        )

    return VectorSearchResponse(query=body.query, results=formatted_citations)
