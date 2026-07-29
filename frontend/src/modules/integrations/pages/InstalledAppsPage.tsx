import React, { useState } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InstalledConnectorItem } from '../types/connector';

export const InstalledAppsPage: React.FC = () => {
  const [apps, setApps] = useState<InstalledConnectorItem[]>([
    { id: 'inst_01', workspaceId: 'ws_prod_01', connectorId: 'conn_salesforce', name: 'Salesforce CRM', status: 'connected', health: 'healthy', credentialId: 'cred_01', installedAt: '2026-05-10' },
    { id: 'inst_02', workspaceId: 'ws_prod_01', connectorId: 'conn_slack', name: 'Slack Bot', status: 'connected', health: 'healthy', credentialId: 'cred_02', installedAt: '2026-06-01' },
    { id: 'inst_03', workspaceId: 'ws_prod_01', connectorId: 'conn_openai', name: 'OpenAI GPT-4o', status: 'connected', health: 'healthy', credentialId: 'cred_01', installedAt: '2026-04-12' },
  ]);

  const handleDelete = (id: string) => {
    setApps(apps.filter((a) => a.id !== id));
  };

  const columns: Column<InstalledConnectorItem>[] = [
    {
      key: 'name',
      header: 'Installed App',
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-brand-400 font-bold flex items-center justify-center">
            {r.name.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-slate-100 block">{r.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">ID: {r.connectorId}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'OAuth Status',
      render: (r) => <Badge variant="success">{r.status.toUpperCase()}</Badge>,
    },
    {
      key: 'health',
      header: 'Connection Health',
      render: (r) => <Badge variant="glow">{r.health}</Badge>,
    },
    {
      key: 'credentialId',
      header: 'Vault Secret Ref',
      render: (r) => <span className="font-mono text-xs text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">{r.credentialId || 'cred_vault'}</span>,
    },
    {
      key: 'installedAt',
      header: 'Installed On',
      render: (r) => <span className="text-xs text-slate-400">{r.installedAt}</span>,
    },
    {
      key: 'actions',
      header: 'Manage',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Refresh Token
          </Button>
          <button
            onClick={() => handleDelete(r.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Connected Workspace Applications"
        description="Manage active OAuth 2.0 connections, API keys, token refresh schedules, and Vault secrets"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Installed Apps' }]}
      />

      <Table columns={columns} data={apps} keyExtractor={(a) => a.id} />
    </div>
  );
};
