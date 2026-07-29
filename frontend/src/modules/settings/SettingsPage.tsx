import React, { useState } from 'react';
import { Settings, Users, Key, CreditCard, Plus, Mail, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { useWorkspaceStore } from '@/store/workspaceStore';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
  status: 'Active' | 'Pending';
}

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { currentWorkspace } = useWorkspaceStore();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Member');

  const [members, setMembers] = useState<Member[]>([
    { id: 'm1', name: 'Alex Mercer', email: 'alex.architect@enterprise.io', role: 'Owner', status: 'Active' },
    { id: 'm2', name: 'Elena Rostova', email: 'elena@enterprise.io', role: 'Admin', status: 'Active' },
    { id: 'm3', name: 'David Chen', email: 'david.chen@enterprise.io', role: 'Member', status: 'Pending' },
  ]);

  const memberColumns: Column<Member>[] = [
    {
      key: 'name',
      header: 'Member',
      render: (m) => (
        <div>
          <span className="font-semibold text-slate-100 block">{m.name}</span>
          <span className="text-xs text-slate-400">{m.email}</span>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (m) => <Badge variant="glow">{m.role}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (m) => (
        m.status === 'Active' ? <Badge variant="success">Active</Badge> : <Badge variant="warning">Invite Sent</Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Manage',
      render: (m) => (
        <button className="p-1 text-slate-400 hover:text-rose-400 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `m_${Math.random().toString(36).substring(2, 7)}`,
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole as any,
        status: 'Pending',
      },
    ]);
    setInviteEmail('');
    setIsInviteOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspace Settings"
        description="Manage workspace organization, access roles, API credentials, and billing"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Settings' }]}
      />

      <Tabs
        tabs={[
          { id: 'general', label: 'General Settings', icon: <Settings className="w-4 h-4" /> },
          { id: 'members', label: 'Team Members & RBAC', icon: <Users className="w-4 h-4" />, count: members.length },
          { id: 'security', label: 'Security & API Keys', icon: <Key className="w-4 h-4" /> },
          { id: 'billing', label: 'Billing & Plan', icon: <CreditCard className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'general' && (
        <Card glow className="space-y-4 max-w-2xl">
          <h3 className="text-base font-semibold text-slate-100">Workspace Details</h3>
          <Input label="Workspace Name" defaultValue={currentWorkspace?.name || 'Production Core'} />
          <Input label="Workspace Slug" defaultValue={currentWorkspace?.slug || 'production-core'} />
          <Input label="Description" defaultValue={currentWorkspace?.description || 'Enterprise production environment'} />
          <Button variant="glow">Save Changes</Button>
        </Card>
      )}

      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-slate-100">Organization Members</h3>
            <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsInviteOpen(true)}>
              Invite Member
            </Button>
          </div>
          <Table columns={memberColumns} data={members} keyExtractor={(m) => m.id} />
        </div>
      )}

      {activeTab === 'security' && (
        <Card glow className="space-y-4 max-w-2xl">
          <h3 className="text-base font-semibold text-slate-100">API Access Tokens</h3>
          <p className="text-xs text-slate-400">Manage programatic secret keys for calling AIFlow APIs</p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center font-mono text-xs text-cyan-400">
            <span>aiflow_live_99a8b7c6d5e4f321...</span>
            <Button variant="outline" size="sm">Revoke Key</Button>
          </div>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Generate New Secret Key</Button>
        </Card>
      )}

      {activeTab === 'billing' && (
        <Card glow className="space-y-4 max-w-2xl">
          <h3 className="text-base font-semibold text-slate-100">Current Plan: Enterprise tier</h3>
          <p className="text-xs text-slate-400">Includes 1,000,000 monthly AI tokens and unlimited workflow runs</p>
          <Badge variant="success" size="md">Subscription Active</Badge>
        </Card>
      )}

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite Member to Workspace"
        description="Send an email invitation to grant access to this workspace."
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4 mt-2">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@enterprise.com"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
          />
          <Select
            label="Workspace Role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            options={[
              { value: 'Admin', label: 'Admin - Full access except billing' },
              { value: 'Member', label: 'Member - Can edit workflows' },
              { value: 'Viewer', label: 'Viewer - Read-only logs' },
            ]}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button variant="glow" type="submit">
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
