import React, { useState } from 'react';
import { Sliders, Play, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ScenarioSimulatorPage: React.FC = () => {
  const [hiringHeadcount, setHiringHeadcount] = useState(5);
  const [pricingChange, setPricingChange] = useState(10);
  const [aiBudgets, setAiBudgets] = useState(5000);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      const revImpact = pricingChange * 48200 + hiringHeadcount * 120000;
      const costDelta = hiringHeadcount * 85000 + aiBudgets * 0.2;
      const roi = ((revImpact - costDelta) / costDelta) * 100;

      setSimResult({
        revImpact: `$${revImpact.toLocaleString()}`,
        costDelta: `$${costDelta.toLocaleString()}`,
        roi: `${roi.toFixed(1)}%`,
        recommendation: `Proceed with +${hiringHeadcount} hiring headcount and ${pricingChange}% pricing adjustment. Projected Net ROI is ${roi.toFixed(1)}%.`,
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Monte Carlo What-If Scenario Simulator"
        description="Simulate hiring adjustments, pricing changes, demand shifts, and AI infrastructure budget allocations"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Scenario Simulator' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-6">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-400" /> Simulation Input Parameters
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Engineering Hiring Headcount Delta</span>
                <span className="text-brand-400 font-bold">+{hiringHeadcount} Headcount</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={hiringHeadcount}
                onChange={(e) => setHiringHeadcount(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">SaaS Pricing Adjustment (%)</span>
                <span className="text-emerald-400 font-bold">+{pricingChange}%</span>
              </div>
              <input
                type="range"
                min="-20"
                max="50"
                value={pricingChange}
                onChange={(e) => setPricingChange(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300">Monthly AI Compute Budget Cap</span>
                <span className="text-cyan-300 font-bold">${aiBudgets.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={aiBudgets}
                onChange={(e) => setAiBudgets(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          <Button variant="glow" isLoading={isSimulating} leftIcon={<Play className="w-4 h-4" />} onClick={handleRunSimulation}>
            Run What-If Monte Carlo Simulation
          </Button>
        </Card>

        <Card className="space-y-4 bg-slate-950/80">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Simulation Results & Impact
          </h3>

          {simResult ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Revenue Impact</span>
                  <span className="text-emerald-400 font-bold text-sm">{simResult.revImpact}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Cost Delta</span>
                  <span className="text-slate-200 font-bold text-sm">{simResult.costDelta}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Net ROI</span>
                  <span className="text-brand-400 font-bold text-sm">{simResult.roi}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                <span className="font-bold text-slate-100 block mb-1">AI Decision Summary:</span>
                {simResult.recommendation}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Adjust sliders and click "Run What-If Monte Carlo Simulation" to compute projections.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
