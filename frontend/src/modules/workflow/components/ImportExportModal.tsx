import React, { useState, useEffect } from 'react';
import { Upload, Copy, Check } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useWorkflowBuilderStore } from '../store/useWorkflowBuilderStore';

export interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({ isOpen, onClose }) => {
  const { exportGraphJson, importGraphJson } = useWorkflowBuilderStore();
  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setJsonText(exportGraphJson());
    }
  }, [isOpen, exportGraphJson]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    importGraphJson(jsonText);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Workflow JSON Definition"
      description="Export raw graph JSON or paste external workflow templates to import."
      maxWidth="lg"
    >
      <div className="space-y-3 mt-3">
        <textarea
          rows={12}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="w-full rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 p-4 focus:border-brand-500 focus:outline-none"
        />

        <div className="flex justify-between items-center pt-2">
          <Button variant="outline" size="sm" leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="glow" size="sm" leftIcon={<Upload className="w-4 h-4" />} onClick={handleImport}>
              Import JSON
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
