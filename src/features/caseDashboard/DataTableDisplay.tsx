// src/features/caseDashboard/DataTableDisplay.tsx
import { useMemo } from 'react';
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable, getFilteredRowModel, ColumnDef } from '@tanstack/react-table';
import { Table as TableData, TableRow } from '../../data/caseDetailData';
import { TileContentViewMode } from './dashboardState';
import { VirtualizedTable } from './VirtualizedTable';
import { VirtualizedCards } from './VirtualizedCards';
import styles from './DataTableDisplay.module.css';

interface DataTableDisplayProps {
  tableData: TableData;
  viewMode: TileContentViewMode;
  rowLimit?: number;
  searchValue: string;
}

export const DataTableDisplay = ({ tableData, viewMode, rowLimit, searchValue }: DataTableDisplayProps) => {
  // `useReactTable` is now correctly called at the top level of a component.
  const columnHelper = createColumnHelper<TableRow>();

  const columns = useMemo(() =>
    tableData.columns.map(colSchema =>
      columnHelper.accessor(colSchema.key, {
        header: colSchema.label,
        cell: info => info.getValue(),
        meta: colSchema.meta,
      })
    ) as ColumnDef<TableRow, any>[], // Use 'any' for cell value type for flexibility
    [tableData.columns, columnHelper]
  );

  const table = useReactTable({
    data: tableData.visible_rows,
    columns,
    state: {
      globalFilter: searchValue || '',
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  return (
    <div className={styles.container}>
      {viewMode === 'table' ? (
        <VirtualizedTable tableInstance={table} rowLimit={rowLimit} />
      ) : (
        <VirtualizedCards rows={rows} rowLimit={rowLimit} />
      )}
    </div>
  );
};