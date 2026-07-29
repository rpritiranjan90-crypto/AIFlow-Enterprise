import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Lock, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="min-h-screen w-screen bg-background-dark bg-grid-pattern flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-cyan shadow-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Set New Password</h1>
          <p className="text-sm text-slate-400">Choose a strong enterprise password</p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-5">
          {isSuccess ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Password Updated Successfully</h3>
              <Button variant="glow" className="w-full" onClick={() => navigate('/login')}>
                Sign In Now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••••••"
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••••••"
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={password && confirmPassword && password !== confirmPassword ? 'Passwords do not match' : undefined}
                required
              />
              <Button type="submit" variant="glow" className="w-full py-3" isLoading={isLoading}>
                Update Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
