import React from 'react';
import { ShieldCheck, Cpu, Server, Activity, Key } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Administration & System Telemetry"
        description="Monitor Kubernetes cluster health, Celery worker pool depth, and SOC2 compliance guardrails"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Admin Console' }]}
        actions={
          <Button variant="glow" leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}>
            Export Audit Compliance Report
          </Button>
        }
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="System Cluster Status" value="Healthy" icon={<Server className="w-5 h-5" />} trend="up" description="+100% Uptime" />
        <KpiCard title="Active Celery Workers" value="8 Pool Workers" icon={<Cpu className="w-5 h-5" />} trend="neutral" description="0 Queued Tasks" />
        <KpiCard title="API Traffic Throughput" value="48.2 req/sec" icon={<Activity className="w-5 h-5" />} trend="up" description="+12% vs last hr" />
        <KpiCard title="Encrypted Vault Secrets" value="14 Credentials" icon={<Key className="w-5 h-5" />} trend="up" description="AES-256 Active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kubernetes Pod Telemetry */}
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-400" /> Kubernetes Cluster & HPA Health
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200 block">aiflow-backend-deployment</span>
                <span className="text-[10px] text-slate-400 font-mono">4 Pods (Min: 4, Max: 20) • HPA CPU Threshold: 70%</span>
              </div>
              <Badge variant="success">Running</Badge>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200 block">celery-worker-statefulset</span>
                <span className="text-[10px] text-slate-400 font-mono">8 Workers Active • Memory: 512Mi / Pod</span>
              </div>
              <Badge variant="success">Running</Badge>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200 block">postgres-pgvector-statefulset</span>
                <span className="text-[10px] text-slate-400 font-mono">PostgreSQL 16.2 • PgVector 0.7 Enabled</span>
              </div>
              <Badge variant="success">Healthy</Badge>
            </div>
          </div>
        </Card>

        {/* Security & SSO Identity Provider Status */}
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Identity & Access Management (SSO)
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200 block">Okta Enterprise SAML 2.0</span>
                <span className="text-[10px] text-slate-400 font-mono">Issuer: https://aiflow.okta.com</span>
              </div>
              <Badge variant="glow">Active SSO</Badge>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200 block">Google Workspace OpenID Connect</span>
                <span className="text-[10px] text-slate-400 font-mono">Domain: enterprise.io (JIT Enabled)</span>
              </div>
              <Badge variant="glow">Active SSO</Badge>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200 block">Microsoft Entra ID (Azure AD)</span>
                <span className="text-[10px] text-slate-400 font-mono">Tenant ID: 8840a-99b-4401</span>
              </div>
              <Badge variant="neutral">Configured</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
