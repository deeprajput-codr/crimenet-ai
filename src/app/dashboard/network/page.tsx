// ============================================================
// CrimeNet AI — Network Analysis Page
// ============================================================
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, BarChart3, Network, Users, ArrowRight, Play } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfidenceBar } from '@/components/ui/UIComponents';
import { Table, type Column } from '@/components/ui/Table';

const analysisTypes = [
  { id: 'centrality', label: 'Centrality Analysis', desc: 'Identify the most influential nodes in the network', icon: <Network size={20} /> },
  { id: 'community', label: 'Community Detection', desc: 'Find clusters and sub-groups within the network', icon: <Users size={20} /> },
  { id: 'link-prediction', label: 'Link Prediction', desc: 'Predict missing or future connections between entities', icon: <ArrowRight size={20} /> },
  { id: 'influence', label: 'Influence Propagation', desc: 'Trace how information/resources flow through the network', icon: <Radar size={20} /> },
];

const mockCentralityResults = [
  { rank: 1, nodeId: 'P001', label: 'Vikram Rathore', score: 0.94, type: 'criminal' },
  { rank: 2, nodeId: 'P012', label: 'Gurpreet Sandhu', score: 0.87, type: 'criminal' },
  { rank: 3, nodeId: 'P002', label: 'Arjun Deshmukh', score: 0.78, type: 'suspect' },
  { rank: 4, nodeId: 'P004', label: 'Rajesh Yadav', score: 0.74, type: 'criminal' },
  { rank: 5, nodeId: 'P003', label: 'Priya Sharma', score: 0.71, type: 'suspect' },
  { rank: 6, nodeId: 'P010', label: 'Anil Tiwari', score: 0.68, type: 'suspect' },
  { rank: 7, nodeId: 'P005', label: 'Imran Khan', score: 0.65, type: 'suspect' },
  { rank: 8, nodeId: 'P006', label: 'Kavitha Nair', score: 0.52, type: 'suspect' },
];

const mockClusters = [
  { id: 'C1', label: 'Delhi Drug Network', color: '#ef4444', members: ['P001', 'P002', 'P005', 'P012'], riskScore: 95 },
  { id: 'C2', label: 'UP Financial Fraud', color: '#f59e0b', members: ['P003', 'P004', 'P009'], riskScore: 78 },
  { id: 'C3', label: 'Bihar Arms Ring', color: '#a855f7', members: ['P004', 'P010'], riskScore: 85 },
  { id: 'C4', label: 'Kerala-Mumbai Hawala', color: '#06b6d4', members: ['P002', 'P006', 'P011'], riskScore: 72 },
];

export default function NetworkPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const runAnalysis = async (type: string) => {
    setSelectedAnalysis(type);
    setIsRunning(true);
    setShowResults(false);
    await new Promise(r => setTimeout(r, 2000));
    setIsRunning(false);
    setShowResults(true);
  };

  const columns: Column<typeof mockCentralityResults[0]>[] = [
    { key: 'rank', header: '#', width: '50px', sortable: true, render: (item) => <span className="text-slate-400 font-mono text-xs">{item.rank}</span> },
    { key: 'label', header: 'Entity', sortable: true, render: (item) => (
      <div className="flex items-center gap-2">
        <span className="text-white font-medium text-sm">{item.label}</span>
        <Badge variant={item.type === 'criminal' ? 'danger' : 'warning'} size="sm">{item.type}</Badge>
      </div>
    )},
    { key: 'nodeId', header: 'ID', render: (item) => <span className="text-xs font-mono text-slate-400">{item.nodeId}</span> },
    { key: 'score', header: 'Centrality Score', sortable: true, render: (item) => <ConfidenceBar score={Math.round(item.score * 100)} size="sm" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Network Analysis Engine</h1>
        <p className="text-sm text-slate-400 mt-1">Advanced graph algorithms to uncover hidden patterns in criminal networks</p>
      </div>

      {/* Analysis Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analysisTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer ${selectedAnalysis === type.id ? 'border-cyber-blue/40 bg-cyber-blue/5' : ''}`}
            onClick={() => !isRunning && runAnalysis(type.id)}
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-cyber-blue/10 text-cyber-blue">{type.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-white">{type.label}</h3>
                <p className="text-xs text-slate-400 mt-1">{type.desc}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4" icon={<Play size={12} />} isLoading={isRunning && selectedAnalysis === type.id}>
              Run Analysis
            </Button>
          </Card>
        ))}
      </div>

      {/* Results */}
      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Centrality Results */}
          {selectedAnalysis === 'centrality' && (
            <Card hover={false}>
              <CardHeader>
                <CardTitle>Centrality Rankings</CardTitle>
                <Badge variant="success" size="md">Analysis Complete</Badge>
              </CardHeader>
              <Table columns={columns} data={mockCentralityResults} pageSize={10} />
            </Card>
          )}

          {/* Community Detection */}
          {selectedAnalysis === 'community' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Detected Communities ({mockClusters.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockClusters.map((cluster) => (
                  <Card key={cluster.id} padding="md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 rounded-full" style={{ background: cluster.color }} />
                      <h3 className="text-sm font-semibold text-white">{cluster.label}</h3>
                      <Badge variant={cluster.riskScore >= 80 ? 'danger' : cluster.riskScore >= 60 ? 'warning' : 'info'} size="sm">
                        Risk: {cluster.riskScore}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cluster.members.map(m => (
                        <Badge key={m} variant="outline" size="sm">{m}</Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Generic results for other types */}
          {(selectedAnalysis === 'link-prediction' || selectedAnalysis === 'influence') && (
            <Card hover={false}>
              <CardHeader>
                <CardTitle>{selectedAnalysis === 'link-prediction' ? 'Predicted Links' : 'Influence Scores'}</CardTitle>
                <Badge variant="success" size="md">Analysis Complete</Badge>
              </CardHeader>
              <Table columns={columns} data={mockCentralityResults} pageSize={10} />
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
