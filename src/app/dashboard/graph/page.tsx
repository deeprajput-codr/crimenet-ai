// ============================================================
// CrimeNet AI — Knowledge Graph Page
// ============================================================
'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow, Background, Controls, MiniMap,
  useNodesState, useEdgesState, addEdge,
  type Connection, type NodeMouseHandler, Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Layout, ZoomIn, Maximize2, Tag } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RiskMeter } from '@/components/ui/UIComponents';
import { Button } from '@/components/ui/Button';
import { mockGraphNodes, mockGraphEdges } from '@/lib/mock-data';
import { mockPersons } from '@/lib/mock-data/persons';
import { mockCases } from '@/lib/mock-data/cases';
import { getNodeColor, cn } from '@/lib/utils';
import type { GraphNodeType, CrimeNetNode, CrimeNetEdge } from '@/types/graph';


const nodeTypeLabels: Record<GraphNodeType, string> = {
  criminal: 'Criminal', suspect: 'Suspect', case: 'Case',
  vehicle: 'Vehicle', phone: 'Phone', location: 'Location',
  organization: 'Organization', evidence: 'Evidence', event: 'Event',
};

const proOptions = { hideAttribution: true };

export default function GraphPage() {
  const initialNodes: CrimeNetNode[] = useMemo(() => mockGraphNodes.map(n => ({
    ...n,
    style: {
      background: getNodeColor(n.data.nodeType),
      color: '#fff',
      border: `2px solid ${getNodeColor(n.data.nodeType)}`,
      borderRadius: '50%',
      width: 50,
      height: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 'bold',
      boxShadow: `0 0 15px ${getNodeColor(n.data.nodeType)}40`,
    },
  })), []);

  const initialEdges: CrimeNetEdge[] = useMemo(() => mockGraphEdges.map(e => ({
    ...e,
    style: { stroke: 'rgba(56, 189, 248, 0.3)', strokeWidth: 1.5 },
    animated: true,
    labelStyle: { fill: '#94a3b8', fontSize: 9 },
    labelBgStyle: { fill: 'rgba(3, 7, 18, 0.8)', rx: 4 },
    labelBgPadding: [4, 2] as [number, number],
  })), []);

  const [nodes, setNodes, onNodesChange] = useNodesState<CrimeNetNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CrimeNetEdge>(initialEdges);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTypes, setActiveTypes] = useState<Set<GraphNodeType>>(new Set(Object.keys(nodeTypeLabels) as GraphNodeType[]));

  const onConnect = useCallback((params: Connection) => {
    setEdges(eds => addEdge({ ...params, animated: true }, eds));
  }, [setEdges]);


  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelectedNode(node.id);
  }, []);

  const selectedEntity = useMemo(() => {
    if (!selectedNode) return null;
    const person = mockPersons.find(p => p.id === selectedNode);
    if (person) return { type: 'person' as const, data: person };
    const caseData = mockCases.find(c => c.id === selectedNode);
    if (caseData) return { type: 'case' as const, data: caseData };
    const node = mockGraphNodes.find(n => n.id === selectedNode);
    if (node) return { type: 'node' as const, data: node.data };
    return null;
  }, [selectedNode]);

  const toggleType = (type: GraphNodeType) => {
    const next = new Set(activeTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setActiveTypes(next);
  };

  const filteredNodes = nodes.filter(n => {
    const data = mockGraphNodes.find(gn => gn.id === n.id)?.data;
    return data ? activeTypes.has(data.nodeType) : true;
  });

  const filteredEdges = edges.filter(e => {
    const sourceVisible = filteredNodes.some(n => n.id === e.source);
    const targetVisible = filteredNodes.some(n => n.id === e.target);
    return sourceVisible && targetVisible;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Knowledge Graph</h1>
          <p className="text-sm text-slate-400 mt-1">Interactive criminal network visualization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={<Filter size={14} />} onClick={() => setShowFilters(!showFilters)}>
            Filters
          </Button>
        </div>
      </div>

      <div className="relative glass-card-static rounded-xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <ReactFlow
          nodes={filteredNodes}
          edges={filteredEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          proOptions={proOptions}
          className="bg-navy-900"
        >
          <Background color="rgba(56, 189, 248, 0.05)" gap={20} />
          <Controls className="!bg-navy-800 !border-white/10 !rounded-lg" />
          <MiniMap
            nodeColor={(n) => {
              const data = mockGraphNodes.find(gn => gn.id === n.id)?.data;
              return data ? getNodeColor(data.nodeType) : '#64748b';
            }}
            maskColor="rgba(3, 7, 18, 0.8)"
            className="!bg-navy-800 !border-white/10 !rounded-lg"
          />

          {/* Legend */}
          <Panel position="top-left">
            <div className="glass-card-static rounded-lg p-3 space-y-1.5">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Node Types</p>
              {(Object.keys(nodeTypeLabels) as GraphNodeType[]).map(type => (
                <div key={type} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-3 h-3 rounded-full" style={{ background: getNodeColor(type) }} />
                  {nodeTypeLabels[type]}
                </div>
              ))}
            </div>
          </Panel>

          {/* Stats Panel */}
          <Panel position="top-right">
            <div className="glass-card-static rounded-lg p-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Graph Stats</p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-4"><span className="text-slate-400">Nodes</span><span className="text-white font-medium">{filteredNodes.length}</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-400">Edges</span><span className="text-white font-medium">{filteredEdges.length}</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-400">Selected</span><span className="text-cyber-blue font-medium">{selectedNode || 'None'}</span></div>
              </div>
            </div>
          </Panel>
        </ReactFlow>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-4 top-4 bottom-4 w-56 glass-card-static rounded-xl p-4 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-white"><X size={14} /></button>
              </div>
              <div className="space-y-2">
                {(Object.keys(nodeTypeLabels) as GraphNodeType[]).map(type => (
                  <label key={type} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={activeTypes.has(type)}
                      onChange={() => toggleType(type)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-transparent"
                    />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: getNodeColor(type) }} />
                    {nodeTypeLabels[type]}
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Node Detail Panel */}
        <AnimatePresence>
          {selectedEntity && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 top-4 bottom-4 w-72 glass-card-static rounded-xl p-4 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Entity Detail</h3>
                <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white"><X size={14} /></button>
              </div>

              {selectedEntity.type === 'person' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl font-bold text-white mx-auto">
                      {selectedEntity.data.name.charAt(0)}
                    </div>
                    <h4 className="mt-2 text-base font-semibold text-white">{selectedEntity.data.name}</h4>
                    <Badge variant={selectedEntity.data.status === 'wanted' ? 'danger' : selectedEntity.data.status === 'arrested' ? 'warning' : 'info'} size="sm">
                      {selectedEntity.data.status}
                    </Badge>
                  </div>
                  <RiskMeter score={selectedEntity.data.riskScore} size={100} label="Risk Score" />
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-slate-400">City</span><span className="text-white">{selectedEntity.data.address.city}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Cases</span><span className="text-white">{selectedEntity.data.associatedCases.length}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Associates</span><span className="text-white">{selectedEntity.data.knownAssociates.length}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Aliases</span><span className="text-white">{selectedEntity.data.aliases.join(', ')}</span></div>
                  </div>
                </div>
              )}

              {selectedEntity.type === 'case' && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-white">{selectedEntity.data.title}</h4>
                  <Badge variant={selectedEntity.data.status === 'active' ? 'success' : 'info'} size="sm">{selectedEntity.data.status}</Badge>
                  <p className="text-xs text-slate-400">{selectedEntity.data.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-slate-400">FIR</span><span className="text-white font-mono">{selectedEntity.data.firNumber}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Station</span><span className="text-white">{selectedEntity.data.policeStation}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Suspects</span><span className="text-white">{selectedEntity.data.suspects.length}</span></div>
                  </div>
                </div>
              )}

              {selectedEntity.type === 'node' && (
                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">{selectedEntity.data.label}</h4>
                  <Badge variant="info" size="sm">{selectedEntity.data.nodeType}</Badge>
                  {selectedEntity.data.subtitle && <p className="text-xs text-slate-400">{selectedEntity.data.subtitle}</p>}
                  {selectedEntity.data.riskScore !== undefined && <RiskMeter score={selectedEntity.data.riskScore} size={80} label="Risk" />}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
