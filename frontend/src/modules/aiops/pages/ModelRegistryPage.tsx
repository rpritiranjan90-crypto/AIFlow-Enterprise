import React from 'react';
import { Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { AIModelRecord } from '../types/aiops';

export const ModelRegistryPage: React.FC = () => {
  const models: AIModelRecord[] = [
    { id: 'gpt-4o', name: 'OpenAI GPT-4o', provider: 'OpenAI', version: '2026-05', contextWindow: 128000, pricingPer1kInput: 0.005, pricingPer1kOutput: 0.015, status: 'available' },
    { id: 'claude-3-5-sonnet', name: 'Anthropic Claude 3.5 Sonnet', provider: 'Anthropic', version: '2026-06', contextWindow: 200000, pricingPer1kInput: 0.003, pricingPer1kOutput: 0.015, status: 'available' },
    { id: 'gemini-1-5-pro', name: 'Google Gemini 1.5 Pro', provider: 'Google', version: '1.5', contextWindow: 2000000, pricingPer1kInput: 0.00125, pricingPer1kOutput: 0.005, status: 'available' },
    { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', version: '1.0', contextWindow: 64000, pricingPer1kInput: 0.00055, pricingPer1kOutput: 0.00219, status: 'available' },
  ];

  const columns: Column<AIModelRecord>[] = [
    {
      key: 'name',
      header: 'Model Name',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'provider',
      header: 'Provider',
      render: (r) => <Badge variant="glow">{r.provider}</Badge>,
    },
    {
      key: 'contextWindow',
      header: 'Context Window',
      render: (r) => <span className="font-mono text-xs text-cyan-300">{(r.contextWindow / 1000).toLocaleString()}k tokens</span>,
    },
    {
      key: 'pricingPer1kInput',
      header: 'Input / Output Pricing',
      render: (r) => <span className="font-mono text-xs text-slate-300">${r.pricingPer1kInput} / ${r.pricingPer1kOutput} per 1k</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="success">{r.status}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Centralized AI Model Registry"
        description="Catalog of verified foundation models, context window capacities, and provider pricing tiers"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Model Registry' }]}
      />

      <Table columns={columns} data={models} keyExtractor={(m) => m.id} />
    </div>
  );
};
