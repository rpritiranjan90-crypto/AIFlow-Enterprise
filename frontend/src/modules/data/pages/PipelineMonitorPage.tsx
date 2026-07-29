import React from 'react';
import { Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { DataPipelineItem } from '../types/data_platform';

export const PipelineMonitorPage: React.FC = () => {
  const pipelines: DataPipelineItem[] = [
    { id: 'pipe_cdc_orders', name: 'PostgreSQL Orders CDC Sync', schedule: 'Continuous CDC', status: 'active', createdAt: '2026-07-29' },
    { id: 'pipe_hourly_metrics', name: 'Hourly ARR Metric Rollup', schedule: '0 * * * *', status: 'active', createdAt: '2026-07-29' },
  ];

  const columns: Column<DataPipelineItem>[] = [
    {
      key: 'name',
      header: 'Data Pipeline Name',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'schedule',
      header: 'Schedule / Trigger',
      render: (r) => <span className="font-mono text-xs text-cyan-300">{r.schedule}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="success">ACTIVE</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Pipeline Health & Run Monitor"
        description="Monitor batch and streaming data pipeline runs, row counts, SLAs, and execution logs"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Pipeline Monitor' }]}
      />

      <Table columns={columns} data={pipelines} keyExtractor={(p) => p.id} />
    </div>
  );
};
