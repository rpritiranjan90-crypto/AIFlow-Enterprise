export interface KPIItem {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  targetValue: number;
  status: 'on_track' | 'warning' | 'critical';
  updatedAt: string;
}

export interface RecommendationItem {
  id: string;
  category: string;
  title: string;
  impactUsd: number;
  confidenceScore: number;
  status: string;
}

export interface AnomalyItem {
  id: string;
  metricName: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  detectedAt: string;
}

export interface DigitalTwinItem {
  id: string;
  name: string;
  entityType: string;
  healthScore: number;
  createdAt: string;
}

export interface ExecutiveReportItem {
  id: string;
  title: string;
  reportType: string;
  reportUrl: string;
  createdAt: string;
}
