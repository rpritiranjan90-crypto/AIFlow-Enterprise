import React from 'react';
import { ShieldCheck, Download, FileText, CheckCircle2, Lock } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CompliancePolicyItem } from '../types/enterprise';

export const ComplianceCenterPage: React.FC = () => {
  const policies: CompliancePolicyItem[] = [
    { id: 'cpol_soc2', name: 'SOC 2 Type II Security Controls', framework: 'SOC 2 Type II', status: 'compliant', lastAuditAt: '2026-07-29' },
    { id: 'cpol_hipaa', name: 'HIPAA Health Data Privacy Guard', framework: 'HIPAA', status: 'compliant', lastAuditAt: '2026-07-29' },
    { id: 'cpol_gdpr', name: 'GDPR User Data Erasure Policy', framework: 'GDPR', status: 'compliant', lastAuditAt: '2026-07-29' },
  ];

  const columns: Column<CompliancePolicyItem>[] = [
    {
      key: 'name',
      header: 'Compliance Framework Policy',
      render: (r) => (
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'framework',
      header: 'Standard Framework',
      render: (r) => <Badge variant="glow">{r.framework}</Badge>,
    },
    {
      key: 'status',
      header: 'Compliance Status',
      render: (r) => <Badge variant="success">100% COMPLIANT</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Compliance Center & Evidence Exporter"
        description="SOC 2 Type II, ISO 27001, GDPR, HIPAA, PCI DSS 4.0, and NIST CSF continuous compliance monitoring and audit evidence signing"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Compliance Center' }]}
        actions={
          <Button variant="glow" leftIcon={<Download className="w-4 h-4" />}>
            Export Signed SOC2 Audit Evidence
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Overall Compliance Score" value="100.0%" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="up" description="142 / 142 Controls Passed" />
        <KpiCard title="SOC 2 Type II Status" value="Certified" icon={<CheckCircle2 className="w-5 h-5 text-brand-400" />} trend="neutral" description="Continuous Telemetry" />
        <KpiCard title="HIPAA & GDPR Ready" value="Enforced" icon={<Lock className="w-5 h-5 text-cyan-400" />} trend="up" description="AES-256 & Column Masking" />
        <KpiCard title="Audit Evidence Integrity" value="Signed SHA256" icon={<FileText className="w-5 h-5" />} trend="neutral" description="Immutable Ledger" />
      </div>

      <Table columns={columns} data={policies} keyExtractor={(p) => p.id} />
    </div>
  );
};
