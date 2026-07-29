import React from 'react';
import { Server } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ClusterRecord } from '../types/cloud';

export const ClusterManagerPage: React.FC = () => {
  const clusters: ClusterRecord[] = [
    { id: 'cluster_us_east_prod', name: 'aiflow-us-east-production', regionId: 'us-east-1', provider: 'AWS EKS', nodesCount: 18, k8sVersion: '1.30', status: 'active' },
    { id: 'cluster_eu_central_prod', name: 'aiflow-eu-central-production', regionId: 'eu-central-1', provider: 'AWS EKS', nodesCount: 12, k8sVersion: '1.30', status: 'active' },
    { id: 'cluster_ap_tokyo_prod', name: 'aiflow-ap-tokyo-production', regionId: 'ap-southeast-1', provider: 'GCP GKE', nodesCount: 8, k8sVersion: '1.30', status: 'active' },
  ];

  const columns: Column<ClusterRecord>[] = [
    {
      key: 'name',
      header: 'Kubernetes Cluster',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'provider',
      header: 'Infrastructure Provider',
      render: (r) => <Badge variant="glow">{r.provider}</Badge>,
    },
    {
      key: 'nodesCount',
      header: 'Node Pool Capacity',
      render: (r) => <span className="font-mono text-xs text-cyan-300 font-bold">{r.nodesCount} Worker Nodes</span>,
    },
    {
      key: 'k8sVersion',
      header: 'K8s Release',
      render: (r) => <span className="font-mono text-xs text-slate-300">v{r.k8sVersion}</span>,
    },
    {
      key: 'status',
      header: 'Health Status',
      render: (r) => <Badge variant="success">{r.status.toUpperCase()}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-Cluster Kubernetes Manager"
        description="Monitor EKS/GKE cluster node pools, Pod Disruption Budgets, and rolling upgrade health"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Cluster Manager' }]}
      />

      <Table columns={columns} data={clusters} keyExtractor={(c) => c.id} />
    </div>
  );
};
