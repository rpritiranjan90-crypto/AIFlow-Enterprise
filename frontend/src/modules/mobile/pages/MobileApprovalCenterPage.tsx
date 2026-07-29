import React, { useState } from 'react';
import { CheckCircle2, XCircle, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const MobileApprovalCenterPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 'appr_9901', title: 'Approve SAP Vendor Invoice #99402', requester: 'Sarah Jenkins', risk: 'medium', amount: '$14,850.00', status: 'pending' },
  ]);

  const handleAction = (id: string, action: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: action } : t));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader
        title="Mobile Approval Inbox"
        description="Touch-optimized approval inbox with biometric authentication and one-tap Approve, Reject, Comment, or Escalate"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Approval Inbox' }]}
      />

      <div className="space-y-4">
        {tasks.map((t) => (
          <Card key={t.id} glow className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="warning">{t.risk.toUpperCase()} RISK</Badge>
              <span className="font-mono text-xs text-slate-400">ID: {t.id}</span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-100">{t.title}</h3>
              <p className="text-xs text-slate-400 mt-1">Requester: {t.requester} • Total Amount: {t.amount}</p>
            </div>

            {t.status === 'pending' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <Button variant="glow" size="sm" leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />} onClick={() => handleAction(t.id, 'approved')}>
                  Approve
                </Button>
                <Button variant="outline" size="sm" leftIcon={<XCircle className="w-3.5 h-3.5" />} onClick={() => handleAction(t.id, 'rejected')}>
                  Reject
                </Button>
                <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                  Comment
                </Button>
                <Button variant="outline" size="sm" leftIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                  Escalate
                </Button>
              </div>
            ) : (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 font-bold text-center">
                Action Processed: {t.status.toUpperCase()}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
