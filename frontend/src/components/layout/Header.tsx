import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Laptop,
  Plus,
  Building2,
  LogOut,
  User,
  Shield,
  Check,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';

export interface HeaderProps {
  onOpenCreateWorkspace?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateWorkspace }) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspaceStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: '1', title: 'Workflow Executed Successfully', desc: 'Sync Salesforce to PostgreSQL ran in 1.2s', time: '5m ago' },
    { id: '2', title: 'New Integration Connected', desc: 'Slack Webhook authorized by Admin', time: '1h ago' },
    { id: '3', title: 'AI Token Threshold Notice', desc: 'Workspace reached 65% token allocation', time: '3h ago' },
  ];

  const themeOptions = [
    { id: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'system', label: 'System', icon: <Laptop className="w-3.5 h-3.5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#050816]/90 backdrop-blur-2xl px-6 flex items-center justify-between sticky top-0 z-30 shadow-xl shadow-black/40">
      {/* Left: Global Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => navigate('/workflows')}
          aria-label="Global Search Workflows and Integrations"
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0B1120] border border-white/[0.08] text-xs text-slate-400 hover:border-blue-500/40 hover:text-slate-200 transition-all shadow-inner"
        >
          <Search className="w-4 h-4 text-blue-400" />
          <span>Search workflows, executions, integrations...</span>
          <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-[#111827] text-slate-400 rounded border border-white/[0.08]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Workspace Switcher Button */}
        <Dropdown
          trigger={
            <button
              aria-label="Switch Workspace"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1120] border border-white/[0.08] text-xs font-bold text-slate-200 hover:border-blue-500/40 transition-colors shadow-md"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{currentWorkspace?.name || 'Global Enterprise'}</span>
            </button>
          }
          options={[
            ...workspaces.map((ws) => ({
              id: ws.id,
              label: ws.name,
              icon: currentWorkspace?.id === ws.id ? <Check className="w-3.5 h-3.5 text-blue-400" /> : undefined,
            })),
            { id: 'create_new', label: 'Create Workspace', icon: <Plus className="w-3.5 h-3.5 text-cyan-400" /> },
          ]}
          onSelect={(opt) => {
            if (opt.id === 'create_new') {
              if (onOpenCreateWorkspace) onOpenCreateWorkspace();
            } else {
              const selected = workspaces.find((w) => w.id === opt.id);
              if (selected) setCurrentWorkspace(selected);
            }
          }}
        />

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-[#0B1120] border border-transparent hover:border-white/[0.08] relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0B1120] border border-white/[0.08] shadow-2xl p-4 z-50 backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                <span className="text-xs font-bold text-white">Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-[10px] text-blue-400 font-semibold hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-[#111827] border border-white/[0.06] text-xs space-y-1">
                    <p className="font-bold text-white">{n.title}</p>
                    <p className="text-[11px] text-slate-400">{n.desc}</p>
                    <span className="text-[9px] text-slate-400 font-mono block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <Dropdown
          trigger={
            <button
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-[#0B1120] border border-transparent hover:border-white/[0.08] transition-colors"
            >
              {theme === 'light' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>
          }
          options={themeOptions}
          onSelect={(opt) => setTheme(opt.id as any)}
        />

        {/* User Profile Menu */}
        <Dropdown
          trigger={
            <button aria-label="User Account Menu" className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#0B1120] transition-colors">
              <Avatar name={user?.fullName || 'Admin User'} size="sm" status="online" />
            </button>
          }
          options={[
            { id: 'profile', label: user?.fullName || 'Admin Account', icon: <User className="w-3.5 h-3.5 text-blue-400" /> },
            { id: 'security', label: 'Security & API Keys', icon: <Shield className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'logout', label: 'Log Out', icon: <LogOut className="w-3.5 h-3.5" />, danger: true },
          ]}
          onSelect={(opt) => {
            if (opt.id === 'logout') handleLogout();
            if (opt.id === 'profile' || opt.id === 'security') navigate('/settings');
          }}
        />
      </div>
    </header>
  );
};
