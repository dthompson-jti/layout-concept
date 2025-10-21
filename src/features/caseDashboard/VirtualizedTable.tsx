// src/features/caseDashboard/VirtualizedTable.tsx
import { useState, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchInput } from '../../components/SearchInput'; // CORRECTED: Path is now valid
import styles from './VirtualizedTable.module.css';

// ... rest of the file is unchanged
interface VirtualizedTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

export const VirtualizedTable = <T extends object>({ data, columns }: VirtualizedTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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
                      {{ asc: <span className="material-symbols-rounded">arrow_upward</span>, desc: <span className="material-symbols-rounded">arrow_downward</span> }[header.column.getIsSorted() as string] ?? null}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && <tr><td style={{ height: `${paddingTop}px` }} /></tr>}
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
            {paddingBottom > 0 && <tr><td style={{ height: `${paddingBottom}px` }} /></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};