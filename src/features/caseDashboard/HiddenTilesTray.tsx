// src/features/caseDashboard/HiddenTilesTray.tsx
// This is a placeholder for the tray that shows hidden tiles.
import { TileConfig } from './dashboardState';
export const HiddenTilesTray = ({ hiddenTiles, onUnhide }: { hiddenTiles: TileConfig[]; onUnhide: (id: string) => void; }) => {
  if (hiddenTiles.length === 0) return null;
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h4>Hidden Tiles</h4>
      {hiddenTiles.map(tile => (
        <button key={tile.id} onClick={() => onUnhide(tile.id)}>
          Show {tile.componentKey}
        </button>
      ))}
    </div>
  );
};