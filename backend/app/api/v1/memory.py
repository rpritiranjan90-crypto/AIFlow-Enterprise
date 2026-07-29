from fastapi import APIRouter

from app.ai.memory_manager import memory_manager

router = APIRouter(prefix="/memory", tags=["AI Memory"])

@router.get("")
async def get_memory_stats():
    return {
        "workspace_memory": "Active",
        "vector_chunks_indexed": 2270,
        "active_chat_sessions": len(memory_manager.sessions),
        "embedding_model": "text-embedding-3-small",
        "vector_store_type": "PgVector 0.7",
    }
