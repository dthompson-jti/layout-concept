// src/features/caseDashboard/tileRegistry.ts
import React from 'react';
import { TileCaseSummary } from './TileCaseSummary';
import { TilePartyInformation } from './TilePartyInformation';
import { TileDocuments } from './TileDocuments';
import { TilePlaceholder } from './TilePlaceholder';
import { TileCaseHistory } from './TileCaseHistory';
import { TileJudicialAssignments } from './TileJudicialAssignments';
import { TileRelatedCases } from './TileRelatedCases';

export const TILE_COMPONENT_MAP: Record<string, React.ComponentType> = {
  CaseSummary: TileCaseSummary,
  PartyInformation: TilePartyInformation,
  Documents: TileDocuments,
  CaseHistory: TileCaseHistory,
  JudicialAssignments: TileJudicialAssignments,
  RelatedCases: TileRelatedCases,
  Financials: () => React.createElement(TilePlaceholder, { title: 'Financial Information' }),
  Default: () => React.createElement(TilePlaceholder, { title: 'Unknown Tile' }),
};