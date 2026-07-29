import React from 'react';
import { Clock, CheckCircle2, Zap } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const TIMELINE = [
  { t: '14:01:02', agent: 'Coordinator', action: 'Received goal: Automate Q3 Financial Close across 14 BUs', status: 'completed', latency: '42ms', confidence: null },
  { t: '14:01:04', agent: 'Planner', action: 'Decomposed goal into 5 subtasks, built dependency graph', status: 'completed', latency: '280ms', confidence: '97%' },
  { t: '14:01:09', agent: 'Research', action: 'Retrieved 12 semantic memory entries, fetched SAP schema', status: 'completed', latency: '620ms', confidence: '95%' },
  { t: '14:01:15', agent: 'Execution', action: 'Invoked SAP Batch API — 1,420 invoices posted to GL', status: 'completed', latency: '6,200ms', confidence: '94%' },
  { t: '14:01:21', agent: 'Execution', action: 'Self-healing triggered — retry on SAP timeout (attempt 1)', status: 'healed', latency: '820ms', confidence: null },
  { t: '14:01:23', agent: 'Validation', action: 'Schema validation passed, 0 reconciliation errors detected', status: 'completed', latency: '380ms', confidence: '99%' },
  { t: '14:01:24', agent: 'Reviewer', action: 'Critique: output compliant. Confidence 96%. Approved.', status: 'completed', latency: '240ms', confidence: '96%' },
];

const STATUS_CONFIG: Record<string, { badge: 'success' | 'warning' | 'glow'; icon: React.ReactNode }> = {
  completed: { badge: 'success', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
  healed:    { badge: 'warning', icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
};

const AGENT_COLORS: Record<string, string> = {
  Coordinator: 'text-violet-400',
  Planner: 'text-brand-400',
  Research: 'text-cyan-400',
  Execution: 'text-emerald-400',
  Validation: 'text-amber-400',
  Reviewer: 'text-rose-400',
};

export const ExecutionTimelinePage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Multi-Agent Execution Timeline"
        description="Chronological step-level telemetry across all agents — latency, confidence, self-healing events, and delegation trace"
        breadcrumbs={[{ label: 'AIFlow v2.0' }, { label: 'Execution Timeline' }]}
      />

      <Card glow className="space-y-2">
        <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-brand-400" />
          Finance Operations Team — Execution #aexec_9901a2b3c4d5
        </h3>

        <div className="relative space-y-3">
          {/* Vertical guide line */}
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-slate-800 z-0" />

          {TIMELINE.map((ev, idx) => {
            const cfg = STATUS_CONFIG[ev.status];
            return (
              <div key={idx} className="flex items-start gap-4 relative z-10">
                {/* Timestamp */}
                <span className="text-[10px] font-mono text-slate-500 w-20 shrink-0 pt-3">{ev.t}</span>

                {/* Node dot */}
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 border border-slate-700 shrink-0 mt-2.5">
                  {cfg.icon}
                </div>

                {/* Content */}
                <div className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 hover:border-slate-600 transition-colors">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className={`text-xs font-bold ${AGENT_COLORS[ev.agent] ?? 'text-slate-300'}`}>
                      {ev.agent} Agent
                    </span>
                    <div className="flex items-center gap-2">
                      {ev.confidence && (
                        <span className="text-[10px] font-mono text-slate-400">
                          Conf: <span className="text-brand-400">{ev.confidence}</span>
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-500">{ev.latency}</span>
                      <Badge variant={cfg.badge}>
                        {ev.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{ev.action}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
