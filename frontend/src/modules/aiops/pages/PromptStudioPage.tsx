import React from 'react';
import { Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const PromptStudioPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prompt Lifecycle Studio & Evaluation"
        description="Draft, version, publish, and run automated accuracy and hallucination evaluations"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Prompt Studio' }]}
        actions={
          <Button variant="glow" leftIcon={<Sparkles className="w-4 h-4" />}>
            New Evaluation Run
          </Button>
        }
      />

      <Card glow className="space-y-4">
        <div className="flex justify-between items-center">
          <Badge variant="glow">Published v1.2.0</Badge>
          <span className="text-xs font-mono text-emerald-400 font-bold">Accuracy Score: 96%</span>
        </div>
        <h3 className="text-base font-bold text-slate-100">Salesforce Lead Enrichment System Prompt</h3>
        <p className="text-xs text-slate-300 font-mono p-3 bg-slate-950 rounded-xl border border-slate-800">
          You are an expert enterprise sales intelligence agent. Extract company size, revenue, and technology stack from payload context.
        </p>
      </Card>
    </div>
  );
};
