// src/features/caseDashboard/TileDocuments.tsx
import { useEffect, useState, useCallback } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { SortingState, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper, getFilteredRowModel } from '@tanstack/react-table';
import { tileViewModesAtom, TileContentViewMode, tileMetaFamily, TileComponentProps } from './dashboardState';
import { Document, documentsData } from '../../data/fakeData';
import { VirtualizedTable } from './VirtualizedTable';
import { VirtualizedCards } from './VirtualizedCards';
import { IconToggleGroup } from '../../components/IconToggleGroup';
import { Select, SelectItem } from '../../components/Select';
import { TableCheckbox } from '../../components/TableCheckbox';
import { SearchInput } from '../../components/SearchInput';
import styles from './TileDocuments.module.css';

const columnHelper = createColumnHelper<Document>();
const documentColumns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => <TableCheckbox {...{ checked: table.getIsAllRowsSelected(), indeterminate: table.getIsSomeRowsSelected(), onChange: table.getToggleAllRowsSelectedHandler() }} />,
    cell: ({ row }) => <TableCheckbox {...{ checked: row.getIsSelected(), disabled: !row.getCanSelect(), indeterminate: row.getIsSomeSelected(), onChange: row.getToggleSelectedHandler() }} />,
    size: 60,
  }),
  columnHelper.accessor('name', { header: 'Name', size: 300, meta: { priority: 1, cardRole: 'title' } }),
  columnHelper.accessor('type', { header: 'Type', size: 150, meta: { priority: 2, cardRole: 'meta' } }),
  columnHelper.accessor('uploaded', { header: 'Date Uploaded', size: 150, meta: { priority: 2, cardRole: 'meta' } }),
  columnHelper.accessor('by', { header: 'Uploaded By', size: 150, meta: { priority: 3, cardRole: 'meta' } }),
];

export const TileDocuments = ({ tileId }: TileComponentProps) => {
  const [viewModes, setViewModes] = useAtom(tileViewModesAtom);
  const viewMode = viewModes[tileId] || 'table';
  const setTileMeta = useSetAtom(tileMetaFamily(tileId));
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: documentsData,
    columns: documentColumns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  useEffect(() => {
    setTileMeta({ count: documentsData.length, isUpdated: true });
  }, [setTileMeta]);

  const setViewMode = useCallback((mode: TileContentViewMode) => {
    setViewModes(prev => ({ ...prev, [tileId]: mode }));
  }, [setViewModes, tileId]);
  
  const viewToggleOptions = [
    { value: 'table', label: 'Table View', icon: 'data_table' }, // UPDATED ICON
    { value: 'cards', label: 'Card View', icon: 'view_agenda' },
  ];
    
  const sortableColumns = documentColumns.filter(c => 'accessorKey' in c);
  const currentSortCol = sorting[0]?.id;

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentToolbar}>
        <div className={styles.searchWrapper}>
           <SearchInput value={globalFilter} onChange={setGlobalFilter} placeholder="Filter documents..." />
        </div>
        <IconToggleGroup
          options={viewToggleOptions}
          value={viewMode}
          onValueChange={(value) => setViewMode(value as TileContentViewMode)}
        />
        {viewMode === 'cards' && (
          <Select
            value={currentSortCol || ''}
            onValueChange={(value) => setSorting([{ id: value, desc: false }])}
            placeholder="Sort by..."
          >
            {sortableColumns.map(col => (
              <SelectItem key={col.id} value={col.id!}>{col.header as string}</SelectItem>
            ))}
          </Select>
        )}
      </div>
      
      {viewMode === 'table' ? (
        <VirtualizedTable tableInstance={table} />
      ) : (
        <VirtualizedCards rows={rows} />
      )}
    </div>
  );
};