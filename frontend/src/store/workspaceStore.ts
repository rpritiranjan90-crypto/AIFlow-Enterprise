import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workspace } from '@aiflow/shared-types';

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (workspace: Workspace) => void;
  createWorkspace: (ws: Partial<Workspace>) => void;
}

const initialWorkspaces: Workspace[] = [
  {
    id: 'ws_prod_01',
    organizationId: 'org_acme_enterprise',
    name: 'Production Core',
    slug: 'production-core',
    description: 'Mission-critical enterprise automations and AI pipelines',
    role: 'owner',
    memberCount: 24,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ws_eng_02',
    organizationId: 'org_acme_enterprise',
    name: 'DevOps & Infrastructure',
    slug: 'devops-infra',
    description: 'CI/CD automation, cloud monitoring & GitHub bots',
    role: 'admin',
    memberCount: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ws_sales_03',
    organizationId: 'org_acme_enterprise',
    name: 'RevOps & CRM AI',
    slug: 'revops-crm',
    description: 'Salesforce lead enrichment & automated HubSpot sync',
    role: 'member',
    memberCount: 8,
    createdAt: new Date().toISOString(),
  },
];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspaces: initialWorkspaces,
      currentWorkspace: initialWorkspaces[0],
      setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
      createWorkspace: (wsData) => {
        const newWs: Workspace = {
          id: `ws_${Math.random().toString(36).substring(2, 9)}`,
          organizationId: 'org_acme_enterprise',
          name: wsData.name || 'New Workspace',
          slug: wsData.slug || 'new-workspace',
          description: wsData.description || 'Enterprise workspace',
          role: 'owner',
          memberCount: 1,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          workspaces: [newWs, ...state.workspaces],
          currentWorkspace: newWs,
        }));
      },
    }),
    {
      name: 'aiflow-workspace-storage',
    }
  )
);
