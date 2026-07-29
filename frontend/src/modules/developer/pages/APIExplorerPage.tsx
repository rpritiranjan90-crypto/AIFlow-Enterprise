import React, { useState } from 'react';
import { Copy, Check, Server } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const APIExplorerPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('POST /api/v1/workflows/wf_01/execute');
  const [copied, setCopied] = useState(false);

  const curlCode = `curl -X POST https://api.aiflow.enterprise.io/api/v1/workflows/wf_01/execute \\
  -H "Authorization: Bearer aiflow_jwt_token_2026" \\
  -H "Content-Type: application/json" \\
  -d '{"trigger_payload": {"lead_id": "lead_9901"}}'`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(curlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interactive OpenAPI & Swagger Explorer"
        description="Test REST API endpoints live with bearer token authentication and generate multi-language code snippets"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'API Explorer' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="space-y-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Server className="w-4 h-4 text-brand-400" /> API Endpoints Catalog
          </h4>
          <div className="space-y-1 text-xs font-mono">
            {['POST /api/v1/workflows/{id}/execute', 'GET /api/v1/executions', 'POST /api/v1/agents/chat', 'POST /api/v1/webhooks/{key}', 'GET /api/v1/admin/health'].map((ep) => (
              <div
                key={ep}
                onClick={() => setSelectedEndpoint(ep)}
                className={`p-2.5 rounded-lg cursor-pointer border transition-colors ${
                  selectedEndpoint === ep ? 'bg-brand-500/10 border-brand-500/30 text-brand-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {ep}
              </div>
            ))}
          </div>
        </Card>

        <Card glow className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="glow">{selectedEndpoint.split(' ')[0]}</Badge>
            <Button variant="outline" size="sm" leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} onClick={copyToClipboard}>
              {copied ? 'Copied' : 'Copy cURL Snippet'}
            </Button>
          </div>

          <h3 className="text-base font-bold text-slate-100 font-mono">{selectedEndpoint}</h3>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500">cURL Code Sample</span>
            <pre className="font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
              {curlCode}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};
