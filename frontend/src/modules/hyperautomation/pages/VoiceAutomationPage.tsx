import React from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const VoiceAutomationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Voice Automation & Call Speech Studio"
        description="Speech-to-Text (STT) call transcriptions, Text-to-Speech (TTS) voice synthesis, and meeting summaries"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Voice Automation' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="glow">Speech-to-Text (STT)</Badge>
            <span className="text-xs font-mono text-cyan-300">Call ID: call_9901</span>
          </div>

          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Mic className="w-4 h-4 text-brand-400" /> Customer Support Audio Transcription
          </h3>
          <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed font-sans">
            "Customer requested technical support escalation for workflow execution ID 9901. Agent verified authentication token and dispatched P1 priority ticket."
          </p>
        </Card>

        <Card glow className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="glow">Text-to-Speech (TTS)</Badge>
            <span className="text-xs font-mono text-emerald-400 font-bold">Neural Voice Active</span>
          </div>

          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-400" /> Voice Synthesis Generator
          </h3>
          <textarea
            rows={3}
            defaultValue="Hello, your automated workflow execution has completed successfully with zero errors."
            className="w-full rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 p-3 focus:border-brand-500 focus:outline-none"
          />
          <Button variant="glow" leftIcon={<Volume2 className="w-4 h-4" />}>
            Synthesize Neural Audio Response
          </Button>
        </Card>
      </div>
    </div>
  );
};
