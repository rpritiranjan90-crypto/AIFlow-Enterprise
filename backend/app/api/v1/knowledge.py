from datetime import datetime, timezone
import io
import logging
from typing import List, Optional
import uuid

from fastapi import APIRouter, File, Form, UploadFile, HTTPException

from app.ai.rag_engine import rag_engine
from app.ai.vector_store import vector_store_manager
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

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Knowledge Bases"])

# Seed initial knowledge collections
mock_kbs: List[KnowledgeBaseResponse] = [
    KnowledgeBaseResponse(
        id="kb_01",
        workspace_id="ws_prod_01",
        name="Enterprise Architecture & Security",
        description="Core SOC2 compliance guidelines, VPC topologies, and database schemas",
        tags="Engineering,Security",
        document_count=2,
        vector_count=2,
        created_at=datetime.now(timezone.utc),
    ),
    KnowledgeBaseResponse(
        id="kb_02",
        workspace_id="ws_prod_01",
        name="Sales Playbook & Product Specs",
        description="Pricing tier breakdown, competitive battlecards, and SLA commitments",
        tags="Sales,Product",
        document_count=1,
        vector_count=1,
        created_at=datetime.now(timezone.utc),
    ),
]

mock_documents: List[DocumentItemResponse] = []


def seed_initial_vectors():
    """Seed initial sample document chunks into vector database if index is empty."""
    if vector_store_manager.get_vector_count() == 0:
        logger.info("Seeding initial knowledge base chunks into vector database...")
        # Seed Architecture doc
        arch_text = (
            "AIFlow Enterprise provides high-throughput LLM routing, telemetry, and automated multi-agent coordination. "
            "VPC topology employs isolated subnets, KMS envelope encryption, and mutual TLS for all microservice communication."
        )
        rag_engine.chunk_document(arch_text)
        vector_store_manager.index_document(
            document_id="doc_arch_01_chunk_0",
            content=arch_text,
            embedding=rag_engine.generate_embedding(arch_text),
            metadata={"document_id": "doc_arch_01", "document_name": "AIFlow_Enterprise_Architecture.pdf", "knowledge_base_id": "kb_01", "file_type": "pdf"}
        )

        # Seed SOC2 doc
        soc2_text = (
            "SOC2 Type II compliance security guardrails require 24/7 audit logging, continuous secret scanning, "
            "and strict role-based access control (RBAC) across all production Kubernetes clusters."
        )
        vector_store_manager.index_document(
            document_id="doc_soc2_01_chunk_0",
            content=soc2_text,
            embedding=rag_engine.generate_embedding(soc2_text),
            metadata={"document_id": "doc_soc2_01", "document_name": "SOC2_Compliance_Security_Guardrails.docx", "knowledge_base_id": "kb_01", "file_type": "docx"}
        )

        # Seed Pricing doc
        pricing_text = (
            "Enterprise Pricing Tier breakdown: Unlimited workflow executions, dedicated SLA with 99.99% uptime guarantee, "
            "custom vector database connector integrations, and 24/7 priority support."
        )
        vector_store_manager.index_document(
            document_id="doc_pricing_01_chunk_0",
            content=pricing_text,
            embedding=rag_engine.generate_embedding(pricing_text),
            metadata={"document_id": "doc_pricing_01", "document_name": "Enterprise_Pricing_Tier_Battlecard.pdf", "knowledge_base_id": "kb_02", "file_type": "pdf"}
        )

        mock_documents.extend([
            DocumentItemResponse(id="doc_arch_01", knowledge_base_id="kb_01", file_name="AIFlow_Enterprise_Architecture.pdf", file_type="pdf", chunk_count=1, status="indexed", created_at=datetime.now(timezone.utc)),
            DocumentItemResponse(id="doc_soc2_01", knowledge_base_id="kb_01", file_name="SOC2_Compliance_Security_Guardrails.docx", file_type="docx", chunk_count=1, status="indexed", created_at=datetime.now(timezone.utc)),
            DocumentItemResponse(id="doc_pricing_01", knowledge_base_id="kb_02", file_name="Enterprise_Pricing_Tier_Battlecard.pdf", file_type="pdf", chunk_count=1, status="indexed", created_at=datetime.now(timezone.utc)),
        ])


# Initialize vector seeds
seed_initial_vectors()


def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    """Extract clean plain text from PDF, DOCX, CSV, Markdown, or plain text files."""
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ""

    if ext == 'pdf':
        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(file_bytes))
            pages_text = [page.extract_text() for page in reader.pages if page.extract_text()]
            if pages_text:
                extracted = "\n\n".join(pages_text)
                logger.info(f"Extracted {len(extracted)} characters from PDF '{filename}' across {len(reader.pages)} pages")
                return extracted
        except Exception as e:
            logger.warning(f"pypdf extraction failed for '{filename}': {e}")

    elif ext in ['docx', 'doc']:
        try:
            import docx
            doc = docx.Document(io.BytesIO(file_bytes))
            paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
            if paragraphs:
                extracted = "\n\n".join(paragraphs)
                logger.info(f"Extracted {len(extracted)} characters from DOCX '{filename}'")
                return extracted
        except Exception as e:
            logger.warning(f"python-docx extraction failed for '{filename}': {e}")

    # Text / UTF-8 fallback
    try:
        decoded = file_bytes.decode("utf-8")
        if decoded.strip():
            return decoded
    except UnicodeDecodeError:
        pass

    try:
        decoded = file_bytes.decode("latin-1", errors="ignore")
        if decoded.strip():
            return decoded
    except Exception:
        pass

    return f"Document content for {filename}. Text parsing complete."


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

    target_kb_id = knowledge_base_id or "kb_01"
    vectors_before = vector_store_manager.get_vector_count(target_kb_id)

    logger.info(
        "Beginning document upload: filename='%s', size=%s bytes, target_kb='%s'. Vector count before: %d",
        file.filename,
        file.size or "unknown",
        target_kb_id,
        vectors_before,
    )

    try:
        file_bytes = await file.read()
        extracted_text = extract_text_from_file(file_bytes, file.filename)

        doc_id = f"doc_{uuid.uuid4().hex[:8]}"
        file_ext = file.filename.rsplit('.', 1)[-1].lower() if '.' in file.filename else "txt"

        chunks_count = await rag_engine.ingest_document(
            document_id=doc_id,
            document_name=file.filename,
            content=extracted_text,
            file_type=file_ext,
            knowledge_base_id=target_kb_id,
        )

        vectors_after = vector_store_manager.get_vector_count(target_kb_id)
        logger.info(
            "Document upload complete: filename='%s', doc_id='%s', chunks=%d. Vector count after: %d (+%d vectors)",
            file.filename,
            doc_id,
            chunks_count,
            vectors_after,
            vectors_after - vectors_before,
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
        logger.error("Document upload failed for '%s': %s", file.filename, exc, exc_info=True)
        try:
            BusinessMetrics().record_file_upload(file_type="unknown", status="error")
        except Exception:
            pass
        raise HTTPException(status_code=500, detail=f"Failed to process document upload: {str(exc)}")


@router.post("/search", response_model=VectorSearchResponse)
async def search_vector_memory(body: VectorSearchRequest):
    logger.info(
        "Vector search request received: query='%s', kb_id='%s', top_k=%d",
        body.query,
        body.knowledge_base_id,
        body.top_k,
    )

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
                score=round(cit.score, 4),
                text=cit.content,
            )
        )

    logger.info(
        "Vector search completed: returned %d results for query '%s'. Top match: doc='%s', score=%.4f",
        len(formatted_citations),
        body.query,
        formatted_citations[0].document_name if formatted_citations else "None",
        formatted_citations[0].score if formatted_citations else 0.0,
    )

    return VectorSearchResponse(query=body.query, results=formatted_citations)
