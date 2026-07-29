import React from 'react';
import { Bot } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { AgentMetricsRecord } from '../types/aiops';

export const AgentAnalyticsPage: React.FC = () => {
  const metrics: AgentMetricsRecord[] = [
    { id: 'agm_01', agentId: 'ag_01', agentName: 'Salesforce Lead AI Agent', executionCount: 1420, avgRuntimeMs: 840, successRate: 99.8, toolCallsCount: 2840, tokenConsumption: 4205000 },
    { id: 'agm_02', agentId: 'ag_02', agentName: 'GitHub Security Code Auditor', executionCount: 890, avgRuntimeMs: 620, successRate: 100.0, toolCallsCount: 1780, tokenConsumption: 2670000 },
  ];

  const columns: Column<AgentMetricsRecord>[] = [
    {
      key: 'agentName',
      header: 'Autonomous Agent',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.agentName}</span>
        </div>
      ),
    },
    {
      key: 'executionCount',
      header: 'Total Executions',
      render: (r) => <span className="font-mono text-xs text-slate-300">{r.executionCount.toLocaleString()}</span>,
    },
    {
      key: 'avgRuntimeMs',
      header: 'Avg Runtime',
      render: (r) => <span className="font-mono text-xs text-slate-300">{r.avgRuntimeMs} ms</span>,
    },
    {
      key: 'successRate',
      header: 'Success Rate',
      render: (r) => <span className="font-mono text-xs text-emerald-400 font-bold">{r.successRate}%</span>,
    },
    {
      key: 'toolCallsCount',
      header: 'Tool Calls Executed',
      render: (r) => <Badge variant="glow">{r.toolCallsCount.toLocaleString()}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Performance & Execution Analytics"
        description="Monitor agent execution counts, success rates, average runtime, and tool invocation counts"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Agent Analytics' }]}
      />

      <Table columns={columns} data={metrics} keyExtractor={(a) => a.id} />
    </div>
  );
};
