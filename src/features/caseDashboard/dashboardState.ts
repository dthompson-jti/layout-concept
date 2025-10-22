// src/features/caseDashboard/dashboardState.ts
import { atom } from 'jotai';
import { atomWithStorage, atomFamily } from 'jotai/utils';
import { caseDetailDataMap, MenuAction } from '../../data/caseDetailData';

export type DashboardViewMode = 'grid' | 'list';
export type TileContentViewMode = 'table' | 'cards';

export interface TileComponentProps {
  tileId: string;
  // NEW: Prop for passing menu actions to tile content
  menuActions: (string | MenuAction)[];
}

export interface TileConfig {
  id: string; // e.g., 'case', 'docs', 'parties'
  componentKey: string; // e.g., 'Case', 'Docs', 'Parties'
  title: string; // e.g., 'Case Overview', 'Documents'
  isCollapsed: boolean;
  isHidden: boolean;
}

export interface TileMeta {
  count?: number;
  isUpdated?: boolean;
}

// --- DATA-DRIVEN LAYOUT GENERATION ---

// A map from the sanitized data key to a user-friendly display title.
const TILE_TITLE_MAP: Record<string, string> = {
  case: 'Case Overview',
  subcase: 'Subcases',
  docs: 'Documents',
  hearings: 'Hearings',
  parties: 'Parties & Representation',
  financial: 'Financials',
};

// This function generates the default dashboard layout directly from the data source.
const generateDefaultLayout = (): TileConfig[] => {
  const layout: TileConfig[] = [];
  // FIX: Correctly iterate over map keys to fix the `no-unused-vars` error.
  for (const key of caseDetailDataMap.keys()) {
    layout.push({
      id: key,
      componentKey: key.charAt(0).toUpperCase() + key.slice(1),
      title: TILE_TITLE_MAP[key] || 'Unknown Tile',
      isCollapsed: false,
      isHidden: false,
    });
  }
  return layout;
};

const defaultLayout: TileConfig[] = generateDefaultLayout();

// --- ATOMS ---

export const userLayoutAtom = atomWithStorage<TileConfig[]>('user-case-layout-v3', defaultLayout);
export const isEditModeAtom = atom(false);

export const maximizedTileAtom = atom<TileConfig | null>(null);
export const activeDragIdAtom = atom<string | null>(null);

export const dashboardViewModeAtom = atomWithStorage<DashboardViewMode>('dashboard-view-mode', 'grid');

export const tileViewModesAtom = atomWithStorage<Record<string, TileContentViewMode>>('tile-content-view-modes', {});

export const tileMetaFamily = atomFamily(
  () => atom<TileMeta>({ count: undefined, isUpdated: false }),
  (a, b) => a === b
);