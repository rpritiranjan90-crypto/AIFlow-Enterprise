import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const AutomationLibraryPage: React.FC = () => {
  const automations = [
    { name: 'SAP Invoice Entry Robot', category: 'Finance', type: 'RPA Desktop', downloads: 1420, desc: 'Automates vendor invoice entry in SAP GUI ERP' },
    { name: 'Resume Screening & Parsing Pipeline', category: 'HR', type: 'OCR & AI', downloads: 890, desc: 'Extracts candidate skills and education from PDF resumes' },
    { name: 'Active Directory Onboarding Playwright Script', category: 'IT Operations', type: 'Browser', downloads: 1120, desc: 'Headless browser automation for user provisioning' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Turnkey Hyper Automation Library"
        description="Reusable automation templates across Finance, HR, Legal, Healthcare, Customer Support, and IT Operations"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Automation Library' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {automations.map((item) => (
          <Card key={item.name} glow className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="glow">{item.category}</Badge>
                <span className="text-xs font-mono text-cyan-300">{item.type}</span>
              </div>
              <h3 className="font-bold text-base text-slate-100">{item.name}</h3>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> {item.downloads} Runs
              </span>
              <Button variant="glow" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                Instantiate Blueprint
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
