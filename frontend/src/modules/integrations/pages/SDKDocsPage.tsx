import React from 'react';
import { Code, Terminal } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const SDKDocsPage: React.FC = () => {
  const codeSnippet = `import { BaseConnector } from '@aiflow/connector-sdk';

export class CustomERPConnector extends BaseConnector {
  async authenticate(credentials: Record<string, any>) {
    return { accessToken: credentials.apiKey };
  }

  async execute(action: string, params: Record<string, any>) {
    if (action === 'sync_inventory') {
      return { status: 'synced', items_processed: 450 };
    }
    return { status: 'success' };
  }
}`;

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Public Connector SDK Documentation"
        description="Build custom enterprise integration connectors without modifying platform core code"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'SDK Docs' }]}
      />

      <Card glow className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="glow">Python & TypeScript SDK</Badge>
          <span className="text-xs font-mono text-slate-400">v1.0.0</span>
        </div>

        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Code className="w-4 h-4 text-brand-400" /> Custom Connector Interface Implementation
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          Every custom connector inherits from <code>BaseConnector</code> and implements five standardized lifecycle methods:
          <code className="text-cyan-400 ml-1">authenticate()</code>, <code className="text-cyan-400">refreshToken()</code>, <code className="text-cyan-400">validate()</code>, <code className="text-cyan-400">execute()</code>, and <code className="text-cyan-400">disconnect()</code>.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-brand-400" /> custom_erp_connector.ts
            </span>
          </div>
          <pre className="font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed pt-2">
            {codeSnippet}
          </pre>
        </div>
      </Card>
    </div>
  );
};
