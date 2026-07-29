import React from 'react';
import { BarChart, Users, PlayCircle, HardDrive } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const UsageAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Usage Analytics"
        description="Global platform utilization, active users, workflow executions, and API analytics."
        breadcrumbs={[{ label: 'AIFlow SaaS' }, { label: 'Usage Analytics' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total API Calls" value="42M" icon={<BarChart className="w-5 h-5 text-brand-400" />} trend="up" description="Global gateway" />
        <KpiCard title="Workflows Executed" value="150K" icon={<PlayCircle className="w-5 h-5 text-emerald-400" />} trend="up" description="Last 24 hours" />
        <KpiCard title="Active Users" value="18,500" icon={<Users className="w-5 h-5 text-violet-400" />} trend="neutral" description="MAU" />
        <KpiCard title="Storage Provisioned" value="1.2 PB" icon={<HardDrive className="w-5 h-5 text-amber-400" />} trend="up" description="S3 / Aurora" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <BarChart className="w-4 h-4 text-brand-400" />
          Global API Traffic
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ API Traffic Chart Placeholder ]
        </div>
      </Card>
    </div>
  );
};
