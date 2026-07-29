import React from 'react';
import { LifeBuoy, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SupportTicketItem } from '../types/enterprise';

export const SupportCenterPage: React.FC = () => {
  const tickets: SupportTicketItem[] = [
    { id: 'tkt_9901', subject: 'Dedicated EKS Cluster Migration Support', priority: 'P1 - Critical', slaStatus: 'within_sla', status: 'in_progress', createdAt: '2026-07-29' },
  ];

  const columns: Column<SupportTicketItem>[] = [
    {
      key: 'subject',
      header: 'Support Ticket Subject',
      render: (r) => (
        <div className="flex items-center gap-2">
          <LifeBuoy className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.subject}</span>
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (r) => <Badge variant="warning">{r.priority}</Badge>,
    },
    {
      key: 'slaStatus',
      header: 'SLA Telemetry',
      render: (r) => <span className="font-mono text-xs text-emerald-400 font-bold">99.99% SLA Compliant</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="glow">{r.status.toUpperCase()}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="24/7 Enterprise Support Center & Incident Command"
        description="Priority support ticketing, 99.99% SLA compliance tracker, remote diagnostic sessions, and incident escalations"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Support Center' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Submit P1 Support Request
          </Button>
        }
      />

      <Table columns={columns} data={tickets} keyExtractor={(t) => t.id} />
    </div>
  );
};
