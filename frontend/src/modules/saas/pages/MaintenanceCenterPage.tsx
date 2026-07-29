import React, { useState } from 'react';
import { Calendar, Wrench, HardDrive, ShieldCheck, Play } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const MaintenanceCenterPage: React.FC = () => {
  const [isBackupRunning, setIsBackupRunning] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Managed Services & Maintenance"
        description="Managed upgrades, automated maintenance windows, backup scheduling, and disaster recovery."
        breadcrumbs={[{ label: 'AIFlow SaaS' }, { label: 'Maintenance' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-400" />
            Upcoming Maintenance Windows
          </h3>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-200">Database Upgrades (US East 1)</span>
              <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded border border-brand-500/30">SCHEDULED</span>
            </div>
            <p className="text-xs text-slate-400">2026-08-01 02:00 UTC - 04:00 UTC</p>
          </div>
        </Card>

        <Card className="bg-slate-950/80 space-y-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Disaster Recovery & Backups
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-slate-400" /> Last Global Backup</span>
              <span className="text-emerald-400 font-bold">2 hours ago</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                leftIcon={<Play className="w-3 h-3" />}
                isLoading={isBackupRunning}
                onClick={() => {
                  setIsBackupRunning(true);
                  setTimeout(() => setIsBackupRunning(false), 1500);
                }}
              >
                Trigger Manual Backup
              </Button>
              <Button variant="outline" size="sm" className="flex-1" leftIcon={<Wrench className="w-3 h-3" />}>
                Test DR Failover
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
