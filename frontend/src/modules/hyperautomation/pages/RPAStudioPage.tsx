import React, { useState } from 'react';
import { Play, Circle, Square, Monitor } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const RPAStudioPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [actions, setActions] = useState([
    { step: 1, type: 'Click Window', target: 'SAP GUI Main Window [title="SAP Easy Access"]', duration: '120ms' },
    { step: 2, type: 'Send Keys', target: 'Transaction Code Field', value: '/nFB60', duration: '40ms' },
    { step: 3, type: 'Mouse Click', target: 'Button [id="btn_post"]', duration: '180ms' },
  ]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Desktop RPA Studio & Action Recorder"
        description="Record, edit, debug, and execute desktop mouse/keyboard automation sequences and window selectors"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'RPA Studio' }]}
        actions={
          <Button
            variant={isRecording ? 'outline' : 'glow'}
            leftIcon={isRecording ? <Square className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> : <Circle className="w-4 h-4 text-rose-400 fill-rose-400" />}
            onClick={toggleRecording}
          >
            {isRecording ? 'Stop Desktop Recording' : 'Start Desktop Recording'}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glow className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-brand-400" /> Recorded Action Timeline
          </h3>

          <div className="space-y-2">
            {actions.map((act) => (
              <div key={act.step} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold">
                    {act.step}
                  </span>
                  <div>
                    <span className="font-bold text-slate-100 block">{act.type}</span>
                    <span className="text-[10px] text-slate-400">{act.target}</span>
                  </div>
                </div>
                <Badge variant="glow">{act.duration}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card glow className="space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-100">RPA Execution Target</h3>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Process:</span>
                <span className="text-slate-100 font-bold">saplogon.exe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Resolution:</span>
                <span className="text-cyan-300 font-bold">1920x1080</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selector Mode:</span>
                <span className="text-emerald-400 font-bold">UI Automation API</span>
              </div>
            </div>
          </div>

          <Button variant="glow" leftIcon={<Play className="w-4 h-4" />}>
            Execute Robot Playback
          </Button>
        </Card>
      </div>
    </div>
  );
};
