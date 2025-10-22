// src/features/caseDashboard/TileCase.tsx
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { TileComponentProps, tileMetaFamily } from './dashboardState';
import { caseDetailDataMap, Table } from '../../data/caseDetailData';
import { GenericDataView } from './GenericDataView';

export const TileCase = ({ tileId, menuActions }: TileComponentProps) => {
  const setTileMeta = useSetAtom(tileMetaFamily(tileId));
  const tileData = caseDetailDataMap.get(tileId);

  useEffect(() => {
    if (tileData) {
      const totalRows = tileData.page.tables.reduce((sum: number, table: Table) => sum + table.visible_rows.length, 0);
      setTileMeta({ count: totalRows });
    }
  }, [tileData, setTileMeta]);

  if (!tileData) return <div>Error: Case data not found.</div>;

  return <GenericDataView tileId={tileId} tables={tileData.page.tables} menuActions={menuActions} />;
};