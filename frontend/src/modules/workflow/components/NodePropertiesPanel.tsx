import React, { useState, useEffect } from 'react';
import { X, Settings, ShieldAlert, Sliders, Code, Trash2, Power } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { useWorkflowBuilderStore } from '../store/useWorkflowBuilderStore';

export const NodePropertiesPanel: React.FC = () => {
  const { nodes, selectedNodeId, setSelectedNodeId, updateNodeData, deleteNode, toggleDisableNode } = useWorkflowBuilderStore();
  const [activeTab, setActiveTab] = useState('config');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [cron, setCron] = useState('0 * * * *');
  const [channel, setChannel] = useState('#general');
  const [retryMax, setRetryMax] = useState('3');
  const [timeoutSec, setTimeoutSec] = useState('30');

  useEffect(() => {
    if (selectedNode) {
      setName(selectedNode.data.name as string);
      setDescription(selectedNode.data.description as string);
      const cfg = (selectedNode.data.config as Record<string, any>) || {};
      setModel(cfg.model || 'gpt-4o');
      setSystemPrompt(cfg.systemPrompt || '');
      setWebhookUrl(cfg.url || 'https://api.enterprise.io/webhook');
      setCron(cfg.cron || '0 * * * *');
      setChannel(cfg.channel || '#general');
      setRetryMax(cfg.retryMax || '3');
      setTimeoutSec(cfg.timeoutSec || '30');
    }
  }, [selectedNodeId, selectedNode]);

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-slate-950/90 border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-400 z-10">
        <Settings className="w-10 h-10 text-slate-600 mb-3 animate-pulse" />
        <h4 className="text-sm font-semibold text-slate-300">No Node Selected</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          Click any node on the canvas to configure its parameters, variables, and error retry policy.
        </p>
      </aside>
    );
  }

  const handleSaveConfig = () => {
    updateNodeData(
      selectedNode.id,
      {
        model,
        systemPrompt,
        url: webhookUrl,
        cron,
        channel,
        retryMax,
        timeoutSec,
      },
      name
    );
  };

  return (
    <aside className="w-80 bg-slate-950/90 border-l border-slate-800 flex flex-col h-full text-slate-300 z-10">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Node Inspector</h3>
          <p className="text-sm font-bold text-slate-100 truncate max-w-[200px]">{name}</p>
        </div>
        <button
          onClick={() => setSelectedNodeId(null)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 border-b border-slate-800/60">
        <Tabs
          tabs={[
            { id: 'config', label: 'Params', icon: <Sliders className="w-3.5 h-3.5" /> },
            { id: 'schema', label: 'Inputs', icon: <Code className="w-3.5 h-3.5" /> },
            { id: 'retry', label: 'Retry', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'config' && (
          <div className="space-y-4">
            <Input label="Node Label" value={name} onChange={(e) => setName(e.target.value)} />

            {selectedNode.data.nodeType === 'ai_agent' && (
              <>
                <Select
                  label="LLM Foundation Model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  options={[
                    { value: 'gpt-4o', label: 'OpenAI GPT-4o (Recommended)' },
                    { value: 'claude-3-5-sonnet', label: 'Anthropic Claude 3.5 Sonnet' },
                    { value: 'gemini-1-5-pro', label: 'Google Gemini 1.5 Pro' },
                  ]}
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    System Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full rounded-lg border bg-slate-900 border-slate-800 text-slate-100 text-xs p-3 focus:border-brand-500 focus:outline-none"
                    placeholder="Enter prompt instructions for AI reasoning..."
                  />
                </div>
              </>
            )}

            {selectedNode.data.nodeType === 'webhook' && (
              <Input label="Webhook Endpoint URL" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
            )}

            {selectedNode.data.nodeType === 'schedule' && (
              <Input label="Cron Expression" value={cron} onChange={(e) => setCron(e.target.value)} helperText="Standard 5-field cron" />
            )}

            {selectedNode.data.nodeType === 'slack' && (
              <Input label="Slack Channel" value={channel} onChange={(e) => setChannel(e.target.value)} />
            )}

            <Button variant="glow" className="w-full mt-2" onClick={handleSaveConfig}>
              Apply Node Changes
            </Button>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">Input Variables Schema</h4>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] text-cyan-300 overflow-x-auto">
              {JSON.stringify({ payload: '{{$json}}', execution_id: '{{$executionId}}' }, null, 2)}
            </div>
          </div>
        )}

        {activeTab === 'retry' && (
          <div className="space-y-4">
            <Input label="Max Retry Attempts" type="number" value={retryMax} onChange={(e) => setRetryMax(e.target.value)} />
            <Input label="Execution Timeout (seconds)" type="number" value={timeoutSec} onChange={(e) => setTimeoutSec(e.target.value)} />
            <Select
              label="On Error Action"
              options={[
                { value: 'stop', label: 'Stop Workflow Immediately' },
                { value: 'continue', label: 'Continue to Next Node' },
                { value: 'fallback', label: 'Route to Fallback Edge' },
              ]}
            />
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Power className="w-3.5 h-3.5" />}
          onClick={() => toggleDisableNode(selectedNode.id)}
        >
          {selectedNode.data.isDisabled ? 'Enable' : 'Disable'}
        </Button>
        <Button
          variant="danger"
          size="sm"
          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          onClick={() => deleteNode(selectedNode.id)}
        >
          Delete
        </Button>
      </div>
    </aside>
  );
};
