import React from 'react';
import { Factory, Activity, ShieldAlert, Bot } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const ManufacturingPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manufacturing Automation Portal"
        description="Production workflows, inventory automation, predictive maintenance, and quality inspection."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Manufacturing' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Lines" value="14" icon={<Factory className="w-5 h-5 text-amber-400" />} trend="neutral" description="Production floor" />
        <KpiCard title="Predictive Alerts" value="2" icon={<ShieldAlert className="w-5 h-5 text-rose-400" />} trend="up" description="Maintenance required" />
        <KpiCard title="Quality Score" value="99.8%" icon={<Activity className="w-5 h-5 text-emerald-400" />} trend="up" description="Automated inspection" />
        <KpiCard title="ERP Status" value="Healthy" icon={<Activity className="w-5 h-5 text-brand-400" />} trend="neutral" description="SAP Integration" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="col-span-2 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            Supply Chain & Inventory Workflow
          </h3>
          <div className="h-48 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
            [ Workflow Visual Placeholder ]
          </div>
        </Card>
        
        <Card className="bg-slate-950/80 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" />
            Manufacturing Copilot
          </h3>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-300">
            Copilot is active. Monitoring SCADA feeds and providing maintenance recommendations.
          </div>
        </Card>
      </div>
    </div>
  );
};
