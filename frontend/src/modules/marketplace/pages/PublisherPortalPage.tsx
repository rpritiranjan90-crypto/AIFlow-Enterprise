import React from 'react';
import { Briefcase, UploadCloud, DollarSign, Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const PublisherPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Publisher Portal"
        description="Publish extensions, manage versioning, and track monetization revenue."
        breadcrumbs={[{ label: 'Ecosystem' }, { label: 'Publisher Portal' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Packages" value="12" icon={<Briefcase className="w-5 h-5 text-blue-400" />} trend="up" description="Public marketplace" />
        <KpiCard title="Total Installs" value="48.2k" icon={<DownloadCloud className="w-5 h-5 text-emerald-400" />} trend="up" description="All-time volume" />
        <KpiCard title="MRR (Monetization)" value="$14,500" icon={<DollarSign className="w-5 h-5 text-emerald-400" />} trend="up" description="Subscription revenue" />
        <KpiCard title="Avg Rating" value="4.8" icon={<Activity className="w-5 h-5 text-amber-400" />} trend="neutral" description="Across 12 packages" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <UploadCloud className="w-4 h-4 text-emerald-400" />
          Publish New Extension
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Publishing Wizard Visual Placeholder ]
        </div>
      </Card>
    </div>
  );
};

function DownloadCloud(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>;
}
