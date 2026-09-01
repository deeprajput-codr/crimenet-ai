// ============================================================
// CrimeNet AI — Entity Extraction Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, User, Phone, Car, MapPin, Building, Calendar, DollarSign, Crosshair, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfidenceBar, FileUpload } from '@/components/ui/UIComponents';
import { delay } from '@/lib/utils';

const entityTypeIcons: Record<string, React.ReactNode> = {
  person: <User size={14} />, phone: <Phone size={14} />, vehicle: <Car size={14} />,
  location: <MapPin size={14} />, organization: <Building size={14} />,
  date: <Calendar size={14} />, money: <DollarSign size={14} />, weapon: <Crosshair size={14} />,
};

const mockExtractionResults = [
  { id: '1', text: 'Vikram Singh Rathore', type: 'person', confidence: 97 },
  { id: '2', text: '+91-98765-43210', type: 'phone', confidence: 100 },
  { id: '3', text: 'DL-01-AB-1234', type: 'vehicle', confidence: 95 },
  { id: '4', text: 'Rohini Sector 22, Delhi', type: 'location', confidence: 88 },
  { id: '5', text: 'Rohini Syndicate', type: 'organization', confidence: 82 },
  { id: '6', text: '15 March 2025', type: 'date', confidence: 100 },
  { id: '7', text: '₹75 crores', type: 'money', confidence: 91 },
  { id: '8', text: 'Gurpreet Singh Sandhu', type: 'person', confidence: 94 },
  { id: '9', text: 'PB-10-EF-9012', type: 'vehicle', confidence: 98 },
  { id: '10', text: 'country-made pistol', type: 'weapon', confidence: 76 },
  { id: '11', text: 'Arjun Deshmukh', type: 'person', confidence: 89 },
  { id: '12', text: 'FastTrack Logistics', type: 'organization', confidence: 85 },
];

export default function ExtractionPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<typeof mockExtractionResults>([]);
  const [fileName, setFileName] = useState('');

  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) return;
    setFileName(files[0].name);
    setIsProcessing(true);
    setResults([]);
    setProgress(0);

    // Simulate extraction progress
    for (let i = 0; i <= 100; i += 5) {
      await delay(80);
      setProgress(i);
    }

    setResults(mockExtractionResults);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Entity Extraction</h1>
        <p className="text-sm text-slate-400 mt-1">Upload documents to extract persons, phones, vehicles, locations, and more</p>
      </div>

      {/* Upload Zone */}
      <FileUpload
        onFilesSelected={handleFilesSelected}
        label="Drop FIR documents, reports, or intelligence files here"
        multiple={false}
      />

      {/* Processing Animation */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card hover={false}>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-2 border-cyber-blue/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-cyber-blue border-t-transparent animate-spin" />
                  <FileText size={20} className="absolute inset-0 m-auto text-cyber-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Processing: {fileName}</p>
                  <div className="mt-2 w-full h-2 rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-neon-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{progress}% — Extracting entities...</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Extracted Entities
              <span className="ml-2 text-sm font-normal text-slate-400">({results.length} found)</span>
            </h2>
            <Button size="sm" variant="success" icon={<CheckCircle2 size={14} />}>
              Add All to Investigation
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map((entity, i) => (
              <motion.div
                key={entity.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card padding="sm" className="group">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyber-blue/10 text-cyber-blue shrink-0">
                      {entityTypeIcons[entity.type] || <FileText size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white truncate">{entity.text}</p>
                      </div>
                      <Badge variant="info" size="sm" className="mt-1 capitalize">{entity.type}</Badge>
                      <ConfidenceBar score={entity.confidence} label="Confidence" size="sm" className="mt-2" />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="flex-1 text-[10px]">Link Entity</Button>
                    <Button size="sm" variant="ghost" className="text-[10px]">Dismiss</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
