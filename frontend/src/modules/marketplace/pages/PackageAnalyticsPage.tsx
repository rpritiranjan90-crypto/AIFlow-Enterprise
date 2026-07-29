import React from 'react';
import { BarChart3, TrendingUp, DownloadCloud, Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const PackageAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketplace Analytics"
        description="Monitor installation trends, revenue, and usage across all published extensions."
        breadcrumbs={[{ label: 'Ecosystem' }, { label: 'Analytics' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Installs" value="124.5k" icon={<DownloadCloud className="w-5 h-5 text-emerald-400" />} trend="up" description="Across all packages" />
        <KpiCard title="Monthly Revenue" value="$42,100" icon={<TrendingUp className="w-5 h-5 text-blue-400" />} trend="up" description="Recurring subs" />
        <KpiCard title="Avg Rating" value="4.7" icon={<Activity className="w-5 h-5 text-amber-400" />} trend="neutral" description="Top decile" />
        <KpiCard title="Active Publishers" value="342" icon={<BarChart3 className="w-5 h-5 text-brand-400" />} trend="up" description="Verified partners" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Installations Over Time
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Analytics Chart Placeholder ]
        </div>
      </Card>
    </div>
  );
};
