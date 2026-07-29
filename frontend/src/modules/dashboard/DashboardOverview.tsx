import React from 'react';
import {
  Bot,
  Workflow,
  Activity,
  Clock,
  Blocks,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Plus,
  ArrowUpRight,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ExecutionRecord {
  id: string;
  workflowName: string;
  trigger: string;
  duration: string;
  status: 'success' | 'failed' | 'running';
  timestamp: string;
  aiTokens: number;
}

export const DashboardOverview: React.FC = () => {
  const kpis = [
    {
      title: 'Active AI Agents',
      value: '18 Agents',
      changePercent: 12.5,
      trend: 'up' as const,
      icon: <Bot className="w-5 h-5 text-brand-400" />,
      badgeText: 'Autonomous',
      badgeVariant: 'glow' as const,
    },
    {
      title: 'Running Automations',
      value: '142 Active',
      changePercent: 8.4,
      trend: 'up' as const,
      icon: <Workflow className="w-5 h-5 text-cyan-400" />,
      badgeText: 'Operational',
      badgeVariant: 'info' as const,
    },
    {
      title: 'API Calls Today',
      value: '1,428,900',
      changePercent: 24.1,
      trend: 'up' as const,
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      badgeText: 'High Volume',
      badgeVariant: 'success' as const,
    },
    {
      title: 'Avg Execution Time',
      value: '420 ms',
      changePercent: -15.2,
      trend: 'up' as const, // reduction is good!
      icon: <Clock className="w-5 h-5 text-indigo-400" />,
      badgeText: 'Sub-second',
      badgeVariant: 'info' as const,
    },
    {
      title: 'Connected Integrations',
      value: '24 Apps',
      changePercent: 4.0,
      trend: 'up' as const,
      icon: <Blocks className="w-5 h-5 text-amber-400" />,
      badgeText: 'Verified',
      badgeVariant: 'success' as const,
    },
    {
      title: 'Monthly AI Cost',
      value: '$3,840.50',
      changePercent: -5.8,
      trend: 'up' as const,
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      badgeText: 'Under Budget',
      badgeVariant: 'success' as const,
    },
    {
      title: 'Error Trends',
      value: '0.04%',
      changePercent: -0.02,
      trend: 'up' as const,
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      badgeText: 'Ultra Low',
      badgeVariant: 'success' as const,
    },
    {
      title: 'System Health',
      value: '99.99%',
      changePercent: 0,
      trend: 'neutral' as const,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      badgeText: '100% Uptime',
      badgeVariant: 'success' as const,
    },
  ];

  const recentExecutions: ExecutionRecord[] = [
    {
      id: 'exec_9901',
      workflowName: 'Salesforce Lead AI Enrichment & Slack Broadcast',
      trigger: 'Webhook',
      duration: '1.2s',
      status: 'success',
      timestamp: '2 mins ago',
      aiTokens: 1450,
    },
    {
      id: 'exec_9902',
      workflowName: 'GitHub Pull Request AI Security Scanner',
      trigger: 'GitHub Event',
      duration: '840ms',
      status: 'success',
      timestamp: '5 mins ago',
      aiTokens: 3200,
    },
    {
      id: 'exec_9903',
      workflowName: 'Stripe Invoice Settlement to PostgreSQL DB',
      trigger: 'Schedule',
      duration: '3.1s',
      status: 'failed',
      timestamp: '12 mins ago',
      aiTokens: 0,
    },
    {
      id: 'exec_9904',
      workflowName: 'Notion Executive Weekly Summary Digest Generator',
      trigger: 'Schedule',
      duration: '4.5s',
      status: 'running',
      timestamp: 'Just now',
      aiTokens: 5800,
    },
    {
      id: 'exec_9905',
      workflowName: 'HubSpot Contact Sync & Deduplication Agent',
      trigger: 'Manual',
      duration: '950ms',
      status: 'success',
      timestamp: '28 mins ago',
      aiTokens: 910,
    },
  ];

  const executionColumns: Column<ExecutionRecord>[] = [
    {
      key: 'workflowName',
      header: 'Workflow / Agent Pipeline',
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-100 block">{row.workflowName}</span>
          <span className="text-xs text-slate-400">ID: {row.id}</span>
        </div>
      ),
    },
    {
      key: 'trigger',
      header: 'Trigger',
      render: (row) => <Badge variant="neutral">{row.trigger}</Badge>,
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (row) => <span className="font-mono text-slate-300">{row.duration}</span>,
    },
    {
      key: 'aiTokens',
      header: 'AI Tokens',
      render: (row) => (
        <span className="font-mono text-xs text-brand-400 font-medium">
          {row.aiTokens > 0 ? `${row.aiTokens.toLocaleString()} tokens` : '-'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        if (row.status === 'success') return <Badge variant="success">Success</Badge>;
        if (row.status === 'failed') return <Badge variant="error">Failed</Badge>;
        return <Badge variant="warning">Running...</Badge>;
      },
    },
    {
      key: 'timestamp',
      header: 'Time',
      render: (row) => <span className="text-slate-400 text-xs">{row.timestamp}</span>,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <PageHeader
        title="Enterprise Intelligence Dashboard"
        description="Real-time performance metrics, AI token allocations, and active automation pipelines"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Dashboard' }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}>
              Deploy AI Agent
            </Button>
            <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
              New Automation
            </Button>
          </div>
        }
      />

      {/* 8 Enterprise KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Middle Section: Execution Stream & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Execution Log Table (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader
            title="Recent Execution Streams"
            subtitle="Live logs of active automations across your enterprise workspace"
            rightSlot={
              <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                View All Executions
              </Button>
            }
          />
          <Table
            columns={executionColumns}
            data={recentExecutions}
            keyExtractor={(r) => r.id}
          />
        </div>

        {/* Right Side Widgets (1 Col) */}
        <div className="space-y-6">
          {/* Active AI Agent Performance Widget */}
          <Card glow className="space-y-4">
            <SectionHeader
              title="AI Agent Intelligence"
              subtitle="Autonomous multi-step execution health"
            />
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Customer Support Agent</p>
                    <p className="text-[10px] text-slate-400">GPT-4o + Vector Search</p>
                  </div>
                </div>
                <Badge variant="success">99.4% Acc</Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Lead Enrichment Agent</p>
                    <p className="text-[10px] text-slate-400">Claude 3.5 Sonnet</p>
                  </div>
                </div>
                <Badge variant="glow">Active</Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Code Security Auditor</p>
                    <p className="text-[10px] text-slate-400">Gemini 1.5 Pro</p>
                  </div>
                </div>
                <Badge variant="info">Idle</Badge>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="space-y-3 bg-gradient-to-br from-slate-900 to-brand-950/40 border-brand-500/20">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" /> Quick Enterprise Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-brand-500/50 transition-colors">
                <span className="font-semibold block text-slate-200">Connect Webhook</span>
                <span className="text-[10px] text-slate-400">HTTP REST Endpoint</span>
              </button>
              <button className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-brand-500/50 transition-colors">
                <span className="font-semibold block text-slate-200">Add API Credentials</span>
                <span className="text-[10px] text-slate-400">Encrypted Key Vault</span>
              </button>
              <button className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-brand-500/50 transition-colors">
                <span className="font-semibold block text-slate-200">Invite Team Member</span>
                <span className="text-[10px] text-slate-400">RBAC Role Manager</span>
              </button>
              <button className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left hover:border-brand-500/50 transition-colors">
                <span className="font-semibold block text-slate-200">Audit Logs</span>
                <span className="text-[10px] text-slate-400">Compliance Stream</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
