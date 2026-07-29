export interface ExecutionNodeRecord {
  id: string;
  executionId: string;
  nodeId: string;
  nodeName: string;
  nodeType: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped' | 'retrying';
  startedAt?: string;
  finishedAt?: string;
  durationMs: number;
  inputJson?: string;
  outputJson?: string;
  errorMessage?: string;
  retryCount: number;
}

export interface ExecutionLogRecord {
  id: string;
  executionId: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';
  message: string;
  timestamp: string;
}

export interface ExecutionDetail {
  id: string;
  workflowId: string;
  workspaceId: string;
  status: 'queued' | 'waiting' | 'running' | 'completed' | 'failed' | 'cancelled' | 'retrying';
  triggerType: 'manual' | 'webhook' | 'schedule' | 'event';
  startedAt: string;
  finishedAt?: string;
  durationMs: number;
  errorMessage?: string;
  createdAt: string;
  nodes: ExecutionNodeRecord[];
  logs: ExecutionLogRecord[];
}

export interface WsExecutionMessage {
  type: 'EXECUTION_STARTED' | 'NODE_STARTED' | 'NODE_FINISHED' | 'EXECUTION_COMPLETED' | 'EXECUTION_FAILED';
  execution_id?: string;
  node_id?: string;
  node_name?: string;
  status?: string;
  duration_ms?: number;
  output?: any;
  error_message?: string;
  plan_ids?: string[];
}
