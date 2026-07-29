import React from 'react';
import { Activity, TrendingUp, ShieldCheck, Heart } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';

export const CustomerSuccessPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Success Platform & Account Health"
        description="Enterprise onboarding success plans, account health scores, active workflow adoption, and renewal telemetry"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Customer Success' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Account Health Score" value="98.5%" icon={<Heart className="w-5 h-5 text-rose-400" />} trend="up" description="Optimal Account Health" />
        <KpiCard title="Churn Risk Category" value="LOW" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="neutral" description="Zero Renewal Risks" />
        <KpiCard title="Net Promoter Score (NPS)" value="+72" icon={<TrendingUp className="w-5 h-5 text-cyan-400" />} trend="up" description="Enterprise Benchmark" />
        <KpiCard title="Monthly Executions" value="450,000" icon={<Activity className="w-5 h-5" />} trend="up" description="Across 142 Workflows" />
      </div>
    </div>
  );
};
