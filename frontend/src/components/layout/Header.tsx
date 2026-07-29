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
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: '1', title: 'Workflow Executed Successfully', desc: 'Sync Salesforce to PostgreSQL ran in 1.2s', time: '5m ago' },
    { id: '2', title: 'New Integration Connected', desc: 'Slack Webhook was authorized by Admin', time: '1h ago' },
    { id: '3', title: 'AI Token Threshold Notice', desc: 'Workspace has reached 65% token allocation', time: '3h ago' },
  ];

  const themeOptions = [
    { id: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { id: 'system', label: 'System', icon: <Laptop className="w-3.5 h-3.5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Global Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setShowSearchModal(true)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 hover:border-slate-700 transition-colors"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span>Search workflows, executions, integrations...</span>
          <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Workspace Switcher Button */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-brand-400" />
              <span>{currentWorkspace?.name || 'Workspace'}</span>
            </button>
          }
          options={[
            ...workspaces.map((ws) => ({
              id: ws.id,
              label: ws.name,
              icon: currentWorkspace?.id === ws.id ? <Check className="w-3.5 h-3.5 text-brand-400" /> : undefined,
            })),
            { id: 'create_new', label: 'Create New Workspace', icon: <Plus className="w-3.5 h-3.5" /> },
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
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-100">Notifications</span>
                <span className="text-[10px] text-brand-400 font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                    <p className="font-semibold text-slate-200">{n.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{n.desc}</p>
                    <span className="text-[9px] text-slate-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Switcher */}
        <Dropdown
          trigger={
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors">
              {theme === 'light' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-brand-400" />}
            </button>
          }
          options={themeOptions}
          onSelect={(opt) => setTheme(opt.id as any)}
        />

        {/* User Profile Menu */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-900 transition-colors">
              <Avatar name={user?.fullName || 'User'} size="sm" status="online" />
            </button>
          }
          options={[
            { id: 'profile', label: user?.fullName || 'My Account', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'security', label: 'Security & API Keys', icon: <Shield className="w-3.5 h-3.5" /> },
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
