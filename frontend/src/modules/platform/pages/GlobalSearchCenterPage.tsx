import React, { useState } from 'react';
import { Search, Filter, Hash, Database } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const GlobalSearchCenterPage: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Unified Enterprise Search"
        description="Search across workflows, agents, knowledge bases, industry suites, and compliance records."
        breadcrumbs={[{ label: 'Platform Core' }, { label: 'Global Search' }]}
      />

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search the entire enterprise (semantic or keyword)..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>Filters</Button>
      </div>

      <Card glow className="space-y-4">
        <h3 className="font-bold text-slate-100 flex items-center gap-2">
          <Hash className="w-4 h-4 text-brand-400" />
          Top Results
        </h3>
        
        {query ? (
          <div className="space-y-4">
            <div className="p-4 border border-slate-800 rounded-lg hover:border-slate-600 transition-colors">
              <h4 className="font-bold text-blue-400">Quarterly Finance Approval Workflow</h4>
              <p className="text-xs text-slate-400 mb-2">Workflow • Score: 0.95</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">finance</span>
                <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300">approval</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-t border-slate-800 text-slate-500 text-sm">
            <Database className="w-12 h-12 mb-2 text-slate-700" />
            <p>Start typing to search across the unified intelligence graph.</p>
          </div>
        )}
      </Card>
    </div>
  );
};
