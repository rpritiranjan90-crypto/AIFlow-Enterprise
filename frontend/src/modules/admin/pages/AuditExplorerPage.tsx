import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AdminAuditItem } from '../types/admin';

export const AuditExplorerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [audits, setAudits] = useState<AdminAuditItem[]>([
    {
      id: 'aud_01',
      user: 'alex@enterprise.io',
      action: 'USER_LOGIN',
      resource: 'IAM / SAML SSO',
      status: 'SUCCESS',
      ipAddress: '192.168.1.42',
      timestamp: '2026-07-29 12:40:10',
    },
    {
      id: 'aud_02',
      user: 'alex@enterprise.io',
      action: 'WORKFLOW_PUBLISH',
      resource: 'Salesforce Lead AI Enrichment Pipeline',
      status: 'SUCCESS',
      ipAddress: '192.168.1.42',
      timestamp: '2026-07-29 12:35:00',
    },
    {
      id: 'aud_03',
      user: 'devops@enterprise.io',
      action: 'CREDENTIAL_ROTATE',
      resource: 'Production OpenAI Master Key',
      status: 'SUCCESS',
      ipAddress: '10.0.4.101',
      timestamp: '2026-07-29 11:50:22',
    },
    {
      id: 'aud_04',
      user: 'sarah@enterprise.io',
      action: 'PROMPT_UPDATE',
      resource: 'Code Vulnerability Scanner Prompt',
      status: 'SUCCESS',
      ipAddress: '192.168.1.88',
      timestamp: '2026-07-29 10:15:40',
    },
  ]);

  const filteredAudits = audits.filter(
    (a) => a.user.toLowerCase().includes(searchTerm.toLowerCase()) || a.action.toLowerCase().includes(searchTerm.toLowerCase()) || a.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<AdminAuditItem>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (r) => <span className="font-mono text-xs text-slate-400">{r.timestamp}</span>,
    },
    {
      key: 'user',
      header: 'User / Actor',
      render: (r) => <span className="font-semibold text-slate-100">{r.user}</span>,
    },
    {
      key: 'action',
      header: 'Event Action',
      render: (r) => <Badge variant="glow">{r.action}</Badge>,
    },
    {
      key: 'resource',
      header: 'Target Resource',
      render: (r) => <span className="text-xs text-slate-300 max-w-xs truncate">{r.resource}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <Badge variant="success">{r.status}</Badge>,
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      render: (r) => <span className="font-mono text-xs text-slate-400">{r.ipAddress}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Audit Platform"
        description="Immutable SOC2 audit trail for user actions, credential edits, and system events"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Audit Explorer' }]}
        actions={
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Export Audit Logs (CSV)
          </Button>
        }
      />

      <div className="max-w-md">
        <Input
          placeholder="Filter audit events by actor, action, or resource..."
          leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table columns={columns} data={filteredAudits} keyExtractor={(a) => a.id} />
    </div>
  );
};
