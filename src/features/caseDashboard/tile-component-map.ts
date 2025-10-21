// src/features/caseDashboard/tile-component-map.ts
import React from 'react';
import { TileCaseSummary } from './TileCaseSummary';
import { TilePartyInformation } from './TilePartyInformation';
import { TileDocuments } from './TileDocuments'; // FIX: Corrected import name
import { TilePlaceholder } from './TilePlaceholder';
import { TileCaseHistory } from './TileCaseHistory'; // FIX: Corrected import name
import { TileJudicialAssignments } from './TileJudicialAssignments';
import { TileRelatedCases } from './TileRelatedCases';

// This file is now named tileRegistry.ts to match your project structure.
// I recommend renaming tile-component-map.ts -> tileRegistry.ts
export const TILE_COMPONENT_MAP: Record<string, React.ComponentType> = {
  CaseSummary: TileCaseSummary,
  PartyInformation: TilePartyInformation,
  Documents: TileDocuments,
  CaseHistory: TileCaseHistory,
  JudicialAssignments: TileJudicialAssignments,
  RelatedCases: TileRelatedCases,
  // Note: CaseEventsTile was missing, so it now uses the placeholder.
  CaseEvents: () => React.createElement(TilePlaceholder, { title: 'Case Events' }),
  Financials: () => React.createElement(TilePlaceholder, { title: 'Financial Information' }),
  Default: () => React.createElement(TilePlaceholder, { title: 'Unknown Tile' }),
};