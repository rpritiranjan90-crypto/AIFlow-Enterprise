import React from 'react';
import { Activity, Server, AlertCircle, Calendar } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card } from '@/components/ui/Card';

export const CloudOperationsCenterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Operations Center"
        description="Global view of platform utilization, incident timeline, and deployment status across all regions."
        breadcrumbs={[{ label: 'AIFlow SaaS' }, { label: 'Operations Center' }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Tenants" value="1,420" icon={<Server className="w-5 h-5 text-brand-400" />} trend="up" description="Active enterprise tenants" />
        <KpiCard title="Active Regions" value="12" icon={<Activity className="w-5 h-5 text-emerald-400" />} trend="neutral" description="Global footprint" />
        <KpiCard title="Open Incidents" value="0" icon={<AlertCircle className="w-5 h-5 text-rose-400" />} trend="down" description="P1-P4 incidents" />
        <KpiCard title="Upcoming Maint." value="2" icon={<Calendar className="w-5 h-5 text-amber-400" />} trend="neutral" description="Scheduled this week" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            Platform Utilization (24h)
          </h3>
          <div className="h-48 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
            [ Utilization Graph Placeholder ]
          </div>
        </Card>
        <Card className="bg-slate-950/80 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-brand-400" />
            Recent Incidents
          </h3>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-300">
            No active incidents. System operational.
          </div>
        </Card>
      </div>
    </div>
  );
};
