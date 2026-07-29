import React from 'react';
import { DownloadCloud, RefreshCw, Layers, HardDrive } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const PlatformLifecycleManagerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Lifecycle Manager"
        description="Manage upgrades, dependencies, and configuration snapshots for the AIOS."
        breadcrumbs={[{ label: 'Platform Core' }, { label: 'Lifecycle Manager' }]}
      />

      <Card glow className="space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DownloadCloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">AIFlow Enterprise v2.0 (Release 20)</h3>
              <p className="text-sm text-slate-400">Enterprise AI Operating System (AIOS)</p>
            </div>
          </div>
          <div>
            <Button variant="glow" disabled leftIcon={<RefreshCw className="w-4 h-4" />}>Up to Date</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="p-4 border border-slate-800 rounded-lg">
            <h4 className="font-bold text-slate-200 flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-blue-400" /> Module Dependencies
            </h4>
            <p className="text-sm text-slate-400">All 20 release modules are validated and operational.</p>
          </div>
          
          <div className="p-4 border border-slate-800 rounded-lg">
            <h4 className="font-bold text-slate-200 flex items-center gap-2 mb-2">
              <HardDrive className="w-4 h-4 text-amber-400" /> Configuration Snapshots
            </h4>
            <p className="text-sm text-slate-400">Last snapshot: 2026-07-29T10:00:00Z</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
