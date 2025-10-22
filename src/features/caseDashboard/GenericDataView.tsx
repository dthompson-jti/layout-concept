// src/features/caseDashboard/GenericDataView.tsx
// FIX: Import useState.
import { useState } from 'react';
// FIX: Change useAtomValue to useAtom.
import { useAtom } from 'jotai';
import { Table as TableData, MenuAction } from '../../data/caseDetailData';
// FIX: Remove unused GlobalViewMode import.
import { globalViewModeAtom, TileContentViewMode } from './dashboardState';
import { useViewContext } from './ViewContext';
import { TileContentToolbar } from './TileContentToolbar';
import { DataTableDisplay } from './DataTableDisplay';
import styles from './GenericDataView.module.css';

interface GenericDataViewProps {
  tables: TableData[];
  menuActions: (string | MenuAction)[];
}

const getRowLimit = (tableCount: number, viewContext: 'masonry' | 'maximized'): number | undefined => {
  if (viewContext === 'maximized') {
    // FIX: Show more rows in maximized view for multi-table layouts.
    return tableCount > 1 ? 20 : undefined;
  }
  if (tableCount === 1) return 7;
  if (tableCount === 2) return 4;
  if (tableCount >= 3) return 3;
  return undefined;
};

export const GenericDataView = ({ tables, menuActions }: GenericDataViewProps) => {
  const [globalViewMode, setGlobalViewMode] = useAtom(globalViewModeAtom);
  const viewContext = useViewContext();
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  
  // FIX: Create a separate local state for the maximized view's content mode.
  // This decouples it from the global dashboard state.
  const [maximizedContentView, setMaximizedContentView] = useState<TileContentViewMode>('table');

  const viewMode: TileContentViewMode = viewContext === 'maximized' 
    ? maximizedContentView
    : (globalViewMode === 'masonry-cards' ? 'cards' : 'table');

  const rowLimit = getRowLimit(tables.length, viewContext);

  const handleSearchChange = (tableTitle: string, value: string) => {
    setSearchTerms(prev => ({ ...prev, [tableTitle]: value }));
  };
  
  const handleViewModeChange = (mode: TileContentViewMode) => {
    if (viewContext === 'maximized') {
      // FIX: Update the local state for the maximized view.
      setMaximizedContentView(mode);
    } else {
      // This logic should ideally not be hit since the toggle is hidden, but is safe to keep.
      setGlobalViewMode(mode === 'table' ? 'masonry-table' : 'masonry-cards');
    }
  };

  return (
    <div className={styles.container}>
      { (tables.length === 1 || viewContext === 'maximized') && (
        <TileContentToolbar
          searchValue={searchTerms[tables[0]?.title] || ''}
          onSearchChange={(value) => handleSearchChange(tables[0]?.title, value)}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          showToggle={viewContext === 'maximized'}
        />
      )}
      <div className={styles.contentBody} data-scrollable={viewContext === 'maximized' && tables.length > 1}>
        {tables.map((tableData) => (
            <section key={tableData.title} className={styles.tableSection}>
                 {tables.length > 1 && viewContext !== 'maximized' && (
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
                    menuActions={menuActions}
                />
            </section>
        ))}
      </div>
    </div>
  );
};