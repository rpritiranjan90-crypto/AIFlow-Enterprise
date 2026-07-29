import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';

interface AppConnector {
  id: string;
  name: string;
  category: string;
  description: string;
  isConnected: boolean;
  authType: string;
}

export const IntegrationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const connectors: AppConnector[] = [
    { id: 'app_openai', name: 'OpenAI (GPT-4o)', category: 'AI', description: 'Autonomous reasoning, code generation & text extraction', isConnected: true, authType: 'API Key' },
    { id: 'app_anthropic', name: 'Anthropic Claude 3.5', category: 'AI', description: 'Long-context document analysis & structured parsing', isConnected: true, authType: 'API Key' },
    { id: 'app_slack', name: 'Slack Enterprise', category: 'Communication', description: 'Real-time alert channels & interactive bot commands', isConnected: true, authType: 'OAuth2' },
    { id: 'app_salesforce', name: 'Salesforce CRM', category: 'CRM', description: 'Lead, Account & Opportunity automated sync', isConnected: true, authType: 'OAuth2' },
    { id: 'app_github', name: 'GitHub Enterprise', category: 'Dev', description: 'PR code review automation & webhook events', isConnected: true, authType: 'OAuth2' },
    { id: 'app_jira', name: 'Jira Software', category: 'Dev', description: 'Issue tracking & sprint status automation', isConnected: false, authType: 'OAuth2' },
    { id: 'app_postgres', name: 'PostgreSQL DB', category: 'Database', description: 'Direct SQL query execution & CDC event streams', isConnected: true, authType: 'Credentials' },
    { id: 'app_hubspot', name: 'HubSpot', category: 'CRM', description: 'Contact deduplication & email sequence triggers', isConnected: false, authType: 'OAuth2' },
    { id: 'app_stripe', name: 'Stripe Billing', category: 'Finance', description: 'Payment settlement webhooks & invoice generation', isConnected: true, authType: 'API Key' },
    { id: 'app_notion', name: 'Notion Workspace', category: 'Storage', description: 'Automated executive wiki updates & databases', isConnected: false, authType: 'OAuth2' },
    { id: 'app_aws', name: 'AWS S3 & Lambda', category: 'Dev', description: 'Cloud file storage & serverless executions', isConnected: true, authType: 'IAM Role' },
    { id: 'app_gcp', name: 'Google Cloud Platform', category: 'Dev', description: 'BigQuery data pipelines & Vertex AI models', isConnected: false, authType: 'Service Account' },
  ];

  const filteredConnectors = connectors.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'connected') return matchesSearch && c.isConnected;
    return matchesSearch && c.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Integrations & Connectors"
        description="Connect your SaaS applications, databases, and LLM providers securely"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Integrations' }]}
        actions={
          <Button variant="glow" leftIcon={<Plus className="w-4 h-4" />}>
            Add Custom Connector
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs
          tabs={[
            { id: 'all', label: 'All Apps', count: connectors.length },
            { id: 'connected', label: 'Connected', count: connectors.filter((c) => c.isConnected).length },
            { id: 'ai', label: 'AI Models' },
            { id: 'crm', label: 'CRM & Sales' },
            { id: 'dev', label: 'Developer Tools' },
            { id: 'database', label: 'Databases' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search connectors..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnectors.map((app) => (
          <Card key={app.id} glow className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-brand-400">
                    {app.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-100">{app.name}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">{app.category}</span>
                  </div>
                </div>
                {app.isConnected ? (
                  <Badge variant="success">Connected</Badge>
                ) : (
                  <Badge variant="neutral">Not Connected</Badge>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{app.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 text-[11px]">Auth: {app.authType}</span>
              <Button
                variant={app.isConnected ? 'outline' : 'primary'}
                size="sm"
              >
                {app.isConnected ? 'Manage Config' : 'Connect App'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
