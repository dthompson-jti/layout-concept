// src/features/caseDashboard/TileDocuments.tsx
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { VirtualizedTable } from './VirtualizedTable';
import { documentsData, Document } from '../../data/fakeData';
import { TableCheckbox } from '../../components/TableCheckbox'; // CORRECTED: Import shared component

export const TileDocuments = () => {
  const columns = useMemo<ColumnDef<Document>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => <TableCheckbox {...{ checked: table.getIsAllRowsSelected(), indeterminate: table.getIsSomeRowsSelected(), onChange: table.getToggleAllRowsSelectedHandler() }} />,
        cell: ({ row }) => <TableCheckbox {...{ checked: row.getIsSelected(), disabled: !row.getCanSelect(), indeterminate: row.getIsSomeSelected(), onChange: row.getToggleSelectedHandler() }} />,
        size: 60,
      },
      { accessorKey: 'name', header: 'Name', size: 300 },
      { accessorKey: 'type', header: 'Type', size: 150 },
      { accessorKey: 'uploaded', header: 'Date Uploaded', size: 150 },
      { accessorKey: 'by', header: 'Uploaded By', size: 150 },
    ],
    []
  );

  return <VirtualizedTable data={documentsData} columns={columns} />;
};