import React, { useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { OAuthWizardModal } from '../components/OAuthWizardModal';
import { ConnectorItem } from '../types/connector';

export const MarketplacePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConnector, setSelectedConnector] = useState<ConnectorItem | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const [connectors, setConnectors] = useState<ConnectorItem[]>([
    { id: 'conn_openai', name: 'OpenAI GPT-4o', category: 'AI', provider: 'OpenAI', authType: 'APIKey', iconName: 'Sparkles', version: '2.1.0', description: 'Execute GPT-4o, O1 reasoning, and DALL-E image generation', isFeatured: true, isInstalled: true },
    { id: 'conn_anthropic', name: 'Anthropic Claude 3.5', category: 'AI', provider: 'Anthropic', authType: 'APIKey', iconName: 'Cpu', version: '2.0.0', description: 'Claude 3.5 Sonnet and Haiku reasoning agents', isFeatured: true, isInstalled: false },
    { id: 'conn_gemini', name: 'Google Gemini 1.5', category: 'AI', provider: 'Google', authType: 'APIKey', iconName: 'Zap', version: '1.5.0', description: 'Multimodal 2M token context window AI reasoning', isFeatured: true, isInstalled: false },
    { id: 'conn_deepseek', name: 'DeepSeek R1', category: 'AI', provider: 'DeepSeek', authType: 'APIKey', iconName: 'Code', version: '1.0.0', description: 'Open-weights reasoning model for code and math', isFeatured: true, isInstalled: false },
    { id: 'conn_gmail', name: 'Gmail', category: 'Communication', provider: 'Google', authType: 'OAuth2', iconName: 'Mail', version: '1.4.0', description: 'Send emails, watch inbox webhooks, parse attachments', isFeatured: true, isInstalled: false },
    { id: 'conn_gsheets', name: 'Google Sheets', category: 'Productivity', provider: 'Google', authType: 'OAuth2', iconName: 'Table', version: '1.5.0', description: 'Read/write rows, format cells, append data rows', isFeatured: true, isInstalled: false },
    { id: 'conn_salesforce', name: 'Salesforce CRM', category: 'CRM', provider: 'Salesforce', authType: 'OAuth2', iconName: 'Building2', version: '2.4.0', description: 'SOQL query, Lead enrichment, Opportunity workflow triggers', isFeatured: true, isInstalled: true },
    { id: 'conn_hubspot', name: 'HubSpot CRM', category: 'CRM', provider: 'HubSpot', authType: 'OAuth2', iconName: 'Users', version: '2.1.0', description: 'Sync contact properties, deal pipelines, and marketing leads', isFeatured: true, isInstalled: false },
    { id: 'conn_slack', name: 'Slack Bot', category: 'Communication', provider: 'Slack', authType: 'OAuth2', iconName: 'MessageSquare', version: '2.0.0', description: 'Post block-kit messages, listen to channel events', isFeatured: true, isInstalled: true },
    { id: 'conn_github', name: 'GitHub Enterprise', category: 'DevTools', provider: 'GitHub', authType: 'OAuth2', iconName: 'Code', version: '2.2.0', description: 'Listen to PR commits, post AI security code reviews', isFeatured: true, isInstalled: false },
    { id: 'conn_jira', name: 'Jira Software', category: 'DevTools', provider: 'Atlassian', authType: 'OAuth2', iconName: 'CheckSquare', version: '1.8.0', description: 'Create issue tickets, update sprint boards, sync status', isFeatured: true, isInstalled: false },
    { id: 'conn_postgres', name: 'PostgreSQL', category: 'DB', provider: 'PostgreSQL', authType: 'ConnectionString', iconName: 'Database', version: '2.0.0', description: 'Execute SQL queries, PgVector search, ETL pipelines', isFeatured: true, isInstalled: false },
    { id: 'conn_s3', name: 'AWS S3', category: 'Storage', provider: 'Amazon Web Services', authType: 'APIKey', iconName: 'HardDrive', version: '1.6.0', description: 'Bucket file uploads, presigned URLs, event triggers', isFeatured: true, isInstalled: false },
    { id: 'conn_stripe', name: 'Stripe Payments', category: 'Finance', provider: 'Stripe', authType: 'APIKey', iconName: 'CreditCard', version: '2.0.0', description: 'Listen to invoice webhooks, sync customer subscriptions', isFeatured: true, isInstalled: false },
  ]);

  const handleInstallClick = (conn: ConnectorItem) => {
    setSelectedConnector(conn);
    setIsWizardOpen(true);
  };

  const handleInstallSuccess = (connId: string) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === connId ? { ...c, isInstalled: true } : c))
    );
  };

  const filteredConnectors = connectors.filter((c) => {
    const matchesCategory = activeCategory === 'all' || c.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integration Marketplace"
        description="Connect 30+ pre-built enterprise applications, LLMs, CRMs, databases, and communication tools"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Marketplace' }]}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Tabs
          tabs={[
            { id: 'all', label: 'All Catalog', count: connectors.length },
            { id: 'ai', label: 'AI Models', count: connectors.filter((c) => c.category === 'AI').length },
            { id: 'crm', label: 'CRM', count: connectors.filter((c) => c.category === 'CRM').length },
            { id: 'communication', label: 'Communication', count: connectors.filter((c) => c.category === 'Communication').length },
            { id: 'devtools', label: 'DevTools', count: connectors.filter((c) => c.category === 'DevTools').length },
            { id: 'db', label: 'Databases', count: connectors.filter((c) => c.category === 'DB').length },
          ]}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="w-full sm:w-64">
          <Input
            placeholder="Search 30+ connectors..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredConnectors.map((conn) => (
          <Card key={conn.id} glow className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="glow">{conn.category}</Badge>
                <span className="text-[10px] font-mono text-slate-400">{conn.authType}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 font-bold text-base shrink-0">
                  {conn.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{conn.name}</h4>
                  <span className="text-[10px] text-slate-400">By {conn.provider} • v{conn.version}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{conn.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              {conn.isInstalled ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Connected
                </span>
              ) : (
                <Button variant="glow" size="sm" onClick={() => handleInstallClick(conn)}>
                  Connect App
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <OAuthWizardModal
        connector={selectedConnector}
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSuccess={handleInstallSuccess}
      />
    </div>
  );
};
