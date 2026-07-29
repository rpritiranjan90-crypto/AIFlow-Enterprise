import React from 'react';
import { Landmark, Activity, UserCheck, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const FinancePortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Banking & Finance Portal"
        description="Loan processing, KYC workflows, fraud monitoring, and compliance reporting."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Finance' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Loans" value="4,250" icon={<Landmark className="w-5 h-5 text-emerald-400" />} trend="up" description="Origination pipeline" />
        <KpiCard title="KYC Queue" value="12" icon={<UserCheck className="w-5 h-5 text-brand-400" />} trend="down" description="Pending review" />
        <KpiCard title="Fraud Alerts" value="0" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="down" description="High confidence" />
        <KpiCard title="Core Banking" value="Syncing" icon={<Activity className="w-5 h-5 text-amber-400" />} trend="neutral" description="Jack Henry API" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          KYC & Onboarding Workflow
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Workflow Visual Placeholder ]
        </div>
      </Card>
    </div>
  );
};
