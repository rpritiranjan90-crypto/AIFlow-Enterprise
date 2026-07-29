import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text

from app.core.database import Base


class PromptTemplate(Base):
    __tablename__ = "prompt_templates"

    id = Column(String, primary_key=True, default=lambda: f"pmpt_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id"), index=True, nullable=False, default="ws_prod_01")
    name = Column(String, nullable=False)
    category = Column(String, default="General") # Agent, Summarizer, Classifier, System
    system_prompt = Column(Text, nullable=False)
    user_prompt = Column(Text, nullable=True)
    variables_json = Column(Text, nullable=True) # JSON list of dynamic variables
    version = Column(String, default="1.0.0")
    created_at = Column(DateTime, default=datetime.utcnow)

class KnowledgeBase(Base):
    __tablename__ = "knowledge_bases"

    id = Column(String, primary_key=True, default=lambda: f"kb_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id"), index=True, nullable=False, default="ws_prod_01")
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    tags = Column(String, default="Documentation,Engineering")
    document_count = Column(Integer, default=0)
    vector_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    id = Column(String, primary_key=True, default=lambda: f"doc_{uuid.uuid4().hex[:12]}")
    knowledge_base_id = Column(String, ForeignKey("knowledge_bases.id"), nullable=False)
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False) # PDF, DOCX, TXT, MD, CSV
    file_size = Column(Integer, default=0)
    status = Column(String, default="indexed", index=True) # uploaded, processing, indexed, failed
    chunk_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class VectorChunk(Base):
    __tablename__ = "vector_chunks"

    id = Column(String, primary_key=True, default=lambda: f"vec_{uuid.uuid4().hex[:12]}")
    document_id = Column(String, ForeignKey("knowledge_documents.id"), nullable=False)
    knowledge_base_id = Column(String, ForeignKey("knowledge_bases.id"), nullable=False)
    content = Column(Text, nullable=False)
    metadata_json = Column(Text, nullable=True)
    embedding_vector = Column(Text, nullable=True) # JSON float array string

class AgentSession(Base):
    __tablename__ = "agent_sessions"

    id = Column(String, primary_key=True, default=lambda: f"sess_{uuid.uuid4().hex[:12]}")
    workspace_id = Column(String, ForeignKey("workspaces.id"), index=True, nullable=False, default="ws_prod_01")
    agent_name = Column(String, nullable=False, default="Autonomous Enterprise Assistant")
    model = Column(String, default="gpt-4o")
    status = Column(String, default="idle", index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(String, primary_key=True, default=lambda: f"msg_{uuid.uuid4().hex[:12]}")
    session_id = Column(String, ForeignKey("agent_sessions.id"), index=True, nullable=False)
    role = Column(String, nullable=False) # user, assistant, system, tool
    content = Column(Text, nullable=False)
    citations_json = Column(Text, nullable=True)
    tokens_used = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
