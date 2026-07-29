export interface ConnectorItem {
  id: string;
  name: string;
  category: string;
  provider: string;
  authType: string;
  iconName: string;
  version: string;
  description: string;
  isFeatured?: boolean;
  isInstalled?: boolean;
}

export interface InstalledConnectorItem {
  id: string;
  workspaceId: string;
  connectorId: string;
  name: string;
  status: 'connected' | 'expired' | 'error' | 'disconnected';
  health: 'healthy' | 'warning' | 'degraded';
  credentialId?: string;
  installedAt: string;
}

export interface WorkflowTemplateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  requiredConnectors: string[];
  installCount: number;
  createdAt: string;
}
