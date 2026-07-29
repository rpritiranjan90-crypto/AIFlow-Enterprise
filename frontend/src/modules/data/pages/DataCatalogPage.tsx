import React from 'react';
import { Database } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { CatalogEntryItem } from '../types/data_platform';

export const DataCatalogPage: React.FC = () => {
  const catalog: CatalogEntryItem[] = [
    { id: 'cat_01', name: 'lakehouse_sales_orders', description: 'Production sales transactions and revenue events', owner: 'Data Engineering Team', tagsJson: '["Finance", "Core", "Revenue"]', piiFlag: true, createdAt: '2026-07-29' },
  ];

  const columns: Column<CatalogEntryItem>[] = [
    {
      key: 'name',
      header: 'Dataset Catalog Name',
      render: (r) => (
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-100">{r.name}</span>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (r) => <span className="text-xs text-slate-300">{r.description}</span>,
    },
    {
      key: 'owner',
      header: 'Owner',
      render: (r) => <span className="text-xs font-mono text-cyan-300">{r.owner}</span>,
    },
    {
      key: 'piiFlag',
      header: 'PII Status',
      render: (r) => <Badge variant={r.piiFlag ? 'warning' : 'glow'}>{r.piiFlag ? 'PII Detected' : 'Clean'}</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Data Catalog & Business Glossary"
        description="Searchable dataset catalog, automated PII detection, owner directory, tags, and schema documentation"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Data Catalog' }]}
      />

      <Table columns={columns} data={catalog} keyExtractor={(c) => c.id} />
    </div>
  );
};
