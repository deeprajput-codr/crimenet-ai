// ============================================================
// CrimeNet AI — Entity Resolution Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitMerge, Check, X, Flag, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RiskMeter, ConfidenceBar } from '@/components/ui/UIComponents';

type CandidateStatus = 'pending' | 'merged' | 'rejected' | 'flagged';

interface Candidate {
  id: string;
  matchScore: number;
  entity1: { name: string; phone: string; address: string; age: number; source: string };
  entity2: { name: string; phone: string; address: string; age: number; source: string };
  fields: { field: string; value1: string; value2: string; similarity: number }[];
  status: CandidateStatus;
}

const mockCandidates: Candidate[] = [
  {
    id: 'RC001', matchScore: 87,
    entity1: { name: 'Vikram Singh Rathore', phone: '+91-98765-43210', address: 'Sector 22, Rohini, Delhi', age: 42, source: 'FIR Database' },
    entity2: { name: 'V.S. Rathore', phone: '+91-98765-43210', address: 'Rohini, New Delhi', age: 42, source: 'CDR Analysis' },
    fields: [
      { field: 'Name', value1: 'Vikram Singh Rathore', value2: 'V.S. Rathore', similarity: 78 },
      { field: 'Phone', value1: '+91-98765-43210', value2: '+91-98765-43210', similarity: 100 },
      { field: 'Address', value1: 'Sector 22, Rohini, Delhi', value2: 'Rohini, New Delhi', similarity: 75 },
      { field: 'Age', value1: '42', value2: '42', similarity: 100 },
    ],
    status: 'pending',
  },
  {
    id: 'RC002', matchScore: 72,
    entity1: { name: 'Arjun Deshmukh', phone: '+91-99887-76655', address: 'Bandra, Mumbai', age: 38, source: 'Surveillance Report' },
    entity2: { name: 'A. Deshmukh', phone: '+91-99887-76655', address: 'Bandra West, Mumbai', age: 39, source: 'Bank Records' },
    fields: [
      { field: 'Name', value1: 'Arjun Deshmukh', value2: 'A. Deshmukh', similarity: 68 },
      { field: 'Phone', value1: '+91-99887-76655', value2: '+91-99887-76655', similarity: 100 },
      { field: 'Address', value1: 'Bandra, Mumbai', value2: 'Bandra West, Mumbai', similarity: 82 },
      { field: 'Age', value1: '38', value2: '39', similarity: 90 },
    ],
    status: 'pending',
  },
  {
    id: 'RC003', matchScore: 94,
    entity1: { name: 'Priya Sharma', phone: '+91-88776-65544', address: 'Hazratganj, Lucknow', age: 34, source: 'IT Department' },
    entity2: { name: 'Priya Sharma', phone: '+91-77665-54433', address: 'Civil Lines, Lucknow', age: 34, source: 'GST Records' },
    fields: [
      { field: 'Name', value1: 'Priya Sharma', value2: 'Priya Sharma', similarity: 100 },
      { field: 'Phone', value1: '+91-88776-65544', value2: '+91-77665-54433', similarity: 20 },
      { field: 'Address', value1: 'Hazratganj, Lucknow', value2: 'Civil Lines, Lucknow', similarity: 65 },
      { field: 'Age', value1: '34', value2: '34', similarity: 100 },
    ],
    status: 'pending',
  },
];

export default function ResolutionPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);

  const handleAction = (id: string, action: CandidateStatus) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: action } : c));
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Entity Resolution Engine</h1>
        <p className="text-sm text-slate-400 mt-1">AI-detected duplicate identities across data sources. Review and merge or reject matches.</p>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="warning" size="md">{candidates.filter(c => c.status === 'pending').length} Pending</Badge>
        <Badge variant="success" size="md">{candidates.filter(c => c.status === 'merged').length} Merged</Badge>
        <Badge variant="danger" size="md">{candidates.filter(c => c.status === 'rejected').length} Rejected</Badge>
      </div>

      <div className="space-y-4">
        {candidates.map((candidate, i) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hover={false} className={candidate.status !== 'pending' ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-base">Match #{candidate.id}</CardTitle>
                  <Badge
                    variant={candidate.status === 'merged' ? 'success' : candidate.status === 'rejected' ? 'danger' : candidate.status === 'flagged' ? 'warning' : 'info'}
                    size="md"
                  >
                    {candidate.status}
                  </Badge>
                </div>
                <RiskMeter score={candidate.matchScore} size={60} label="Match %" />
              </CardHeader>

              {/* Split comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[candidate.entity1, candidate.entity2].map((entity, idx) => (
                  <div key={idx} className="glass-card-static rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={idx === 0 ? 'info' : 'purple'} size="sm">Source: {entity.source}</Badge>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div><span className="text-slate-500">Name:</span> <span className="text-white font-medium">{entity.name}</span></div>
                      <div><span className="text-slate-500">Phone:</span> <span className="text-white font-mono">{entity.phone}</span></div>
                      <div><span className="text-slate-500">Address:</span> <span className="text-white">{entity.address}</span></div>
                      <div><span className="text-slate-500">Age:</span> <span className="text-white">{entity.age}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Field comparison */}
              <div className="space-y-2 mb-4">
                {candidate.fields.map(field => (
                  <div key={field.field} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-16">{field.field}</span>
                    <div className="flex-1">
                      <ConfidenceBar score={field.similarity} size="sm" showValue />
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {candidate.status === 'pending' && (
                <div className="flex gap-2">
                  <Button size="sm" variant="success" icon={<Check size={14} />} onClick={() => handleAction(candidate.id, 'merged')} className="flex-1">Merge</Button>
                  <Button size="sm" variant="danger" icon={<X size={14} />} onClick={() => handleAction(candidate.id, 'rejected')} className="flex-1">Reject</Button>
                  <Button size="sm" variant="secondary" icon={<Flag size={14} />} onClick={() => handleAction(candidate.id, 'flagged')}>Flag</Button>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
