// src/features/caseDashboard/VirtualizedTable.tsx
import { useRef } from 'react';
import {
  flexRender,
  Table,
  SortDirection,
} from '@tanstack/react-table';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchInput } from '../../components/SearchInput';
import styles from './VirtualizedTable.module.css';

interface VirtualizedTableProps<T extends object> {
  tableInstance: Table<T>;
}

export const VirtualizedTable = <T extends object>({ tableInstance: table }: VirtualizedTableProps<T>) => {
  // FIX: Provide an explicit type for globalFilter to prevent unsafe assignment.
  const globalFilter: string = table.getState().globalFilter ?? '';
  const setGlobalFilter = table.setGlobalFilter;
  const rowSelection = table.getState().rowSelection;

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 49,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start ?? 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0) : 0;
  const numSelected = Object.keys(rowSelection).length;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <SearchInput value={globalFilter} onChange={setGlobalFilter} placeholder="Filter items..." variant="integrated" />
        </div>
        <AnimatePresence>
          {numSelected > 0 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={styles.selectionToolbar}>
              <span>{numSelected} selected</span>
              <button className="btn btn-tertiary">Export</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div ref={tableContainerRef} className={styles.tableScrollWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize() }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <span className={styles.sortIndicator}>
                      {/* FIX: Use a type-safe object lookup without the `as string` cast. */}
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
              const row = rows[virtualRow.index];
              return (
                <tr key={row.id} data-state={row.getIsSelected() ? 'selected' : 'default'}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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