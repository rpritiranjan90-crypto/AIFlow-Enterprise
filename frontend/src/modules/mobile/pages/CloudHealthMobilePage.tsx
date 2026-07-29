import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const CloudHealthMobilePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Mobile Cloud Infrastructure & Incident Response"
        description="Mobile health monitor for multi-region EKS clusters, database replication, and incident escalation"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Cloud Health' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card glow className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-100">US-East Cluster (Virginia)</h3>
            <Badge variant="success">HEALTHY (99.99%)</Badge>
          </div>
          <p className="text-xs text-slate-400 font-mono">Nodes: 12 • Active Pods: 148 • Latency: 12ms</p>
        </Card>

        <Card glow className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-100">EU-West Cluster (Frankfurt)</h3>
            <Badge variant="success">HEALTHY (99.98%)</Badge>
          </div>
          <p className="text-xs text-slate-400 font-mono">Nodes: 8 • Active Pods: 92 • Latency: 18ms</p>
        </Card>
      </div>
    </div>
  );
};
