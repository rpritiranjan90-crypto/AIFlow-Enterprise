from datetime import datetime
from typing import List

from fastapi import APIRouter, File, UploadFile

from app.ai.rag_engine import rag_engine
from app.schemas.ai import (
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
        document_count=14,
        vector_count=1420,
        created_at=datetime.utcnow(),
    ),
    KnowledgeBaseResponse(
        id="kb_02",
        workspace_id="ws_prod_01",
        name="Sales Playbook & Product Specs",
        description="Pricing tier breakdown, competitive battlecards, and SLA commitments",
        tags="Sales,Product",
        document_count=8,
        vector_count=850,
        created_at=datetime.utcnow(),
    ),
]

@router.get("/knowledge-bases", response_model=List[KnowledgeBaseResponse])
async def list_knowledge_bases():
    return mock_kbs

@router.post("/knowledge-bases", response_model=KnowledgeBaseResponse)
async def create_knowledge_base(body: KnowledgeBaseCreateRequest):
    new_kb = KnowledgeBaseResponse(
        id=f"kb_{datetime.utcnow().strftime('%M%S')}",
        workspace_id="ws_prod_01",
        name=body.name,
        description=body.description,
        tags=body.tags or "General",
        document_count=0,
        vector_count=0,
        created_at=datetime.utcnow(),
    )
    mock_kbs.append(new_kb)
    return new_kb

@router.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    return {
        "file_name": file.filename,
        "status": "indexed",
        "chunks_created": 42,
        "message": f"Successfully chunked and indexed {file.filename} into vector store.",
    }

@router.post("/search", response_model=VectorSearchResponse)
async def search_vector_memory(body: VectorSearchRequest):
    citations = await rag_engine.search_vector_memory(
        query=body.query,
        knowledge_base_id=body.knowledge_base_id,
        top_k=body.top_k,
    )
    return VectorSearchResponse(query=body.query, results=citations)
