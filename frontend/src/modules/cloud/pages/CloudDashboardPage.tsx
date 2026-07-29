import React from 'react';
import { Globe, Server, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const CloudDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Enterprise Cloud Control Tower"
        description="Multi-region Kubernetes cluster topology, Active-Active traffic failover, and global service health"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Cloud Platform' }]}
        actions={
          <Button variant="glow" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Sync Multi-Region Traffic
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active K8s Clusters" value="3 Clusters" icon={<Server className="w-5 h-5" />} trend="up" description="US-East, EU, Tokyo" />
        <KpiCard title="Global Traffic RPS" value="14,200 RPS" icon={<Activity className="w-5 h-5" />} trend="up" description="Sub-20ms Geo-Routing" />
        <KpiCard title="Cross-Region Sync" value="4 ms Sync" icon={<Globe className="w-5 h-5" />} trend="neutral" description="Active-Active Replicas" />
        <KpiCard title="Global Availability" value="99.999%" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="up" description="Zero Downtime SLA" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-400" /> US-East (N. Virginia)
            </span>
            <Badge variant="success">Primary Region</Badge>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">AWS EKS Nodes:</span>
              <span className="text-slate-100 font-bold">18 Nodes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Kubernetes Version:</span>
              <span className="text-cyan-300 font-bold">v1.30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Traffic Routing:</span>
              <span className="text-emerald-400 font-bold">60% Active Traffic</span>
            </div>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-400" /> EU-Central (Frankfurt)
            </span>
            <Badge variant="glow">Active Replica</Badge>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">AWS EKS Nodes:</span>
              <span className="text-slate-100 font-bold">12 Nodes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Kubernetes Version:</span>
              <span className="text-cyan-300 font-bold">v1.30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Traffic Routing:</span>
              <span className="text-emerald-400 font-bold">30% Active Traffic</span>
            </div>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-400" /> AP-Southeast (Tokyo)
            </span>
            <Badge variant="glow">Active Replica</Badge>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">GCP GKE Nodes:</span>
              <span className="text-slate-100 font-bold">8 Nodes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Kubernetes Version:</span>
              <span className="text-cyan-300 font-bold">v1.30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Traffic Routing:</span>
              <span className="text-emerald-400 font-bold">10% Active Traffic</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
