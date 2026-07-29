import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Reset your Password</h1>
          <p className="text-sm text-slate-400">
            Enter your work email and we'll send a secure password reset link
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-5">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">Reset Link Sent</h3>
              <p className="text-xs text-slate-400">
                We have dispatched password reset instructions to <span className="font-semibold text-slate-200">{email}</span>.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full mt-2">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
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
              <Button type="submit" variant="glow" className="w-full py-3" isLoading={isLoading}>
                Send Reset Link
              </Button>
              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
