import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const DigitalTwinPage: React.FC = () => {
  const twins = [
    { name: 'Finance Operations Department Twin', type: 'Department', health: '98%', status: 'optimal' },
    { name: 'Salesforce Lead Processing Twin', type: 'Process', health: '99%', status: 'optimal' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Digital Twin Studio"
        description="Digital Twin replicas of organizational departments, business processes, employee teams, and IT assets"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Digital Twin' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {twins.map((t) => (
          <Card key={t.name} glow className="space-y-3">
            <div className="flex justify-between items-center">
              <Badge variant="glow">{t.type}</Badge>
              <span className="font-mono text-xs text-emerald-400 font-bold">Health: {t.health}</span>
            </div>
            <h3 className="font-bold text-base text-slate-100">{t.name}</h3>
            <span className="text-xs text-slate-400 font-mono block">Status: {t.status.toUpperCase()}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};
