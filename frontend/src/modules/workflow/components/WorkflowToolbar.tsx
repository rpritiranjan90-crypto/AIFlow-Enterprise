import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Undo2,
  Redo2,
  Download,
  History,
  Play,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useWorkflowBuilderStore } from '../store/useWorkflowBuilderStore';

export interface WorkflowToolbarProps {
  onOpenImportExport: () => void;
  onOpenHistory: () => void;
}

export const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  onOpenImportExport,
  onOpenHistory,
}) => {
  const navigate = useNavigate();
  const { workflowName, setWorkflowName, autoSaveStatus, undo, redo, version } =
    useWorkflowBuilderStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(workflowName);

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleInput.trim()) {
      setWorkflowName(titleInput);
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between z-20 shadow-md">
      {/* Left Title & Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/workflows')}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <form onSubmit={handleTitleSubmit}>
              <input
                type="text"
                autoFocus
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                className="bg-slate-900 border border-brand-500 rounded px-2 py-1 text-sm font-bold text-slate-100 focus:outline-none"
              />
            </form>
          ) : (
            <h2
              onClick={() => setIsEditingTitle(true)}
              className="text-sm font-bold text-slate-100 hover:text-brand-400 cursor-pointer transition-colors"
            >
              {workflowName}
            </h2>
          )}

          <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-800 text-slate-400 rounded-full border border-slate-700">
            v{version}
          </span>
        </div>

        {/* Auto-Save Indicator */}
        <div className="flex items-center gap-1.5 text-xs ml-2">
          {autoSaveStatus === 'saving' ? (
            <span className="flex items-center gap-1 text-amber-400 font-medium animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved
            </span>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1" />

        <Button
          variant="outline"
          size="sm"
          leftIcon={<History className="w-3.5 h-3.5" />}
          onClick={onOpenHistory}
        >
          Versions
        </Button>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-3.5 h-3.5" />}
          onClick={onOpenImportExport}
        >
          JSON
        </Button>

        <div className="h-5 w-px bg-slate-800 mx-1" />

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Play className="w-3.5 h-3.5 text-emerald-400" />}
          disabled
        >
          Test Run
        </Button>

        <Button variant="glow" size="sm" leftIcon={<Share2 className="w-3.5 h-3.5" />}>
          Publish Flow
        </Button>
      </div>
    </header>
  );
};
