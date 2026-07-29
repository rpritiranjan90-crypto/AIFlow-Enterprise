import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ToastProvider } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useWorkspaceStore } from '@/store/workspaceStore';

export const DashboardLayout: React.FC = () => {
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceSlug, setNewWorkspaceSlug] = useState('');
  const { createWorkspace } = useWorkspaceStore();

  const handleCreateWorkspaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;
    createWorkspace({
      name: newWorkspaceName,
      slug: newWorkspaceSlug || newWorkspaceName.toLowerCase().replace(/\s+/g, '-'),
      description: 'Production automation workspace',
    });
    setNewWorkspaceName('');
    setNewWorkspaceSlug('');
    setIsCreateWorkspaceOpen(false);
  };

  return (
    <ToastProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-background-dark text-slate-100 font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
          <Header onOpenCreateWorkspace={() => setIsCreateWorkspaceOpen(true)} />
          <main className="flex-1 overflow-y-auto p-6 bg-slate-950/40">
            <div className="max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Create Workspace Modal */}
        <Modal
          isOpen={isCreateWorkspaceOpen}
          onClose={() => setIsCreateWorkspaceOpen(false)}
          title="Create New Enterprise Workspace"
          description="Workspaces isolate team automations, credentials, and execution logs."
        >
          <form onSubmit={handleCreateWorkspaceSubmit} className="space-y-4 mt-2">
            <Input
              label="Workspace Name"
              placeholder="e.g. Sales Engineering"
              value={newWorkspaceName}
              onChange={(e) => {
                setNewWorkspaceName(e.target.value);
                setNewWorkspaceSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              required
            />
            <Input
              label="Workspace Slug"
              placeholder="sales-engineering"
              value={newWorkspaceSlug}
              onChange={(e) => setNewWorkspaceSlug(e.target.value)}
              helperText="Unique identifier for URLs and API calls"
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setIsCreateWorkspaceOpen(false)}>
                Cancel
              </Button>
              <Button variant="glow" type="submit">
                Create Workspace
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </ToastProvider>
  );
};
