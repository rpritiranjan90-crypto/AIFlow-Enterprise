import React, { useState } from 'react';
import { Database, Upload, Search, FileText, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Citation } from '../types/ai';

export const KnowledgeBasePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kb');
  const [searchQuery, setSearchQuery] = useState('SOC2 encryption guidelines');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Citation[]>([]);

  const handleVectorSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults([
        {
          documentName: 'SOC2_Compliance_Security_Guardrails.docx',
          chunkId: 'vec_chunk_204',
          score: 0.94,
          text: 'Payloads are encrypted using AES-256 and RBAC permissions enforce workspace isolation for all multi-tenant credentials.',
        },
        {
          documentName: 'AIFlow_Enterprise_Architecture.pdf',
          chunkId: 'vec_chunk_101',
          score: 0.88,
          text: 'AIFlow Enterprise uses DAG compilation via Kahn\'s algorithm for visual workflows and async task worker pools.',
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Bases & Vector Search (RAG)"
        description="Ingest enterprise documents, chunk text, and perform semantic vector similarity retrieval"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Knowledge Base' }]}
        actions={
          <Button variant="glow" leftIcon={<Upload className="w-4 h-4" />}>
            Upload Document
          </Button>
        }
      />

      <Tabs
        tabs={[
          { id: 'kb', label: 'Knowledge Collections', icon: <Database className="w-4 h-4" />, count: 2 },
          { id: 'search', label: 'Vector Similarity Explorer', icon: <Search className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'kb' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card glow className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-slate-100">Enterprise Architecture & Security</h4>
                <p className="text-xs text-slate-400 mt-1">SOC2 guidelines, VPC topologies, and database schemas</p>
              </div>
              <Badge variant="glow">1,420 Vectors</Badge>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-cyan-400" /> AIFlow_Enterprise_Architecture.pdf</span>
                <span className="text-[10px] text-emerald-400">42 chunks</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-cyan-400" /> SOC2_Compliance_Security_Guardrails.docx</span>
                <span className="text-[10px] text-emerald-400">28 chunks</span>
              </div>
            </div>
          </Card>

          <Card glow className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-slate-100">Sales Playbook & Product Specs</h4>
                <p className="text-xs text-slate-400 mt-1">Pricing tier breakdown and SLA commitments</p>
              </div>
              <Badge variant="info">850 Vectors</Badge>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-cyan-400" /> Enterprise_Pricing_Tier_Battlecard.pdf</span>
                <span className="text-[10px] text-emerald-400">18 chunks</span>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* Vector Explorer Tab */
        <Card glow className="space-y-4 max-w-3xl">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" /> Semantic Vector Search Query
          </h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter search query to perform cosine similarity search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="glow" isLoading={isSearching} onClick={handleVectorSearch}>
              Search Memory
            </Button>
          </div>

          <div className="space-y-3 pt-2">
            {searchResults.map((res, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">{res.documentName}</span>
                  <span className="font-mono text-emerald-400 font-bold">Similarity Score: {res.score}</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans">{res.text}</p>
                <span className="text-[10px] text-slate-500 font-mono">Chunk ID: {res.chunkId}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
