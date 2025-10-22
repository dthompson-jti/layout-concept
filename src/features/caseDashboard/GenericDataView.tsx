// src/features/caseDashboard/GenericDataView.tsx
import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { Table as TableData } from '../../data/caseDetailData';
import { tileViewModesAtom, TileContentViewMode } from './dashboardState';
import { useViewContext } from './ViewContext';
import { TileContentToolbar } from './TileContentToolbar';
import { DataTableDisplay } from './DataTableDisplay'; // NEW
import styles from './GenericDataView.module.css';

interface GenericDataViewProps {
  tileId: string;
  tables: TableData[];
}

const getRowLimit = (tableCount: number, viewContext: 'masonry' | 'maximized'): number | undefined => {
  if (viewContext === 'maximized') {
    return tableCount > 1 ? 10 : undefined;
  }
  if (tableCount === 1) return 7;
  if (tableCount === 2) return 4;
  if (tableCount >= 3) return 3;
  return undefined;
};

export const GenericDataView = ({ tileId, tables }: GenericDataViewProps) => {
  const [viewModes, setViewModes] = useAtom(tileViewModesAtom);
  const viewMode = viewModes[tileId] || 'table';
  const viewContext = useViewContext();
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  const rowLimit = getRowLimit(tables.length, viewContext);

  const setViewMode = useCallback((mode: TileContentViewMode) => {
    setViewModes(prev => ({ ...prev, [tileId]: mode }));
  }, [setViewModes, tileId]);

  const handleSearchChange = (tableTitle: string, value: string) => {
    setSearchTerms(prev => ({ ...prev, [tableTitle]: value }));
  };

  // FIX: This is the critical change. Instead of incorrectly calling a hook in a loop,
  // we map over the data and render a dedicated component for each table.
  // This new component, `DataTableDisplay`, will correctly call `useReactTable` at its top level.
  return (
    <div className={styles.container}>
      {tables.length === 1 && (
        <TileContentToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchValue={searchTerms[tables[0].title] || ''}
          onSearchChange={(value) => handleSearchChange(tables[0].title, value)}
        />
      )}
      <div className={styles.contentBody} data-scrollable={viewContext === 'maximized' && tables.length > 1}>
        {tables.map((tableData) => (
            <section key={tableData.title} className={styles.tableSection}>
                 {tables.length > 1 && (
                    <TileContentToolbar
                    isMultiTable
                    tableTitle={tableData.title}
                    searchValue={searchTerms[tableData.title] || ''}
                    onSearchChange={(value) => handleSearchChange(tableData.title, value)}
                    />
                )}
                <DataTableDisplay
                    tableData={tableData}
                    viewMode={viewMode}
                    rowLimit={rowLimit}
                    searchValue={searchTerms[tableData.title] || ''}
                />
            </section>
        ))}
      </div>
    </div>
  );
};