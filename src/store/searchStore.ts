// ============================================================
// CrimeNet AI — Search Store (Zustand)
// ============================================================
'use client';

import { create } from 'zustand';
import type { SearchResult, SearchFilters } from '@/types/entities';

interface SearchState {
  query: string;
  filters: SearchFilters;
  results: SearchResult[];
  isSearching: boolean;
  recentSearches: string[];

  // Actions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setResults: (results: SearchResult[]) => void;
  setSearching: (searching: boolean) => void;
  addRecentSearch: (query: string) => void;
  clearResults: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  filters: { query: '' },
  results: [],
  isSearching: false,
  recentSearches: [],

  setQuery: (query) => set({ query, filters: { ...get().filters, query } }),

  setFilters: (filters) => set({
    filters: { ...get().filters, ...filters },
  }),

  setResults: (results) => set({ results, isSearching: false }),

  setSearching: (searching) => set({ isSearching: searching }),

  addRecentSearch: (query) => {
    const recent = get().recentSearches.filter(s => s !== query);
    set({ recentSearches: [query, ...recent].slice(0, 10) });
  },

  clearResults: () => set({ results: [], query: '' }),

  reset: () => set({
    query: '',
    filters: { query: '' },
    results: [],
    isSearching: false,
  }),
}));
