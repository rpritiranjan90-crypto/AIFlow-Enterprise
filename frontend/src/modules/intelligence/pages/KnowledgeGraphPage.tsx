import React from 'react';
import { Network } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const KnowledgeGraphPage: React.FC = () => {
  const nodes = [
    { type: 'User', label: 'Sarah Jenkins (Principal Architect)' },
    { type: 'Department', label: 'Finance Operations' },
    { type: 'Workflow', label: 'Salesforce Lead AI Pipeline' },
    { type: 'Agent', label: 'Salesforce Lead AI Agent' },
    { type: 'Document', label: 'Q3 Financial Audit PDF' },
    { type: 'Connector', label: 'Salesforce CRM Connector' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Knowledge Graph Explorer"
        description="Graph visualizer mapping relationships between Users, Departments, Workflows, Agents, Documents, and Connectors"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Knowledge Graph' }]}
      />

      <Card glow className="p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Network className="w-4 h-4 text-brand-400" /> Enterprise Entity Nodes & Relationships
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {nodes.map((n) => (
            <div key={n.label} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <Badge variant="glow">{n.type}</Badge>
              <span className="text-[11px] font-mono text-slate-300 block truncate">{n.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
