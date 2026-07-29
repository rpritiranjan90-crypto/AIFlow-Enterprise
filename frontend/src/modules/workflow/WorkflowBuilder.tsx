import React, { useState } from 'react';
import { WorkflowToolbar } from './components/WorkflowToolbar';
import { NodeLibrary } from './components/NodeLibrary';
import { Canvas } from './components/Canvas';
import { NodePropertiesPanel } from './components/NodePropertiesPanel';
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { ImportExportModal } from './components/ImportExportModal';

export const WorkflowBuilder: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen bg-background-dark text-slate-100 overflow-hidden font-sans">
      {/* Top Toolbar */}
      <WorkflowToolbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenImportExport={() => setIsImportExportOpen(true)}
      />

      {/* Main Canvas Shell with Left & Right Sidebars */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <NodeLibrary />
        <Canvas />
        <NodePropertiesPanel />
      </div>

      {/* Modals */}
      <VersionHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <ImportExportModal isOpen={isImportExportOpen} onClose={() => setIsImportExportOpen(false)} />
    </div>
  );
};
