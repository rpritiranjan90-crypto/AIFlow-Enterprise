export interface PromptItem {
  id: string;
  name: string;
  category: string;
  systemPrompt: string;
  userPrompt?: string;
  variables: string[];
  version: string;
  createdAt: string;
}

export interface KnowledgeBaseItem {
  id: string;
  name: string;
  description: string;
  tags: string;
  documentCount: number;
  vectorCount: number;
  createdAt: string;
}

export interface Citation {
  documentName: string;
  chunkId: string;
  score: number;
  text: string;
}

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: Citation[];
  tokensUsed?: number;
  createdAt: string;
}
