import React from 'react';
import { Building2, ShieldCheck, HardDrive, UserPlus, Globe } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const OrgManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization & Governance"
        description="Multi-tenant workspace quota enforcement, domain verification, and role permission matrix"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Organization' }]}
        actions={
          <Button variant="glow" leftIcon={<UserPlus className="w-4 h-4" />}>
            Invite Enterprise Users
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Org Summary */}
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-400" /> Enterprise Organization
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Organization Name</span>
              <span className="font-semibold text-slate-100">Acme Enterprise Global</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Verified Domain</span>
              <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> enterprise.io
              </span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Subscription Tier</span>
              <Badge variant="glow">Enterprise Unlimited</Badge>
            </div>
          </div>
        </Card>

        {/* Quota Limits */}
        <Card glow className="space-y-4 lg:col-span-2">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-400" /> Multi-Tenant Storage & Token Quotas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Workflows Created</span>
              <div className="font-mono text-base font-bold text-slate-100">4 / 500</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1">
                <div className="bg-brand-500 h-full rounded-full" style={{ width: '1%' }} />
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">Monthly Executions</span>
              <div className="font-mono text-base font-bold text-slate-100">14,205 / 1M</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '1.4%' }} />
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400">RAG Vector Storage</span>
              <div className="font-mono text-base font-bold text-slate-100">2.2 GB / 1,000 GB</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '0.2%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Role Permission Matrix */}
      <Card className="space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Granular Enterprise Role Permission Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3">Permission Capability</th>
                <th className="pb-3 text-center">Owner</th>
                <th className="pb-3 text-center">Admin</th>
                <th className="pb-3 text-center">Developer</th>
                <th className="pb-3 text-center">Operator</th>
                <th className="pb-3 text-center">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-medium">Build & Edit Visual Workflows</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-slate-600">—</td>
                <td className="text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Execute Workflows & Manual Triggers</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Access Encrypted Credential Vault</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-slate-600">—</td>
                <td className="text-center text-slate-600">—</td>
                <td className="text-center text-slate-600">—</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium">Manage Identity SSO & SAML Providers</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-emerald-400">✓</td>
                <td className="text-center text-slate-600">—</td>
                <td className="text-center text-slate-600">—</td>
                <td className="text-center text-slate-600">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
