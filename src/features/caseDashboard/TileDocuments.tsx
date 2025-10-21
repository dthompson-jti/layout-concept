// src/features/caseDashboard/TileDocuments.tsx
import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { SortingState, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table';
import { tileViewModesAtom, TileContentViewMode } from './dashboardState';
import { Document, documentsData } from '../../data/fakeData';
import { VirtualizedTable } from './VirtualizedTable';
import { VirtualizedCards } from './VirtualizedCards';
import { IconToggleGroup } from '../../components/IconToggleGroup';
import { Select, SelectItem } from '../../components/Select';
import { TableCheckbox } from '../../components/TableCheckbox';

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

// FIX: This component now receives layout props from CaseDashboard.
interface TileDocumentsProps {
  tileId: string;
  setHeaderControls: (controls: React.ReactNode) => void;
}

export const TileDocuments = ({ tileId, setHeaderControls }: TileDocumentsProps) => {
  const [viewModes, setViewModes] = useAtom(tileViewModesAtom);
  const viewMode = viewModes[tileId] || 'table';
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: documentsData,
    columns: documentColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const setViewMode = (mode: TileContentViewMode) => {
    setViewModes(prev => ({ ...prev, [tileId]: mode }));
  };

  // This logic now lives inside the component that owns the data.
  useMemo(() => {
    const viewToggleOptions = [
      { value: 'table', label: 'Table View', icon: 'table_rows' },
      { value: 'cards', label: 'Card View', icon: 'view_agenda' },
    ];
    
    const sortableColumns = documentColumns.filter(c => 'accessorKey' in c);
    const currentSortCol = sorting[0]?.id;

    const controls = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
    );
    setHeaderControls(controls);
  }, [viewMode, sorting, setHeaderControls]);


  return (
    <div style={{ paddingTop: 'var(--spacing-1)' }}>
      {viewMode === 'table' ? (
        <VirtualizedTable tableInstance={table} />
      ) : (
        <VirtualizedCards rows={rows} />
      )}
    </div>
  );
};