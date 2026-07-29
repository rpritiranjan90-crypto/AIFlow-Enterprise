import React from 'react';
import { Globe2, Activity, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';
import { Badge } from '@/components/ui/Badge';

const REGIONS = [
  { name: 'US East (N. Virginia)', code: 'us-east-1', latency: '24ms', status: 'operational' },
  { name: 'US West (Oregon)', code: 'us-west-2', latency: '42ms', status: 'operational' },
  { name: 'EU West (Ireland)', code: 'eu-west-1', latency: '88ms', status: 'operational' },
  { name: 'EU Central (Frankfurt)', code: 'eu-central-1', latency: '92ms', status: 'operational' },
  { name: 'AP Northeast (Tokyo)', code: 'ap-northeast-1', latency: '142ms', status: 'degraded' },
];

export const GlobalHealthDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Platform Health"
        description="Global dashboards, latency maps, availability monitoring, and tenant health."
        breadcrumbs={[{ label: 'AIFlow SaaS' }, { label: 'Global Health' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Global Uptime" value="99.99%" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="up" description="Trailing 30 days" />
        <KpiCard title="Avg Latency" value="42ms" icon={<Activity className="w-5 h-5 text-brand-400" />} trend="neutral" description="Across all endpoints" />
        <KpiCard title="Active Regions" value="12" icon={<Globe2 className="w-5 h-5 text-cyan-400" />} trend="neutral" description="Multi-cloud deployment" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-cyan-400" />
          Regional Status Map
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {REGIONS.map(region => (
            <div key={region.code} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-200">{region.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">{region.code} • {region.latency}</p>
              </div>
              <Badge variant={region.status === 'operational' ? 'success' : 'warning'}>
                {region.status.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
