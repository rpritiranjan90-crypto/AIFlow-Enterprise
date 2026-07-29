import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Workflow,
  FileCode2,
  PlayCircle,
  Bot,
  BookOpen,
  Database,
  MessageSquare,
  ShieldCheck,
  Shield,
  Key,
  Blocks,
  ShoppingBag,
  Code,
  DollarSign,
  Cpu,
  CheckCircle2,
  ShieldAlert,
  Sliders,
  Package,
  Terminal,
  Server,
  Globe,
  GitBranch,
  HardDrive,
  ToggleRight,
  CreditCard,
  Store,
  Monitor,
  Eye,
  Mic,
  FileText,
  Target,
  Brain,
  Network,
  Activity,
  GitCommit,
  Layers,
  Smartphone,
  Bell,
  RefreshCw,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Building2,
  Sparkles,
  Palette,
  Users,
  LifeBuoy,
  Heart,
  Radio,
  FlaskConical,
  Network as NetworkIcon,
  GitPullRequest,
  CloudCog,
  Wrench,
  TrendingDown,
  Globe2,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Landmark,
  Factory,
  TerminalSquare,
  Search,
  Box,
  ListOrdered,
  LineChart,
  Presentation,
  DownloadCloud
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspaceStore';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { currentWorkspace } = useWorkspaceStore();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', path: '/workflows', icon: Workflow, badge: 'Active' },
    { name: 'Executions', path: '/executions', icon: PlayCircle },
    { name: 'Mobile Tower', path: '/mobile', icon: Smartphone, isNew: true },
    { name: 'Mobile Approvals', path: '/mobile/approvals', icon: CheckCircle2 },
    { name: 'Push Alerts', path: '/mobile/notifications', icon: Bell },
    { name: 'Offline Sync', path: '/mobile/sync', icon: RefreshCw },
    { name: 'Device Manager', path: '/mobile/devices', icon: Smartphone },
    { name: 'Edge AI Settings', path: '/mobile/edge-ai', icon: Cpu },
    { name: 'Data Lakehouse', path: '/data', icon: Database },
    { name: 'ETL Studio', path: '/data/etl', icon: GitBranch },
    { name: 'Data Catalog', path: '/data/catalog', icon: BookOpen },
    { name: 'SQL Workspace', path: '/data/sql', icon: Terminal },
    { name: 'Pipeline Monitor', path: '/data/pipelines', icon: Activity },
    { name: 'Data Lineage', path: '/data/lineage', icon: GitCommit },
    { name: 'Data Quality', path: '/data/quality', icon: ShieldCheck },
    { name: 'Semantic Layer', path: '/data/semantic', icon: Layers },
    { name: 'Executive Intelligence', path: '/intelligence', icon: Brain },
    { name: 'KPI Center', path: '/intelligence/kpis', icon: Target },
    { name: 'Forecast Studio', path: '/intelligence/forecast', icon: BarChart3 },
    { name: 'Scenario Simulator', path: '/intelligence/simulator', icon: Sliders },
    { name: 'Decision Center', path: '/intelligence/recommendations', icon: CheckCircle2 },
    { name: 'Knowledge Graph', path: '/intelligence/graph', icon: Network },
    { name: 'Digital Twin Studio', path: '/intelligence/twin', icon: Activity },
    { name: 'Executive Reports', path: '/intelligence/reports', icon: FileText },
    { name: 'AI Studio', path: '/ai-agent', icon: Bot },
    { name: 'Prompt Library', path: '/prompts', icon: BookOpen },
    { name: 'Knowledge Bases', path: '/knowledge', icon: Database },
    { name: 'Enterprise Chat', path: '/chat', icon: MessageSquare },
    { name: 'Desktop RPA Studio', path: '/rpa', icon: Monitor },
    { name: 'Browser Studio', path: '/browser-studio', icon: Globe },
    { name: 'Document IDP Studio', path: '/document-studio', icon: FileText },
    { name: 'OCR Engine', path: '/ocr', icon: FileText },
    { name: 'Computer Vision', path: '/vision', icon: Eye },
    { name: 'Voice Studio', path: '/voice', icon: Mic },
    { name: 'Automation Library', path: '/automation-library', icon: Sparkles },
    { name: 'Commercial App Store', path: '/commercial-marketplace', icon: Store },
    { name: 'Publisher Portal', path: '/publisher', icon: Sparkles },
    { name: 'Billing & Invoices', path: '/billing', icon: CreditCard },
    { name: 'Subscriptions', path: '/subscriptions', icon: DollarSign },
    { name: 'License Keys', path: '/licenses', icon: Key },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Installed Apps', path: '/installed-apps', icon: Blocks },
    { name: 'Templates', path: '/templates', icon: FileCode2 },
    { name: 'Cloud Tower', path: '/cloud', icon: Globe },
    { name: 'Cluster Manager', path: '/cloud/clusters', icon: Server },
    { name: 'Deployment Center', path: '/cloud/deployments', icon: GitBranch },
    { name: 'Disaster Recovery', path: '/cloud/backups', icon: HardDrive },
    { name: 'Feature Flags', path: '/cloud/flags', icon: ToggleRight },
    { name: 'Capacity Planner', path: '/cloud/capacity', icon: Zap },
    { name: 'Developer Portal', path: '/developer', icon: Code },
    { name: 'Plugin Studio', path: '/plugins/studio', icon: Package },
    { name: 'Sandbox Tester', path: '/developer/sandbox', icon: Terminal },
    { name: 'API Explorer', path: '/developer/api-explorer', icon: Server },
    { name: 'CLI Guide', path: '/developer/cli', icon: Terminal },
    { name: 'Model Registry', path: '/aiops/models', icon: Cpu },
    { name: 'AI Cost Analytics', path: '/aiops/costs', icon: DollarSign },
    { name: 'AI Governance', path: '/aiops/governance', icon: ShieldCheck },
    { name: 'Human Approvals', path: '/aiops/approvals', icon: CheckCircle2 },
    { name: 'AI Safety', path: '/aiops/safety', icon: ShieldAlert },
    { name: 'Model Comparison', path: '/aiops/compare', icon: Sliders },
    { name: 'Admin Console', path: '/admin', icon: ShieldCheck },
    { name: 'Audit Explorer', path: '/admin/audit', icon: Shield },
    { name: 'Credential Vault', path: '/admin/vault', icon: Key },
    { name: 'Organization', path: '/admin/organization', icon: Building2 },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Compliance Center', path: '/compliance', icon: ShieldCheck, isNew: true },
    { name: 'Policy Engine', path: '/policies', icon: Sliders },
    { name: 'Partner Portal', path: '/partner-portal', icon: Users },
    { name: 'Support Center', path: '/support-center', icon: LifeBuoy },
    { name: 'Customer Success', path: '/customer-success', icon: Heart },
    { name: 'Operations Command', path: '/ops-command', icon: Radio },
    { name: 'Public Dev Portal', path: '/public-dev', icon: Code },
    { name: 'White Label Studio', path: '/whitelabel', icon: Palette },
    { name: 'Agent Studio 2.0', path: '/agent-studio', icon: NetworkIcon, isNew: true },
    { name: 'Multi-Agent Teams', path: '/multi-agent', icon: Users },
    { name: 'Reasoning Viewer', path: '/agent-reasoning', icon: Brain },
    { name: 'Memory Explorer', path: '/agent-memory', icon: Database },
    { name: 'Simulation Studio', path: '/agent-simulation', icon: FlaskConical },
    { name: 'Execution Timeline', path: '/agent-timeline', icon: GitPullRequest },
    { name: 'Cloud Operations', path: '/saas/operations', icon: CloudCog, isNew: true },
    { name: 'Tenant Manager', path: '/saas/tenants', icon: Building2 },
    { name: 'Provisioning', path: '/saas/provisioning', icon: Wrench },
    { name: 'Global Health', path: '/saas/health', icon: Globe2 },
    { name: 'FinOps Analytics', path: '/saas/finops', icon: TrendingDown },
    { name: 'Usage Analytics', path: '/saas/usage', icon: BarChart3 },
    { name: 'Maintenance', path: '/saas/maintenance', icon: Server },

    { name: 'Industry Center', path: '/industry/solutions', icon: Briefcase, isNew: true },
    { name: 'Healthcare', path: '/industry/healthcare', icon: Stethoscope },
    { name: 'Finance', path: '/industry/finance', icon: Landmark },
    { name: 'Manufacturing', path: '/industry/manufacturing', icon: Factory },
    { name: 'Retail', path: '/industry/retail', icon: Store },
    { name: 'Government', path: '/industry/government', icon: Building2 },
    { name: 'Education', path: '/industry/education', icon: GraduationCap },

    { name: 'Public Marketplace', path: '/marketplace', icon: ShoppingBag, isNew: true },
    { name: 'Publisher Portal', path: '/marketplace/publisher', icon: Briefcase },
    { name: 'Certification Center', path: '/marketplace/certification', icon: ShieldCheck },
    { name: 'Enterprise App Store', path: '/marketplace/enterprise', icon: Building2 },
    { name: 'Developer Community', path: '/marketplace/community', icon: Users },

    { name: 'Command Center', path: '/platform', icon: TerminalSquare, isNew: true },
    { name: 'Global Search', path: '/platform/search', icon: Search },
    { name: 'Knowledge Graph', path: '/platform/graph', icon: Network },
    { name: 'Digital Twin', path: '/platform/twin', icon: Box },
    { name: 'Orchestration', path: '/platform/orchestration', icon: ListOrdered },
    { name: 'Predictive Ops', path: '/platform/predictive', icon: LineChart },
    { name: 'Unified Copilot', path: '/platform/copilot', icon: Bot },
    { name: 'Exec Intelligence', path: '/platform/executive', icon: Presentation },
    { name: 'Lifecycle Manager', path: '/platform/lifecycle', icon: DownloadCloud },
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen border-r border-slate-800 bg-slate-950/90 text-slate-300 transition-all duration-300 z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-cyan shadow-glow shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 tracking-tight text-base leading-tight">
                AIFlow
              </span>
              <span className="text-[10px] font-semibold text-brand-400 tracking-widest uppercase">
                Enterprise
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Active Workspace Info */}
      <div className="p-3 border-b border-slate-800/60">
        <div
          className={`flex items-center gap-3 p-2 rounded-lg bg-slate-900/60 border border-slate-800 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-7 h-7 rounded-md bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-xs shrink-0 border border-brand-500/30">
            {currentWorkspace?.name ? currentWorkspace.name[0] : 'W'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {currentWorkspace?.name || 'Acme Global Workspace'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">Enterprise Tier</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
              {!isCollapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}
              {!isCollapsed && item.isNew && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-slate-100 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-800/80">
        {!isCollapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-brand-900/40 to-slate-900 border border-brand-500/20 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-brand-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Token Quota</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-brand-500 h-full w-[65%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>650,000 / 1,000,000</span>
              <span>65%</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
