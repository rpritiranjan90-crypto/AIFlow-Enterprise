import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { QualityMetricItem } from '../types/data_platform';

export const DataQualityPage: React.FC = () => {
  const qualityItems: QualityMetricItem[] = [
    { id: 'dq_01', datasetId: 'lakehouse_sales_orders', completenessScore: 0.998, validityScore: 0.999, freshnessSec: 12, status: 'healthy', checkedAt: '2026-07-29' },
  ];

  const columns: Column<QualityMetricItem>[] = [
    {
      key: 'datasetId',
      header: 'Dataset Target',
      render: (r) => (
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-100">{r.datasetId}</span>
        </div>
      ),
    },
    {
      key: 'completenessScore',
      header: 'Completeness',
      render: (r) => <span className="font-mono text-xs text-emerald-400 font-bold">{(r.completenessScore * 100).toFixed(1)}%</span>,
    },
    {
      key: 'validityScore',
      header: 'Validity Score',
      render: (r) => <span className="font-mono text-xs text-cyan-300 font-bold">{(r.validityScore * 100).toFixed(1)}%</span>,
    },
    {
      key: 'freshnessSec',
      header: 'Data SLA Freshness',
      render: (r) => <Badge variant="glow">{r.freshnessSec}s SLA</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Quality & Observability Dashboard"
        description="Dataset completeness scoring, validity metrics, freshness SLA tracking, schema drift alerts, and PII masking"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Data Quality' }]}
      />

      <Table columns={columns} data={qualityItems} keyExtractor={(q) => q.id} />
    </div>
  );
};
