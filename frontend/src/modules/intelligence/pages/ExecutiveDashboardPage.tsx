import React from 'react';
import { TrendingUp, DollarSign, Activity, ShieldCheck, Sparkles, Brain } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const ExecutiveDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="C-Suite Decision Intelligence Tower"
        description="Real-time executive performance forecasting, ARR revenue telemetry, AI cost efficiency, and organizational KPIs"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Executive Intelligence' }]}
        actions={
          <Button variant="glow" leftIcon={<Sparkles className="w-4 h-4" />}>
            Generate Board Report
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="ARR Revenue" value="$4,820,000" icon={<DollarSign className="w-5 h-5 text-emerald-400" />} trend="up" description="96.4% to Q3 Target" />
        <KpiCard title="Gross Operating Margin" value="84.2%" icon={<TrendingUp className="w-5 h-5" />} trend="up" description="+2.4% vs last quarter" />
        <KpiCard title="AI Compute Efficiency" value="$0.0035 / exec" icon={<Brain className="w-5 h-5 text-brand-400" />} trend="up" description="30% Below Budget Cap" />
        <KpiCard title="Org Digital Twin Health" value="98.5%" icon={<ShieldCheck className="w-5 h-5" />} trend="neutral" description="Across 12 Departments" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-400" /> Strategic AI Recommendation Summary
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-200">
              <span className="font-bold">LLM Traffic Cost Optimization</span>
              <Badge variant="success">Impact: +$14,200/mo</Badge>
            </div>
            <p className="text-[11px] text-slate-400">
              Migrate non-critical evaluation prompts from GPT-4o to DeepSeek R1 to reduce inferencing costs by 40%.
            </p>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Revenue & Cash Flow Forecast
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Q4 2026 Forecast:</span>
              <span className="text-emerald-400 font-bold">$5.80M (± $0.4M)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Q1 2027 Forecast:</span>
              <span className="text-emerald-400 font-bold">$6.40M (± $0.5M)</span>
            </div>
            <span className="text-[10px] text-slate-500 block text-right">95% Confidence Interval Model</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
