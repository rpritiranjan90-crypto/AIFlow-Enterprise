import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ReportsPage: React.FC = () => {
  const reports = [
    { title: 'Q3 Executive Board Performance Summary', type: 'Board Report', date: '2026-07-29', url: 'https://aiflow.enterprise.io/reports/board_q3_2026.pdf' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Board Reports & Executive Summaries"
        description="Downloadable C-Suite Board Reports, Executive Summaries, Department Reviews, and AI Spend Audits"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Executive Reports' }]}
        actions={
          <Button variant="glow" leftIcon={<Sparkles className="w-4 h-4" />}>
            Generate New Report
          </Button>
        }
      />

      <div className="space-y-4">
        {reports.map((rep) => (
          <Card key={rep.title} glow className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-100 text-sm block">{rep.title}</span>
              <span className="text-xs text-slate-400 font-mono">Generated: {rep.date} • Type: {rep.type}</span>
            </div>
            <Button variant="glow" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Download PDF Report
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
