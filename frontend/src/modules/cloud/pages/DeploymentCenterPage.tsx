import React, { useState } from 'react';
import { GitBranch, RotateCcw, Play } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DeploymentRecord } from '../types/cloud';

export const DeploymentCenterPage: React.FC = () => {
  const [deployments, setDeployments] = useState<DeploymentRecord[]>([
    { id: 'dep_2026_08', releaseVersion: 'v2.4.0', strategy: 'Canary (20%)', status: 'succeeded', createdAt: '2026-07-29 12:00' },
    { id: 'dep_2026_07', releaseVersion: 'v2.3.9', strategy: 'Blue/Green', status: 'succeeded', createdAt: '2026-07-28 18:30' },
  ]);

  const handleRollback = (id: string) => {
    setDeployments(deployments.map((d) => (d.id === id ? { ...d, status: 'rolled_back' } : d)));
  };

  const columns: Column<DeploymentRecord>[] = [
    {
      key: 'releaseVersion',
      header: 'Release Tag',
      render: (r) => (
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-brand-400" />
          <span className="font-mono font-bold text-slate-100">{r.releaseVersion}</span>
        </div>
      ),
    },
    {
      key: 'strategy',
      header: 'Deployment Strategy',
      render: (r) => <Badge variant="glow">{r.strategy}</Badge>,
    },
    {
      key: 'status',
      header: 'Release Status',
      render: (r) => {
        if (r.status === 'succeeded') return <Badge variant="success">Succeeded</Badge>;
        if (r.status === 'rolled_back') return <Badge variant="error">Rolled Back</Badge>;
        return <Badge variant="warning">In Progress</Badge>;
      },
    },
    {
      key: 'actions',
      header: 'Rollback Action',
      render: (r) => (
        r.status === 'succeeded' ? (
          <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-3.5 h-3.5 text-rose-400" />} onClick={() => handleRollback(r.id)}>
            Rollback
          </Button>
        ) : (
          <span className="text-xs text-slate-400 font-mono">Rolled Back</span>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deployment Center & Canary Releases"
        description="Blue/Green and Canary release deployment manager, release approvals, and automatic rollbacks"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Deployment Center' }]}
        actions={
          <Button variant="glow" leftIcon={<Play className="w-4 h-4" />}>
            Trigger Canary Deployment
          </Button>
        }
      />

      <Table columns={columns} data={deployments} keyExtractor={(d) => d.id} />
    </div>
  );
};
