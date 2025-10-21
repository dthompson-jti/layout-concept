// src/features/caseDashboard/tileRegistry.tsx
import React from 'react';
import { TileCaseSummary } from './TileCaseSummary';
import { TilePartyInformation } from './TilePartyInformation';
import { TileDocuments } from './TileDocuments';
import { TileCaseHistory } from './TileCaseHistory';
import { TileJudicialAssignments } from './TileJudicialAssignments';
import { TileRelatedCases } from './TileRelatedCases';
import { TileComponentProps } from './dashboardState';
import { TileFinancials } from './TileFinancials';
import { TileDefault } from './TileDefault';

// FIX: This file is now the single source of truth for the component map.
// The TILE_COMPONENT_MAP constant is defined and exported from here directly.
export const TILE_COMPONENT_MAP: Record<string, React.ComponentType<TileComponentProps>> = {
  CaseSummary: TileCaseSummary,
  PartyInformation: TilePartyInformation,
  Documents: TileDocuments,
  CaseHistory: TileCaseHistory,
  JudicialAssignments: TileJudicialAssignments,
  RelatedCases: TileRelatedCases,
  Financials: TileFinancials,
  Default: TileDefault,
};