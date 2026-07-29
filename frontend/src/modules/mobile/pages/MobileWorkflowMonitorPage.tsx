import React from 'react';
import { Play } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const MobileWorkflowMonitorPage: React.FC = () => {
  const workflows = [
    { id: 'wf_mobile_01', name: 'Mobile Receipt Scanner & Expense Approval', type: 'OCR & Mobile', status: 'active' },
    { id: 'wf_mobile_02', name: 'Field Technician Inspection Pipeline', type: 'Mobile', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mobile Workflow Monitor & Execution"
        description="Touch-friendly workflow monitor for inspecting active executions and launching mobile workflows"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Mobile Workflows' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((wf) => (
          <Card key={wf.id} glow className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="glow">{wf.type}</Badge>
              <Badge variant="success">ACTIVE</Badge>
            </div>
            <h3 className="font-bold text-base text-slate-100">{wf.name}</h3>
            <Button variant="glow" size="sm" leftIcon={<Play className="w-3.5 h-3.5" />}>
              Trigger Mobile Execution
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
