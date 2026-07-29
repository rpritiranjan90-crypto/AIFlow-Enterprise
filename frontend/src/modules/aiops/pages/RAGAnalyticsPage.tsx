import React from 'react';
import { Database, Search, CheckCircle2, FileText } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KpiCard } from '@/components/ui/KpiCard';

export const RAGAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="RAG Retrieval & Knowledge Analytics"
        description="Vector search retrieval accuracy, citation coverage rates, and similarity score distributions"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'RAG Analytics' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Retrieval Accuracy" value="98.4%" icon={<CheckCircle2 className="w-5 h-5" />} trend="up" description="Top-K Precision" />
        <KpiCard title="Citation Coverage Rate" value="99.1%" icon={<FileText className="w-5 h-5" />} trend="up" description="Attributed Answers" />
        <KpiCard title="Avg Similarity Score" value="0.92 Cosine" icon={<Search className="w-5 h-5" />} trend="up" description="High Semantic Match" />
        <KpiCard title="Vectors Indexed" value="2,270 Vectors" icon={<Database className="w-5 h-5" />} trend="neutral" description="Across 22 Documents" />
      </div>
    </div>
  );
};
