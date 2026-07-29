import React from 'react';
import { Network, Zap, CheckCircle2, Play, ArrowRight, Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KpiCard } from '@/components/ui/KpiCard';

const PIPELINE = [
  { role: 'Coordinator', status: 'completed', latency: '42ms', confidence: '99%', color: 'text-violet-400', border: 'border-violet-500/30' },
  { role: 'Planner', status: 'completed', latency: '280ms', confidence: '97%', color: 'text-brand-400', border: 'border-brand-500/30' },
  { role: 'Research', status: 'completed', latency: '620ms', confidence: '95%', color: 'text-cyan-400', border: 'border-cyan-500/30' },
  { role: 'Execution', status: 'running', latency: '—', confidence: '—', color: 'text-emerald-400', border: 'border-emerald-500/40' },
  { role: 'Validation', status: 'pending', latency: '—', confidence: '—', color: 'text-amber-400', border: 'border-amber-500/20' },
  { role: 'Reviewer', status: 'pending', latency: '—', confidence: '—', color: 'text-rose-400', border: 'border-rose-500/20' },
];

const TEAMS = [
  { name: 'Autonomous Finance Operations Team', goal: 'Automate Q3 Financial Close across 14 BUs', status: 'completed', agents: 6, executions: 8420 },
  { name: 'HR Onboarding Automation Team', goal: 'Fully automate new-hire onboarding for 200 hires', status: 'running', agents: 4, executions: 2140 },
];

export const MultiAgentDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-Agent Collaboration Dashboard"
        description="Real-time agent team orchestration — pipeline telemetry, delegation graph, and agent-to-agent messaging bus"
        breadcrumbs={[{ label: 'AIFlow v2.0' }, { label: 'Multi-Agent Dashboard' }]}
        actions={
          <Button variant="glow" leftIcon={<Play className="w-4 h-4" />}>
            Launch New Agent Team
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KpiCard title="Active Agent Teams" value="2 Teams" icon={<Network className="w-5 h-5 text-brand-400" />} trend="up" description="Running autonomously" />
        <KpiCard title="Total Executions" value="14,820" icon={<Activity className="w-5 h-5 text-cyan-400" />} trend="up" description="Across all agent teams" />
        <KpiCard title="Self-Healing Triggered" value="42 Times" icon={<Zap className="w-5 h-5 text-amber-400" />} trend="neutral" description="Auto-recovered" />
        <KpiCard title="Human Interventions" value="0" icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} trend="up" description="Fully autonomous" />
      </div>

      {/* Live Pipeline Visualization */}
      <Card glow className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Network className="w-4 h-4 text-brand-400" />
          Live Agent Pipeline — Finance Operations Team
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {PIPELINE.map((step, i) => (
            <React.Fragment key={step.role}>
              <div className={`flex-1 min-w-[120px] p-3 rounded-xl bg-slate-950 border ${step.border} space-y-1.5`}>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${step.color}`}>{step.role}</span>
                  <Badge variant={step.status === 'completed' ? 'success' : step.status === 'running' ? 'warning' : 'neutral'}>
                    {step.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Latency: {step.latency}</span>
                  <span>Conf: {step.confidence}</span>
                </div>
              </div>
              {i < PIPELINE.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TEAMS.map((team) => (
          <Card key={team.name} glow className="space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-sm text-slate-100 leading-snug">{team.name}</h3>
              <Badge variant={team.status === 'completed' ? 'success' : 'warning'}>
                {team.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-slate-400">{team.goal}</p>
            <div className="flex gap-4 text-xs font-mono text-slate-300">
              <span><span className="text-brand-400 font-bold">{team.agents}</span> Agents</span>
              <span><span className="text-emerald-400 font-bold">{team.executions.toLocaleString()}</span> Executions</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
