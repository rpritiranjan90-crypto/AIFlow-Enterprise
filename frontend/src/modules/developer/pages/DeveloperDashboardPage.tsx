import React from 'react';
import { Code, Terminal, Package, Sparkles, Download } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Button } from '@/components/ui/Button';

export const DeveloperDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Developer Portal"
        description="Build, package, publish, and test custom workflow nodes, AI reasoning agents, and connectors"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Developer Portal' }]}
        actions={
          <Button variant="glow" leftIcon={<Sparkles className="w-4 h-4" />}>
            New Plugin Project
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Published Plugins" value="2 Plugins" icon={<Package className="w-5 h-5" />} trend="up" description="Verified in Marketplace" />
        <KpiCard title="Plugin Executions" value="14,200 Runs" icon={<Terminal className="w-5 h-5" />} trend="up" description="+24% vs last week" />
        <KpiCard title="Avg Sandbox Latency" value="140 ms" icon={<Code className="w-5 h-5" />} trend="neutral" description="Optimal Isolation" />
        <KpiCard title="CLI Installs" value="450 Installs" icon={<Download className="w-5 h-5" />} trend="up" description="aiflow cli v1.0" />
      </div>
    </div>
  );
};
