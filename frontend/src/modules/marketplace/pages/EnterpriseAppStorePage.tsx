import React from 'react';
import { Building2, PackageCheck, Lock, Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const EnterpriseAppStorePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise App Store"
        description="Private marketplace for organization-approved packages and internal extensions."
        breadcrumbs={[{ label: 'Ecosystem' }, { label: 'Private App Store' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Approved Packages" value="45" icon={<PackageCheck className="w-5 h-5 text-emerald-400" />} trend="up" description="Whitelisted" />
        <KpiCard title="Internal Packages" value="12" icon={<Building2 className="w-5 h-5 text-blue-400" />} trend="up" description="Custom built" />
        <KpiCard title="Active Installs" value="142" icon={<Activity className="w-5 h-5 text-brand-400" />} trend="up" description="Across tenants" />
        <KpiCard title="Store Policy" value="Strict" icon={<Lock className="w-5 h-5 text-rose-400" />} trend="neutral" description="RBAC enforced" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          Internal Catalog
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Enterprise Package Grid Placeholder ]
        </div>
      </Card>
    </div>
  );
};
