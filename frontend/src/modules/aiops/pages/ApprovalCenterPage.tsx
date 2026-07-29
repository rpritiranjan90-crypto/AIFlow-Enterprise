import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ApprovalRequestRecord } from '../types/aiops';

export const ApprovalCenterPage: React.FC = () => {
  const [approvals, setApprovals] = useState<ApprovalRequestRecord[]>([
    {
      id: 'appr_01',
      workflowId: 'wf_01',
      workflowName: 'Salesforce Lead AI Enrichment Pipeline',
      executionId: 'exec_9901',
      nodeName: 'Manager Approval Gate',
      status: 'pending',
      requestedBy: 'Salesforce Lead Webhook',
      createdAt: '10 mins ago',
    },
  ]);

  const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setApprovals(approvals.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  };

  const columns: Column<ApprovalRequestRecord>[] = [
    {
      key: 'workflowName',
      header: 'Workflow & Gate Node',
      render: (r) => (
        <div>
          <span className="font-bold text-slate-100 block">{r.workflowName}</span>
          <span className="text-[10px] text-slate-400 font-mono">Node: {r.nodeName} • Exec: {r.executionId}</span>
        </div>
      ),
    },
    {
      key: 'requestedBy',
      header: 'Trigger Source',
      render: (r) => <Badge variant="neutral">{r.requestedBy}</Badge>,
    },
    {
      key: 'status',
      header: 'Approval Status',
      render: (r) => {
        if (r.status === 'approved') return <Badge variant="success">Approved</Badge>;
        if (r.status === 'rejected') return <Badge variant="error">Rejected</Badge>;
        return <Badge variant="warning">Pending Approval</Badge>;
      },
    },
    {
      key: 'actions',
      header: 'Human Action',
      render: (r) => (
        r.status === 'pending' ? (
          <div className="flex gap-2">
            <Button variant="glow" size="sm" leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />} onClick={() => handleAction(r.id, 'approved')}>
              Approve
            </Button>
            <Button variant="outline" size="sm" leftIcon={<XCircle className="w-3.5 h-3.5 text-rose-400" />} onClick={() => handleAction(r.id, 'rejected')}>
              Reject
            </Button>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-mono">Completed</span>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Human Approval Gate Center"
        description="Review paused workflow execution steps requiring manager sign-off before proceeding"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Approvals' }]}
      />

      <Table columns={columns} data={approvals} keyExtractor={(a) => a.id} />
    </div>
  );
};
