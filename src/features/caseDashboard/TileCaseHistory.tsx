// src/features/caseDashboard/TileCaseHistory.tsx
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { TilePlaceholder } from './TilePlaceholder';
import { TileComponentProps, tileMetaFamily } from './dashboardState';
import { caseHistoryData } from '../../data/fakeData';

export const TileCaseHistory = (props: TileComponentProps) => {
  const setTileMeta = useSetAtom(tileMetaFamily(props.tileId));

  useEffect(() => {
    // Report metadata to the global state for the Tile header to use
    setTileMeta({ count: caseHistoryData.length, isUpdated: false });
  }, [setTileMeta]);

  return <TilePlaceholder tileId={props.tileId} title="Case History" />;
};