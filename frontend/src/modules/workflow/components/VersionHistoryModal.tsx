import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ isOpen, onClose }) => {
  const versions = [
    { version: '1.2.0', date: '2026-07-29 12:00:00', author: 'Alex Mercer', note: 'Added Claude 3.5 Sonnet enrichment step', active: true },
    { version: '1.1.0', date: '2026-07-28 16:30:00', author: 'Elena Rostova', note: 'Connected Slack notification channel', active: false },
    { version: '1.0.0', date: '2026-07-25 10:15:00', author: 'Alex Mercer', note: 'Initial workflow definition', active: false },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Workflow Version Snapshots"
      description="View change log history and rollback graph to previous states."
      maxWidth="lg"
    >
      <div className="space-y-3 mt-3">
        {versions.map((v) => (
          <div
            key={v.version}
            className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
              v.active ? 'bg-brand-500/10 border-brand-500/30' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-slate-100">v{v.version}</span>
                {v.active && (
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5" /> Active Version
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">{v.note}</p>
              <p className="text-[10px] text-slate-500">{v.author} • {v.date}</p>
            </div>
            {!v.active && (
              <Button variant="outline" size="sm" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
                Restore
              </Button>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
