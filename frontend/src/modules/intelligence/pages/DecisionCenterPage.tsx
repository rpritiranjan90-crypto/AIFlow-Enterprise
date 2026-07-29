import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const DecisionCenterPage: React.FC = () => {
  const recommendations = [
    {
      id: 'rec_01',
      category: 'Cost Optimization',
      title: 'Migrate 40% of non-critical LLM traffic from GPT-4o to DeepSeek R1',
      impact: '+$14,200 / month savings',
      confidence: '96% Confidence',
    },
    {
      id: 'rec_02',
      category: 'Resource Allocation',
      title: 'Scale US-East EKS Node Pool by +4 nodes during peak 09:00 - 17:00 EST window',
      impact: '+$3,800 / month efficiency',
      confidence: '94% Confidence',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Decision & Recommendation Center"
        description="Automated risk analysis, opportunity detection, cost reduction suggestions, and resource priority allocations"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Decision Center' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} glow className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="glow">{rec.category}</Badge>
                <span className="text-xs font-mono text-emerald-400 font-bold">{rec.confidence}</span>
              </div>
              <h3 className="font-bold text-base text-slate-100">{rec.title}</h3>
              <span className="font-mono text-xs text-brand-400 font-bold block">{rec.impact}</span>
            </div>

            <Button variant="glow" size="sm" leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              Apply AI Recommendation
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
