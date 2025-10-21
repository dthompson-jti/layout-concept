// src/features/caseDashboard/TileCaseHistory.tsx
import { TilePlaceholder } from './TilePlaceholder';
import { TileComponentProps } from './dashboardState';

// This is a placeholder for the real Case History tile.
// It also needs to accept the standard props.
// FIX: Pass props explicitly instead of spreading.
export const TileCaseHistory = (props: TileComponentProps) => {
  // In a real implementation, this would contain the same logic as TileDocuments.
  return <TilePlaceholder tileId={props.tileId} setHeaderControls={props.setHeaderControls} title="Case History" />;
};