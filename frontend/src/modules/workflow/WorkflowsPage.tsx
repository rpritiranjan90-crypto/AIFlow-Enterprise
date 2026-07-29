import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Workflow,
  Plus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Grid,
  List,
  Copy,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Dropdown } from '@/components/ui/Dropdown';
import { WorkflowSummary } from '@aiflow/shared-types';

export const WorkflowsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'archived'>('all');

  const [workflows, setWorkflows] = useState<WorkflowSummary[]>([
    {
      id: 'wf_01',
      name: 'Salesforce Lead AI Enrichment Pipeline',
      description: 'Triggered on new Salesforce leads, enriches with Apollo data & sends Slack notice',
      status: 'active',
      triggerType: 'webhook',
      lastRunAt: '10 mins ago',
      executionCount: 1420,
      successRate: 99.8,
      createdAt: '2026-05-10',
    },
    {
      id: 'wf_02',
      name: 'GitHub Security Vulnerability Scanner Bot',
      description: 'Scans PRs for secret leaks and queries Anthropic Claude to post security recommendations',
      status: 'active',
      triggerType: 'event',
      lastRunAt: '1 hour ago',
      executionCount: 890,
      successRate: 100,
      createdAt: '2026-06-01',
    },
    {
      id: 'wf_03',
      name: 'Stripe Settlement to PostgreSQL Database ETL',
      description: 'Cron schedule every midnight to reconcile payment transactions into analytical warehouse',
      status: 'active',
      triggerType: 'schedule',
      lastRunAt: '8 hours ago',
      executionCount: 450,
      successRate: 98.2,
      createdAt: '2026-04-15',
    },
    {
      id: 'wf_04',
      name: 'Notion Weekly Executive Performance Digest',
      description: 'Aggregates Jira tickets & GitHub releases into an executive Notion page',
      status: 'paused',
      triggerType: 'schedule',
      lastRunAt: '3 days ago',
      executionCount: 52,
      successRate: 96.0,
      createdAt: '2026-03-20',
    },
  ]);

  const handleCreateWorkflow = () => {
    const newId = `wf_${Math.random().toString(36).substring(2, 9)}`;
    navigate(`/workflows/builder/${newId}`);
  };

  const handleDuplicate = (id: string) => {
    const target = workflows.find((w) => w.id === id);
    if (!target) return;
    const newWf: WorkflowSummary = {
      ...target,
      id: `wf_${Math.random().toString(36).substring(2, 9)}`,
      name: `${target.name} (Copy)`,
    };
    setWorkflows([newWf, ...workflows]);
  };

  const handleDelete = (id: string) => {
    setWorkflows(workflows.filter((w) => w.id !== id));
  };

  const filteredWorkflows = workflows.filter((w) => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || w.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const columns: Column<WorkflowSummary>[] = [
    {
      key: 'name',
      header: 'Workflow Name',
      render: (row) => (
        <div className="space-y-0.5 cursor-pointer" onClick={() => navigate(`/workflows/builder/${row.id}`)}>
          <div className="font-semibold text-slate-100 flex items-center gap-2 hover:text-brand-400 transition-colors">
            <Workflow className="w-4 h-4 text-brand-400" />
            <span>{row.name}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md truncate">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'triggerType',
      header: 'Trigger',
      render: (row) => <Badge variant="neutral">{row.triggerType.toUpperCase()}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        if (row.status === 'active') return <Badge variant="success">Active</Badge>;
        if (row.status === 'paused') return <Badge variant="warning">Paused</Badge>;
        return <Badge variant="error">Draft</Badge>;
      },
    },
    {
      key: 'executionCount',
      header: 'Total Runs',
      render: (row) => <span className="font-mono text-xs text-slate-300">{row.executionCount.toLocaleString()}</span>,
    },
    {
      key: 'successRate',
      header: 'Success Rate',
      render: (row) => (
        <span className="font-mono text-xs text-emerald-400 font-semibold">{row.successRate}%</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="glow" size="sm" onClick={() => navigate(`/workflows/builder/${row.id}`)}>
            Open Canvas
          </Button>
          <Dropdown
            trigger={
              <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                <MoreVertical className="w-4 h-4" />
              </button>
            }
            options={[
              { id: 'edit', label: 'Edit in Builder', icon: <Edit3 className="w-3.5 h-3.5" /> },
              { id: 'duplicate', label: 'Duplicate Workflow', icon: <Copy className="w-3.5 h-3.5" /> },
              { id: 'delete', label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true },
            ]}
            onSelect={(opt) => {
              if (opt.id === 'edit') navigate(`/workflows/builder/${row.id}`);
              if (opt.id === 'duplicate') handleDuplicate(row.id);
              if (opt.id === 'delete') handleDelete(row.id);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workflows & Automations"
        description="Build and manage enterprise automated flow pipelines and AI agent triggers"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Workflows' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />} onClick={handleCreateWorkflow}>
            New Workflow
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search workflows by name or description..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-slate-800 text-brand-400' : 'text-slate-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-brand-400' : 'text-slate-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Table columns={columns} data={filteredWorkflows} keyExtractor={(w) => w.id} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkflows.map((wf) => (
            <Card key={wf.id} glow className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="glow">{wf.triggerType.toUpperCase()}</Badge>
                  <Badge variant="success">Active</Badge>
                </div>
                <h4
                  onClick={() => navigate(`/workflows/builder/${wf.id}`)}
                  className="font-bold text-sm text-slate-100 hover:text-brand-400 cursor-pointer transition-colors"
                >
                  {wf.name}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{wf.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400">{wf.successRate}% Success</span>
                <Button variant="glow" size="sm" onClick={() => navigate(`/workflows/builder/${wf.id}`)}>
                  Open Builder
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
