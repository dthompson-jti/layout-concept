// src/features/caseDashboard/dashboardState.ts
import { atom } from 'jotai';
import { atomWithStorage, atomFamily } from 'jotai/utils';

export type DashboardViewMode = 'grid' | 'list';
export type TileContentViewMode = 'table' | 'cards';

// A common interface for props passed to ALL tile content components.
// FIX: Removed setHeaderControls as it was part of a brittle pattern causing TS errors.
// Child components should be self-contained and not modify their parent's layout.
export interface TileComponentProps {
  tileId: string;
}

export interface TileConfig {
  id: string;
  componentKey: string;
  isCollapsed: boolean;
  isHidden: boolean;
}

// NEW: A type for the metadata each tile can report about itself.
export interface TileMeta {
  count?: number;
  isUpdated?: boolean;
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

export const maximizedTileAtom = atom<TileConfig | null>(null);
export const activeDragIdAtom = atom<string | null>(null);

export const dashboardViewModeAtom = atomWithStorage<DashboardViewMode>('dashboard-view-mode', 'grid');

export const tileViewModesAtom = atomWithStorage<Record<string, TileContentViewMode>>('tile-content-view-modes', {});

// REFINED: Use atomFamily for performant, per-tile state.
// Each tile's component will write to its own atom, and each Tile header
// will read only from its corresponding atom, preventing unnecessary re-renders.
export const tileMetaFamily = atomFamily(
  () => atom<TileMeta>({ count: undefined, isUpdated: false }),
  (a, b) => a === b
);