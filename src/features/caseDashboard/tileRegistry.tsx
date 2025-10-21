// src/features/caseDashboard/tileRegistry.tsx
import React from 'react';
import { TileCaseSummary } from './TileCaseSummary';
import { TilePartyInformation } from './TilePartyInformation';
import { TileDocuments } from './TileDocuments';
import { TilePlaceholder } from './TilePlaceholder';
import { TileCaseHistory } from './TileCaseHistory';
import { TileJudicialAssignments } from './TileJudicialAssignments';
import { TileRelatedCases } from './TileRelatedCases';
import { TileComponentProps } from './dashboardState';

// Define placeholder components as properly typed Function Components.
// This is cleaner than defining them inline within the map.
const FinancialsTile: React.FC<TileComponentProps> = (props) => (
  <TilePlaceholder {...props} title="Financial Information" />
);

const DefaultTile: React.FC<TileComponentProps> = (props) => (
  <TilePlaceholder {...props} title="Unknown Tile" />
);

// The map's value type is now correctly specified as React.ComponentType<TileComponentProps>,
// ensuring every component in the map accepts the required props.
export const TILE_COMPONENT_MAP: Record<string, React.ComponentType<TileComponentProps>> = {
  CaseSummary: TileCaseSummary,
  PartyInformation: TilePartyInformation,
  Documents: TileDocuments,
  CaseHistory: TileCaseHistory,
  JudicialAssignments: TileJudicialAssignments,
  RelatedCases: TileRelatedCases,
  Financials: FinancialsTile,
  Default: DefaultTile,
};