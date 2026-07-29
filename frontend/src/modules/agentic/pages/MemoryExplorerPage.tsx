import React, { useState } from 'react';
import { Database, Search, Trash2, Star, Clock } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const MEMORY_ENTRIES = [
  { id: 'mem_001', type: 'semantic', agent: 'Strategic Planner', content: 'Enterprise invoice approval workflows require human-in-the-loop for amounts exceeding $10,000.', importance: 0.95, tags: ['finance', 'approval', 'policy'], age: '2 hours ago' },
  { id: 'mem_002', type: 'episodic', agent: 'Execution Engine', content: 'On 2026-07-15, processed 1,420 vendor invoices across SAP and NetSuite with zero failures in 18 minutes.', importance: 0.88, tags: ['execution', 'finance', 'success'], age: '14 days ago' },
  { id: 'mem_003', type: 'workspace', agent: 'Strategic Planner', content: 'Current active goal: Automate Q3 Financial Close Process across 14 business units.', importance: 0.91, tags: ['goal', 'finance', 'active'], age: '1 hour ago' },
];

const TYPE_COLORS: Record<string, 'glow' | 'success' | 'warning'> = {
  semantic: 'glow',
  episodic: 'success',
  workspace: 'warning',
};

export const MemoryExplorerPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = query
    ? MEMORY_ENTRIES.filter(m => m.content.toLowerCase().includes(query.toLowerCase()))
    : MEMORY_ENTRIES;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Long-Term Memory Explorer"
        description="Semantic, episodic, workspace, and conversation memory store with vector search, importance scoring, and memory pruning"
        breadcrumbs={[{ label: 'AIFlow v2.0' }, { label: 'Memory Explorer' }]}
        actions={
          <Button variant="outline" leftIcon={<Trash2 className="w-4 h-4 text-rose-400" />}>
            Prune Low-Importance Memories
          </Button>
        }
      />

      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Semantic memory search..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-slate-200 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((m) => (
          <Card key={m.id} glow className="space-y-3">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-400 shrink-0" />
                <Badge variant={TYPE_COLORS[m.type]}>{m.type.toUpperCase()} MEMORY</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> {(m.importance * 100).toFixed(0)}% Importance</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {m.age}</span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 border border-slate-800 rounded-lg p-3">
              {m.content}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-500">Agent: <span className="text-slate-300">{m.agent}</span></span>
              <div className="flex gap-1.5">
                {m.tags.map(t => (
                  <span key={t} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-sm">
            No memory entries match "{query}"
          </div>
        )}
      </div>
    </div>
  );
};
