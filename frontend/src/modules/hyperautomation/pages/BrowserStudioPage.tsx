import React, { useState } from 'react';
import { Globe, Play, Camera } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const BrowserStudioPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [browserResult, setBrowserResult] = useState<any>(null);

  const handleRunBrowser = () => {
    setIsRunning(true);
    setBrowserResult(null);

    setTimeout(() => {
      setIsRunning(false);
      setBrowserResult({
        url: 'https://aiflow.enterprise.io/login',
        browser: 'Chrome (Playwright Headless)',
        status: 'completed',
        screenshot_url: 'https://aiflow.enterprise.io/screenshots/capture_9901.png',
        pdf_url: 'https://aiflow.enterprise.io/pdf/render_9901.pdf',
        page_title: 'AIFlow Enterprise Portal',
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Playwright Browser Automation Studio"
        description="Build and execute headless Playwright scripts for web automation, form filling, screenshots, and PDF exports"
        breadcrumbs={[{ label: 'AIFlow' }, { label: 'Browser Studio' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card glow className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-400" /> Playwright Browser Script Builder
          </h3>
          <textarea
            rows={8}
            defaultValue={`await page.goto("https://aiflow.enterprise.io/login");\nawait page.fill("#username", "admin@enterprise.io");\nawait page.fill("#password", "secret");\nawait page.click("#btn_login");\nawait page.pdf({ path: "export.pdf" });`}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 p-3 focus:border-brand-500 focus:outline-none"
          />
          <Button variant="glow" isLoading={isRunning} leftIcon={<Play className="w-4 h-4" />} onClick={handleRunBrowser}>
            Run Headless Playwright Script
          </Button>
        </Card>

        <Card className="space-y-4 bg-slate-950/80">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" /> Execution Results & Captured Media
          </h3>
          {browserResult ? (
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">✓ Status: {browserResult.status.toUpperCase()}</span>
                <span className="text-slate-300">Title: {browserResult.page_title}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px]">Captured Artifacts</span>
                <a href="#" className="text-cyan-300 hover:underline block">📸 {browserResult.screenshot_url}</a>
                <a href="#" className="text-emerald-300 hover:underline block">📄 {browserResult.pdf_url}</a>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              Click "Run Headless Playwright Script" to view screenshots and exports.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
