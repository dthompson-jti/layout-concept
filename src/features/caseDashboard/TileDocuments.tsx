// src/features/caseDashboard/TileDocuments.tsx
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { TileComponentProps, tileMetaFamily } from './dashboardState';
import { caseDetailDataMap, Table } from '../../data/caseDetailData';
import { GenericDataView } from './GenericDataView';

export const TileDocuments = ({ tileId, menuActions }: TileComponentProps) => {
  const setTileMeta = useSetAtom(tileMetaFamily(tileId));
  const tileData = caseDetailDataMap.get(tileId);

  useEffect(() => {
    if (tileData) {
      const totalRows = tileData.page.tables.reduce((sum: number, table: Table) => sum + table.visible_rows.length, 0);
      setTileMeta({ count: totalRows, isUpdated: true }); // Example of setting update flag
    }
  }, [tileData, setTileMeta]);

  if (!tileData) return <div>Error: Document data not found.</div>;

  // FIX: Remove the tileId prop from the GenericDataView call.
  return <GenericDataView tables={tileData.page.tables} menuActions={menuActions} />;
};