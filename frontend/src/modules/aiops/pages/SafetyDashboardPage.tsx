import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { SafetyScanRecord } from '../types/aiops';

export const SafetyDashboardPage: React.FC = () => {
  const scans: SafetyScanRecord[] = [
    { id: 'scan_01', sessionId: 'sess_9901', piiDetected: false, promptInjectionRisk: 'low', toxicityScore: 0.001, status: 'passed', createdAt: '2026-07-29 12:45' },
    { id: 'scan_02', sessionId: 'sess_9902', piiDetected: true, promptInjectionRisk: 'low', toxicityScore: 0.002, status: 'flagged', createdAt: '2026-07-29 12:10' },
  ];

  const columns: Column<SafetyScanRecord>[] = [
    {
      key: 'sessionId',
      header: 'Session ID',
      render: (r) => <span className="font-mono text-xs text-brand-400 font-bold">{r.sessionId}</span>,
    },
    {
      key: 'piiDetected',
      header: 'PII Sensitive Data',
      render: (r) => (
        r.piiDetected ? <Badge variant="warning">PII Detected</Badge> : <Badge variant="success">Clean</Badge>
      ),
    },
    {
      key: 'promptInjectionRisk',
      header: 'Prompt Injection Risk',
      render: (r) => <Badge variant="neutral">{r.promptInjectionRisk.toUpperCase()}</Badge>,
    },
    {
      key: 'status',
      header: 'Safety Status',
      render: (r) => <Badge variant="success">{r.status.toUpperCase()}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Safety & Guardrails Dashboard"
        description="PII sensitive data masking, prompt injection detection, and toxicity scoring telemetry"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Safety Dashboard' }]}
      />

      <Table columns={columns} data={scans} keyExtractor={(s) => s.id} />
    </div>
  );
};
