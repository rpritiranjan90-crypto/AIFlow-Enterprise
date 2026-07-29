import React, { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { FeatureFlagRecord } from '../types/cloud';

export const FeatureFlagsPage: React.FC = () => {
  const [flags, setFlags] = useState<FeatureFlagRecord[]>([
    { id: 'ff_canary_v2', flagKey: 'ENABLE_CANARY_ROUTING', isEnabled: true, description: 'Enables Envoy Canary traffic splitting across regions', percentageRollout: 100 },
    { id: 'ff_vector_rag_v2', flagKey: 'ENABLE_VECTOR_RAG_V2', isEnabled: true, description: 'Enables PgVector HNSW indexing algorithm', percentageRollout: 50 },
  ]);

  const toggleFlag = (id: string) => {
    setFlags(flags.map((f) => (f.id === id ? { ...f, isEnabled: !f.isEnabled } : f)));
  };

  const columns: Column<FeatureFlagRecord>[] = [
    {
      key: 'flagKey',
      header: 'Feature Flag Key',
      render: (r) => <span className="font-mono font-bold text-slate-100">{r.flagKey}</span>,
    },
    {
      key: 'description',
      header: 'Description',
      render: (r) => <span className="text-xs text-slate-300">{r.description}</span>,
    },
    {
      key: 'percentageRollout',
      header: 'Rollout Target',
      render: (r) => <Badge variant="glow">{r.percentageRollout}% Traffic</Badge>,
    },
    {
      key: 'isEnabled',
      header: 'Runtime Toggle',
      render: (r) => (
        <button onClick={() => toggleFlag(r.id)} className="focus:outline-none">
          {r.isEnabled ? (
            <ToggleRight className="w-8 h-8 text-emerald-400" />
          ) : (
            <ToggleLeft className="w-8 h-8 text-slate-600" />
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Feature Flags & Runtime Configuration"
        description="Toggle runtime features, control percentage rollouts, and configure regional overrides"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Feature Flags' }]}
      />

      <Table columns={columns} data={flags} keyExtractor={(f) => f.id} />
    </div>
  );
};
