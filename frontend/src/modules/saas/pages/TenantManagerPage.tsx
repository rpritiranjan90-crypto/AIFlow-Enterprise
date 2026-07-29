import React from 'react';
import { Building, CreditCard } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const TENANTS = [
  { id: 'tenant_001', name: 'Acme Corp Global', tier: 'global', region: 'us-east-1', status: 'active', mrr: '$45,000' },
  { id: 'tenant_002', name: 'TechNova Inc', tier: 'enterprise', region: 'eu-west-1', status: 'active', mrr: '$12,500' },
  { id: 'tenant_003', name: 'Stark Industries', tier: 'global', region: 'ap-northeast-1', status: 'provisioning', mrr: '$62,000' },
];

export const TenantManagerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Tenant Manager"
        description="Manage enterprise organizations, subscription tiers, identity federation, and global quotas."
        breadcrumbs={[{ label: 'AIFlow SaaS' }, { label: 'Tenant Manager' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TENANTS.map(tenant => (
          <Card key={tenant.id} glow className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Building className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-100">{tenant.name}</p>
                  <p className="text-xs text-slate-400">{tenant.id}</p>
                </div>
              </div>
              <Badge variant={tenant.status === 'active' ? 'success' : 'warning'}>
                {tenant.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Tier</span>
                <span className="text-brand-300">{tenant.tier.toUpperCase()}</span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Region</span>
                <span className="text-emerald-300">{tenant.region}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-800/80">
              <span className="text-slate-400 flex items-center gap-1"><CreditCard className="w-4 h-4 text-slate-500"/> MRR</span>
              <span className="font-bold text-slate-100">{tenant.mrr}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 text-xs">Settings</Button>
              <Button variant="outline" size="sm" className="flex-1 text-xs">Quotas</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
