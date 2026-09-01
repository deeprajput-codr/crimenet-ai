// ============================================================
// CrimeNet AI — Register Page
// ============================================================
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Mail, Phone, Lock, Building, BadgeCheck, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { registerUser } from '@/lib/auth';

const steps = [
  { id: 1, label: 'Personal', icon: <User size={16} /> },
  { id: 2, label: 'Contact', icon: <Mail size={16} /> },
  { id: 3, label: 'Department', icon: <Building size={16} /> },
  { id: 4, label: 'Security', icon: <Lock size={16} /> },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '', badgeNumber: '', gender: 'male',
    email: '', phone: '',
    department: '', rank: '', role: 'investigator',
    password: '', confirmPassword: '',
  });

  const update = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        badgeNumber: formData.badgeNumber,
        department: formData.department,
        rank: formData.rank,
        phone: formData.phone,
        role: formData.role as 'investigator',
      });
      setIsComplete(true);
    } catch {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-navy-900 bg-mesh">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-static rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Registration Submitted</h2>
          <p className="mt-3 text-sm text-slate-400">
            Your registration has been submitted for approval. You will receive a confirmation email within 24 hours once your supervisor approves your access request.
          </p>
          <Link href="/auth/login">
            <Button className="mt-6 w-full">Back to Login</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-navy-900 bg-mesh relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <Shield className="w-8 h-8 text-cyber-blue" />
            <span className="text-xl font-bold text-white">Crime<span className="text-cyber-blue">Net</span> AI</span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card-static rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-1">Request Access</h1>
          <p className="text-sm text-slate-400 mb-6">Complete the form to request platform access</p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  currentStep === step.id
                    ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30'
                    : currentStep > step.id
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-white/5 text-slate-500 border border-white/10'
                }`}>
                  {currentStep > step.id ? <Check size={12} /> : step.icon}
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px ${currentStep > step.id ? 'bg-emerald-500/30' : 'bg-white/10'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 min-h-[200px]"
            >
              {currentStep === 1 && (
                <>
                  <Input label="Full Name" placeholder="Inspector Rajesh Kumar" value={formData.name} onChange={e => update('name', e.target.value)} icon={<User size={16} />} required />
                  <Input label="Badge / Service Number" placeholder="DLP-4521" value={formData.badgeNumber} onChange={e => update('badgeNumber', e.target.value)} icon={<BadgeCheck size={16} />} required />
                  <Select label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} value={formData.gender} onChange={e => update('gender', e.target.value)} />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Input label="Official Email" type="email" placeholder="name@police.gov.in" value={formData.email} onChange={e => update('email', e.target.value)} icon={<Mail size={16} />} required />
                  <Input label="Phone Number" type="tel" placeholder="+91-98765-43210" value={formData.phone} onChange={e => update('phone', e.target.value)} icon={<Phone size={16} />} required />
                </>
              )}

              {currentStep === 3 && (
                <>
                  <Input label="Department / Unit" placeholder="Delhi Police - Special Cell" value={formData.department} onChange={e => update('department', e.target.value)} icon={<Building size={16} />} required />
                  <Input label="Rank / Designation" placeholder="Sub Inspector" value={formData.rank} onChange={e => update('rank', e.target.value)} required />
                  <Select label="Requested Role" options={[
                    { value: 'investigator', label: 'Investigator' },
                    { value: 'intelligence_analyst', label: 'Intelligence Analyst' },
                    { value: 'senior_officer', label: 'Senior Officer' },
                    { value: 'administrator', label: 'Administrator' },
                  ]} value={formData.role} onChange={e => update('role', e.target.value)} />
                  <p className="text-xs text-slate-500">Note: Role assignment requires supervisor approval.</p>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <Input label="Password" type="password" placeholder="Minimum 8 characters" value={formData.password} onChange={e => update('password', e.target.value)} icon={<Lock size={16} />} required />
                  <Input label="Confirm Password" type="password" placeholder="Re-enter password" value={formData.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} icon={<Lock size={16} />} required error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : undefined} />
                  <p className="text-xs text-slate-500">MFA will be configured after your account is approved.</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(s => s - 1)}
              disabled={currentStep === 1}
              icon={<ChevronLeft size={16} />}
            >
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(s => s + 1)}
                icon={<ChevronRight size={16} />}
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} isLoading={isSubmitting}>
                Submit Registration
              </Button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have access?{' '}
          <Link href="/auth/login" className="text-cyber-blue hover:text-cyber-blue/80 transition-colors">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
