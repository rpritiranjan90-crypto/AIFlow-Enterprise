import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Assume basic CSS exists or uses Tailwind if configured

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
          AIFlow Enterprise
        </div>
        <div className="space-x-6">
          <Link to="/features" className="hover:text-blue-400 transition-colors">Features</Link>
          <Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
          <Link to="/help" className="hover:text-blue-400 transition-colors">Documentation</Link>
          <Link to="/login" className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Orchestrate AI Agents at <br />
          <span className="text-blue-500">Enterprise Scale.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          The unified platform for building, securing, and scaling multi-agent AI workflows. 
          Connect your data, deploy autonomous agents, and monitor everything in real-time.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1">
            Start Free Trial
          </Link>
          <Link to="/contact-sales" className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-lg font-semibold border border-slate-700 transition-all">
            Request Demo
          </Link>
        </div>

        {/* Mock Product Screenshot */}
        <div className="mt-20 relative mx-auto rounded-xl shadow-2xl overflow-hidden border border-slate-700 bg-slate-800 p-2 max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 pointer-events-none"></div>
          <div className="h-96 flex items-center justify-center text-slate-500">
            [Product Interface Visualization]
          </div>
        </div>
      </main>

      {/* Social Proof */}
      <section className="border-t border-slate-800 py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto text-center px-6">
          <p className="text-sm font-semibold text-slate-500 tracking-widest uppercase mb-8">Trusted by Engineering Teams At</p>
          <div className="flex justify-center space-x-12 opacity-50 grayscale">
            {/* Mock logos */}
            <span className="text-2xl font-bold">Acme Corp</span>
            <span className="text-2xl font-bold">Globex</span>
            <span className="text-2xl font-bold">Soylent</span>
            <span className="text-2xl font-bold">Initech</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
