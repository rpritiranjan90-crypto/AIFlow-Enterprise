import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const BillingCenterPage: React.FC = () => {
  const invoices = [
    { id: 'inv_2026_07', amountUsd: 499.00, status: 'paid', paidAt: '2026-07-01', period: 'July 2026' },
    { id: 'inv_2026_06', amountUsd: 499.00, status: 'paid', paidAt: '2026-06-01', period: 'June 2026' },
  ];

  const columns: Column<any>[] = [
    {
      key: 'id',
      header: 'Invoice ID',
      render: (r) => <span className="font-mono font-bold text-slate-100">{r.id}</span>,
    },
    {
      key: 'period',
      header: 'Billing Period',
      render: (r) => <span className="text-xs text-slate-300">{r.period}</span>,
    },
    {
      key: 'amountUsd',
      header: 'Total Paid',
      render: (r) => <span className="font-mono text-xs text-emerald-400 font-bold">${r.amountUsd.toFixed(2)}</span>,
    },
    {
      key: 'status',
      header: 'Payment Status',
      render: (r) => <Badge variant="success">PAID</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Billing & Invoicing Center"
        description="Payment methods, Stripe portal integration, billing history, and PDF invoices"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Billing Center' }]}
        actions={
          <Button variant="glow" leftIcon={<ExternalLink className="w-4 h-4" />}>
            Open Stripe Customer Portal
          </Button>
        }
      />

      <Table columns={columns} data={invoices} keyExtractor={(i) => i.id} />
    </div>
  );
};
