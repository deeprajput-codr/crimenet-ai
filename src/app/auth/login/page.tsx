// ============================================================
// CrimeNet AI — Login Page
// ============================================================
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, KeyRound, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { loginUser, getAvailableUsers } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password, mfaCode: showMfa ? mfaCode : undefined });
      login(response.user, response.token);
      router.push('/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      if (message === 'MFA_REQUIRED') {
        setShowMfa(true);
        setError('');
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = getAvailableUsers();

  const quickLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setIsLoading(true);
    try {
      const response = await loginUser({ email: demoEmail, password: demoPassword, mfaCode: '123456' });
      login(response.user, response.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-navy-900 bg-mesh relative">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="relative">
              <Shield className="w-10 h-10 text-cyber-blue" />
              <div className="absolute inset-0 w-10 h-10 bg-cyber-blue/20 rounded-full blur-xl" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white">Crime<span className="text-cyber-blue">Net</span> AI</span>
              <p className="text-[10px] text-slate-500 tracking-widest uppercase">Secure Access Portal</p>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="glass-card-static rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-slate-400 mt-1">Sign in to access the intelligence platform</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="name@agency.gov.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {showMfa && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <Input
                  label="MFA Code"
                  placeholder="Enter 6-digit code"
                  value={mfaCode}
                  onChange={e => setMfaCode(e.target.value)}
                  icon={<KeyRound size={16} />}
                  helperText="Enter code 123456 for demo"
                />
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-transparent text-cyber-blue focus:ring-cyber-blue/30" />
                Remember me
              </label>
              <a href="#" className="text-sm text-cyber-blue hover:text-cyber-blue/80 transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              {showMfa ? 'Verify & Sign In' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have access?{' '}
            <Link href="/auth/register" className="text-cyber-blue hover:text-cyber-blue/80 transition-colors">
              Request Access
            </Link>
          </div>
        </div>

        {/* Demo credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="w-full text-center text-xs text-slate-600 hover:text-slate-400 transition-colors py-2"
          >
            {showCredentials ? 'Hide' : 'Show'} Demo Credentials
          </button>
          
          {showCredentials && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="glass-card-static rounded-xl p-4 space-y-2"
            >
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">Quick Login (Click to auto-login)</p>
              {demoUsers.map(user => (
                <button
                  key={user.email}
                  onClick={() => quickLogin(user.email, user.password)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-300">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyber-blue/10 text-cyber-blue capitalize">
                    {user.role.replace('_', ' ')}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
