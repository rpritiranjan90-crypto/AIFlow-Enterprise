/**
 * Shared TypeScript definitions for AIFlow Enterprise
 */

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isActive: boolean;
  isSuperuser: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  avatarUrl?: string;
  billingEmail: string;
  planType: 'free' | 'starter' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Workspace {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  description?: string;
  avatarUrl?: string;
  memberCount?: number;
  role?: 'owner' | 'admin' | 'member' | 'viewer';
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface AuthUserResponse {
  user: User;
  activeWorkspace: Workspace;
  workspaces: Workspace[];
  tokens: AuthTokens;
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string | number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  description?: string;
}

export interface WorkflowSummary {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused' | 'failed';
  triggerType: 'webhook' | 'schedule' | 'event' | 'manual';
  lastRunAt?: string;
  executionCount: number;
  successRate: number;
  createdAt: string;
}

export interface IntegrationApp {
  id: string;
  name: string;
  category: 'ai' | 'crm' | 'dev' | 'database' | 'communication' | 'storage' | 'finance';
  description: string;
  iconName: string;
  isConnected: boolean;
  authType: 'oauth2' | 'api_key' | 'webhook';
  popularity: number;
}
