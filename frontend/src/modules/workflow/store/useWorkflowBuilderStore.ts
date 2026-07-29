import { create } from 'zustand';
import {
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import { NodeDefinition } from '../types/nodeTypes';

export type AutoSaveStatus = 'saved' | 'saving' | 'unsaved';

export interface WorkflowBuilderState {
  workflowId: string;
  workflowName: string;
  workflowDescription: string;
  version: string;
  isFavorite: boolean;
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  autoSaveStatus: AutoSaveStatus;
  history: { nodes: Node[]; edges: Edge[] }[];
  historyIndex: number;

  // Actions
  setWorkflowMeta: (id: string, name: string, description?: string) => void;
  setWorkflowName: (name: string) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setSelectedNodeId: (id: string | null) => void;
  addNodeFromCatalog: (nodeDef: NodeDefinition, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, newConfig: Record<string, any>, newName?: string) => void;
  duplicateNode: (id: string) => void;
  toggleDisableNode: (id: string) => void;
  deleteNode: (id: string) => void;
  undo: () => void;
  redo: () => void;
  importGraphJson: (jsonString: string) => void;
  exportGraphJson: () => string;
  triggerAutoSave: () => void;
}

const initialNodes: Node[] = [
  {
    id: 'n1',
    type: 'customNode',
    position: { x: 100, y: 200 },
    data: {
      nodeType: 'manual_trigger',
      name: 'Manual Trigger',
      category: 'Triggers',
      description: 'Starts workflow manually via button click',
      iconName: 'Play',
      config: { notes: 'Initial trigger' },
      isDisabled: false,
    },
  },
  {
    id: 'n2',
    type: 'customNode',
    position: { x: 500, y: 200 },
    data: {
      nodeType: 'ai_agent',
      name: 'Salesforce AI Enrichment',
      category: 'AI',
      description: 'Queries Claude 3.5 Sonnet to enrich lead profile',
      iconName: 'Bot',
      config: { model: 'gpt-4o', systemPrompt: 'Enrich lead data' },
      isDisabled: false,
    },
  },
  {
    id: 'n3',
    type: 'customNode',
    position: { x: 900, y: 200 },
    data: {
      nodeType: 'slack',
      name: 'Slack Alert Notice',
      category: 'Communication',
      description: 'Posts message to Slack channel',
      iconName: 'MessageSquare',
      config: { channel: '#sales-alerts', message: 'New enriched lead!' },
      isDisabled: false,
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'n1', target: 'n2', sourceHandle: 'output-0', targetHandle: 'input-0', animated: true, style: { stroke: '#6366F1', strokeWidth: 2 } },
  { id: 'e2-3', source: 'n2', target: 'n3', sourceHandle: 'output-0', targetHandle: 'input-0', animated: true, style: { stroke: '#06B6D4', strokeWidth: 2 } },
];

export const useWorkflowBuilderStore = create<WorkflowBuilderState>((set, get) => ({
  workflowId: 'wf_01',
  workflowName: 'Salesforce Lead AI Enrichment Pipeline',
  workflowDescription: 'Triggered on new Salesforce leads, enriches with Apollo data & sends Slack notice',
  version: '1.2.0',
  isFavorite: true,
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: 'n2',
  autoSaveStatus: 'saved',
  history: [{ nodes: initialNodes, edges: initialEdges }],
  historyIndex: 0,

  setWorkflowMeta: (id, name, description) =>
    set({ workflowId: id, workflowName: name, workflowDescription: description || '' }),

  setWorkflowName: (name) => {
    set({ workflowName: name, autoSaveStatus: 'unsaved' });
    get().triggerAutoSave();
  },

  onNodesChange: (changes) => {
    const updatedNodes = applyNodeChanges(changes, get().nodes);
    set({ nodes: updatedNodes, autoSaveStatus: 'unsaved' });
    get().triggerAutoSave();
  },

  onEdgesChange: (changes) => {
    const updatedEdges = applyEdgeChanges(changes, get().edges);
    set({ edges: updatedEdges, autoSaveStatus: 'unsaved' });
    get().triggerAutoSave();
  },

  onConnect: (connection) => {
    const newEdge = {
      ...connection,
      animated: true,
      style: { stroke: '#6366F1', strokeWidth: 2 },
    };
    const updatedEdges = addEdge(newEdge, get().edges);
    set({ edges: updatedEdges, autoSaveStatus: 'unsaved' });
    get().triggerAutoSave();
  },

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  addNodeFromCatalog: (nodeDef, position) => {
    const newId = `node_${Math.random().toString(36).substring(2, 9)}`;
    const newNode: Node = {
      id: newId,
      type: 'customNode',
      position,
      data: {
        nodeType: nodeDef.type,
        name: nodeDef.name,
        category: nodeDef.category,
        description: nodeDef.description,
        iconName: nodeDef.iconName,
        config: { ...nodeDef.defaultConfig },
        inputsCount: nodeDef.inputsCount,
        outputsCount: nodeDef.outputsCount,
        isDisabled: false,
      },
    };

    const newNodes = [...get().nodes, newNode];
    set({
      nodes: newNodes,
      selectedNodeId: newId,
      autoSaveStatus: 'unsaved',
      history: [...get().history.slice(0, get().historyIndex + 1), { nodes: newNodes, edges: get().edges }],
      historyIndex: get().historyIndex + 1,
    });
    get().triggerAutoSave();
  },

  updateNodeData: (id, newConfig, newName) => {
    const updatedNodes = get().nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            ...node.data,
            name: newName || node.data.name,
            config: { ...((node.data.config as Record<string, any>) || {}), ...newConfig },
          },
        };
      }
      return node;
    });
    set({ nodes: updatedNodes, autoSaveStatus: 'unsaved' });
    get().triggerAutoSave();
  },

  duplicateNode: (id) => {
    const targetNode = get().nodes.find((n) => n.id === id);
    if (!targetNode) return;
    const newId = `node_${Math.random().toString(36).substring(2, 9)}`;
    const newNode: Node = {
      ...targetNode,
      id: newId,
      position: { x: targetNode.position.x + 40, y: targetNode.position.y + 40 },
      data: { ...targetNode.data, name: `${targetNode.data.name} (Copy)` },
    };
    const newNodes = [...get().nodes, newNode];
    set({ nodes: newNodes, selectedNodeId: newId, autoSaveStatus: 'unsaved' });
    get().triggerAutoSave();
  },

  toggleDisableNode: (id) => {
    const updatedNodes = get().nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: { ...node.data, isDisabled: !node.data.isDisabled },
        };
      }
      return node;
    });
    set({ nodes: updatedNodes, autoSaveStatus: 'unsaved' });
    get().triggerAutoSave();
  },

  deleteNode: (id) => {
    const newNodes = get().nodes.filter((n) => n.id !== id);
    const newEdges = get().edges.filter((e) => e.source !== id && e.target !== id);
    set({
      nodes: newNodes,
      edges: newEdges,
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
      autoSaveStatus: 'unsaved',
    });
    get().triggerAutoSave();
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      set({ nodes: prev.nodes, edges: prev.edges, historyIndex: historyIndex - 1 });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      set({ nodes: next.nodes, edges: next.edges, historyIndex: historyIndex + 1 });
    }
  },

  importGraphJson: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.nodes) && Array.isArray(parsed.edges)) {
        set({ nodes: parsed.nodes, edges: parsed.edges, autoSaveStatus: 'unsaved' });
        get().triggerAutoSave();
      }
    } catch (e) {
      console.error('Invalid workflow JSON', e);
    }
  },

  exportGraphJson: () => {
    const { nodes, edges, workflowId, workflowName, version } = get();
    return JSON.stringify({ workflowId, workflowName, version, nodes, edges }, null, 2);
  },

  triggerAutoSave: () => {
    set({ autoSaveStatus: 'saving' });
    setTimeout(() => {
      set({ autoSaveStatus: 'saved' });
    }, 800);
  },
}));
