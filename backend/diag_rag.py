import asyncio, json

async def full_diagnostic():
    from app.core.database import engine, AsyncSessionLocal, Base
    from app.models.ai import VectorChunk
    from app.ai.rag_engine import rag_engine
    from app.ai.vector_store import vector_store_manager
    from sqlalchemy import select, func

    print()
    print("=== STEP 1: DATABASE CONFIG ===")
    print("  DATABASE_URL resolved:", str(engine.url))
    print("  Dialect:              ", engine.dialect.name)
    is_pg = engine.dialect.name == "postgresql"
    print("  Is PostgreSQL:        ", is_pg)

    print()
    print("=== STEP 2: UPLOAD SIMULATION ===")
    doc_text = "The main idea of this document is about quantum computing and AI supercomputers in 2026. Einstein footsteps AI research breakthrough. This is the main part of the document."
    chunks_inserted = await rag_engine.ingest_document(
        document_id="diag_doc_001",
        document_name="ai_test_report.pdf",
        content=doc_text,
        file_type="pdf",
        knowledge_base_id="kb_01",
    )
    print("  Chunks inserted:", chunks_inserted)

    print()
    print("=== STEP 3: SELECT COUNT(*) FROM vector_chunks ===")
    async with AsyncSessionLocal() as session:
        conn = await session.connection()
        await conn.run_sync(Base.metadata.create_all)
        result = await session.execute(select(func.count(VectorChunk.id)))
        count = result.scalar()
        print("  Total rows in vector_chunks:", count)

        print()
        print("=== STEP 4: SELECT document_name, knowledge_base_id FROM vector_chunks LIMIT 10 ===")
        rows = await session.execute(
            select(VectorChunk.document_name, VectorChunk.knowledge_base_id, VectorChunk.document_id)
        )
        for row in rows.all():
            print("  document_name=%s, kb_id=%s, doc_id=%s" % (row[0], row[1], row[2]))

    print()
    print("=== STEP 5: SEARCH EXECUTION ===")
    query = "What is the main part of the document"
    q_emb = rag_engine.generate_embedding(query)
    print("  Query embedding dim:", len(q_emb))
    print("  knowledge_base_id:   kb_01")
    print("  top_k:               4")

    results = await vector_store_manager.search(
        query_embedding=q_emb,
        top_k=4,
        metadata_filter={"knowledge_base_id": "kb_01"},
        query_text=query,
    )
    print("  Candidates returned:", len(results))
    for r in results:
        doc_label = r.metadata.get("document_name", r.document_id)
        print("    doc=%s, score=%s" % (doc_label, r.score))

    print()
    if len(results) > 0:
        print("=== RESULT: PASS - Search returns uploaded documents ===")
    else:
        print("=== RESULT: FAIL - Search returns 0 results ===")
        print("  Reason: Check dialect / fallback path / embedding mismatch")

asyncio.run(full_diagnostic())
