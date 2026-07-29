import React from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const PolicyCenterPage: React.FC = () => {
  const rules = [
    { name: 'High-Risk AI Approval Gate', scope: 'AI Runtime & Workflows', rule: 'Require human approval for executions with AI cost > $50 or PII detection', status: 'Enforced' },
    { name: 'Data Residency US-East Requirement', scope: 'Enterprise Cloud', rule: 'Route all financial dataset execution jobs strictly through us-east-1 EKS clusters', status: 'Enforced' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Policy-as-Code Engine"
        description="Define and enforce Policy-as-Code rules across workflow executions, AI governance, connector scopes, and retention"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Policy Center' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Policy-as-Code Rule
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rules.map((r) => (
          <Card key={r.name} glow className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="glow">{r.scope}</Badge>
              <Badge variant="success">{r.status.toUpperCase()}</Badge>
            </div>
            <h3 className="font-bold text-base text-slate-100">{r.name}</h3>
            <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
              {r.rule}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
