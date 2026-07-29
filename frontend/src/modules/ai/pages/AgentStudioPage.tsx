import React, { useState } from 'react';
import { Bot, Play, Sparkles, Sliders, Users, CheckCircle2, Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';

export const AgentStudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [promptInput, setPromptInput] = useState('Audit git pull request #142 for potential secret leaks and SQL injection risks.');
  const [model, setModel] = useState('gpt-4o');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<any>(null);

  const handleTestAgent = () => {
    setIsExecuting(true);
    setExecutionOutput(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput({
        agent_name: 'Autonomous Code Security Auditor',
        model: model === 'gpt-4o' ? 'OpenAI GPT-4o' : 'Anthropic Claude 3.5 Sonnet',
        status: 'completed',
        reasoning_steps: [
          '1. Initialized Agent Runtime state machine',
          '2. Extracted PR diff payload from git commit hook',
          '3. Queried vector memory for SOC2 security guidelines',
          '4. Evaluated AST code tree: 0 hardcoded secrets found',
          '5. Formatted automated security approval comment',
        ],
        citations: [
          { doc: 'SOC2_Compliance_Security_Guardrails.docx', score: '0.94' },
          { doc: 'API_Integration_Playbook.md', score: '0.88' },
        ],
        output: `### AI Security Audit Summary\n\n✅ **PASSED**: Pull Request #142 adheres to enterprise security standards.\n- Zero secret tokens or API keys exposed.\n- SQL queries utilize parameterized statements.`,
      });
    }, 900);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Agent Studio & Playground"
        description="Design, test, and orchestrate autonomous multi-modal LLM reasoning agents"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'AI Agent Studio' }]}
        actions={
          <Button variant="glow" leftIcon={<Sparkles className="w-4 h-4" />}>
            Create Agent
          </Button>
        }
      />

      <Tabs
        tabs={[
          { id: 'single', label: 'Agent Playground', icon: <Bot className="w-4 h-4" /> },
          { id: 'multi', label: 'Multi-Agent Collaboration', icon: <Users className="w-4 h-4" />, count: 5 },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'single' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Config Card */}
          <Card glow className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-400" /> Agent Parameters
            </h3>

            <Select
              label="Foundation LLM Provider & Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              options={[
                { value: 'gpt-4o', label: 'OpenAI GPT-4o (High Reasoning)' },
                { value: 'claude-3-5-sonnet', label: 'Anthropic Claude 3.5 Sonnet' },
                { value: 'gemini-1-5-pro', label: 'Google Gemini 1.5 Pro' },
                { value: 'ollama-llama-3', label: 'Local Ollama (Llama 3.1 70B)' },
              ]}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Agent System Instructions
              </label>
              <textarea
                rows={3}
                defaultValue="You are an autonomous AI Agent in AIFlow Enterprise. Execute reasoning and call tools when needed."
                className="w-full rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs p-3 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Test Prompt Payload
              </label>
              <textarea
                rows={3}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs p-3 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <Button
              variant="glow"
              className="w-full py-3"
              isLoading={isExecuting}
              leftIcon={<Play className="w-4 h-4" />}
              onClick={handleTestAgent}
            >
              Run Agent Test Loop
            </Button>
          </Card>

          {/* Right Execution Output Card */}
          <Card className="space-y-4 bg-slate-950/80">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Reasoning Output & Telemetry
            </h3>

            {isExecuting ? (
              <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
                <div className="w-10 h-10 rounded-full border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
                <p className="text-xs text-slate-400 animate-pulse">Running agent reasoning and tool calling loop...</p>
              </div>
            ) : executionOutput ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Reasoning Chain</span>
                  <div className="space-y-1 font-mono text-xs text-slate-300">
                    {executionOutput.reasoning_steps.map((step: string, idx: number) => (
                      <p key={idx}>{step}</p>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-brand-500/30 shadow-glow space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Output Result</span>
                  <div className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                    {executionOutput.output}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-slate-500">
                Click "Run Agent Test Loop" to execute reasoning and inspect tool calls.
              </div>
            )}
          </Card>
        </div>
      ) : (
        /* Multi-Agent Collaboration View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card glow className="space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant="glow">Coordinator</Badge>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Coordinator Agent</h4>
            <p className="text-xs text-slate-400">Decomposes multi-step tasks into sub-goal assignments</p>
          </Card>

          <Card glow className="space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant="info">Research</Badge>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">RAG Vector Search Agent</h4>
            <p className="text-xs text-slate-400">Queries knowledge bases for exact citations</p>
          </Card>

          <Card glow className="space-y-2">
            <div className="flex justify-between items-center">
              <Badge variant="success">Execution</Badge>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100">Tool Executor Agent</h4>
            <p className="text-xs text-slate-400">Dispatches API webhooks & database updates</p>
          </Card>
        </div>
      )}
    </div>
  );
};
