import React, { useState } from 'react';
import { Bot, Plus, Cpu, Zap, Play, Settings2, Shield } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KpiCard } from '@/components/ui/KpiCard';

const ROLES = ['Coordinator', 'Planner', 'Research', 'Execution', 'Validation', 'Reviewer'];
const MODELS = ['openai/gpt-4o', 'anthropic/claude-3-5-sonnet', 'google/gemini-2-flash', 'meta/llama-3-70b'];

const ROLE_COLORS: Record<string, string> = {
  Coordinator: 'text-violet-400',
  Planner: 'text-brand-400',
  Research: 'text-cyan-400',
  Execution: 'text-emerald-400',
  Validation: 'text-amber-400',
  Reviewer: 'text-rose-400',
};

export const AgentStudio2Page: React.FC = () => {
  const [agents] = useState([
    { id: 'agent_coord_01', name: 'Coordinator Prime', role: 'Coordinator', model: 'openai/gpt-4o', status: 'active', tools: ['Workflow Engine', 'Agent Bus', 'Memory Store'] },
    { id: 'agent_plan_01', name: 'Strategic Planner', role: 'Planner', model: 'anthropic/claude-3-5-sonnet', status: 'active', tools: ['Goal Decomposer', 'Dependency Analyzer', 'Priority Optimizer'] },
    { id: 'agent_res_01', name: 'Deep Research', role: 'Research', model: 'google/gemini-2-flash', status: 'active', tools: ['Knowledge Base', 'Web Search', 'RAG Memory'] },
    { id: 'agent_exec_01', name: 'Execution Engine', role: 'Execution', model: 'openai/gpt-4o', status: 'busy', tools: ['SAP Connector', 'Salesforce API', 'Data Pipeline'] },
    { id: 'agent_val_01', name: 'Quality Validator', role: 'Validation', model: 'anthropic/claude-3-5-sonnet', status: 'active', tools: ['Schema Validator', 'Business Rules', 'Data Quality'] },
    { id: 'agent_rev_01', name: 'Senior Reviewer', role: 'Reviewer', model: 'openai/gpt-4o', status: 'active', tools: ['Critique Engine', 'Compliance Check', 'Approval Gate'] },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Studio 2.0 — Visual Multi-Agent Designer"
        description="Design, configure, and deploy autonomous AI agents with role assignments, tool permissions, model providers, and system prompts"
        breadcrumbs={[{ label: 'AIFlow v2.0' }, { label: 'Agent Studio 2.0' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Agent
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Registered Agents" value="6 Agents" icon={<Bot className="w-5 h-5 text-brand-400" />} trend="up" description="Full team configured" />
        <KpiCard title="Active Teams" value="2 Teams" icon={<Zap className="w-5 h-5 text-violet-400" />} trend="up" description="Running autonomously" />
        <KpiCard title="Avg Confidence" value="94.0%" icon={<Shield className="w-5 h-5 text-emerald-400" />} trend="up" description="Across all executions" />
        <KpiCard title="Model Providers" value="3 LLMs" icon={<Cpu className="w-5 h-5 text-cyan-400" />} trend="neutral" description="GPT-4o, Claude, Gemini" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {agents.map((agent) => (
          <Card key={agent.id} glow className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Bot className={`w-5 h-5 ${ROLE_COLORS[agent.role] ?? 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-100">{agent.name}</p>
                  <p className={`text-xs font-semibold ${ROLE_COLORS[agent.role] ?? 'text-slate-400'}`}>{agent.role} Agent</p>
                </div>
              </div>
              <Badge variant={agent.status === 'busy' ? 'warning' : 'success'}>
                {agent.status.toUpperCase()}
              </Badge>
            </div>

            <div className="text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 rounded-lg p-2">
              {agent.model}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {agent.tools.map((t) => (
                <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <Button variant="glow" size="sm" leftIcon={<Play className="w-3 h-3" />} className="flex-1">
                Deploy
              </Button>
              <Button variant="outline" size="sm" leftIcon={<Settings2 className="w-3 h-3" />}>
                Configure
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
