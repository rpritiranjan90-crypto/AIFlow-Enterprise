import React from 'react';
import { DollarSign, TrendingUp, CreditCard, PieChart } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';

export const CostAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Cost & Spend Analytics"
        description="Track token consumption, daily spend breakdown per workspace/agent/workflow, and budget alerts"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Cost Analytics' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Month-to-Date Spend" value="$482.50" icon={<DollarSign className="w-5 h-5" />} trend="up" description="Within Monthly Budget" />
        <KpiCard title="Total Tokens Consumed" value="84.2M" icon={<TrendingUp className="w-5 h-5" />} trend="up" description="+15% vs last month" />
        <KpiCard title="Forecasted Monthly Spend" value="$1,450.00" icon={<CreditCard className="w-5 h-5" />} trend="neutral" description="Cap: $5,000.00" />
        <KpiCard title="Highest Cost Provider" value="OpenAI ($280)" icon={<PieChart className="w-5 h-5" />} trend="neutral" description="58% of Total Spend" />
      </div>
    </div>
  );
};
