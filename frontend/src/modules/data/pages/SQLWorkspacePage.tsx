import React, { useState } from 'react';
import { Terminal, Play, Save, Table as TableIcon } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const SQLWorkspacePage: React.FC = () => {
  const [sqlText, setSqlText] = useState("SELECT id, customer_name, total_amount, status FROM lakehouse_sales_orders WHERE status = 'completed' LIMIT 10;");
  const [isRunning, setIsRunning] = useState(false);
  const [queryResult, setQueryResult] = useState<any>(null);

  const handleRunQuery = () => {
    setIsRunning(true);
    setQueryResult(null);

    setTimeout(() => {
      setIsRunning(false);
      setQueryResult({
        query_id: 'q_9901',
        execution_time_ms: 145,
        rows_returned: 2,
        columns: ['id', 'customer_name', 'total_amount', 'status'],
        data: [
          { id: 'ord_9901', customer_name: 'Acme Corp', total_amount: '$14,850.00', status: 'completed' },
          { id: 'ord_9902', customer_name: 'Global Tech', total_amount: '$8,900.00', status: 'completed' },
        ],
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="High-Performance SQL Query Workspace"
        description="Interactive SQL editor, query optimizer, saved queries, and Delta Parquet execution engine"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'SQL Workspace' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" /> Interactive SQL Editor
          </h3>
          <textarea
            rows={8}
            value={sqlText}
            onChange={(e) => setSqlText(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 p-3 focus:border-brand-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <Button variant="glow" isLoading={isRunning} leftIcon={<Play className="w-4 h-4" />} onClick={handleRunQuery}>
              Execute SQL Query
            </Button>
            <Button variant="outline" leftIcon={<Save className="w-4 h-4" />}>
              Save Query
            </Button>
          </div>
        </Card>

        <Card className="space-y-4 bg-slate-950/80">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-emerald-400" /> Query Results & Execution Output
          </h3>

          {queryResult ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Latency: {queryResult.execution_time_ms} ms</span>
                <span>Rows: {queryResult.rows_returned}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400">
                      {queryResult.columns.map((col: string) => (
                        <th key={col} className="p-2">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.data.map((row: any, i: number) => (
                      <tr key={i} className="border-b border-slate-800/50 text-slate-200">
                        {queryResult.columns.map((col: string) => (
                          <td key={col} className="p-2">{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Click "Execute SQL Query" to view results.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
