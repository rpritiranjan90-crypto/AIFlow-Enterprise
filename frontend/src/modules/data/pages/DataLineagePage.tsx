import React from 'react';
import { GitCommit, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const DataLineagePage: React.FC = () => {
  const steps = [
    { type: 'Source DB', name: 'PostgreSQL Orders DB' },
    { type: 'CDC Pipeline', name: 'Debezium CDC Stream' },
    { type: 'Lakehouse Table', name: 'delta_sales_orders' },
    { type: 'Semantic Model', name: 'ARR Revenue KPI' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="End-to-End Data Lineage Viewer"
        description="Visual data flow graph mapping raw database tables, ETL transformations, Lakehouse partitions, and semantic metrics"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Data Lineage' }]}
      />

      <Card glow className="p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-brand-400" /> Interactive Lineage Flow
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          {steps.map((step, idx) => (
            <React.Fragment key={step.name}>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1 w-full sm:w-auto">
                <Badge variant="glow">{step.type}</Badge>
                <span className="font-bold text-slate-100 block">{step.name}</span>
              </div>
              {idx < steps.length - 1 && <ArrowRight className="w-4 h-4 text-brand-400 hidden sm:block" />}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </div>
  );
};
