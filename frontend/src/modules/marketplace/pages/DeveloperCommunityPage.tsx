import React from 'react';
import { Users, MessageSquare, Github, Activity } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { KpiCard } from '@/components/ui/KpiCard';

export const DeveloperCommunityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Developer Community"
        description="Connect with developers, share open-source projects, and discuss integrations."
        breadcrumbs={[{ label: 'Ecosystem' }, { label: 'Developer Community' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Active Developers" value="14,250" icon={<Users className="w-5 h-5 text-violet-400" />} trend="up" description="Registered profiles" />
        <KpiCard title="Open Source" value="452" icon={<Github className="w-5 h-5 text-slate-400" />} trend="up" description="Community projects" />
        <KpiCard title="Discussions" value="8,124" icon={<MessageSquare className="w-5 h-5 text-brand-400" />} trend="up" description="Active threads" />
        <KpiCard title="Platform Uptime" value="99.99%" icon={<Activity className="w-5 h-5 text-emerald-400" />} trend="neutral" description="API Health" />
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-violet-400" />
          Recent Discussions
        </h3>
        <div className="h-64 flex items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
          [ Discussion Forum Placeholder ]
        </div>
      </Card>
    </div>
  );
};
