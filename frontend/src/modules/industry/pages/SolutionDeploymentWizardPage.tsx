import React, { useState } from 'react';
import { DownloadCloud, Shield, Play } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const SolutionDeploymentWizardPage: React.FC = () => {
  const [isDeploying, setIsDeploying] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Deploy Industry Solution"
        description="Automated provisioning of roles, policies, workflows, dashboards, and AI agents."
        breadcrumbs={[{ label: 'Industry' }, { label: 'Deploy Solution' }]}
      />

      <Card glow className="space-y-6">
        <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
          <DownloadCloud className="w-5 h-5 text-brand-400" />
          Provision Vertical Solution
        </h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Tenant ID</label>
              <input type="text" placeholder="e.g. tenant_123" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Workspace ID</label>
              <input type="text" placeholder="e.g. ws_123" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Solution</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="health_01">Healthcare Suite</option>
                <option value="fin_01">Banking & Finance Suite</option>
                <option value="mfg_01">Manufacturing Suite</option>
                <option value="ret_01">Retail Suite</option>
                <option value="gov_01">Government Suite</option>
                <option value="edu_01">Education Suite</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Select Version</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="v2.0">v2.0 (Latest)</option>
                <option value="v1.1">v1.1 (Stable)</option>
                <option value="v1.0">v1.0 (Legacy)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400"/> Deployment Manifest
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Provision Roles</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Apply Security Policies</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Install Workflows</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Install Dashboards</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Configure AI Copilot</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div> Configure Connectors</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Seed Sample Data</div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button 
              variant="glow" 
              leftIcon={<Play className="w-4 h-4" />} 
              isLoading={isDeploying} 
              onClick={() => {
                setIsDeploying(true);
                setTimeout(() => setIsDeploying(false), 2000);
              }}
            >
              Start Automated Deployment
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
