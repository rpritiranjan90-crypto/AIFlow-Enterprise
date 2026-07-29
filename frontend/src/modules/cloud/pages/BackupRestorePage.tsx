import React, { useState } from 'react';
import { RefreshCw, HardDrive } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BackupRecord } from '../types/cloud';

export const BackupRestorePage: React.FC = () => {
  const [isRestoring, setIsRestoring] = useState(false);
  const backups: BackupRecord[] = [
    { id: 'bak_snapshot_01', workspaceId: 'ws_prod_01', backupType: 'PostgreSQL Snapshot', sizeBytes: 4200000000, status: 'completed', createdAt: '2026-07-29 02:00' },
  ];

  const handleRestore = () => {
    setIsRestoring(true);
    setTimeout(() => {
      setIsRestoring(false);
      alert('Disaster Recovery Restore Completed! RPO: 12 seconds, RTO: 180 seconds.');
    }, 1000);
  };

  const columns: Column<BackupRecord>[] = [
    {
      key: 'id',
      header: 'Backup Archive ID',
      render: (r) => (
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-brand-400" />
          <span className="font-mono font-bold text-slate-100">{r.id}</span>
        </div>
      ),
    },
    {
      key: 'backupType',
      header: 'Backup Strategy',
      render: (r) => <Badge variant="glow">{r.backupType}</Badge>,
    },
    {
      key: 'sizeBytes',
      header: 'Archive Size',
      render: (r) => <span className="font-mono text-xs text-cyan-300">{(r.sizeBytes / 1e9).toFixed(2)} GB</span>,
    },
    {
      key: 'status',
      header: 'Backup Status',
      render: (r) => <Badge variant="success">{r.status.toUpperCase()}</Badge>,
    },
    {
      key: 'actions',
      header: 'Disaster Recovery Action',
      render: (r) => (
        <Button variant="glow" size="sm" isLoading={isRestoring} leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={handleRestore}>
          Trigger Point-in-Time Restore
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Disaster Recovery & Backup Engine"
        description="Automated DB snapshot replication, point-in-time recovery, and RPO/RTO telemetry monitors"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Disaster Recovery' }]}
      />

      <Table columns={columns} data={backups} keyExtractor={(b) => b.id} />
    </div>
  );
};
