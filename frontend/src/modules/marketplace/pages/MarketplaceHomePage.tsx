import React from 'react';
import { PackageSearch, Star, Download } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const MarketplaceHomePage: React.FC = () => {
  const featuredPackages = [
    { id: 'pkg_1', name: 'Salesforce AI Enrichment', publisher: 'Enterprise AI Labs', type: 'Workflow', rating: 4.9, downloads: '15.4k' },
    { id: 'pkg_2', name: 'CyberSec Code Auditor', publisher: 'Cyber Intelligence', type: 'Agent', rating: 4.8, downloads: '8.2k' },
    { id: 'pkg_3', name: 'Slack Advanced Notify', publisher: 'Automation Pros', type: 'Connector', rating: 5.0, downloads: '3.2k' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Community Marketplace"
        description="Discover, install, and manage extensions from certified partners and community developers."
        breadcrumbs={[{ label: 'Ecosystem' }, { label: 'Marketplace' }]}
      />

      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Search workflows, agents, connectors..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200" />
        <Button variant="outline">Filters</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" /> Featured Extensions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPackages.map(pkg => (
            <Card key={pkg.id} glow className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
                    <PackageSearch className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{pkg.name}</h4>
                    <p className="text-xs text-slate-400">{pkg.publisher}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <Badge variant="neutral">{pkg.type}</Badge>
                <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" /> {pkg.rating}</div>
                <div className="flex items-center gap-1"><Download className="w-3 h-3" /> {pkg.downloads}</div>
              </div>
              
              <Button variant="glow" className="w-full text-xs">Install Package</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
