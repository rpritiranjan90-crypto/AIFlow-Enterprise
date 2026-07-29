import React from 'react';
import { DollarSign, TrendingDown, PieChart, Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const FinOpsCostAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FinOps Cost Analytics"
        description="Cloud cost analytics, budget monitoring, and resource optimization across tenants."
        breadcrumbs={[{ label: 'AIFlow SaaS' }, { label: 'FinOps' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total MRR" value="$1.25M" icon={<DollarSign className="w-5 h-5 text-emerald-400" />} trend="up" description="Current month" />
        <KpiCard title="Compute Costs" value="$180K" icon={<Cpu className="w-5 h-5 text-brand-400" />} trend="neutral" description="EC2 / EKS" />
        <KpiCard title="AI Inference Costs" value="$320K" icon={<PieChart className="w-5 h-5 text-violet-400" />} trend="up" description="GPT-4o, Claude" />
        <KpiCard title="Savings Opportunities" value="$42K" icon={<TrendingDown className="w-5 h-5 text-amber-400" />} trend="up" description="Reserved Instances" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-400" />
          Cost Distribution & Chargeback (July 2026)
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Cost Analytics Chart Placeholder ]
        </div>
      </Card>
    </div>
  );
};
