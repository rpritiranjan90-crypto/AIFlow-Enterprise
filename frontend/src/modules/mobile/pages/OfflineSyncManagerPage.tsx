import React, { useState } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const OfflineSyncManagerPage: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<any>(null);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncStatus(null);

    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus({
        session_id: 'msync_9901',
        records_synced: 145,
        conflict_count: 0,
        status: 'completed',
      });
    }, 550);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Encrypted Offline Synchronization Manager"
        description="Background delta sync, local AES-256 SQLite queue, conflict resolution, and retry exponential backoff"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Offline Sync' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-brand-400" /> Synchronization Status & Local Storage
          </h3>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Local Queue Status:</span>
              <span className="text-emerald-400 font-bold">0 Pending Actions</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Encryption:</span>
              <span className="text-cyan-300 font-bold">AES-256 GCM (Biometric Lock)</span>
            </div>
          </div>
          <Button variant="glow" isLoading={isSyncing} leftIcon={<RefreshCw className="w-4 h-4" />} onClick={handleSync}>
            Trigger Delta Sync Now
          </Button>
        </Card>

        <Card className="space-y-4 bg-slate-950/80">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Last Sync Execution Telemetry
          </h3>
          {syncStatus ? (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold block">✓ Status: {syncStatus.status.toUpperCase()}</span>
              <div className="flex justify-between text-slate-300">
                <span>Records Synced:</span>
                <span className="font-bold">{syncStatus.records_synced}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Conflicts Resolved:</span>
                <span className="text-cyan-300 font-bold">{syncStatus.conflict_count}</span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Click "Trigger Delta Sync Now" to synchronize.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
