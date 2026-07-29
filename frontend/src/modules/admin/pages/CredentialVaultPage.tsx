import React, { useState } from 'react';
import { Plus, Lock, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { CredentialVaultRecord } from '../types/admin';

export const CredentialVaultPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState('OpenAI_API_Key');
  const [newSecretVal, setNewSecretVal] = useState('');

  const [credentials, setCredentials] = useState<CredentialVaultRecord[]>([
    {
      id: 'cred_01',
      workspaceId: 'ws_prod_01',
      name: 'Production OpenAI Master Key',
      credentialType: 'OpenAI_API_Key',
      maskedValue: 'sk-proj-4a...9b12',
      isRotated: true,
      lastUsedAt: '5 mins ago',
      createdAt: '2026-05-10',
    },
    {
      id: 'cred_02',
      workspaceId: 'ws_prod_01',
      name: 'Slack Production Bot Token',
      credentialType: 'Slack_OAuth',
      maskedValue: 'xoxb-99...8812',
      isRotated: false,
      lastUsedAt: '2 hours ago',
      createdAt: '2026-06-01',
    },
    {
      id: 'cred_03',
      workspaceId: 'ws_prod_01',
      name: 'GitHub Deployment Access Token',
      credentialType: 'GitHub_OAuth',
      maskedValue: 'ghp_44...7710',
      isRotated: true,
      lastUsedAt: '1 day ago',
      createdAt: '2026-04-12',
    },
  ]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName || !newSecretVal) return;

    const masked = newSecretVal.length > 10 ? `${newSecretVal.slice(0, 6)}...${newSecretVal.slice(-4)}` : '********';
    const newCred: CredentialVaultRecord = {
      id: `cred_${Math.random().toString(36).substring(2, 8)}`,
      workspaceId: 'ws_prod_01',
      name: newKeyName,
      credentialType: newKeyType,
      maskedValue: masked,
      isRotated: false,
      lastUsedAt: 'Just now',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setCredentials([newCred, ...credentials]);
    setNewKeyName('');
    setNewSecretVal('');
    setIsModalOpen(false);
  };

  const columns: Column<CredentialVaultRecord>[] = [
    {
      key: 'name',
      header: 'Credential Name',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'credentialType',
      header: 'Connector Type',
      render: (r) => <Badge variant="glow">{r.credentialType}</Badge>,
    },
    {
      key: 'maskedValue',
      header: 'AES-256 Encrypted Value',
      render: (r) => <span className="font-mono text-xs text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">{r.maskedValue}</span>,
    },
    {
      key: 'isRotated',
      header: 'Rotation Status',
      render: (r) => (
        r.isRotated ? <Badge variant="success">Rotated</Badge> : <Badge variant="warning">Pending Rotation</Badge>
      ),
    },
    {
      key: 'lastUsedAt',
      header: 'Last Used',
      render: (r) => <span className="text-xs text-slate-400">{r.lastUsedAt}</span>,
    },
    {
      key: 'actions',
      header: 'Vault Action',
      render: (r) => (
        <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
          Rotate Key
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Encrypted Credential Vault"
        description="AES-256 GCM secret store for API keys, OAuth tokens, and database credentials"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Credential Vault' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Add Vault Secret
          </Button>
        }
      />

      <Table columns={columns} data={credentials} keyExtractor={(c) => c.id} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Store Encrypted Credential"
        description="Secrets are encrypted at rest with AES-256 GCM before being persisted to the vault."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 mt-2">
          <Input
            label="Credential Label"
            placeholder="e.g. Production OpenAI API Key"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            required
          />

          <Input
            label="Secret Key Payload"
            type="password"
            placeholder="sk-proj-..."
            value={newSecretVal}
            onChange={(e) => setNewSecretVal(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="glow" type="submit">
              Encrypt & Store
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
