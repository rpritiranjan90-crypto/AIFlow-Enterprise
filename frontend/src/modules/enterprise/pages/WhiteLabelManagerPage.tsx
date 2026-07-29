import React from 'react';
import { Palette, Save } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const WhiteLabelManagerPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="White Label Platform Customization Studio"
        description="Configure custom subdomains, custom CSS themes, logo assets, login screens, and partner co-branding"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'White Label Manager' }]}
      />

      <Card glow className="space-y-6">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-400" /> Enterprise Branding & Subdomain Config
        </h3>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-slate-300 block mb-1">Custom Subdomain URI</label>
            <input
              type="text"
              defaultValue="automation.acme-corp.com"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 p-3 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Primary Brand Accent Color</label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                defaultValue="#6366f1"
                className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
              />
              <span className="text-slate-100">#6366F1 (Indigo Theme)</span>
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Enterprise Logo Asset URL</label>
            <input
              type="text"
              defaultValue="https://acme-corp.com/assets/logo.png"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-200 p-3 focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <Button variant="glow" leftIcon={<Save className="w-4 h-4" />}>
          Save White Label Configuration
        </Button>
      </Card>
    </div>
  );
};
