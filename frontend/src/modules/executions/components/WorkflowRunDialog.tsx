import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export interface WorkflowRunDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRun: (payload: Record<string, any>) => void;
}

export const WorkflowRunDialog: React.FC<WorkflowRunDialogProps> = ({
  isOpen,
  onClose,
  onRun,
}) => {
  const [payloadText, setPayloadText] = useState(
    JSON.stringify({ lead_id: 'lead_9901', email: 'alex@enterprise.io', company: 'Acme Corp' }, null, 2)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(payloadText);
      onRun(parsed);
      onClose();
    } catch (err) {
      console.error('Invalid JSON payload');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manual Workflow Trigger"
      description="Inject dynamic JSON event data payload to execute the workflow."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Event Payload (JSON)
          </label>
          <textarea
            rows={6}
            value={payloadText}
            onChange={(e) => setPayloadText(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 p-3 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="glow" type="submit" leftIcon={<Play className="w-4 h-4 text-emerald-400" />}>
            Trigger Execution
          </Button>
        </div>
      </form>
    </Modal>
  );
};
