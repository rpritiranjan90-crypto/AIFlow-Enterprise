import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Workflow, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WorkflowTemplateItem } from '../types/connector';

export const TemplateGalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<WorkflowTemplateItem[]>([
    {
      id: 'tmpl_01',
      title: 'Salesforce Lead AI Enrichment & Slack Notice',
      category: 'Sales CRM',
      description: 'Triggered on new Salesforce lead creation, enriches lead data using OpenAI GPT-4o and dispatches Slack alert',
      requiredConnectors: ['Salesforce', 'OpenAI', 'Slack'],
      installCount: 1420,
      createdAt: '2026-06-01',
    },
    {
      id: 'tmpl_02',
      title: 'GitHub PR AI Security Code Auditor Bot',
      category: 'DevOps & Security',
      description: 'Scans incoming PR commits for hardcoded secrets and posts automated security code review comments',
      requiredConnectors: ['GitHub', 'OpenAI', 'Jira'],
      installCount: 890,
      createdAt: '2026-06-15',
    },
    {
      id: 'tmpl_03',
      title: 'Stripe Invoice Settlement to PostgreSQL ETL',
      category: 'Finance & Data Sync',
      description: 'Cron schedule every midnight to reconcile payment transactions into analytical PostgreSQL database',
      requiredConnectors: ['Stripe', 'PostgreSQL'],
      installCount: 450,
      createdAt: '2026-05-10',
    },
    {
      id: 'tmpl_04',
      title: 'Executive Weekly Performance Notion & Email Digest',
      category: 'Executive Operations',
      description: 'Aggregates Jira sprint progress and GitHub releases into weekly executive digest email and Notion page',
      requiredConnectors: ['Jira', 'GitHub', 'Gmail'],
      installCount: 320,
      createdAt: '2026-07-01',
    },
  ]);

  const handleInstallTemplate = (tmplId: string) => {
    navigate(`/workflows/builder/wf_tmpl_${tmplId}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workflow Template Gallery"
        description="One-click installable pre-built enterprise workflow automation blueprints"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Templates' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tmpl) => (
          <Card key={tmpl.id} glow className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="glow">{tmpl.category}</Badge>
                <span className="text-xs font-mono text-emerald-400">{tmpl.installCount} installs</span>
              </div>
              <h4 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-brand-400" /> {tmpl.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{tmpl.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-slate-500">Connectors:</span>
                <div className="flex flex-wrap gap-1">
                  {tmpl.requiredConnectors.map((c) => (
                    <span key={c} className="px-2 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-800 text-cyan-300 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <Button variant="glow" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />} onClick={() => handleInstallTemplate(tmpl.id)}>
                  Instantiate Blueprint
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
