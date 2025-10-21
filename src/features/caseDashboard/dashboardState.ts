// src/features/caseDashboard/dashboardState.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface TileConfig {
  id: string;
  componentKey: string;
  isCollapsed: boolean;
  isHidden: boolean;
}

const defaultLayout: TileConfig[] = [
  { id: 'summary-1', componentKey: 'CaseSummary', isCollapsed: false, isHidden: false },
  { id: 'parties-1', componentKey: 'PartyInformation', isCollapsed: false, isHidden: false },
  { id: 'history-1', componentKey: 'CaseHistory', isCollapsed: false, isHidden: false },
  { id: 'docs-1', componentKey: 'Documents', isCollapsed: true, isHidden: false },
  { id: 'judicial-1', componentKey: 'JudicialAssignments', isCollapsed: false, isHidden: false },
  { id: 'related-1', componentKey: 'RelatedCases', isCollapsed: false, isHidden: false },
  { id: 'financials-1', componentKey: 'Financials', isCollapsed: false, isHidden: true },
];

export const userLayoutAtom = atomWithStorage<TileConfig[]>('user-case-layout-v2', defaultLayout);
export const isEditModeAtom = atom(false);

// ADDED: Atoms required by CaseDashboard.tsx
export const maximizedTileAtom = atom<TileConfig | null>(null);
export const activeDragIdAtom = atom<string | null>(null);