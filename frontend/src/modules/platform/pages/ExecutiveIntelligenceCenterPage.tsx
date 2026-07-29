import React from 'react';
import { Briefcase, TrendingUp, BarChart3, Presentation } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const ExecutiveIntelligenceCenterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Intelligence Center"
        description="Strategic KPI scorecards and AI-generated executive briefings."
        breadcrumbs={[{ label: 'Platform Core' }, { label: 'Executive Intelligence' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Platform ROI" value="+312%" icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} trend="up" description="Q3 Trailing" />
        <KpiCard title="AI Adoption" value="82%" icon={<Briefcase className="w-5 h-5 text-blue-400" />} trend="up" description="Active users" />
        <KpiCard title="Automation Value" value="$4.2M" icon={<BarChart3 className="w-5 h-5 text-indigo-400" />} trend="up" description="Time saved (annualized)" />
        <KpiCard title="Board Reports" value="Generated" icon={<Presentation className="w-5 h-5 text-brand-400" />} trend="neutral" description="August 2026" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Presentation className="w-4 h-4 text-emerald-400" />
          C-Suite Dashboard
        </h3>
        <div className="h-64 flex flex-col items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          <p>[ Strategic KPI Scorecard Placeholder ]</p>
        </div>
      </Card>
    </div>
  );
};
