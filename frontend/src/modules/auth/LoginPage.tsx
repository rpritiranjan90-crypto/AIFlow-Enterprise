import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('alex.architect@enterprise.io');
  const [password, setPassword] = useState('SuperSecretPass123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          id: 'usr_demo_1001',
          email,
          fullName: 'Alex Mercer',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          isActive: true,
          isSuperuser: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          accessToken: 'mock_jwt_access_token',
          refreshToken: 'mock_jwt_refresh_token',
          tokenType: 'bearer',
          expiresIn: 3600,
        }
      );
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen w-screen bg-background-dark bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-cyan shadow-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            Welcome back to AIFlow
          </h1>
          <p className="text-sm text-slate-400">
            Enter your credentials to access your enterprise workspace
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email"
              type="email"
              placeholder="alex@enterprise.com"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-brand-500 focus:ring-brand-500"
                />
                <span>Remember this device</span>
              </label>
              <Link
                to="/forgot-password"
                className="font-semibold text-brand-400 hover:text-brand-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="glow"
              className="w-full py-3"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Enterprise
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an enterprise account?{' '}
            <Link to="/signup" className="font-semibold text-brand-400 hover:underline">
              Request Trial / Sign Up
            </Link>
          </div>
        </div>

        {/* Security Badge Footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SOC2 Type II Certified & End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
};
