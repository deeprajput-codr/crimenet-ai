// ============================================================
// CrimeNet AI — Report Generator Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Clock, Brain, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { mockCases } from '@/lib/mock-data/cases';
import { delay } from '@/lib/utils';

const reportTypes = [
  { value: 'investigation-brief', label: 'Investigation Brief' },
  { value: 'network-analysis', label: 'Network Analysis Report' },
  { value: 'risk-assessment', label: 'Risk Assessment' },
  { value: 'case-summary', label: 'Case Summary' },
  { value: 'intelligence-report', label: 'Intelligence Report' },
];

const mockReports = [
  { id: 'R001', title: 'Rohini Drug Syndicate - Investigation Brief', type: 'investigation-brief', caseId: 'CASE001', generatedAt: '2025-08-30T14:00:00Z', status: 'final' },
  { id: 'R002', title: 'Lucknow Fraud Ring - Network Analysis', type: 'network-analysis', caseId: 'CASE002', generatedAt: '2025-08-28T10:00:00Z', status: 'final' },
  { id: 'R003', title: 'Bihar Arms Smuggling - Risk Assessment', type: 'risk-assessment', caseId: 'CASE004', generatedAt: '2025-08-25T16:00:00Z', status: 'draft' },
  { id: 'R004', title: 'Mumbai Hawala - Intelligence Report', type: 'intelligence-report', caseId: 'CASE007', generatedAt: '2025-08-22T09:00:00Z', status: 'final' },
];

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCase, setSelectedCase] = useState('');
  const [selectedType, setSelectedType] = useState('investigation-brief');
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async () => {
    if (!selectedCase) return;
    setIsGenerating(true);
    await delay(3000);
    setIsGenerating(false);
    setShowPreview(true);
  };

  const selectedCaseData = mockCases.find(c => c.id === selectedCase);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Investigation Brief Generator</h1>
        <p className="text-sm text-slate-400 mt-1">AI-powered report generation with case summaries, network graphs, and risk assessments</p>
      </div>

      {/* Generator */}
      <Card hover={false}>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <Select
            label="Report Type" options={reportTypes}
            value={selectedType} onChange={e => setSelectedType(e.target.value)}
          />
          <Select
            label="Case" options={[{ value: '', label: 'Select a case...' }, ...mockCases.map(c => ({ value: c.id, label: `${c.firNumber} - ${c.title}` }))]}
            value={selectedCase} onChange={e => setSelectedCase(e.target.value)}
          />
          <div className="flex items-end">
            <Button onClick={handleGenerate} isLoading={isGenerating} className="w-full" icon={<Brain size={16} />} disabled={!selectedCase}>
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Preview */}
      {showPreview && selectedCaseData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card hover={false} variant="glow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Report Preview</CardTitle>
                <Badge variant="success" size="sm">Generated</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" icon={<Download size={14} />}>Export PDF</Button>
                <Button size="sm" variant="outline" icon={<Eye size={14} />}>Full View</Button>
              </div>
            </CardHeader>

            <div className="prose prose-invert prose-sm max-w-none mt-4 space-y-6">
              <div className="glass-card-static rounded-lg p-6">
                <h2 className="text-lg font-bold text-white mb-1">{selectedCaseData.title}</h2>
                <p className="text-xs text-slate-500 mb-4">{selectedCaseData.firNumber} | {selectedCaseData.policeStation} | Lead: {selectedCaseData.leadInvestigator}</p>

                <h3 className="text-sm font-semibold text-cyber-blue mt-4 mb-2">Executive Summary</h3>
                <p className="text-sm text-slate-300">{selectedCaseData.description}</p>

                <h3 className="text-sm font-semibold text-cyber-blue mt-4 mb-2">Key Suspects ({selectedCaseData.suspects.length})</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedCaseData.suspects.map(s => <Badge key={s} variant="danger" size="sm">{s}</Badge>)}
                </div>

                <h3 className="text-sm font-semibold text-cyber-blue mt-4 mb-2">IPC Sections</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedCaseData.ipcSections.map(s => <Badge key={s} variant="outline" size="sm">{s}</Badge>)}
                </div>

                <h3 className="text-sm font-semibold text-cyber-blue mt-4 mb-2">Evidence ({selectedCaseData.evidence.length} items)</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedCaseData.evidence.map(e => <Badge key={e} variant="info" size="sm">{e}</Badge>)}
                </div>

                <h3 className="text-sm font-semibold text-cyber-blue mt-4 mb-2">Risk Assessment</h3>
                <div className="flex items-center gap-3">
                  <div className={`text-3xl font-bold ${selectedCaseData.riskScore >= 80 ? 'text-red-400' : selectedCaseData.riskScore >= 60 ? 'text-orange-400' : 'text-amber-400'}`}>
                    {selectedCaseData.riskScore}/100
                  </div>
                  <Badge variant={selectedCaseData.riskScore >= 80 ? 'danger' : 'warning'} size="md">
                    {selectedCaseData.priority} priority
                  </Badge>
                </div>

                <h3 className="text-sm font-semibold text-cyber-blue mt-4 mb-2">Investigation Notes</h3>
                <ul className="space-y-1">
                  {selectedCaseData.notes.map((note, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Recent Reports */}
      <Card hover={false}>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <div className="space-y-3 mt-2">
          {mockReports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              <div className="p-2 rounded-lg bg-cyber-blue/10 text-cyber-blue shrink-0">
                <FileText size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{report.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" size="sm">{report.caseId}</Badge>
                  <Badge variant={report.status === 'final' ? 'success' : 'warning'} size="sm">{report.status}</Badge>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="ghost" icon={<Eye size={14} />}>View</Button>
                <Button size="sm" variant="ghost" icon={<Download size={14} />}>PDF</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
