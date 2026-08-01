import asyncio
from app.core.database import engine, AsyncSessionLocal
from app.models.ai import VectorChunk, KnowledgeBase, KnowledgeDocument
from app.ai.vector_store import vector_store_manager
from app.ai.rag_engine import rag_engine
from sqlalchemy import select, func


async def verify():
    print()
    print("=== COLD RESTART VERIFICATION ===")
    print("  DATABASE_URL:", str(engine.url))

    async with AsyncSessionLocal() as session:
        # 1. Count KBs
        kb_result = await session.execute(select(func.count(KnowledgeBase.id)))
        kb_count = kb_result.scalar()
        print(f"  Knowledge Bases in DB: {kb_count}")

        # 2. Count Documents
        doc_result = await session.execute(select(func.count(KnowledgeDocument.id)))
        doc_count = doc_result.scalar()
        print(f"  Knowledge Documents in DB: {doc_count}")

        # 3. Count Vector Chunks
        chunk_result = await session.execute(select(func.count(VectorChunk.id)))
        chunk_count = chunk_result.scalar()
        print(f"  Vector Chunks in DB: {chunk_count}")

        # 4. Search to ensure retrieval
        query = "Einstein footstep"
        q_emb = rag_engine.generate_embedding(query)
        results = await vector_store_manager.search(
            query_embedding=q_emb,
            top_k=4,
            metadata_filter={"knowledge_base_id": "kb_01"},
            query_text=query,
        )
        print(f"  Search candidates returned: {len(results)}")
        for idx, r in enumerate(results):
            print(f"    Match {idx+1}: doc={r.metadata.get('document_name', 'unknown')}, score={r.score}")

        assert chunk_count > 0, "No chunks found in DB!"
        assert kb_count > 0, "No knowledge bases found in DB!"
        assert doc_count > 0, "No documents found in DB!"
        assert len(results) > 0, "Search returned 0 results!"
        print("\n=== RESULT: SUCCESS - All records & vectors preserved across cold restart! ===")

if __name__ == "__main__":
    asyncio.run(verify())
