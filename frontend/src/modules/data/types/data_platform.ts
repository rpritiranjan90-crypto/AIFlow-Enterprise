export interface DatasetItem {
  id: string;
  name: string;
  schemaJson: string;
  storageType: string;
  rowCount: number;
  sizeBytes: number;
  createdAt: string;
}

export interface DataPipelineItem {
  id: string;
  name: string;
  schedule: string;
  status: string;
  createdAt: string;
}

export interface CatalogEntryItem {
  id: string;
  name: string;
  description?: string;
  owner: string;
  tagsJson: string;
  piiFlag: boolean;
  createdAt: string;
}

export interface QualityMetricItem {
  id: string;
  datasetId: string;
  completenessScore: number;
  validityScore: number;
  freshnessSec: number;
  status: string;
  checkedAt: string;
}

export interface SemanticMetricItem {
  id: string;
  name: string;
  measureSql: string;
  dimensionName: string;
  category: string;
  createdAt: string;
}
