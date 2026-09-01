// ============================================================
// CrimeNet AI — API Type Definitions
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

// ---- Auth ----
export interface LoginRequest {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: import('./entities').User;
  expiresAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  badgeNumber: string;
  department: string;
  rank: string;
  phone: string;
  role: import('./entities').UserRole;
}

// ---- Copilot ----
export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: CopilotCitation[];
  charts?: CopilotChart[];
  isStreaming?: boolean;
}

export interface CopilotCitation {
  id: string;
  type: 'case' | 'person' | 'evidence' | 'report';
  entityId: string;
  title: string;
  excerpt: string;
  confidence: number;
}

export interface CopilotChart {
  type: 'bar' | 'line' | 'pie' | 'network';
  title: string;
  data: Record<string, unknown>[];
}

export interface CopilotThread {
  id: string;
  title: string;
  messages: CopilotMessage[];
  createdAt: string;
  updatedAt: string;
  caseId?: string;
}

// ---- Extraction ----
export interface ExtractionRequest {
  fileContent: string;
  fileType: 'pdf' | 'csv' | 'json' | 'txt';
  fileName: string;
}

export interface ExtractionResult {
  id: string;
  fileName: string;
  entities: import('./entities').ExtractedEntity[];
  totalEntities: number;
  processingTime: number;
  confidence: number;
  status: 'processing' | 'completed' | 'failed';
}

// ---- Entity Resolution ----
export interface ResolutionCandidate {
  id: string;
  entity1: import('./entities').Person;
  entity2: import('./entities').Person;
  matchScore: number;
  matchedFields: {
    field: string;
    value1: string;
    value2: string;
    similarity: number;
  }[];
  status: 'pending' | 'merged' | 'rejected' | 'flagged';
  resolvedAt?: string;
  resolvedBy?: string;
}

// ---- Report Generation ----
export interface ReportGenerationRequest {
  type: import('./entities').Report['type'];
  caseId: string;
  title: string;
  includeSections: string[];
}
