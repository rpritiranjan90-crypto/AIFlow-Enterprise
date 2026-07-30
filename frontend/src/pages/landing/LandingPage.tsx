import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  Database,
  Cpu,
  Layers,
  BarChart3,
  Server,
  Lock,
  Globe2,
  Terminal,
  MessageSquare,
  Activity,
  Star,
  PlayCircle,
  Clock,
  Code2,
  RefreshCw,
  Gauge,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Animated Stat Item component with count-up animation
const StatCounter: React.FC<{ value: string; label: string; delay: number }> = ({ value, label, delay }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const target = parseFloat(value.replace(/[^0-9.]/g, '')) || 100;
    const suffix = value.replace(/[0-9.]/g, '');
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        if (value.includes('.')) {
          setDisplayValue(start.toFixed(2) + suffix);
        } else {
          setDisplayValue(Math.floor(start).toString() + suffix);
        }
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="space-y-1.5 p-4 rounded-2xl bg-[#0B1120]/40 border border-white/[0.04] backdrop-blur-sm"
    >
      <div className="text-3xl sm:text-5xl font-black text-white tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
        {displayValue}
      </div>
      <div className="text-xs sm:text-sm font-medium text-slate-400">{label}</div>
    </motion.div>
  );
};

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isScrolled, setIsScrolled] = useState(false);

  // Live fluctuating system metrics state
  const [latency, setLatency] = useState(340);
  const [activeStep, setActiveStep] = useState(1);

  // Handle scroll detection for glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fluctuating latency simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const latencies = [340, 280, 310, 295, 325, 340];
      setLatency(latencies[Math.floor(Math.random() * latencies.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Auto-playing workflow execution step loop
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 2200);
    return () => clearInterval(stepInterval);
  }, []);

  // Supported enterprise technologies / Logo cloud
  const techIntegrations = [
    { name: 'OpenAI', icon: <Bot className="w-5 h-5" />, category: 'LLM Gateway' },
    { name: 'Anthropic', icon: <Cpu className="w-5 h-5" />, category: 'AI Inference' },
    { name: 'Google Gemini', icon: <Globe2 className="w-5 h-5" />, category: 'Multimodal' },
    { name: 'AWS', icon: <Server className="w-5 h-5" />, category: 'Cloud Infra' },
    { name: 'Microsoft Azure', icon: <Layers className="w-5 h-5" />, category: 'Cloud Infra' },
    { name: 'Docker', icon: <Blocks className="w-5 h-5" />, category: 'Containers' },
    { name: 'Kubernetes', icon: <Workflow className="w-5 h-5" />, category: 'Orchestration' },
    { name: 'PostgreSQL', icon: <Database className="w-5 h-5" />, category: 'pgvector DB' },
    { name: 'Redis', icon: <RefreshCw className="w-5 h-5" />, category: 'Cache Layer' },
    { name: 'GitHub', icon: <Code2 className="w-5 h-5" />, category: 'CI/CD Pipelines' },
    { name: 'OpenTelemetry', icon: <Activity className="w-5 h-5" />, category: 'Tracing' },
    { name: 'Prometheus', icon: <Gauge className="w-5 h-5" />, category: 'Metrics' },
    { name: 'Grafana', icon: <BarChart3 className="w-5 h-5 text-amber-400" />, category: 'Dashboards' },
  ];

  // Trust & Security Badges
  const trustBadges = [
    { title: 'Enterprise Ready', desc: 'SLA & VPC Isolation' },
    { title: 'SOC2 Type II Ready', desc: 'End-to-End Encryption' },
    { title: 'GDPR & CCPA', desc: 'Automated Privacy Export' },
    { title: 'Multi-Cloud Native', desc: 'AWS, GCP, Azure, On-Prem' },
    { title: 'Kubernetes Native', desc: 'Helm v1.0 & HPA Scaled' },
    { title: 'OpenTelemetry', desc: 'Full Stack Observability' },
  ];

  // Feature List
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-blue-400" />,
      title: 'Autonomous Multi-Agent Swarms',
      desc: 'Deploy executive C-Suite AI agent societies (CEO, CTO, CISO) that deliberate, reason, and solve multi-step operational tasks asynchronously.',
      tag: 'AIOS Kernel',
    },
    {
      icon: <Workflow className="w-6 h-6 text-cyan-400" />,
      title: 'Visual Workflow Builder',
      desc: 'Orchestrate complex DAG workflows with conditional loops, parallel executions, automatic failover retries, and compensation handlers.',
      tag: 'DAG Engine',
    },
    {
      icon: <Database className="w-6 h-6 text-purple-400" />,
      title: 'Data Warehouse & Hybrid RAG',
      desc: 'Sync Snowflake, BigQuery, and Databricks directly into FAISS, Qdrant, and Pinecone vector stores with multi-tier semantic memory.',
      tag: 'Vector Sync',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'DevSecOps & Enterprise RBAC',
      desc: 'Granular 8-tier role-based access control, JWT token lifecycle with JTI revocation, structured audit logs, and data portability routines.',
      tag: 'Security First',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-amber-400" />,
      title: 'Decision Intelligence & Forecasting',
      desc: 'Predictive scenario simulation, risk scoring, AI cost tracking, and automated C-suite board report generation.',
      tag: 'Intelligence v3.0',
    },
    {
      icon: <Activity className="w-6 h-6 text-rose-400" />,
      title: 'OpenTelemetry Observability',
      desc: 'Native Prometheus metrics exporter, 6 Grafana dashboards, Alertmanager routing, and real-time system health checks.',
      tag: 'Observability',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "AIFlow Enterprise transformed our financial data reconciliation from 14 manual hours down to a 4-minute automated AI workflow.",
      author: "Sarah Jenkins",
      role: "VP of Engineering, FinTech Global",
      rating: 5,
    },
    {
      quote: "The autonomous executive agent society and multi-provider LLM failovers give us complete peace of mind during traffic surges.",
      author: "Marcus Chen",
      role: "Chief Technology Officer, CloudScale Inc",
      rating: 5,
    },
    {
      quote: "Native Snowflake and BigQuery vector sync eliminated our third-party ETL vendor costs while cutting latency by 65%.",
      author: "Elena Rostova",
      role: "Head of AI & Data, HealthData Corp",
      rating: 5,
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'How does AIFlow Enterprise differ from Zapier Enterprise or n8n?',
      a: 'AIFlow Enterprise is an AI-first Operating System built specifically for complex enterprise autonomous reasoning, multi-agent swarms, vector database RAG sync, SOC2 audit logging, and multi-cloud Kubernetes deployments.',
    },
    {
      q: 'Can we deploy AIFlow on-premise or in an air-gapped private cloud VPC?',
      a: 'Yes. Enterprise subscribers receive Helm charts and Docker Compose manifests for self-hosted VPC deployments on AWS, GCP, Azure, or air-gapped on-premise infrastructure.',
    },
    {
      q: 'What AI models and LLM providers are supported out of the box?',
      a: 'AIFlow supports OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, Azure OpenAI, Ollama local models, and custom self-hosted inference servers with automatic failover.',
    },
    {
      q: 'Is there a free trial available for testing?',
      a: 'Yes! You can start a 14-day free trial on the Pro Enterprise plan with zero credit card required, or run the free local Docker deployment.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      {/* SECTION 1: PREMIUM HERO BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft animated aurora gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-b from-blue-600/20 via-cyan-500/10 to-transparent blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[35%] -left-[150px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[65%] -right-[150px] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px]"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Navigation Bar (Glassmorphism on Scroll) */}
      <nav
        className={`fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-6 lg:px-16 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050816]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/50'
            : 'bg-transparent border-b border-white/[0.04]'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-100 text-lg tracking-tight flex items-center gap-1.5">
              AIFlow{' '}
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold tracking-wider uppercase">
                Enterprise
              </span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-blue-400 transition-colors relative group py-1">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#workflow" className="hover:text-blue-400 transition-colors relative group py-1">
            Workflow Engine
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#integrations" className="hover:text-blue-400 transition-colors relative group py-1">
            Integrations
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#pricing" className="hover:text-blue-400 transition-colors relative group py-1">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
          </a>
          <Link to="/docs" className="hover:text-blue-400 transition-colors relative group py-1">
            Docs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="glow" rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}>
              Start Free Trial
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1120] border border-white/[0.08] text-xs text-blue-400 font-semibold shadow-xl shadow-blue-500/5 backdrop-blur-md hover:border-blue-500/30 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>v4.0 Release: Autonomous AI Operating System & Voice Agents</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
        >
          Build Intelligent Enterprise Workflows with{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Autonomous AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          Transform complex business operations into self-healing, multi-agent AI streams. Connect your enterprise data warehouses, LLM models, and cloud infrastructure with zero security compromises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/signup">
            <Button
              variant="glow"
              size="lg"
              className="h-13 px-8 text-base shadow-xl shadow-blue-600/25 group hover:-translate-y-0.5 transition-transform"
              rightIcon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
            >
              Start Free Trial
            </Button>
          </Link>
          <Link to="/docs">
            <Button
              variant="outline"
              size="lg"
              className="h-13 px-8 text-base border-white/[0.12] bg-[#0B1120]/60 hover:bg-[#111827] hover:-translate-y-0.5 transition-transform"
              leftIcon={<PlayCircle className="w-5 h-5 text-cyan-400" />}
            >
              Book Live Demo
            </Button>
          </Link>
        </motion.div>

        {/* SECTION 2 & 3: ANIMATED WORKFLOW PREVIEW & LIVE FLUCTUATING SYSTEM INDICATORS */}
        <motion.div
          id="workflow"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 p-2 rounded-2xl bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent shadow-2xl backdrop-blur-2xl max-w-6xl mx-auto"
        >
          <div className="rounded-xl bg-[#0B1120] border border-white/[0.08] overflow-hidden text-left shadow-2xl">
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-[#050816]/90 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#111827] border border-white/[0.06] font-mono text-[11px] text-slate-300">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>aiflow.enterprise.io/orchestrator</span>
              </div>

              {/* SECTION 3: LIVE SYSTEM INDICATORS */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>Latency:</span>
                  <span className="text-white font-bold">{latency}ms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-mono text-[11px] font-semibold uppercase">SYSTEM LIVE</span>
                </div>
              </div>
            </div>

            {/* Live Orchestrator Content */}
            <div className="p-6 sm:p-8 bg-[#0B1120]/95 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      Active Stream: Financial Fraud Detection & SLA Dispatch
                    </h3>
                    <p className="text-xs text-slate-400">Snowflake &rarr; Claude 3.5 Sonnet &rarr; FAISS RAG &rarr; Slack Alert</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> SLA 100% Guaranteed
                  </span>
                </div>
              </div>

              {/* SECTION 2: ANIMATED WORKFLOW EXECUTION PIPELINE */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs relative">
                {/* Step 1: Webhook */}
                <div
                  className={`p-4 rounded-xl bg-[#111827] border transition-all duration-500 space-y-2 ${
                    activeStep >= 1 ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-blue-400 font-semibold">STEP 1 • TRIGGER</span>
                    {activeStep >= 1 && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 font-semibold">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    <span>Snowflake Webhook</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Ingested 14,200 rows</p>
                </div>

                {/* Step 2: AI Reasoning */}
                <div
                  className={`p-4 rounded-xl bg-[#111827] border transition-all duration-500 space-y-2 ${
                    activeStep >= 2 ? 'border-cyan-400 shadow-lg shadow-cyan-500/20' : 'border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">STEP 2 • AI REASON</span>
                    {activeStep === 2 ? (
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    ) : activeStep > 2 ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 font-semibold">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>Claude 3.5 Agent</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Scored Risk: 0.94 (Anomaly)</p>
                </div>

                {/* Step 3: Memory Sync */}
                <div
                  className={`p-4 rounded-xl bg-[#111827] border transition-all duration-500 space-y-2 ${
                    activeStep >= 3 ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-400 font-semibold">STEP 3 • MEMORY</span>
                    {activeStep === 3 ? (
                      <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                    ) : activeStep > 3 ? (
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 font-semibold">
                    <Database className="w-4 h-4 text-purple-400" />
                    <span>FAISS Vector Sync</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Triples Graph Updated</p>
                </div>

                {/* Step 4: Action */}
                <div
                  className={`p-4 rounded-xl bg-[#111827] border transition-all duration-500 space-y-2 ${
                    activeStep >= 4 ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">STEP 4 • ACTION</span>
                    {activeStep === 4 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="flex items-center gap-2 text-slate-200 font-semibold">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Slack & Jira Dispatch</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Security Lead Notified</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: TECHNOLOGY INTEGRATION SECTION */}
      <section id="integrations" className="py-16 border-y border-white/[0.08] bg-[#050816]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Built on Trusted Enterprise Technologies
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 opacity-90">
            {techIntegrations.map((tech, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 rounded-xl bg-[#0B1120] border border-white/[0.06] hover:border-blue-500/40 text-slate-300 hover:text-white flex flex-col items-center justify-center gap-1.5 transition-colors group cursor-default shadow-md"
              >
                <div className="text-slate-400 group-hover:text-blue-400 transition-colors">{tech.icon}</div>
                <span className="text-xs font-bold">{tech.name}</span>
                <span className="text-[9px] text-slate-400 font-mono">{tech.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ANIMATED STATISTICS */}
      <section className="py-16 border-b border-white/[0.08] bg-[#0B1120]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCounter value="50+" label="Enterprise Integrations" delay={0.1} />
          <StatCounter value="99.99%" label="Platform Availability" delay={0.2} />
          <StatCounter value="1M+" label="AI Tasks Executed" delay={0.3} />
          <StatCounter value="100+" label="Workflow Templates" delay={0.4} />
        </div>
      </section>

      {/* TRUST & COMPLIANCE BADGES */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Enterprise Trust & Strict Compliance
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            AIFlow Enterprise provides bank-grade security controls, zero-knowledge encryption, and dedicated VPC options.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-[#0B1120] border border-white/[0.08] text-center space-y-1 hover:border-blue-500/40 transition-all shadow-md"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-white">{badge.title}</h4>
              <p className="text-[10px] text-slate-400">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS GRID (MICRO INTERACTIONS) */}
      <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto space-y-16 border-t border-white/[0.08]">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Enterprise AI Platform Capabilities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto">
            Everything you need to plan, execute, monitor, and scale autonomous AI workflows across your enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#0B1120] border border-white/[0.08] hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-[#111827] border border-white/[0.06] group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF & TESTIMONIALS */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-white/[0.08]">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Trusted by Leading Engineering Teams</h2>
          <p className="text-slate-400 text-sm">See how global enterprises automate their critical workloads with AIFlow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0B1120] border border-white/[0.08] space-y-4 flex flex-col justify-between hover:border-white/[0.15] transition-colors">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              </div>
              <div className="pt-3 border-t border-white/[0.06]">
                <div className="font-bold text-white text-xs">{t.author}</div>
                <div className="text-[11px] text-slate-400">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW SECTION */}
      <section id="pricing" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-white/[0.08]">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Predictable Enterprise Pricing</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Scale from initial proof-of-concept to enterprise-wide automation with clear usage tiers.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#0B1120] border border-white/[0.08] text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
                billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${
                billingCycle === 'yearly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly Billing <span className="text-[10px] text-cyan-300 font-bold ml-1">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="p-8 rounded-2xl bg-[#0B1120] border border-white/[0.08] space-y-6 flex flex-col justify-between hover:border-white/[0.2] transition-colors">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Starter</h4>
              <div className="text-4xl font-extrabold text-white">
                {billingCycle === 'monthly' ? '$49' : '$39'} <span className="text-xs text-slate-400 font-normal">/ mo</span>
              </div>
              <p className="text-xs text-slate-400">For small teams building initial AI automations</p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 500,000 AI Tokens / mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10 Active Workflows</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 3 Workspace Members</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard Support</li>
              </ul>
            </div>
            <Link to="/signup"><Button variant="outline" className="w-full">Choose Starter</Button></Link>
          </div>

          {/* Pro Enterprise (Featured) */}
          <div className="p-8 rounded-2xl bg-[#0B1120] border-2 border-blue-500 shadow-2xl shadow-blue-500/10 relative space-y-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <span className="absolute -top-3.5 right-6 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-[10px] uppercase rounded-full tracking-wider">
              Recommended
            </span>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Pro Enterprise</h4>
              <div className="text-4xl font-extrabold text-white">
                {billingCycle === 'monthly' ? '$199' : '$159'} <span className="text-xs text-slate-400 font-normal">/ mo</span>
              </div>
              <p className="text-xs text-slate-400">For scaling engineering teams & AI operations</p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2,500,000 AI Tokens / mo</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Visual Workflows</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 25 Workspace Members</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 30+ Enterprise Connectors</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 99.99% SLA Uptime Guarantee</li>
              </ul>
            </div>
            <Link to="/signup"><Button variant="glow" className="w-full">Start 14-Day Free Trial</Button></Link>
          </div>

          {/* Custom Enterprise */}
          <div className="p-8 rounded-2xl bg-[#0B1120] border border-white/[0.08] space-y-6 flex flex-col justify-between hover:border-white/[0.2] transition-colors">
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white">Dedicated Custom</h4>
              <div className="text-4xl font-extrabold text-white">Custom</div>
              <p className="text-xs text-slate-400">VPC self-hosted, air-gapped deployments & custom SLAs</p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited AI Token Quotas</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Self-hosted Kubernetes VPC</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom LLM Model Fine-Tuning</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24/7 Dedicated Support Lead</li>
              </ul>
            </div>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-white tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl bg-[#0B1120] border border-white/[0.08] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 flex justify-between items-center text-left text-sm font-bold text-white hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-400' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ENTERPRISE FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#050816] py-16 px-6 lg:px-16 text-xs text-slate-400 space-y-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">AIFlow Enterprise</span>
            </div>
            <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
              The Enterprise Autonomous Artificial Intelligence Operating System & Workflow Automation Platform.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">Product</h5>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">AIOS Kernel</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">Visual DAG Builder</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Tiers</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">Resources</h5>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link to="/docs" className="hover:text-white transition-colors">System Architecture</Link></li>
              <li><a href="https://github.com/rpritiranjan90-crypto/AIFlow-Enterprise" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">Compliance</h5>
            <ul className="space-y-2 text-slate-400">
              <li><span className="text-emerald-400">✓ SOC2 Type II Ready</span></li>
              <li><span className="text-emerald-400">✓ GDPR & CCPA Verified</span></li>
              <li><span className="text-slate-400">ISO 27001 Certified</span></li>
              <li><span className="text-slate-400">HIPAA Compliant VPC</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>© 2026 AIFlow Enterprise Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Security Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
