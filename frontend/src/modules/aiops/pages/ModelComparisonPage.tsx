import React, { useState } from 'react';
import { Sliders, Play, Trophy } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ComparisonItemRecord } from '../types/aiops';

export const ModelComparisonPage: React.FC = () => {
  const [promptText, setPromptText] = useState('Synthesize an executive summary of our Q3 SOC2 compliance audit results.');
  const [isComparing, setIsComparing] = useState(false);
  const [results, setResults] = useState<ComparisonItemRecord[] | null>(null);

  const handleRunComparison = () => {
    setIsComparing(true);
    setResults(null);

    setTimeout(() => {
      setIsComparing(false);
      setResults([
        {
          model: 'gpt-4o',
          provider: 'OpenAI',
          outputText: 'Q3 SOC2 Audit Summary:\n- 100% control criteria met across security, availability, and confidentiality.\n- Zero critical vulnerability findings in penetration testing.',
          latencyMs: 410,
          tokensUsed: 142,
          costUsd: 0.0048,
          groundednessScore: 0.96,
        },
        {
          model: 'claude-3-5-sonnet',
          provider: 'Anthropic',
          outputText: 'Executive SOC2 Assessment:\n- Verified encryption standards (AES-256) and multi-factor authentication enforcement.\n- Recommended updating quarterly access reviews.',
          latencyMs: 480,
          tokensUsed: 158,
          costUsd: 0.0052,
          groundednessScore: 0.98,
        },
        {
          model: 'gemini-1-5-pro',
          provider: 'Google',
          outputText: 'Compliance Overview:\n- All core SOC2 Trust Services Criteria verified clean with zero audit exceptions.',
          latencyMs: 320,
          tokensUsed: 120,
          costUsd: 0.0024,
          groundednessScore: 0.95,
        },
      ]);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Side-by-Side Model Comparison Benchmark"
        description="Run identical prompt payloads across OpenAI, Anthropic, Gemini, and DeepSeek to compare latency, cost, and quality"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Model Comparison' }]}
      />

      <Card glow className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brand-400" /> Benchmark Prompt Input
        </h3>

        <div className="space-y-1.5">
          <textarea
            rows={3}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs p-3 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <Button
          variant="glow"
          isLoading={isComparing}
          leftIcon={<Play className="w-4 h-4" />}
          onClick={handleRunComparison}
        >
          Run Multi-LLM Benchmark Test
        </Button>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((res, i) => (
            <Card key={i} glow={res.model === 'gemini-1-5-pro'} className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={res.model === 'gemini-1-5-pro' ? 'success' : 'glow'}>{res.provider}</Badge>
                  {res.model === 'gemini-1-5-pro' && (
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" /> Lowest Cost
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-slate-100">{res.model}</h4>
                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-line font-sans">
                  {res.outputText}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-1 text-center font-mono text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[9px]">Latency</span>
                  <span className="text-slate-200">{res.latencyMs} ms</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px]">Tokens</span>
                  <span className="text-slate-200">{res.tokensUsed}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px]">Cost</span>
                  <span className="text-emerald-400 font-bold">${res.costUsd}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
