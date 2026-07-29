import React, { useState } from 'react';
import { PackagePlus, Play } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ProvisioningCenterPage: React.FC = () => {
  const [isProvisioning, setIsProvisioning] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Automated Provisioning Center"
        description="Self-service organization setup wizard, workspace creation, and geo-aware deployments."
        breadcrumbs={[{ label: 'AIFlow SaaS' }, { label: 'Provisioning' }]}
      />

      <Card glow className="space-y-6">
        <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
          <PackagePlus className="w-5 h-5 text-brand-400" />
          Provision New Enterprise Tenant
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Organization Name</label>
            <input type="text" placeholder="e.g. Wayne Enterprises" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Deployment Region</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="us-east-1">US East (N. Virginia)</option>
                <option value="eu-west-1">EU West (Ireland)</option>
                <option value="ap-northeast-1">AP Northeast (Tokyo)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subscription Tier</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
                <option value="global">Global Multi-Region</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              variant="glow" 
              leftIcon={<Play className="w-4 h-4" />} 
              isLoading={isProvisioning} 
              onClick={() => {
                setIsProvisioning(true);
                setTimeout(() => setIsProvisioning(false), 1500);
              }}
            >
              Start Provisioning Job
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
