// ============================================================
// CrimeNet AI — Features Section
// ============================================================
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Network, Brain, Search, Shield, BarChart3, MapPin,
  FileText, MessageSquare, Bell, Car, GitMerge, Clock
} from 'lucide-react';

const features = [
  { icon: <Network size={24} />, title: 'Knowledge Graph', desc: 'Interactive criminal network visualization with real-time entity relationships and path discovery.', color: 'from-blue-500 to-cyan-500' },
  { icon: <Brain size={24} />, title: 'AI Entity Extraction', desc: 'NLP-powered extraction of persons, phones, vehicles, and locations from unstructured documents.', color: 'from-purple-500 to-pink-500' },
  { icon: <Search size={24} />, title: 'Universal Search', desc: 'Cross-entity intelligence search across persons, cases, vehicles, organizations, and evidence.', color: 'from-cyan-500 to-teal-500' },
  { icon: <GitMerge size={24} />, title: 'Entity Resolution', desc: 'AI-driven deduplication matching duplicate identities across data sources with confidence scoring.', color: 'from-amber-500 to-orange-500' },
  { icon: <BarChart3 size={24} />, title: 'Network Analysis', desc: 'Centrality, community detection, and influence propagation algorithms for criminal network analysis.', color: 'from-green-500 to-emerald-500' },
  { icon: <MessageSquare size={24} />, title: 'AI Investigation Copilot', desc: 'Chat-based AI assistant providing contextual investigation insights with evidence citations.', color: 'from-rose-500 to-red-500' },
  { icon: <MapPin size={24} />, title: 'Crime Heatmap', desc: 'Geographic crime density visualization with regional risk zones and hotspot detection.', color: 'from-yellow-500 to-amber-500' },
  { icon: <Car size={24} />, title: 'Vehicle Tracking', desc: 'Real-time vehicle surveillance with ANPR integration, route playback, and geofence alerts.', color: 'from-indigo-500 to-blue-500' },
  { icon: <Clock size={24} />, title: 'Investigation Timeline', desc: 'Chronological event visualization with evidence correlation and pattern discovery.', color: 'from-teal-500 to-cyan-500' },
  { icon: <Shield size={24} />, title: 'Smart Alerts', desc: 'AI-generated threat alerts for emerging clusters, high-risk entities, and pattern anomalies.', color: 'from-red-500 to-orange-500' },
  { icon: <FileText size={24} />, title: 'Report Generator', desc: 'Automated investigation briefs with network graphs, risk assessments, and evidence summaries.', color: 'from-slate-400 to-slate-600' },
  { icon: <Bell size={24} />, title: 'Evidence Center', desc: 'Centralized evidence management with AI-powered entity extraction and confidence scoring.', color: 'from-violet-500 to-purple-500' },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-mesh relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-cyber-blue mb-3">Capabilities</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            20+ Intelligence Modules
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Comprehensive suite of AI-powered tools designed for modern law enforcement investigations.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card rounded-xl p-5 group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
