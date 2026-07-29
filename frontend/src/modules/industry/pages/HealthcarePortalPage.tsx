import React from 'react';
import { Heart, Activity, FileText, Bot } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const HealthcarePortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Healthcare Automation Portal"
        description="Patient workflows, appointment orchestration, medical documents, and claims processing."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Healthcare' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Patients" value="12,450" icon={<Heart className="w-5 h-5 text-rose-400" />} trend="up" description="Managed via workflow" />
        <KpiCard title="Claims Processed" value="1.2M" icon={<FileText className="w-5 h-5 text-emerald-400" />} trend="up" description="Automated clearing" />
        <KpiCard title="EHR Sync Status" value="Healthy" icon={<Activity className="w-5 h-5 text-brand-400" />} trend="neutral" description="Epic / Cerner" />
        <KpiCard title="HIPAA Status" value="Compliant" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} trend="neutral" description="Policy pack v2.1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="col-span-2 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" />
            Patient Onboarding Pipeline
          </h3>
          <div className="h-48 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
            [ Workflow Visual Placeholder ]
          </div>
        </Card>
        
        <Card className="bg-slate-950/80 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" />
            Healthcare Copilot
          </h3>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-300">
            Copilot is active. RAG connected to 1.4TB of clinical protocols and claims history.
          </div>
        </Card>
      </div>
    </div>
  );
};

// Mock import to avoid errors
function ShieldCheck(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>;
}
