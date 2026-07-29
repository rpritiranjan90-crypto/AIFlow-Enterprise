export interface CompliancePolicyItem {
  id: string;
  name: string;
  framework: string;
  status: string;
  lastAuditAt: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  tier: string;
  commissionPct: number;
  status: string;
  createdAt: string;
}

export interface SupportTicketItem {
  id: string;
  subject: string;
  priority: string;
  slaStatus: string;
  status: string;
  createdAt: string;
}

export interface CustomerHealthItem {
  id: string;
  orgId: string;
  healthScore: number;
  churnRisk: string;
  npsScore: number;
  updatedAt: string;
}

export interface PlatformStatusItem {
  globalHealth: string;
  multiRegionClusters: number;
  activeMonitoredTenants: number;
  complianceScore: number;
  platformVersion: string;
}
