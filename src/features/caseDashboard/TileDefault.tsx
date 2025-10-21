// src/features/caseDashboard/TileDefault.tsx
import { TilePlaceholder } from './TilePlaceholder';
import { TileComponentProps } from './dashboardState';

export const TileDefault = (props: TileComponentProps) => (
  <TilePlaceholder {...props} title="Unknown Tile" />
);