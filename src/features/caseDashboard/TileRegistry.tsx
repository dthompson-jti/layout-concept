// src/features/caseDashboard/tileRegistry.tsx
import React from 'react';
import { TileComponentProps } from './dashboardState';
import { TileCase } from './TileCase';
import { TileSubcase } from './TileSubcase';
import { TileDocuments } from './TileDocuments';
import { TileHearings } from './TileHearings';
import { TileParties } from './TileParties';
import { TileFinancial } from './TileFinancial';

// This map connects the `componentKey` from the dashboard layout configuration
// to the actual React component that should be rendered.
export const TILE_COMPONENT_MAP: Record<string, React.ComponentType<TileComponentProps>> = {
  Case: TileCase,
  Subcase: TileSubcase,
  Docs: TileDocuments,
  Hearings: TileHearings,
  Parties: TileParties,
  Financial: TileFinancial,
};