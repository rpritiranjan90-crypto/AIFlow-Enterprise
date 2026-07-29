import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">Transparent Pricing for AI Teams</h1>
          <p className="text-xl text-slate-400">Scale your AI workflows without surprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-slate-500 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Developer</h3>
            <p className="text-slate-400 mb-6">Perfect for exploration and prototyping.</p>
            <div className="text-4xl font-extrabold mb-6">Free</div>
            <ul className="space-y-3 mb-8 text-slate-300">
              <li>✓ 1,000 AI Executions / mo</li>
              <li>✓ 3 Active Workflows</li>
              <li>✓ Community Support</li>
              <li>✓ Standard Analytics</li>
            </ul>
            <Link to="/register" className="block text-center py-3 px-4 w-full rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors font-semibold">
              Start Building
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-blue-900 to-slate-800 rounded-2xl p-8 border border-blue-500 relative transform md:-translate-y-4 shadow-2xl shadow-blue-900/50">
            <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <p className="text-blue-200 mb-6">For production teams scaling AI workloads.</p>
            <div className="text-4xl font-extrabold mb-2">$99<span className="text-lg font-normal text-blue-300">/mo</span></div>
            <p className="text-sm text-blue-300 mb-6">Includes 5 team members</p>
            <ul className="space-y-3 mb-8 text-blue-100">
              <li>✓ 50,000 AI Executions / mo</li>
              <li>✓ Unlimited Workflows</li>
              <li>✓ Priority Email Support</li>
              <li>✓ Advanced Telemetry & Logs</li>
              <li>✓ Custom AI Providers</li>
            </ul>
            <Link to="/register?plan=pro" className="block text-center py-3 px-4 w-full rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors font-semibold shadow-lg shadow-blue-500/30">
              Start 14-Day Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-slate-500 transition-colors">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-slate-400 mb-6">For organizations requiring high compliance.</p>
            <div className="text-4xl font-extrabold mb-6">Custom</div>
            <ul className="space-y-3 mb-8 text-slate-300">
              <li>✓ Volume Execution Pricing</li>
              <li>✓ Dedicated VPC / On-Prem</li>
              <li>✓ 24/7 Phone Support & SLAs</li>
              <li>✓ SSO (SAML/OIDC) & RBAC</li>
              <li>✓ Dedicated Success Manager</li>
            </ul>
            <Link to="/contact-sales" className="block text-center py-3 px-4 w-full rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors font-semibold">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
