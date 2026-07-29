import React from 'react';
import { Copy, Play, Save, Box } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const DigitalTwinStudioPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital Twin Studio"
        description="Simulate infrastructure changes, workflow load, and business process optimizations safely."
        breadcrumbs={[{ label: 'Platform Core' }, { label: 'Digital Twin' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card glow>
            <h3 className="font-bold text-slate-100 mb-4">Simulation Scenarios</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-left" leftIcon={<Copy className="w-4 h-4" />}>
                Clone Production Infrastructure
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" leftIcon={<Copy className="w-4 h-4" />}>
                Clone Q3 Finance Workflows
              </Button>
              <Button variant="outline" className="w-full justify-start text-left" leftIcon={<Copy className="w-4 h-4" />}>
                Load Test Marketplace Extensions
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card glow className="h-full min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <Box className="w-5 h-5 text-indigo-400" />
                Active Twin: Production Infrastructure (Simulation Mode)
              </h3>
              <div className="flex gap-2">
                <Button variant="glow" size="sm" leftIcon={<Play className="w-4 h-4" />}>Run Simulation</Button>
                <Button variant="outline" size="sm" leftIcon={<Save className="w-4 h-4" />}>Save State</Button>
              </div>
            </div>
            <div className="flex-1 border border-slate-800 rounded-lg bg-slate-900 flex items-center justify-center">
               <p className="text-slate-500 text-sm">[ Digital Twin State & Physics Engine Placeholder ]</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
