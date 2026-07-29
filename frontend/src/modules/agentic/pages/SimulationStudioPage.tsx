import React, { useState } from 'react';
import { FlaskConical, Play, CheckCircle2, AlertTriangle, BarChart3 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KpiCard } from '@/components/ui/KpiCard';

const SCENARIOS = ['Agent Sandbox', 'Business Process', 'Risk Simulation', 'Stress Test'];

const COMPLETED_SIMS = [
  { name: 'Q3 Finance Close — Agent Sandbox', type: 'Agent Sandbox', successRate: 98.5, latency: 240, failureModes: 2, healed: true, status: 'completed' },
  { name: '10x Load — EKS Cluster Stress Test', type: 'Stress Test', successRate: 96.4, latency: 380, failureModes: 1, healed: true, status: 'completed' },
  { name: 'Monte Carlo Risk — 10K Scenarios', type: 'Risk Simulation', successRate: 97.8, latency: 520, failureModes: 4, healed: true, status: 'completed' },
];

export const SimulationStudioPage: React.FC = () => {
  const [scenario, setScenario] = useState('Agent Sandbox');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<typeof COMPLETED_SIMS[0] | null>(null);

  const handleRun = () => {
    setIsRunning(true);
    setResult(null);
    setTimeout(() => {
      setIsRunning(false);
      setResult(COMPLETED_SIMS[0]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Simulation & Sandbox Studio"
        description="Configure and run agent sandbox, business process, risk simulation, and stress testing scenarios"
        breadcrumbs={[{ label: 'AIFlow v2.0' }, { label: 'Simulation Studio' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="Simulations Run" value="3 Scenarios" icon={<FlaskConical className="w-5 h-5 text-brand-400" />} trend="up" description="All scenarios passed" />
        <KpiCard title="Avg Success Rate" value="97.6%" icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} trend="up" description="Above 95% threshold" />
        <KpiCard title="Failure Modes Found" value="7 Issues" icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} trend="neutral" description="All self-healed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-5">
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-brand-400" /> Run New Simulation
          </h3>

          <div className="space-y-3">
            <label className="text-xs text-slate-400 block">Scenario Type</label>
            <div className="grid grid-cols-2 gap-2">
              {SCENARIOS.map(s => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                    scenario === s
                      ? 'bg-brand-600/20 border-brand-500 text-brand-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <Button variant="glow" isLoading={isRunning} leftIcon={<Play className="w-4 h-4" />} onClick={handleRun} className="w-full">
              Run {scenario} Simulation
            </Button>
          </div>

          {result && (
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold block">✓ Simulation Completed</span>
              <div className="flex justify-between text-slate-300">
                <span>Success Rate:</span>
                <span className="text-emerald-400 font-bold">{result.successRate}%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Avg Latency:</span>
                <span className="text-cyan-300 font-bold">{result.latency}ms</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Failure Modes Found:</span>
                <span className="text-amber-400 font-bold">{result.failureModes} (all self-healed)</span>
              </div>
            </div>
          )}
        </Card>

        <Card className="bg-slate-950/80 space-y-4">
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" /> Completed Simulation History
          </h3>
          <div className="space-y-3">
            {COMPLETED_SIMS.map(sim => (
              <div key={sim.name} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-100">{sim.name}</span>
                  <Badge variant="success">PASSED</Badge>
                </div>
                <div className="flex gap-4 text-[10px] font-mono text-slate-400">
                  <span>Success: <span className="text-emerald-400">{sim.successRate}%</span></span>
                  <span>P50: <span className="text-cyan-300">{sim.latency}ms</span></span>
                  <span>Self-Healed: <span className="text-amber-400">Yes</span></span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
