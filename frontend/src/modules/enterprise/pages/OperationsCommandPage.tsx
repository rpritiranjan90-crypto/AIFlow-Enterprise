import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';

export const OperationsCommandPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Operations Command Center"
        description="Cross-region platform health, multi-cluster capacity, incident escalation, and security posture monitoring"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Operations Command' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-400" /> Global Region Clusters
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-300">US-East (Virginia):</span>
              <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">EU-West (Frankfurt):</span>
              <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">AP-Southeast (Tokyo):</span>
              <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
            </div>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Global Security & Compliance Posture
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Zero-Trust RBAC:</span>
              <span className="text-emerald-400 font-bold">Enforced</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vault Secrets:</span>
              <span className="text-cyan-300 font-bold">AES-256 Rotated</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
