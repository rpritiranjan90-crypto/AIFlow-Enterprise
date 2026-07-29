import React, { useState } from 'react';
import { Bot, Send, Settings, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export const UnifiedAICopilotPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="space-y-6 h-full flex flex-col">
      <PageHeader
        title="Unified AI Copilot"
        description="The central conversational intelligence for operating the AIFlow Enterprise OS."
        breadcrumbs={[{ label: 'Platform Core' }, { label: 'Unified Copilot' }]}
      />

      <Card glow className="flex-1 min-h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            Enterprise Assistant
          </h3>
          <div className="flex gap-2">
            <Settings className="w-5 h-5 text-slate-500 cursor-pointer" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 border border-slate-800 rounded-lg bg-slate-900/50 p-6 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-sm text-slate-200">
              <p>Hello. I am the Unified Enterprise Copilot.</p>
              <p className="mt-2 text-slate-400">I can provision infrastructure, manage workflows, search the knowledge graph, and deploy marketplace solutions. How can I assist you?</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask me to deploy a solution, check system health, or run a simulation..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-4 pr-12 py-3 text-sm text-slate-200 focus:outline-none focus:border-brand-500" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute right-2 top-2 w-8 h-8 rounded bg-brand-600 flex items-center justify-center cursor-pointer hover:bg-brand-500 transition-colors">
            <Send className="w-4 h-4 text-white" />
          </div>
        </div>
      </Card>
    </div>
  );
};
