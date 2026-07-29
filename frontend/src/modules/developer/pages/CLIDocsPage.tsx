import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const CLIDocsPage: React.FC = () => {
  const commands = [
    { cmd: 'aiflow doctor', desc: 'Diagnose CLI environment, API keys, and local sandbox dependencies.' },
    { cmd: 'aiflow init', desc: 'Initialize a new plugin project template with plugin.json manifest.' },
    { cmd: 'aiflow plugin build', desc: 'Package and compress plugin files into verified release archive.' },
    { cmd: 'aiflow plugin test', desc: 'Run automated sandbox isolation tests for custom nodes and connectors.' },
    { cmd: 'aiflow plugin publish', desc: 'Sign with RSA 4096 key and publish to Enterprise Plugin Registry.' },
    { cmd: 'aiflow plugin install <id>', desc: 'Download and install plugin into local workspace.' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="AIFlow CLI Command Reference"
        description="Command-line interface documentation for plugin creation, packaging, testing, and deployment"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'CLI Guide' }]}
      />

      <div className="space-y-4">
        {commands.map((c, i) => (
          <Card key={i} glow className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-sm font-bold text-cyan-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 inline-block">
                {c.cmd}
              </span>
              <p className="text-xs text-slate-400 mt-2">{c.desc}</p>
            </div>
            <Badge variant="glow">CLI Command</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};
