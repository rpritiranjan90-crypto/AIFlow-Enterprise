import React from 'react';
import { Target } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { KPIItem } from '../types/intelligence';

export const KPICenterPage: React.FC = () => {
  const kpis: KPIItem[] = [
    { id: 'kpi_arr', name: 'ARR Annual Recurring Revenue', category: 'Revenue', currentValue: 4820000, targetValue: 5000000, status: 'on_track', updatedAt: '2026-07-29' },
    { id: 'kpi_gross_margin', name: 'Gross Operating Margin', category: 'Finance', currentValue: 84.2, targetValue: 85.0, status: 'on_track', updatedAt: '2026-07-29' },
    { id: 'kpi_ai_efficiency', name: 'AI Cost per Execution', category: 'AI Spend', currentValue: 0.0035, targetValue: 0.0050, status: 'on_track', updatedAt: '2026-07-29' },
  ];

  const columns: Column<KPIItem>[] = [
    {
      key: 'name',
      header: 'Business Metric KPI',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (r) => <Badge variant="glow">{r.category}</Badge>,
    },
    {
      key: 'currentValue',
      header: 'Current Performance',
      render: (r) => (
        <span className="font-mono text-xs text-slate-100 font-bold">
          {r.currentValue > 100 ? `$${(r.currentValue / 1e6).toFixed(2)}M` : `${r.currentValue}`}
        </span>
      ),
    },
    {
      key: 'targetValue',
      header: 'Target Goal',
      render: (r) => (
        <span className="font-mono text-xs text-cyan-300">
          {r.targetValue > 100 ? `$${(r.targetValue / 1e6).toFixed(2)}M` : `${r.targetValue}`}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="success">ON TRACK</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business KPI Engine & Goal Tracking"
        description="Real-time KPI calculations, target progress indicators, historical trends, and threshold alerts"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'KPI Center' }]}
      />

      <Table columns={columns} data={kpis} keyExtractor={(k) => k.id} />
    </div>
  );
};
