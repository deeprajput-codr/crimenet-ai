// ============================================================
// CrimeNet AI — AI Capabilities, Stats, Architecture, Team,
//                Contact, Footer — Landing Sections
// ============================================================
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Cpu, Eye, Zap, Database, Globe, Lock,
  Mail, Phone, MapPin, Share2, MessageSquare,
  Shield, ChevronRight, Layers, Server, Cloud
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { animateValue } from '@/lib/utils';

// ============================================================
// AI Capabilities
// ============================================================
const aiCapabilities = [
  { icon: <Brain size={20} />, title: 'Natural Language Processing', desc: 'Extract entities, relationships, and intent from FIRs, reports, and surveillance transcripts using spaCy and transformers.' },
  { icon: <Eye size={20} />, title: 'Computer Vision', desc: 'ANPR license plate recognition, face matching, and CCTV footage analysis for suspect identification.' },
  { icon: <Cpu size={20} />, title: 'Graph Neural Networks', desc: 'Predict missing links, detect communities, and identify key players using graph-based deep learning.' },
  { icon: <Zap size={20} />, title: 'Anomaly Detection', desc: 'Real-time detection of unusual patterns in financial transactions, communication networks, and movement data.' },
  { icon: <Database size={20} />, title: 'Knowledge Fusion', desc: 'Merge intelligence from multiple sources — CDR, bank records, CCTV, informant reports — into a unified graph.' },
  { icon: <Globe size={20} />, title: 'Multi-lingual Analysis', desc: 'Process intelligence in Hindi, English, Urdu, Bengali, Tamil, and 15+ Indian languages.' },
];

export function AICapabilities() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central brain */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyber-blue/20 to-purple-accent/20 flex items-center justify-center animate-pulse-glow">
                    <Brain size={48} className="text-cyber-blue" />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 rounded-full border border-cyber-blue/20 animate-spin-slow" />
                  <div className="absolute -inset-6 rounded-full border border-dashed border-purple-accent/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
                  <div className="absolute -inset-12 rounded-full border border-dashed border-neon-green/10 animate-spin-slow" style={{ animationDuration: '16s' }} />
                </div>
              </div>

              {/* Orbiting nodes */}
              {['NLP', 'CV', 'GNN', 'ML', 'DL', 'NER'].map((label, i) => {
                const angle = (i * 60 - 90) * (Math.PI / 180);
                const radius = 140;
                const x = 50 + (radius / 3) * Math.cos(angle);
                const y = 50 + (radius / 3) * Math.sin(angle);
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="absolute w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-[10px] font-bold text-cyber-blue"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {label}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Capabilities list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-cyber-blue mb-3">AI Engine</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              Intelligence at Every Layer
            </h2>

            <div className="space-y-5">
              {aiCapabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-4 rounded-lg hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue/15 to-purple-accent/15 flex items-center justify-center text-cyber-blue shrink-0 group-hover:scale-110 transition-transform">
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{cap.title}</h3>
                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Stats Section
// ============================================================
export function StatsSection() {
  const stats = [
    { label: 'Active Cases', value: 248, suffix: '+', color: 'text-cyber-blue' },
    { label: 'Entities in Graph', value: 89420, suffix: '', color: 'text-neon-green' },
    { label: 'Networks Analyzed', value: 2341, suffix: '', color: 'text-purple-accent' },
    { label: 'Conviction Rate', value: 78, suffix: '%', color: 'text-neon-bright' },
    { label: 'States Covered', value: 28, suffix: '', color: 'text-alert-amber' },
    { label: 'Response Time', value: 2.4, suffix: 's', color: 'text-pink-accent' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy-800/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} className={stat.color} />
              <p className="mt-2 text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix, className }: { value: number; suffix: string; className: string }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) {
      animateValue(0, value, 2000, setDisplay);
    }
  }, [started, value]);

  return (
    <motion.p
      className={`text-3xl sm:text-4xl font-bold tabular-nums ${className}`}
      onViewportEnter={() => setStarted(true)}
    >
      {Number.isInteger(value) ? display.toLocaleString() : display.toFixed(1)}{suffix}
    </motion.p>
  );
}

// ============================================================
// Architecture Diagram
// ============================================================
export function ArchitectureDiagram() {
  const layers = [
    { title: 'Presentation Layer', icon: <Layers size={20} />, color: 'from-cyan-500 to-blue-500', items: ['Next.js 15 + React 19', 'Tailwind CSS v4', 'React Flow Graphs', 'Recharts Analytics', 'Framer Motion'] },
    { title: 'Application Layer', icon: <Server size={20} />, color: 'from-purple-500 to-violet-500', items: ['FastAPI Backend', 'JWT Authentication', 'RBAC Authorization', 'WebSocket Real-time', 'REST APIs'] },
    { title: 'AI/ML Layer', icon: <Brain size={20} />, color: 'from-rose-500 to-pink-500', items: ['spaCy NER Pipeline', 'Graph Neural Networks', 'Entity Resolution', 'Anomaly Detection', 'LLM Copilot'] },
    { title: 'Data Layer', icon: <Database size={20} />, color: 'from-emerald-500 to-teal-500', items: ['Neo4j Graph DB', 'PostgreSQL', 'Redis Cache', 'Elasticsearch', 'MinIO Storage'] },
    { title: 'Infrastructure', icon: <Cloud size={20} />, color: 'from-amber-500 to-orange-500', items: ['Docker Containers', 'Kubernetes', 'CI/CD Pipeline', 'Prometheus Monitoring', 'Nginx Gateway'] },
  ];

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-cyber-blue mb-3">System Design</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Architecture Overview</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Enterprise-grade, scalable microservices architecture designed for mission-critical law enforcement operations.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center text-white mb-3`}>
                {layer.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-3">{layer.title}</h3>
              <ul className="space-y-2">
                {layer.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <ChevronRight size={10} className="text-slate-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Team Section
// ============================================================
const team = [
  { name: 'Dr. Aditi Mehra', role: 'AI Research Lead', dept: 'IIT Delhi', color: 'from-cyan-500 to-blue-500' },
  { name: 'Rohan Kapoor', role: 'Full-Stack Architect', dept: 'NIC', color: 'from-purple-500 to-violet-500' },
  { name: 'Sneha Iyer', role: 'Data Scientist', dept: 'DRDO', color: 'from-rose-500 to-pink-500' },
  { name: 'Amit Patel', role: 'Graph DB Engineer', dept: 'C-DAC', color: 'from-emerald-500 to-teal-500' },
  { name: 'Priya Reddy', role: 'UI/UX Designer', dept: 'NID', color: 'from-amber-500 to-orange-500' },
  { name: 'Vikash Kumar', role: 'DevOps Engineer', dept: 'ISRO', color: 'from-indigo-500 to-blue-500' },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-mesh">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-cyber-blue mb-3">Our Team</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Built by India&apos;s Best</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">A cross-functional team of AI researchers, engineers, and domain experts from premier Indian institutions.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-6 text-center group"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                {member.name.charAt(0)}
              </div>
              <h3 className="text-base font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-cyber-blue">{member.role}</p>
              <p className="text-xs text-slate-500 mt-1">{member.dept}</p>
              <div className="mt-4 flex justify-center gap-3">
                <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" title="Social"><Globe size={14} /></button>
                <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" title="Share"><Share2 size={14} /></button>
                <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" title="Message"><MessageSquare size={14} /></button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Contact Section
// ============================================================
export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    alert('Message sent successfully! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-cyber-blue mb-3">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Get in Touch</h2>
          <p className="mt-4 text-lg text-slate-400">Interested in deploying CrimeNet AI for your agency? Reach out to us.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: <Mail size={18} />, label: 'Email', value: 'contact@crimenet.gov.in' },
              { icon: <Phone size={18} />, label: 'Phone', value: '+91-11-2345-6789' },
              { icon: <MapPin size={18} />, label: 'Address', value: 'NIC Building, CGO Complex, New Delhi - 110003' },
              { icon: <Lock size={18} />, label: 'Security', value: 'All communications are encrypted end-to-end' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyber-blue/10 text-cyber-blue shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-slate-300">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card-static rounded-xl p-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input label="Name" placeholder="Your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <Input label="Email" type="email" placeholder="you@agency.gov.in" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <Input label="Subject" placeholder="Inquiry about..." value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
            <Textarea label="Message" placeholder="Tell us about your requirements..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} />
            <Button type="submit" className="w-full">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Footer
// ============================================================
export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-cyber-blue" />
              <span className="text-lg font-bold text-white">CrimeNet <span className="text-cyber-blue">AI</span></span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">AI-Powered Criminal Intelligence & Network Analysis Platform for Indian Law Enforcement.</p>
            <div className="flex gap-3 mt-4">
              <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" title="Website"><Globe size={16} /></button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" title="Share"><Share2 size={16} /></button>
              <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors" title="Contact"><MessageSquare size={16} /></button>
            </div>

          </div>

          {/* Links */}
          {[
            { title: 'Platform', links: ['Knowledge Graph', 'AI Copilot', 'Network Analysis', 'Evidence Center', 'Reports'] },
            { title: 'Resources', links: ['Documentation', 'API Reference', 'Research Papers', 'Case Studies', 'Training'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Data Protection', 'Security', 'Compliance'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-cyber-blue transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2025 CrimeNet AI. All rights reserved. Developed for Smart India Hackathon.</p>
          <p className="text-xs text-slate-600">Made with ❤️ in India | Restricted Access: Authorized Law Enforcement Only</p>
        </div>
      </div>
    </footer>
  );
}
