// src/features/caseDashboard/GenericDataView.tsx
import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { Table as TableData, MenuAction } from '../../data/caseDetailData';
import { tileViewModesAtom, TileContentViewMode } from './dashboardState';
import { useViewContext } from './ViewContext';
import { TileContentToolbar } from './TileContentToolbar';
import { DataTableDisplay } from './DataTableDisplay';
import styles from './GenericDataView.module.css';

interface GenericDataViewProps {
  tileId: string;
  tables: TableData[];
  menuActions: (string | MenuAction)[];
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

export const GenericDataView = ({ tileId, tables, menuActions }: GenericDataViewProps) => {
  const [viewModes, setViewModes] = useAtom(tileViewModesAtom);
  const viewContext = useViewContext();
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  // FIX: Implement contextual default view. In masonry, default to 'cards'. Otherwise, 'table'.
  // This default is only used if the user hasn't already saved a preference for this tile.
  const viewMode = viewModes[tileId] || (viewContext === 'masonry' ? 'cards' : 'table');

  const rowLimit = getRowLimit(tables.length, viewContext);

  const setViewMode = useCallback((mode: TileContentViewMode) => {
    setViewModes(prev => ({ ...prev, [tileId]: mode }));
  }, [setViewModes, tileId]);

  const handleSearchChange = (tableTitle: string, value: string) => {
    setSearchTerms(prev => ({ ...prev, [tableTitle]: value }));
  };

  return (
    <div className={styles.container}>
      {/* FIX: The main toolbar is now always rendered to provide a consistent place for the view toggle. */}
      <TileContentToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        // Only show a search bar here if there's just one table.
        searchValue={tables.length === 1 ? searchTerms[tables[0].title] || '' : ''}
        onSearchChange={(value) => tables.length === 1 && handleSearchChange(tables[0].title, value)}
        // Hide the search bar if there are multiple tables to avoid confusion.
        showSearch={tables.length === 1}
      />
      <div className={styles.contentBody} data-scrollable={viewContext === 'maximized' && tables.length > 1}>
        {tables.map((tableData) => (
            <section key={tableData.title} className={styles.tableSection}>
                 {/* FIX: For multi-table views, render a secondary toolbar with only the title and search input. */}
                 {tables.length > 1 && (
                    <TileContentToolbar
                      isMultiTable
                      tableTitle={tableData.title}
                      searchValue={searchTerms[tableData.title] || ''}
                      onSearchChange={(value) => handleSearchChange(tableData.title, value)}
                      showSearch={true} // Always show search on secondary toolbars
                    />
                )}
                <DataTableDisplay
                    tableData={tableData}
                    viewMode={viewMode}
                    rowLimit={rowLimit}
                    searchValue={searchTerms[tableData.title] || ''}
                    menuActions={menuActions}
                />
            </section>
        ))}
      </div>
    </div>
  );
};