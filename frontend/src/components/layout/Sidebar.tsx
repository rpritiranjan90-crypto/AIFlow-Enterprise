import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Workflow,
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
  DownloadCloud,
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
    { name: 'AI Studio', path: '/ai-agent', icon: Bot, isNew: true },
    { name: 'Prompt Library', path: '/prompts', icon: BookOpen },
    { name: 'Knowledge Bases', path: '/knowledge', icon: Database },
    { name: 'Enterprise Chat', path: '/chat', icon: MessageSquare },
    { name: 'Data Lakehouse', path: '/data', icon: Database },
    { name: 'SQL Workspace', path: '/data/sql', icon: Terminal },
    { name: 'Pipeline Monitor', path: '/data/pipelines', icon: Activity },
    { name: 'Executive Intelligence', path: '/intelligence', icon: Brain },
    { name: 'KPI Center', path: '/intelligence/kpis', icon: Target },
    { name: 'Forecast Studio', path: '/intelligence/forecast', icon: BarChart3 },
    { name: 'Model Registry', path: '/aiops/models', icon: Cpu },
    { name: 'AI Cost Analytics', path: '/aiops/costs', icon: DollarSign },
    { name: 'Admin Console', path: '/admin', icon: ShieldCheck },
    { name: 'Audit Explorer', path: '/admin/audit', icon: Shield },
    { name: 'Credential Vault', path: '/admin/vault', icon: Key },
    { name: 'Billing & Invoices', path: '/billing', icon: CreditCard },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Support Center', path: '/support-center', icon: LifeBuoy },
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen border-r border-white/[0.08] bg-[#050816] text-slate-300 transition-all duration-300 z-30 shadow-2xl ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.08]">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 shadow-lg shadow-blue-500/20 shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-white tracking-tight text-base leading-tight">
                AIFlow
              </span>
              <span className="text-[10px] font-semibold text-blue-400 tracking-widest uppercase">
                Enterprise
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar Navigation"
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B1120] border border-transparent hover:border-white/[0.08] transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Active Workspace Info */}
      <div className="p-3 border-b border-white/[0.06]">
        <div
          className={`flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120] border border-white/[0.08] ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-500/30">
            {currentWorkspace?.name ? currentWorkspace.name[0] : 'G'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {currentWorkspace?.name || 'Global Operations'}
              </p>
              <p className="text-[10px] text-blue-400 font-semibold truncate uppercase tracking-wider">Pro Enterprise</p>
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
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group relative ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-[#0B1120]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
              {!isCollapsed && (
                <span className="flex-1 truncate">{item.name}</span>
              )}
              {!isCollapsed && item.isNew && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Footer AI Token Quota Widget */}
      <div className="p-3 border-t border-white/[0.08]">
        {!isCollapsed && (
          <div className="p-3.5 rounded-xl bg-[#0B1120] border border-white/[0.08] text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Tokens</span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">65%</span>
            </div>
            <div className="w-full bg-[#111827] rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[65%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>650K / 1M</span>
              <span>Reset in 12d</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
