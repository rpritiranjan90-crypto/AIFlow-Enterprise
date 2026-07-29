import React from 'react';
import { Code, Terminal, Download, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const PublicDevPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Public Developer Hub & SDK Directory"
        description="Versioned OpenAPI v3.1 specifications, interactive API Explorer, SDK downloads, and quickstart tutorials"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Public Dev Portal' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glow className="space-y-3">
          <Code className="w-6 h-6 text-brand-400" />
          <h3 className="font-bold text-base text-slate-100">Python SDK</h3>
          <p className="text-xs text-slate-400">Official `aiflow-sdk` Python client package for building autonomous workflow agents.</p>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            pip install aiflow-sdk
          </Button>
        </Card>

        <Card glow className="space-y-3">
          <Terminal className="w-6 h-6 text-cyan-400" />
          <h3 className="font-bold text-base text-slate-100">TypeScript / Node SDK</h3>
          <p className="text-xs text-slate-400">Official `@aiflow/sdk` Node.js package for custom node development.</p>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            npm i @aiflow/sdk
          </Button>
        </Card>

        <Card glow className="space-y-3">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <h3 className="font-bold text-base text-slate-100">AIFlow CLI</h3>
          <p className="text-xs text-slate-400">Command line tool for creating, testing, packaging, and publishing plugins.</p>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            aiflow init my-plugin
          </Button>
        </Card>
      </div>
    </div>
  );
};
