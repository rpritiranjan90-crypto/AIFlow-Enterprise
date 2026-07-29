import React from 'react';
import { Smartphone, CheckCircle2, Bell, RefreshCw, Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const MobileDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AIFlow Enterprise Mobile Control Tower"
        description="Touch-optimized mobile dashboard for C-Suite executives, field engineers, and mobile administrators"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Mobile Platform' }]}
        actions={
          <Button variant="glow" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Delta Sync Now
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Registered Mobile Devices" value="2 Devices" icon={<Smartphone className="w-5 h-5 text-brand-400" />} trend="up" description="iOS & Android" />
        <KpiCard title="Pending Mobile Approvals" value="1 Approval" icon={<CheckCircle2 className="w-5 h-5 text-amber-400" />} trend="neutral" description="1 High Risk Task" />
        <KpiCard title="Push Alerts Delivered" value="100%" icon={<Bell className="w-5 h-5 text-cyan-400" />} trend="up" description="APNS & FCM Active" />
        <KpiCard title="Edge AI Offline NPU" value="85 ms" icon={<Cpu className="w-5 h-5 text-emerald-400" />} trend="up" description="On-Device Inference" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> Pending Mobile Approval Inbox
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold text-slate-100">Approve SAP Vendor Invoice #99402</span>
              <Badge variant="warning">MEDIUM RISK</Badge>
            </div>
            <p className="text-[11px] text-slate-400">Requester: Sarah Jenkins • Amount: $14,850.00</p>
            <div className="flex gap-2 pt-2">
              <Button variant="glow" size="sm" className="w-full">One-Tap Approve</Button>
              <Button variant="outline" size="sm" className="w-full">Reject</Button>
            </div>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-cyan-400" /> Encrypted Offline Synchronization
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Sync Mode:</span>
              <span className="text-emerald-400 font-bold">Incremental Delta Sync</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Local Encryption:</span>
              <span className="text-cyan-300 font-bold">AES-256 GCM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Offline Queue:</span>
              <span className="text-slate-200 font-bold">0 Pending Actions</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
