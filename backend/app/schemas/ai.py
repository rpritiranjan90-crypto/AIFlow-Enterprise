from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class PromptCreateRequest(BaseModel):
    name: str
    category: Optional[str] = "General"
    system_prompt: str
    user_prompt: Optional[str] = None
    variables: Optional[List[str]] = []

class PromptUpdateRequest(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    system_prompt: Optional[str] = None
    user_prompt: Optional[str] = None

class PromptResponse(BaseModel):
    id: str
    workspace_id: str
    name: str
    category: str
    system_prompt: str
    user_prompt: Optional[str] = None
    variables_json: Optional[str] = None
    version: str
    created_at: datetime

    class Config:
        from_attributes = True

class KnowledgeBaseCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None
    tags: Optional[str] = "Documentation,Engineering"

class KnowledgeBaseResponse(BaseModel):
    id: str
    workspace_id: str
    name: str
    description: Optional[str] = None
    tags: str
    document_count: int
    vector_count: int
    created_at: datetime

    class Config:
        from_attributes = True

class VectorSearchRequest(BaseModel):
    query: str
    knowledge_base_id: Optional[str] = None
    top_k: int = 5

class CitationItem(BaseModel):
    document_name: str
    chunk_id: str
    score: float
    text: str

class VectorSearchResponse(BaseModel):
    query: str
    results: List[CitationItem]

class AgentChatRequest(BaseModel):
    message: str
    model: Optional[str] = "gpt-4o"
    knowledge_base_id: Optional[str] = None
    enable_tools: Optional[bool] = True

class ChatMessageResponse(BaseModel):
    id: str
    role: str
    content: str
    citations: List[CitationItem] = []
    tokens_used: int = 0
    created_at: datetime

class AgentRunResponse(BaseModel):
    session_id: str
    agent_name: str
    model: str
    reasoning_steps: List[str]
    output: str
    citations: List[CitationItem] = []
