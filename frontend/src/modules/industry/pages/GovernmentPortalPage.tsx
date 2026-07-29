import React from 'react';
import { Building2, Activity, FileCheck, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const GovernmentPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Government Automation Portal"
        description="Citizen service portal, permit workflows, case management, and digital approvals."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Government' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Cases" value="8,124" icon={<Building2 className="w-5 h-5 text-blue-400" />} trend="up" description="Case management" />
        <KpiCard title="Permits Approved" value="450" icon={<FileCheck className="w-5 h-5 text-emerald-400" />} trend="up" description="Today's volume" />
        <KpiCard title="Citizen Portal" value="Healthy" icon={<Activity className="w-5 h-5 text-brand-400" />} trend="neutral" description="GovID Sync" />
        <KpiCard title="FedRAMP Status" value="Compliant" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="neutral" description="Policy pack v1.4" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          Permit & Approval Workflow
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Workflow Visual Placeholder ]
        </div>
      </Card>
    </div>
  );
};
