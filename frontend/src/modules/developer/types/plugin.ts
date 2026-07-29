export interface PluginItem {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  category: string;
  license: string;
  status: 'verified' | 'pending' | 'rejected';
  isOfficial?: boolean;
  isInstalled?: boolean;
  createdAt: string;
}

export interface PluginMetricsItem {
  id: string;
  pluginId: string;
  executionCount: number;
  avgLatencyMs: number;
  errorRate: number;
}
