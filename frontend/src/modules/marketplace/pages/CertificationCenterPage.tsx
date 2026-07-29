import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, FileCheck } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const CertificationCenterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Certification Center"
        description="Automated security scanning, license verification, and malware detection."
        breadcrumbs={[{ label: 'Ecosystem' }, { label: 'Certification Center' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Packages Scanned" value="1,240" icon={<Activity className="w-5 h-5 text-blue-400" />} trend="up" description="Last 30 days" />
        <KpiCard title="Passed Validation" value="98.5%" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="up" description="Approval rate" />
        <KpiCard title="Malware Blocked" value="12" icon={<ShieldAlert className="w-5 h-5 text-rose-400" />} trend="down" description="Critical threats" />
        <KpiCard title="License Checks" value="Healthy" icon={<FileCheck className="w-5 h-5 text-brand-400" />} trend="neutral" description="OSI compliance" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Automated Scan Results
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Certification Table Placeholder ]
        </div>
      </Card>
    </div>
  );
};
