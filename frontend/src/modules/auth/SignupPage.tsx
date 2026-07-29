import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Lock, Mail, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(
        {
          id: `usr_${Math.random().toString(36).substring(2, 9)}`,
          email,
          fullName: fullName || 'New Enterprise User',
          isActive: true,
          isSuperuser: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          accessToken: 'mock_jwt_access_token_signup',
          refreshToken: 'mock_jwt_refresh_token_signup',
          tokenType: 'bearer',
          expiresIn: 3600,
        }
      );
      setIsLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="min-h-screen w-screen bg-background-dark bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      <div className="w-full max-w-lg space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-cyan shadow-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            Create your AIFlow Account
          </h1>
          <p className="text-sm text-slate-400">
            Start automating business workflows with autonomous AI agents
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Sarah Connor"
              leftIcon={<User className="w-4 h-4 text-slate-400" />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              label="Work Email"
              type="email"
              placeholder="sarah@company.com"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Organization Name"
              placeholder="Acme Global Inc"
              leftIcon={<Building className="w-4 h-4 text-slate-400" />}
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="space-y-2 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>14-day Enterprise Trial with Unlimited AI Execution Tokens</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>No credit card required to start</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              className="w-full py-3 mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Initialize Workspace & Start Free
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-400 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
