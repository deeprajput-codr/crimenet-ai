// ============================================================
// CrimeNet AI — Graph Store (Zustand)
// ============================================================
'use client';

import { create } from 'zustand';
import type { CrimeNetNode, CrimeNetEdge, GraphNodeType, GraphFilterState } from '@/types/graph';

interface GraphState {
  nodes: CrimeNetNode[];
  edges: CrimeNetEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  filters: GraphFilterState;
  layout: 'force' | 'hierarchical' | 'circular' | 'grid';
  isLoading: boolean;

  // Actions
  setNodes: (nodes: CrimeNetNode[]) => void;
  setEdges: (edges: CrimeNetEdge[]) => void;
  selectNode: (nodeId: string | null) => void;
  selectEdge: (edgeId: string | null) => void;
  toggleNodeTypeFilter: (type: GraphNodeType) => void;
  setMinRiskScore: (score: number) => void;
  setSearchQuery: (query: string) => void;
  setLayout: (layout: GraphState['layout']) => void;
  toggleLabels: () => void;
  toggleEdgeLabels: () => void;
  setLoading: (loading: boolean) => void;
  addNode: (node: CrimeNetNode) => void;
  removeNode: (nodeId: string) => void;
  reset: () => void;
}

const defaultFilters: GraphFilterState = {
  nodeTypes: ['criminal', 'suspect', 'case', 'vehicle', 'phone', 'location', 'organization', 'evidence'],
  minRiskScore: 0,
  searchQuery: '',
  showLabels: true,
  showEdgeLabels: false,
};

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  filters: { ...defaultFilters },
  layout: 'force',
  isLoading: false,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  selectNode: (nodeId) => set({ selectedNodeId: nodeId, selectedEdgeId: null }),
  selectEdge: (edgeId) => set({ selectedEdgeId: edgeId, selectedNodeId: null }),

  toggleNodeTypeFilter: (type) => {
    const current = get().filters.nodeTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    set({ filters: { ...get().filters, nodeTypes: updated } });
  },

  setMinRiskScore: (score) => set({
    filters: { ...get().filters, minRiskScore: score },
  }),

  setSearchQuery: (query) => set({
    filters: { ...get().filters, searchQuery: query },
  }),

  setLayout: (layout) => set({ layout }),

  toggleLabels: () => set({
    filters: { ...get().filters, showLabels: !get().filters.showLabels },
  }),

  toggleEdgeLabels: () => set({
    filters: { ...get().filters, showEdgeLabels: !get().filters.showEdgeLabels },
  }),

  setLoading: (loading) => set({ isLoading: loading }),

  addNode: (node) => set({ nodes: [...get().nodes, node] }),

  removeNode: (nodeId) => set({
    nodes: get().nodes.filter(n => n.id !== nodeId),
    edges: get().edges.filter(e => e.source !== nodeId && e.target !== nodeId),
  }),

  reset: () => set({
    nodes: [],
    edges: [],
    selectedNodeId: null,
    selectedEdgeId: null,
    filters: { ...defaultFilters },
    layout: 'force',
    isLoading: false,
  }),
}));
