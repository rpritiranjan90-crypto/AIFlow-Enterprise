export interface RegionRecord {
  id: string;
  name: string;
  code: string;
  isPrimary: boolean;
  status: 'healthy' | 'degraded' | 'maintenance';
}

export interface ClusterRecord {
  id: string;
  name: string;
  regionId: string;
  provider: string;
  nodesCount: number;
  k8sVersion: string;
  status: 'active' | 'draining' | 'failed';
}

export interface DeploymentRecord {
  id: string;
  releaseVersion: string;
  strategy: string;
  status: 'in_progress' | 'succeeded' | 'rolled_back';
  createdAt: string;
}

export interface BackupRecord {
  id: string;
  workspaceId: string;
  backupType: string;
  sizeBytes: number;
  status: 'completed' | 'failed' | 'in_progress';
  createdAt: string;
}

export interface FeatureFlagRecord {
  id: string;
  flagKey: string;
  isEnabled: boolean;
  description: string;
  percentageRollout: number;
}

export interface CloudMetricsRecord {
  totalClusters: number;
  totalNodes: number;
  globalTrafficRps: number;
  avgRegionLatencyMs: number;
  cpuUtilizationPct: number;
  memoryUtilizationPct: number;
  activeCanaryDeployments: number;
}
