// ============================================================
// CrimeNet AI — Evidence Center Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, FileText, Camera, Monitor, MessageSquare, Microscope, Filter, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfidenceBar, Tabs } from '@/components/ui/UIComponents';
import { Table, type Column } from '@/components/ui/Table';
import { mockEvidence } from '@/lib/mock-data';
import { formatDate, cn } from '@/lib/utils';
import type { Evidence } from '@/types/entities';

const typeIcons: Record<string, React.ReactNode> = {
  document: <FileText size={16} />, digital: <Monitor size={16} />, physical: <Microscope size={16} />,
  testimony: <MessageSquare size={16} />, surveillance: <Camera size={16} />, forensic: <Microscope size={16} />,
};

const statusIcons: Record<string, React.ReactNode> = {
  verified: <CheckCircle size={14} className="text-emerald-400" />,
  unverified: <Clock size={14} className="text-amber-400" />,
  disputed: <AlertCircle size={14} className="text-red-400" />,
  pending: <Clock size={14} className="text-slate-400" />,
};

export default function EvidencePage() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all' ? mockEvidence : mockEvidence.filter(e => e.type === activeTab);

  const tabs = [
    { id: 'all', label: 'All', count: mockEvidence.length },
    { id: 'digital', label: 'Digital', icon: <Monitor size={14} />, count: mockEvidence.filter(e => e.type === 'digital').length },
    { id: 'document', label: 'Document', icon: <FileText size={14} />, count: mockEvidence.filter(e => e.type === 'document').length },
    { id: 'physical', label: 'Physical', icon: <Microscope size={14} />, count: mockEvidence.filter(e => e.type === 'physical').length },
    { id: 'surveillance', label: 'Surveillance', icon: <Camera size={14} />, count: mockEvidence.filter(e => e.type === 'surveillance').length },
    { id: 'testimony', label: 'Testimony', icon: <MessageSquare size={14} />, count: mockEvidence.filter(e => e.type === 'testimony').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Evidence Center</h1>
          <p className="text-sm text-slate-400 mt-1">Centralized evidence management with AI-powered entity extraction</p>
        </div>
        <Button size="sm" icon={<FolderOpen size={14} />}>Upload Evidence</Button>
      </div>

      <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((evidence, i) => (
          <motion.div
            key={evidence.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card padding="md">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-cyber-blue/10 text-cyber-blue shrink-0">
                  {typeIcons[evidence.type] || <FileText size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-white">{evidence.title}</h3>
                    <Badge variant={evidence.type === 'digital' ? 'info' : evidence.type === 'physical' ? 'success' : evidence.type === 'surveillance' ? 'purple' : 'default'} size="sm">
                      {evidence.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{evidence.description}</p>
                  
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">{statusIcons[evidence.verificationStatus]} {evidence.verificationStatus}</span>
                    <span>•</span>
                    <span>{evidence.caseId}</span>
                    <span>•</span>
                    <span>{formatDate(evidence.addedAt)}</span>
                  </div>

                  <ConfidenceBar score={evidence.confidenceScore} label="Confidence" size="sm" className="mt-3" />

                  {evidence.extractedEntities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {evidence.extractedEntities.slice(0, 3).map(entity => (
                        <Badge key={entity.id} variant="outline" size="sm">{entity.text}</Badge>
                      ))}
                      {evidence.extractedEntities.length > 3 && (
                        <Badge variant="outline" size="sm">+{evidence.extractedEntities.length - 3}</Badge>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1">
                    {evidence.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-slate-500">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
