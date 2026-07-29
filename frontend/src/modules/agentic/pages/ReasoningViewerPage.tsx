import React, { useState } from 'react';
import { Brain, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

const COT_STEPS = [
  { step: 1, type: 'thought', text: "Analyzing task: 'Automate Q3 Financial Close Process across 14 business units.'", status: 'done' },
  { step: 2, type: 'thought', text: 'Retrieving relevant semantic memory entries and data residency policy constraints.', status: 'done' },
  { step: 3, type: 'thought', text: 'Identifying 3 candidate execution strategies via Monte Carlo tree search (depth=4, 18 nodes explored).', status: 'done' },
  { step: 4, type: 'thought', text: 'Evaluating Strategy A: Direct API call — latency 120ms, confidence 88%.', status: 'done' },
  { step: 5, type: 'thought', text: 'Evaluating Strategy B: Batch processing — latency 340ms, confidence 96%.', status: 'done' },
  { step: 6, type: 'thought', text: 'Evaluating Strategy C: Event-driven — latency 80ms, confidence 91%.', status: 'done' },
  { step: 7, type: 'thought', text: 'Selecting Strategy B (Batch) — highest confidence score 96%.', status: 'done' },
  { step: 8, type: 'reflection', text: 'Output aligns with data residency policy (us-east-1) and PII filter. Governance check passed.', status: 'done' },
  { step: 9, type: 'critique', text: 'Potential delay risk if batch size exceeds 5,000 records — mitigated with adaptive chunk splitting.', status: 'warn' },
  { step: 10, type: 'verification', text: 'All output fields pass schema validation and business rule assertions. Final confidence: 96%.', status: 'done' },
];

const TYPE_COLORS: Record<string, string> = {
  thought: 'text-slate-300',
  reflection: 'text-cyan-300',
  critique: 'text-amber-300',
  verification: 'text-emerald-300',
};

const TYPE_LABELS: Record<string, string> = {
  thought: 'THOUGHT',
  reflection: 'REFLECTION',
  critique: 'CRITIQUE',
  verification: 'VERIFICATION',
};

export const ReasoningViewerPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="AI Reasoning Trace Viewer"
        description="Chain-of-thought abstraction, Monte Carlo tree search paths, reflection, critique, and confidence scoring timeline"
        breadcrumbs={[{ label: 'AIFlow v2.0' }, { label: 'Reasoning Viewer' }]}
      />

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-950/80 text-center p-4">
          <p className="text-2xl font-black text-brand-400">96%</p>
          <p className="text-xs text-slate-400 mt-1">Final Confidence Score</p>
        </Card>
        <Card className="bg-slate-950/80 text-center p-4">
          <p className="text-2xl font-black text-cyan-400">18</p>
          <p className="text-xs text-slate-400 mt-1">Tree Search Nodes Explored</p>
        </Card>
        <Card className="bg-slate-950/80 text-center p-4">
          <p className="text-2xl font-black text-emerald-400">Verified</p>
          <p className="text-xs text-slate-400 mt-1">Verification Result</p>
        </Card>
      </div>

      <Card glow className="space-y-3">
        <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
          <Brain className="w-4 h-4 text-brand-400" />
          Chain-of-Thought Trace — Strategic Planner Agent
        </h3>

        <div className="space-y-2">
          {COT_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => setExpanded(expanded === s.step ? null : s.step)}
              className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-500/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-bold text-slate-500 w-5 shrink-0 mt-0.5">{s.step}</span>
                <span className={`text-[10px] font-bold shrink-0 mt-0.5 ${TYPE_COLORS[s.type]}`}>
                  [{TYPE_LABELS[s.type]}]
                </span>
                <span className="text-xs text-slate-300 leading-relaxed flex-1">{s.text}</span>
                {s.status === 'warn'
                  ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                }
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
