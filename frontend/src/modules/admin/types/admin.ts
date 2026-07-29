export interface SystemMetrics {
  status: string;
  uptimeSeconds: number;
  activeWorkers: number;
  queueDepth: number;
  memoryUsageMb: number;
  cpuPercent: number;
  requestsPerSec: number;
  activeExecutions: number;
}

export interface AdminAuditItem {
  id: string;
  user: string;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  ipAddress: string;
  timestamp: string;
}

export interface CredentialVaultRecord {
  id: string;
  workspaceId: string;
  name: string;
  credentialType: string;
  maskedValue: string;
  isRotated: boolean;
  lastUsedAt?: string;
  createdAt: string;
}

export interface EnterpriseQuotaRecord {
  id: string;
  organizationId: string;
  maxWorkflows: number;
  maxExecutionsPerMonth: number;
  maxStorageGb: number;
  maxTokensPerMonth: number;
  usedWorkflows: number;
  usedExecutionsMonth: number;
  createdAt: string;
}
