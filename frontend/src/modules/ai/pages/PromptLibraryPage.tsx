import React, { useState } from 'react';
import { Plus, Search, Copy } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PromptItem } from '../types/ai';

export const PromptLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSystemPrompt, setNewSystemPrompt] = useState('');

  const [prompts, setPrompts] = useState<PromptItem[]>([
    {
      id: 'pmpt_01',
      name: 'Salesforce Lead Enrichment System Prompt',
      category: 'Agent',
      systemPrompt: 'You are an expert enterprise sales intelligence agent. Extract company size, revenue, and technology stack.',
      userPrompt: 'Enrich lead {{lead_name}} from {{company}}.',
      variables: ['lead_name', 'company'],
      version: '1.2.0',
      createdAt: '2026-06-15',
    },
    {
      id: 'pmpt_02',
      name: 'Code Vulnerability Scanner Prompt',
      category: 'Classifier',
      systemPrompt: 'You are a senior security engineer. Scan git diffs for hardcoded secrets, API tokens, and SQL injections.',
      userPrompt: 'Analyze commit diff:\n{{diff}}',
      variables: ['diff'],
      version: '1.0.0',
      createdAt: '2026-07-01',
    },
    {
      id: 'pmpt_03',
      name: 'Executive Weekly Summary Summarizer',
      category: 'Summarizer',
      systemPrompt: 'Summarize key engineering milestones, Jira blockers, and deployment stats in bullet points.',
      variables: ['tickets'],
      version: '1.1.0',
      createdAt: '2026-05-20',
    },
  ]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newPmpt: PromptItem = {
      id: `pmpt_${Math.random().toString(36).substring(2, 8)}`,
      name: newTitle,
      category: 'Agent',
      systemPrompt: newSystemPrompt || 'You are a helpful enterprise AI assistant.',
      variables: ['input_data'],
      version: '1.0.0',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPrompts([newPmpt, ...prompts]);
    setNewTitle('');
    setNewSystemPrompt('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Prompt Library"
        description="Version-controlled prompt templates, system instructions, and variable dynamic bindings"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Prompt Library' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Create Prompt Template
          </Button>
        }
      />

      <div className="max-w-md">
        <Input
          placeholder="Search prompts by name or category..."
          leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts
          .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((pmpt) => (
            <Card key={pmpt.id} glow className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="glow">{pmpt.category}</Badge>
                  <span className="text-[10px] font-mono text-slate-400">v{pmpt.version}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-100">{pmpt.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{pmpt.systemPrompt}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {pmpt.variables.map((v) => (
                    <span key={v} className="px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 text-cyan-400 rounded">
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[10px] text-slate-500">{pmpt.createdAt}</span>
                  <Button variant="outline" size="sm" leftIcon={<Copy className="w-3.5 h-3.5" />}>
                    Copy Prompt
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Prompt Template"
        description="Store reusable system instructions for AI Agents and workflow nodes."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 mt-2">
          <Input
            label="Template Title"
            placeholder="e.g. Lead Qualification System Prompt"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              System Prompt Instructions
            </label>
            <textarea
              rows={4}
              value={newSystemPrompt}
              onChange={(e) => setNewSystemPrompt(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs p-3 focus:border-brand-500 focus:outline-none"
              placeholder="Enter system prompt..."
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="glow" type="submit">
              Save Prompt
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
