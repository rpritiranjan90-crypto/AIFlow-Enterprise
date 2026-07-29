import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Bot,
  Workflow,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Blocks,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Bot className="w-6 h-6 text-brand-400" />,
      title: 'Autonomous AI Agents',
      desc: 'Deploy multi-step AI agents powered by OpenAI, Claude, and Gemini to perform complex reasoning, decision-making, and document processing.',
    },
    {
      icon: <Workflow className="w-6 h-6 text-cyan-400" />,
      title: 'Enterprise Business Automation',
      desc: 'Connect your mission-critical ERP, CRM, and cloud infrastructure with zero-latency triggers and fail-safe execution retries.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'SOC2 & HIPAA Compliant Guardrails',
      desc: 'End-to-end payload encryption, strict audit streams, granular RBAC access controls, and private VPC deployment options.',
    },
    {
      icon: <Blocks className="w-6 h-6 text-amber-400" />,
      title: '500+ Deep Connectors',
      desc: 'Native integrations for Salesforce, Slack, PostgreSQL, GitHub, Jira, HubSpot, Stripe, and custom REST API endpoints.',
    },
  ];

  const faqs = [
    {
      q: 'How does AIFlow Enterprise differ from open-source n8n or Zapier?',
      a: 'AIFlow Enterprise is designed specifically for Fortune 500 automation workloads with native autonomous AI agent capabilities, SOC2 compliance, sub-second execution speeds, and deep multi-tenant organization boundaries.',
    },
    {
      q: 'Can we deploy AIFlow on-premise or in a private cloud VPC?',
      a: 'Yes. Enterprise subscribers receive Docker and Helm charts for self-hosted VPC deployments on AWS, GCP, or Azure with full database isolation.',
    },
    {
      q: 'What AI models are supported out of the box?',
      a: 'We support OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, Llama 3 local models, and custom self-hosted vLLM inference servers.',
    },
  ];

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 z-50 flex items-center justify-between px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-cyan shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-lg tracking-tight">AIFlow</span>
            <span className="text-[9px] font-semibold text-brand-400 uppercase tracking-widest">Enterprise</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-brand-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-brand-400 transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-brand-400 transition-colors">Pricing</a>
          <Link to="/docs" className="hover:text-brand-400 transition-colors">Documentation</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="glow" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-center space-y-8">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-brand-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-brand-400 font-semibold shadow-glow"
        >
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Enterprise AI Automation Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight"
        >
          Orchestrate Business Workflows with{' '}
          <span className="bg-gradient-to-r from-brand-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Autonomous AI Agents
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Transform manual operations into intelligent, self-healing automation streams. Connect your enterprise apps, LLM models, and databases in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/signup">
            <Button variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Launch Enterprise Trial
            </Button>
          </Link>
          <Link to="/docs">
            <Button variant="outline" size="lg">
              Explore Documentation
            </Button>
          </Link>
        </motion.div>

        {/* Hero Interactive Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-md overflow-hidden max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-950/80 rounded-t-xl text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-slate-300">aiflow.enterprise.io/dashboard</span>
            <span className="text-[10px] text-emerald-400 font-medium">SOC2 Protected</span>
          </div>

          <div className="p-6 bg-slate-950/90 text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">Active Flow: Salesforce Lead AI Agent</h4>
                  <p className="text-xs text-slate-400">Trigger: Webhook event from Salesforce CRM</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Executing Live (420ms)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block font-mono text-[10px]">STEP 1: RECEIVE</span>
                <span className="font-semibold text-slate-200">Salesforce Webhook</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-brand-500/40 shadow-glow">
                <span className="text-brand-400 block font-mono text-[10px]">STEP 2: REASON (AI)</span>
                <span className="font-semibold text-slate-200">Claude 3.5 Enrichment</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block font-mono text-[10px]">STEP 3: ACTION</span>
                <span className="font-semibold text-slate-200">Slack & PostgreSQL Sync</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100">
            Engineered for High-Scale Enterprise Automation
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Build, execute, and monitor AI business workflows with guaranteed uptime and strict security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/40 transition-colors space-y-3">
              <div className="p-3 rounded-xl bg-slate-800/80 w-fit">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-100">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100">Transparent Enterprise Pricing</h2>
          <p className="text-sm text-slate-400">Scale your automations seamlessly without hidden limits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h4 className="text-lg font-bold text-slate-100">Starter</h4>
            <div className="text-3xl font-extrabold text-slate-100">$49 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <p className="text-xs text-slate-400">Ideal for small automation teams</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100,000 AI Tokens / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 5 Active Workflows</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3 Workspace Members</li>
            </ul>
            <Link to="/signup"><Button variant="outline" className="w-full">Choose Starter</Button></Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-brand-500/50 shadow-glow relative space-y-4">
            <span className="absolute -top-3 right-6 px-3 py-1 bg-brand-500 text-white font-bold text-[10px] uppercase rounded-full">Most Popular</span>
            <h4 className="text-lg font-bold text-slate-100">Pro Enterprise</h4>
            <div className="text-3xl font-extrabold text-slate-100">$299 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <p className="text-xs text-slate-400">For scaling organizations and AI operations</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1,000,000 AI Tokens / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Workflows</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 25 Workspace Members</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated SLA Uptime</li>
            </ul>
            <Link to="/signup"><Button variant="glow" className="w-full">Start 14-Day Free Trial</Button></Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h4 className="text-lg font-bold text-slate-100">Dedicated Custom</h4>
            <div className="text-3xl font-extrabold text-slate-100">Custom</div>
            <p className="text-xs text-slate-400">VPC deployments, custom SLAs & dedicated AI clusters</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom AI Token Quotas</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Self-hosted VPC option</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Priority Support</li>
            </ul>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-slate-100">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left text-sm font-semibold text-slate-100"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && <p className="text-xs text-slate-400 mt-2 leading-relaxed">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 lg:px-12 text-center text-xs text-slate-500 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-brand-400" />
          <span className="font-bold text-slate-300">AIFlow Enterprise</span>
        </div>
        <p>© 2026 AIFlow Enterprise Inc. All rights reserved. SOC2 Type II Certified.</p>
      </footer>
    </div>
  );
};
