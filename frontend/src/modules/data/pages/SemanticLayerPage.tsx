import React from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const SemanticLayerPage: React.FC = () => {
  const metrics = [
    { name: 'ARR Annual Recurring Revenue', measureSql: 'SUM(total_amount)', dimensionName: 'Region', category: 'Financial KPIs' },
    { name: 'Active Subscriptions', measureSql: 'COUNT(DISTINCT tenant_id)', dimensionName: 'Tier', category: 'Growth KPIs' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Semantic Layer Manager"
        description="Define reusable business metrics, dimensions, measures, and standardized enterprise KPI calculations"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Semantic Layer' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            New Semantic Metric
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((m) => (
          <Card key={m.name} glow className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="glow">{m.category}</Badge>
              <span className="text-xs font-mono text-cyan-300">Dim: {m.dimensionName}</span>
            </div>
            <h3 className="font-bold text-base text-slate-100">{m.name}</h3>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
              {m.measureSql}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
