import React from 'react';
import { Network, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const KnowledgeGraphExplorerPage: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <PageHeader
        title="Knowledge Graph Explorer"
        description="Visualize relationships between departments, agents, workflows, and infrastructure."
        breadcrumbs={[{ label: 'Platform Core' }, { label: 'Knowledge Graph' }]}
      />

      <Card glow className="flex-1 min-h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-100 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            Global Enterprise Topology
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><ZoomIn className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm"><ZoomOut className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm"><Maximize className="w-4 h-4" /></Button>
          </div>
        </div>
        
        <div className="flex-1 border border-slate-800 bg-slate-950 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-transparent"></div>
          <p className="text-slate-500 z-10">[ Interactive WebGL Graph Rendering Placeholder ]</p>
        </div>
      </Card>
    </div>
  );
};
