import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Code, ShieldCheck } from 'lucide-react';

export const DocsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-brand-400 font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to AIFlow Enterprise Home
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-brand-500/20 text-brand-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">AIFlow Enterprise Documentation</h1>
          </div>
          <p className="text-slate-400 text-sm">Architecture specs, API references, and developer guidelines for Sprint 1</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <Code className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">REST API v1 Reference</h3>
            <p className="text-xs text-slate-400">FastAPI OpenAPI schema, endpoints for authentication, and workspace multi-tenancy.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-100">Security & RBAC Architecture</h3>
            <p className="text-xs text-slate-400">JWT token refresh cycle, account lockout rules, and password strength requirements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
