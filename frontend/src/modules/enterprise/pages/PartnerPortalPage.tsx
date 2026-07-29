import React from 'react';
import { Users, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PartnerItem } from '../types/enterprise';

export const PartnerPortalPage: React.FC = () => {
  const partners: PartnerItem[] = [
    { id: 'part_01', name: 'Global Cloud Systems Inc', tier: 'Platinum Partner', commissionPct: 20.0, status: 'active', createdAt: '2026-07-29' },
    { id: 'part_02', name: 'Apex MSP Automation Group', tier: 'MSP Partner', commissionPct: 25.0, status: 'active', createdAt: '2026-07-29' },
  ];

  const columns: Column<PartnerItem>[] = [
    {
      key: 'name',
      header: 'Partner Enterprise Name',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Partner Tier',
      render: (r) => <Badge variant="glow">{r.tier}</Badge>,
    },
    {
      key: 'commissionPct',
      header: 'RevShare Commission',
      render: (r) => <span className="font-mono text-xs text-emerald-400 font-bold">{r.commissionPct}%</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="success">ACTIVE</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Partner & MSP Ecosystem Portal"
        description="Multi-tenant MSP portal, Solution & Technology partners, resellers, certifications, and revshare analytics"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Partner Portal' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Onboard New Partner
          </Button>
        }
      />

      <Table columns={columns} data={partners} keyExtractor={(p) => p.id} />
    </div>
  );
};
