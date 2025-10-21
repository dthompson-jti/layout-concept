// src/data/atoms.ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// General UI State
export const isMenuOpenAtom = atom(false);

// Settings & Preferences
export const isToolbarCompactAtom = atomWithStorage('isToolbarCompact', false);
export const isShowBreadcrumbAtom = atomWithStorage('isShowBreadcrumb', true);
export type LayoutMode = 'single-column' | 'two-column';
export const settingsLayoutModeAtom = atomWithStorage<LayoutMode>('settingsLayoutMode', 'two-column');

// Simple counter for demonstration
export const counterAtom = atom(0);