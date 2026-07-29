import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const ForecastStudioPage: React.FC = () => {
  const forecasts = [
    { period: 'Q3 2026', revenue: '$5.20M', expenses: '$1.42M', aiSpend: '$14,500', lower: '$4.90M', upper: '$5.50M' },
    { period: 'Q4 2026', revenue: '$5.80M', expenses: '$1.58M', aiSpend: '$16,200', lower: '$5.40M', upper: '$6.20M' },
    { period: 'Q1 2027', revenue: '$6.40M', expenses: '$1.72M', aiSpend: '$18,000', lower: '$5.90M', upper: '$6.90M' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Predictive Forecasting Engine Studio"
        description="Multi-variable financial, operational, and AI compute spend projections with 95% confidence intervals"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Forecast Studio' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forecasts.map((f) => (
          <Card key={f.period} glow className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-100">{f.period}</h3>
              <Badge variant="success">95% Confidence</Badge>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Projected Revenue:</span>
                <span className="text-emerald-400 font-bold">{f.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Projected Expenses:</span>
                <span className="text-slate-200">{f.expenses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Compute Spend:</span>
                <span className="text-cyan-300">{f.aiSpend}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-mono text-center">
              Bounds: {f.lower} – {f.upper}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
