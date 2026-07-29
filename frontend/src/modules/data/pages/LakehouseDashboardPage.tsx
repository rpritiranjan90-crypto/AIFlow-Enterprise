import React from 'react';
import { Database, HardDrive, Activity, Server } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const LakehouseDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Data Lakehouse Dashboard"
        description="Unified object storage, Delta Parquet partitions, Hot/Cold storage tiers, and query execution telemetry"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Data Lakehouse' }]}
        actions={
          <Button variant="glow" leftIcon={<Database className="w-4 h-4" />}>
            New Data Ingestion Pipeline
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Storage Managed" value="142.0 GB" icon={<HardDrive className="w-5 h-5 text-brand-400" />} trend="up" description="Delta Parquet Format" />
        <KpiCard title="Hot Tier Storage" value="42.0 GB" icon={<Server className="w-5 h-5 text-emerald-400" />} trend="neutral" description="High-Speed SSD Partition" />
        <KpiCard title="Cold S3 Storage" value="100.0 GB" icon={<HardDrive className="w-5 h-5 text-cyan-400" />} trend="up" description="Archival Parquet Tier" />
        <KpiCard title="Total Managed Records" value="48,500,000" icon={<Activity className="w-5 h-5" />} trend="up" description="Across 34 Lakehouse Tables" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-400" /> Lakehouse Tables & Parquet Storage Tiers
          </h3>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-100 block">lakehouse_sales_orders</span>
                <span className="text-[10px] text-slate-400">Rows: 1,450,000 • Size: 450 MB</span>
              </div>
              <Badge variant="glow">Hot Parquet Tier</Badge>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-100 block">lakehouse_user_telemetry</span>
                <span className="text-[10px] text-slate-400">Rows: 8,900,000 • Size: 1.2 GB</span>
              </div>
              <Badge variant="success">Delta Lake Tier</Badge>
            </div>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Real-time Ingestion & Query Telemetry
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Ingestion Mode:</span>
              <span className="text-emerald-400 font-bold">PostgreSQL CDC + Kafka Streaming</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Average Query Latency:</span>
              <span className="text-cyan-300 font-bold">145ms / query</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Data Freshness:</span>
              <span className="text-slate-200 font-bold">12 sec SLA</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
