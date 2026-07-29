import React from 'react';
import { ShieldCheck, DollarSign, Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const GovernanceCenterPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Governance & Policy Center"
        description="Enforce model whitelists, maximum token limits, workspace monthly spend caps, and compliance rules"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Governance' }]}
        actions={
          <Button variant="glow" leftIcon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}>
            Save Policy Rules
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Monthly Workspace Spend Cap
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
            <span className="text-slate-400">Current Hard Limit</span>
            <div className="font-mono text-lg font-bold text-slate-100">$5,000.00 / month</div>
            <span className="text-[10px] text-emerald-400">Auto-reject requests when spend limit is exceeded</span>
          </div>
        </Card>

        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-400" /> Model Whitelist & Restrictions
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-200">
              <span>OpenAI GPT-4o</span>
              <Badge variant="success">Approved</Badge>
            </div>
            <div className="flex justify-between items-center text-slate-200">
              <span>Anthropic Claude 3.5 Sonnet</span>
              <Badge variant="success">Approved</Badge>
            </div>
            <div className="flex justify-between items-center text-slate-200">
              <span>Unverified Local Models</span>
              <Badge variant="error">Restricted</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
