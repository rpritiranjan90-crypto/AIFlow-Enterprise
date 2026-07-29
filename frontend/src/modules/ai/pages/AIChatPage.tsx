import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ChatMessageItem } from '../types/ai';

export const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'm1',
      role: 'user',
      content: 'How does AIFlow Enterprise handle graph validation and execution for complex DAG workflows?',
      createdAt: '12:00 PM',
    },
    {
      id: 'm2',
      role: 'assistant',
      content: `AIFlow Enterprise validates visual React Flow graphs using **Kahn's Topological Sort Algorithm**:

1. **Cycle Detection**: Ensures workflows are strictly Directed Acyclic Graphs (DAGs).
2. **Entry Trigger Validation**: Confirms the presence of valid entry nodes (Manual Trigger, Webhook, Cron).
3. **Execution Plan Ordering**: Orders nodes sequentially or in parallel while maintaining strict variable dependencies (e.g. \`{{trigger.email}}\`).`,
      citations: [
        {
          documentName: 'AIFlow_Enterprise_Architecture.pdf',
          chunkId: 'vec_chunk_101',
          score: 0.94,
          text: 'AIFlow Enterprise uses DAG compilation via Kahn\'s algorithm for visual workflows.',
        },
      ],
      tokensUsed: 142,
      createdAt: '12:00 PM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessageItem = {
      id: `m_${Math.random().toString(36).substring(2, 8)}`,
      role: 'user',
      content: inputMessage,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    setTimeout(() => {
      const botMsg: ChatMessageItem = {
        id: `m_${Math.random().toString(36).substring(2, 8)}`,
        role: 'assistant',
        content: `### Autonomous AI Reasoning Result\n\nAnalyzed query and retrieved RAG vector context.\n\n- Executed tool check: No manual API invocation required.\n- Synthesized enterprise answer from verified knowledge bases.`,
        citations: [
          {
            documentName: 'SOC2_Compliance_Security_Guardrails.docx',
            chunkId: 'vec_chunk_204',
            score: 0.91,
            text: 'Payloads are encrypted using AES-256 and RBAC permissions enforce workspace isolation.',
          },
        ],
        tokensUsed: 88,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsSending(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-4">
      <PageHeader
        title="Enterprise AI Chat Studio"
        description="Interact directly with autonomous AI reasoning models backed by vector RAG memory"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'AI Chat' }]}
      />

      {/* Main Chat Box */}
      <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col min-h-0 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-cyan flex items-center justify-center text-white shrink-0 shadow-glow">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-3 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-950/90 border border-slate-800 text-slate-100 rounded-tl-none shadow-card'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.content}</div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">RAG Citations</span>
                    {msg.citations.map((c, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                        <span className="font-semibold text-slate-200 block">{c.documentName}</span>
                        <p className="line-clamp-2 mt-0.5">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center text-[9px] opacity-70 pt-1">
                  <span>{msg.createdAt}</span>
                  {msg.tokensUsed && <span>{msg.tokensUsed} tokens</span>}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isSending && (
            <div className="flex items-center gap-2 text-xs text-brand-400 font-medium animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" /> Thinking and retrieving vector context...
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-800/80 bg-slate-950/90 flex gap-3 items-center">
          <Input
            placeholder="Ask AI agent anything or query vector knowledge base..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="glow" isLoading={isSending} rightIcon={<Send className="w-4 h-4" />}>
            Send Query
          </Button>
        </form>
      </div>
    </div>
  );
};
