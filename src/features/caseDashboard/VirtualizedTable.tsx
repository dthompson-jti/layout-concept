// src/features/caseDashboard/VirtualizedTable.tsx
import { useRef } from 'react';
import {
  flexRender,
  Table,
  SortDirection,
} from '@tanstack/react-table';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { AnimatePresence, motion } from 'framer-motion';
import { useViewContext } from './ViewContext';
import styles from './VirtualizedTable.module.css';

interface VirtualizedTableProps<T extends object> {
  tableInstance: Table<T>;
  rowLimit?: number;
}

export const VirtualizedTable = <T extends object>({ tableInstance: table, rowLimit }: VirtualizedTableProps<T>) => {
  const viewContext = useViewContext();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  const allRows = table.getRowModel().rows;
  const rowsToRender = rowLimit ? allRows.slice(0, rowLimit) : allRows;
  const firstColumnId = table.getAllColumns()[0]?.id;

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rowsToRender.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 49,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start ?? 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0) : 0;
  const numSelected = Object.keys(table.getState().rowSelection ?? {}).length;

  return (
    <div className={styles.tableOuterWrapper}>
      <AnimatePresence>
        {numSelected > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={styles.selectionToolbar}>
            <span>{numSelected} selected</span>
            <button className="btn btn-tertiary">Export</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={tableContainerRef} className={styles.tableScrollWrapper} data-context={viewContext} data-is-limited={!!rowLimit}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize() || 'auto' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span className={styles.sortIndicator}>
                      {{ asc: <span className="material-symbols-rounded">arrow_upward</span>, desc: <span className="material-symbols-rounded">arrow_downward</span> }[header.column.getIsSorted() as SortDirection] ?? null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && <tr><td colSpan={table.getAllColumns().length} style={{ height: `${paddingTop}px` }} /></tr>}
            {virtualRows.map((virtualRow: VirtualItem) => {
              const row = rowsToRender[virtualRow.index];
              return (
                <tr key={row.id} data-state={row.getIsSelected() ? 'selected' : 'default'}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() || 'auto' }}>
                      {/* NEW: Apply link style to first column */}
                      {cell.column.id === firstColumnId ? (
                        <span className="text-as-link">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && <tr><td colSpan={table.getAllColumns().length} style={{ height: `${paddingBottom}px` }} /></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};