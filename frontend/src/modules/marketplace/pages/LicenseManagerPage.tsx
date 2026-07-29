import React from 'react';
import { Key } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { LicenseItem } from '../types/marketplace';

export const LicenseManagerPage: React.FC = () => {
  const licenses: LicenseItem[] = [
    { id: 'lic_ocr_01', workspaceId: 'ws_prod_01', assetId: 'asset_ocr_pro', licenseKey: 'aiflow_lic_99A8F72B001', seatsAllocated: 25, status: 'active' },
  ];

  const columns: Column<LicenseItem>[] = [
    {
      key: 'licenseKey',
      header: 'RSA License Key',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-brand-400" />
          <span className="font-mono font-bold text-slate-100">{r.licenseKey}</span>
        </div>
      ),
    },
    {
      key: 'assetId',
      header: 'Licensed Asset',
      render: (r) => <Badge variant="glow">{r.assetId}</Badge>,
    },
    {
      key: 'seatsAllocated',
      header: 'Workspace Seat Allocation',
      render: (r) => <span className="font-mono text-xs text-cyan-300 font-bold">{r.seatsAllocated} Seat Licenses</span>,
    },
    {
      key: 'status',
      header: 'License Status',
      render: (r) => <Badge variant="success">ACTIVE & VALID</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise License Key & Activation Manager"
        description="RSA 4096 signed license keys, workspace seat allocation, activation keys, and renewal management"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'License Manager' }]}
      />

      <Table columns={columns} data={licenses} keyExtractor={(l) => l.id} />
    </div>
  );
};
