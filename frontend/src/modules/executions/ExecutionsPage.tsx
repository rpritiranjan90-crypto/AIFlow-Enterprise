import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Play, Search } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { WorkflowRunDialog } from './components/WorkflowRunDialog';

interface LogRecord {
  id: string;
  workflowName: string;
  trigger: string;
  startedAt: string;
  duration: string;
  status: 'success' | 'failed' | 'running';
  payload: string;
}

export const ExecutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLog, setSelectedLog] = useState<LogRecord | null>(null);
  const [isRunDialogOpen, setIsRunDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [logs, setLogs] = useState<LogRecord[]>([
    {
      id: 'exec_8801',
      workflowName: 'Salesforce Lead AI Enrichment Pipeline',
      trigger: 'Webhook Event',
      startedAt: '2026-07-29 12:20:14',
      duration: '1,240 ms',
      status: 'success',
      payload: JSON.stringify({ lead_id: 'lead_9921', email: 'cto@enterprise.io', score: 98 }, null, 2),
    },
    {
      id: 'exec_8802',
      workflowName: 'GitHub Vulnerability Scanner Bot',
      trigger: 'PR Commit Hook',
      startedAt: '2026-07-29 12:15:02',
      duration: '840 ms',
      status: 'success',
      payload: JSON.stringify({ pr_number: 142, repo: 'aiflow/core', vulnerabilities_found: 0 }, null, 2),
    },
    {
      id: 'exec_8803',
      workflowName: 'Stripe Invoice Settlement ETL',
      trigger: 'Cron Midnight Schedule',
      startedAt: '2026-07-29 12:00:00',
      duration: '3,100 ms',
      status: 'failed',
      payload: JSON.stringify({ error: 'PostgreSQL connection timeout (5000ms)', retry_count: 3 }, null, 2),
    },
  ]);

  const handleRunSubmit = (payload: Record<string, any>) => {
    const newExec: LogRecord = {
      id: `exec_${Math.random().toString(36).substring(2, 8)}`,
      workflowName: 'Manual Trigger Execution',
      trigger: 'Manual API',
      startedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      duration: '920 ms',
      status: 'success',
      payload: JSON.stringify(payload, null, 2),
    };
    setLogs([newExec, ...logs]);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) || log.id.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'success') return matchesSearch && log.status === 'success';
    if (activeTab === 'failed') return matchesSearch && log.status === 'failed';
    return matchesSearch;
  });

  const columns: Column<LogRecord>[] = [
    {
      key: 'id',
      header: 'Execution ID',
      render: (r) => (
        <span
          onClick={() => navigate(`/executions/monitor/${r.id}`)}
          className="font-mono text-xs font-semibold text-brand-400 hover:underline cursor-pointer"
        >
          {r.id}
        </span>
      ),
    },
    {
      key: 'workflowName',
      header: 'Workflow',
      render: (r) => <span className="font-medium text-slate-100">{r.workflowName}</span>,
    },
    {
      key: 'trigger',
      header: 'Trigger',
      render: (r) => <Badge variant="neutral">{r.trigger}</Badge>,
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (r) => <span className="font-mono text-xs text-slate-300">{r.duration}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        r.status === 'success' ? <Badge variant="success">Success</Badge> : <Badge variant="error">Failed</Badge>
      ),
    },
    {
      key: 'startedAt',
      header: 'Timestamp',
      render: (r) => <span className="text-xs text-slate-400">{r.startedAt}</span>,
    },
    {
      key: 'actions',
      header: 'Telemetry',
      render: (r) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => navigate(`/executions/monitor/${r.id}`)}
          >
            Live Monitor
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Execution Telemetry & Logs"
        description="Detailed runtime telemetry, WebSockets streaming, and payload diagnostics for all automated runs"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Executions' }]}
        actions={
          <Button variant="glow" leftIcon={<Play className="w-4 h-4 text-emerald-400" />} onClick={() => setIsRunDialogOpen(true)}>
            Trigger Test Run
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs
          tabs={[
            { id: 'all', label: 'All Executions', count: logs.length },
            { id: 'success', label: 'Successful', count: logs.filter((l) => l.status === 'success').length },
            { id: 'failed', label: 'Failed', count: logs.filter((l) => l.status === 'failed').length },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="w-full sm:w-64">
          <Input
            placeholder="Search execution IDs..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table columns={columns} data={filteredLogs} keyExtractor={(l) => l.id} />

      <WorkflowRunDialog
        isOpen={isRunDialogOpen}
        onClose={() => setIsRunDialogOpen(false)}
        onRun={handleRunSubmit}
      />
    </div>
  );
};
