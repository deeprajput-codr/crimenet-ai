// ============================================================
// CrimeNet AI — Navbar Component
// ============================================================
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Bell, LogOut, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { NotificationBadge } from '@/components/ui/Badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#features', label: 'Features' },
  { href: '/#architecture', label: 'Architecture' },
  { href: '/#team', label: 'Team' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();

  const isDashboard = pathname.startsWith('/dashboard');
  if (isDashboard) return null; // Dashboard uses sidebar instead

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-cyber-blue group-hover:text-cyber-blue transition-colors" />
              <div className="absolute inset-0 w-8 h-8 bg-cyber-blue/20 rounded-full blur-xl group-hover:bg-cyber-blue/30 transition-all" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                Crime<span className="text-cyber-blue">Net</span> AI
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 -mt-1 tracking-widest uppercase">
                Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  pathname === link.href
                    ? 'text-cyber-blue bg-cyber-blue/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                  <Bell size={18} />
                  <NotificationBadge count={5} />
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-purple-accent flex items-center justify-center text-xs font-bold text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 glass-card-static rounded-lg overflow-hidden z-50"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User size={14} /> Dashboard
                        </Link>
                        <Link
                          href="/dashboard/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings size={14} /> Settings
                        </Link>
                        <hr className="border-white/5" />
                        <button
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyber-blue-dim to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyber-blue/25 transition-all"
                >
                  Get Access
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-cyber-blue bg-cyber-blue/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-white/5 my-3" />
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link href="/auth/login" className="px-3 py-2.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5">
                    Sign In
                  </Link>
                  <Link href="/auth/register" className="px-3 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyber-blue-dim to-blue-600 rounded-lg text-center">
                    Get Access
                  </Link>
                </div>
              ) : (
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full px-3 py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 text-left">
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
