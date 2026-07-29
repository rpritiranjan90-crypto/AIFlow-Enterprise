import React, { useRef, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomNode } from '../nodes/CustomNode';
import { useWorkflowBuilderStore } from '../store/useWorkflowBuilderStore';
import { NodeDefinition } from '../types/nodeTypes';

const nodeTypes = {
  customNode: CustomNode,
};

const CanvasContent: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNodeFromCatalog,
    setSelectedNodeId,
    deleteNode,
    duplicateNode,
    selectedNodeId,
  } = useWorkflowBuilderStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeDataRaw = event.dataTransfer.getData('application/reactflow');
      if (!nodeDataRaw) return;

      try {
        const nodeDef: NodeDefinition = JSON.parse(nodeDataRaw);
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        addNodeFromCatalog(nodeDef, position);
      } catch (e) {
        console.error('Failed to drop node', e);
      }
    },
    [screenToFlowPosition, addNodeFromCatalog]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (selectedNodeId && (e.key === 'Delete' || e.key === 'Backspace')) {
      deleteNode(selectedNodeId);
    }
  };

  return (
    <div
      ref={reactFlowWrapper}
      className="flex-1 h-full w-full bg-background-dark relative"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        snapToGrid={true}
        snapGrid={[16, 16]}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#334155" />
        <Controls className="bg-slate-900 border-slate-800 text-slate-200 fill-slate-200" />
        <MiniMap
          nodeColor="#6366F1"
          maskColor="rgba(8, 12, 20, 0.8)"
          className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
        />
      </ReactFlow>
    </div>
  );
};

export const Canvas: React.FC = () => (
  <ReactFlowProvider>
    <CanvasContent />
  </ReactFlowProvider>
);
