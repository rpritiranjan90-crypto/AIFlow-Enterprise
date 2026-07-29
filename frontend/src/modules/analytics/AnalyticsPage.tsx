import React from 'react';
import { Clock, Zap, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Telemetry & Analytics"
        description="Deep operational insights into automation latencies, error frequencies, and token burn rates"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Analytics' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Monthly Token Usage" value="650,000 / 1M" changePercent={14.2} trend="up" icon={<Zap className="w-5 h-5 text-brand-400" />} />
        <KpiCard title="Avg Latency (P99)" value="890 ms" changePercent={-8.1} trend="up" icon={<Clock className="w-5 h-5 text-cyan-400" />} />
        <KpiCard title="Automation SLA Uptime" value="99.992%" changePercent={0.01} trend="up" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <SectionHeader title="Execution Volume (24h)" subtitle="Hourly breakdown of automated workflow runs" />
          <div className="h-48 flex items-end justify-between gap-2 pt-6">
            {[45, 62, 89, 120, 95, 140, 210, 180, 290, 310, 260, 340].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-gradient-to-t from-brand-600 to-brand-cyan rounded-t transition-all group-hover:brightness-125"
                  style={{ height: `${(val / 350) * 100}%` }}
                />
                <span className="text-[9px] text-slate-500 font-mono">{idx * 2}h</span>
              </div>
            ))}
          </div>
        </Card>

        <Card glow className="space-y-4">
          <SectionHeader title="AI Token Consumption by Agent Model" subtitle="Allocation across LLM providers" />
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200">OpenAI GPT-4o</span>
                <span className="text-brand-400 font-mono">420,000 tokens (64%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-brand-500 h-full rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200">Anthropic Claude 3.5 Sonnet</span>
                <span className="text-cyan-400 font-mono">180,000 tokens (27%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '27%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200">Google Gemini 1.5 Pro</span>
                <span className="text-emerald-400 font-mono">50,000 tokens (9%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '9%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
