// ============================================================
// CrimeNet AI — Graph Type Definitions (React Flow)
// ============================================================

import type { Node, Edge } from '@xyflow/react';

export type GraphNodeType =
  | 'criminal'
  | 'suspect'
  | 'case'
  | 'vehicle'
  | 'phone'
  | 'location'
  | 'organization'
  | 'evidence'
  | 'event';

export type GraphEdgeType =
  | 'associates-with'
  | 'suspects-in'
  | 'owns'
  | 'contacted'
  | 'lives-at'
  | 'works-for'
  | 'member-of'
  | 'involved-in'
  | 'linked-to'
  | 'traveled-to'
  | 'financial-link'
  | 'family';

export interface GraphNodeData {
  [key: string]: unknown;
  label: string;
  nodeType: GraphNodeType;
  riskScore?: number;
  entityId: string;
  subtitle?: string;
  status?: string;
  icon?: string;
  details?: Record<string, string>;
}


export type CrimeNetNode = Node<GraphNodeData>;
export type CrimeNetEdge = Edge & {
  data?: {
    relationship: GraphEdgeType;
    weight?: number;
    timestamp?: string;
  };
};

export interface GraphState {
  nodes: CrimeNetNode[];
  edges: CrimeNetEdge[];
  selectedNodeId: string | null;
  filters: {
    nodeTypes: GraphNodeType[];
    minRiskScore: number;
  };
  layout: 'force' | 'hierarchical' | 'circular' | 'grid';
}

// ---- Network Analysis ----
export interface NetworkAnalysisResult {
  type: 'centrality' | 'community' | 'link-prediction' | 'shortest-path' | 'influence';
  title: string;
  description: string;
  data: {
    nodeId: string;
    score: number;
    label: string;
    rank: number;
  }[];
  clusters?: {
    id: string;
    color: string;
    members: string[];
    label: string;
  }[];
  paths?: {
    from: string;
    to: string;
    nodes: string[];
    totalWeight: number;
  }[];
  timestamp: string;
}

export interface GraphFilterState {
  nodeTypes: GraphNodeType[];
  minRiskScore: number;
  searchQuery: string;
  showLabels: boolean;
  showEdgeLabels: boolean;
}
