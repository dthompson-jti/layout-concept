// src/features/caseDashboard/GenericDataView.tsx
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { Table as TableData, MenuAction } from '../../data/caseDetailData';
import { globalViewModeAtom, TileContentViewMode } from './dashboardState';
import { useViewContext } from './ViewContext';
import { TileContentToolbar } from './TileContentToolbar';
import { DataTableDisplay } from './DataTableDisplay';
import styles from './GenericDataView.module.css';

interface GenericDataViewProps {
  // FIX: Remove the unused tileId prop.
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

// FIX: Remove tileId from the function signature.
export const GenericDataView = ({ tables, menuActions }: GenericDataViewProps) => {
  const globalViewMode = useAtomValue(globalViewModeAtom);
  const viewContext = useViewContext();
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  const viewMode: TileContentViewMode = globalViewMode === 'masonry-table' ? 'table' : 'cards';

  const rowLimit = getRowLimit(tables.length, viewContext);

  const handleSearchChange = (tableTitle: string, value: string) => {
    setSearchTerms(prev => ({ ...prev, [tableTitle]: value }));
  };

  return (
    <div className={styles.container}>
      {tables.length === 1 && (
        <TileContentToolbar
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
                    menuActions={menuActions}
                />
            </section>
        ))}
      </div>
    </div>
  );
};