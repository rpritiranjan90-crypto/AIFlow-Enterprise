import React, { useState } from 'react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { q: "How do I create my first workflow?", a: "Navigate to the Workflow Builder, drag and drop an LLM node, and connect it to a data source." },
    { q: "How are my API keys stored?", a: "API keys are encrypted at rest using AES-256 and are never exposed in the UI after initial input." },
    { q: "Can I self-host AIFlow Enterprise?", a: "Yes, our Enterprise tier includes Kubernetes manifests for deploying into your own VPC." },
    { q: "What happens if a background worker fails?", a: "Celery automatically retries the task up to 3 times before routing it to the Dead Letter Queue for manual inspection." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for articles, guides, or FAQs..." 
              className="w-full px-6 py-4 rounded-full border-2 border-slate-200 shadow-sm focus:border-blue-500 focus:outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-6 top-4 text-slate-400">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition-shadow">
            <h3 className="text-xl font-bold mb-2">Getting Started</h3>
            <p className="text-slate-500">Quickstart guides and onboarding tutorials for new users.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition-shadow">
            <h3 className="text-xl font-bold mb-2">API Documentation</h3>
            <p className="text-slate-500">Reference guides for the REST API and Python SDK.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition-shadow">
            <h3 className="text-xl font-bold mb-2">Billing & Account</h3>
            <p className="text-slate-500">Manage subscriptions, invoices, and team seats.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md cursor-pointer transition-shadow">
            <h3 className="text-xl font-bold mb-2">Troubleshooting</h3>
            <p className="text-slate-500">Diagnose workflow errors and agent failures.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white rounded-lg border border-slate-200 group">
                <summary className="font-semibold p-4 cursor-pointer marker:text-blue-500 hover:bg-slate-50">
                  {faq.q}
                </summary>
                <div className="p-4 pt-0 text-slate-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpCenter;
