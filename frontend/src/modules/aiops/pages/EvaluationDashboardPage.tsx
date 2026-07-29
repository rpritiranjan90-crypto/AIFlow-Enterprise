import React from 'react';
import { BarChart2, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';

export const EvaluationDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prompt Evaluation & Quality Dashboard"
        description="Historical accuracy benchmarks, groundedness metrics, and hallucination rate telemetry"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Evaluations' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Overall Accuracy Score" value="96.2%" icon={<CheckCircle2 className="w-5 h-5" />} trend="up" description="Passed Benchmark" />
        <KpiCard title="Groundedness Score" value="98.4%" icon={<BarChart2 className="w-5 h-5" />} trend="up" description="High Citation Match" />
        <KpiCard title="Hallucination Rate" value="1.5%" icon={<AlertTriangle className="w-5 h-5" />} trend="down" description="-0.4% vs last week" />
        <KpiCard title="Avg Reasoning Latency" value="380 ms" icon={<Cpu className="w-5 h-5" />} trend="neutral" description="Optimal Performance" />
      </div>
    </div>
  );
};
