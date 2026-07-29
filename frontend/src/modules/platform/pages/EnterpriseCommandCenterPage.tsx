import React from 'react';
import { Activity, Server, ShieldCheck, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const EnterpriseCommandCenterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Command Center"
        description="Global AIOS health, deployments, and unified operational metrics."
        breadcrumbs={[{ label: 'Platform Core' }, { label: 'Command Center' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Platform Uptime" value="99.999%" icon={<Activity className="w-5 h-5 text-emerald-400" />} trend="up" description="Across 14 regions" />
        <KpiCard title="Active Workflows" value="14,205" icon={<Zap className="w-5 h-5 text-amber-400" />} trend="up" description="Real-time execution" />
        <KpiCard title="Compliance Score" value="98.5" icon={<ShieldCheck className="w-5 h-5 text-blue-400" />} trend="neutral" description="SOC2 & HIPAA" />
        <KpiCard title="Infrastructure Load" value="45%" icon={<Server className="w-5 h-5 text-brand-400" />} trend="down" description="GPU utilization" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          Global Topology Map
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Global Infrastructure Map Visual Placeholder ]
        </div>
      </Card>
    </div>
  );
};
