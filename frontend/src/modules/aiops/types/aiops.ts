export interface AIModelRecord {
  id: string;
  name: string;
  provider: string;
  version: string;
  contextWindow: number;
  pricingPer1kInput: number;
  pricingPer1kOutput: number;
  status: string;
}

export interface PromptEvaluationRecord {
  id: string;
  promptId: string;
  accuracyScore: number;
  completenessScore: number;
  groundednessScore: number;
  hallucinationRate: number;
  latencyMs: number;
  costUsd: number;
  overallScore: number;
  evalStatus: string;
  createdAt: string;
}

export interface CostAnalyticsRecord {
  totalSpendUsd: number;
  tokensConsumed: number;
  forecastedMonthlyUsd: number;
  spendByProvider: Record<string, number>;
  spendByAgent: Record<string, number>;
}

export interface AgentMetricsRecord {
  id: string;
  agentId: string;
  agentName: string;
  executionCount: number;
  avgRuntimeMs: number;
  successRate: number;
  toolCallsCount: number;
  tokenConsumption: number;
}

export interface RAGMetricsRecord {
  documentsIndexed: number;
  totalVectors: number;
  retrievalAccuracy: number;
  citationCoverageRate: number;
  avgSimilarityScore: number;
  failedRetrievalsCount: number;
}

export interface GovernancePolicyRecord {
  id: string;
  workspaceId: string;
  maxMonthlySpend: number;
  maxTokenLimit: number;
  requireHumanApproval: boolean;
  restrictedModels: string[];
}

export interface ApprovalRequestRecord {
  id: string;
  workflowId: string;
  workflowName: string;
  executionId: string;
  nodeName: string;
  status: 'pending' | 'approved' | 'rejected' | 'escalated' | 'timed_out';
  requestedBy: string;
  createdAt: string;
}

export interface SafetyScanRecord {
  id: string;
  sessionId: string;
  piiDetected: boolean;
  promptInjectionRisk: 'low' | 'medium' | 'high' | 'critical';
  toxicityScore: number;
  status: 'passed' | 'flagged' | 'blocked';
  createdAt: string;
}

export interface ComparisonItemRecord {
  model: string;
  provider: string;
  outputText: string;
  latencyMs: number;
  tokensUsed: number;
  costUsd: number;
  groundednessScore: number;
}
