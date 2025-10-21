// src/features/caseDashboard/TileCaseHistory.tsx
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { VirtualizedTable } from './VirtualizedTable';
import { caseHistoryData, HistoryEvent } from '../../data/fakeData';
import { TableCheckbox } from '../../components/TableCheckbox'; // CORRECTED: Import shared component

export const TileCaseHistory = () => {
  const columns = useMemo<ColumnDef<HistoryEvent>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => <TableCheckbox {...{ checked: table.getIsAllRowsSelected(), indeterminate: table.getIsSomeRowsSelected(), onChange: table.getToggleAllRowsSelectedHandler() }} />,
        cell: ({ row }) => <TableCheckbox {...{ checked: row.getIsSelected(), disabled: !row.getCanSelect(), indeterminate: row.getIsSomeSelected(), onChange: row.getToggleSelectedHandler() }} />,
        size: 60,
      },
      { accessorKey: 'date', header: 'Date', size: 120 },
      { accessorKey: 'event', header: 'Event Description', size: 300 },
      { accessorKey: 'filedBy', header: 'Filed By', size: 150 },
      { accessorKey: 'docket', header: 'Docket #', size: 150 },
    ],
    []
  );

  return <VirtualizedTable data={caseHistoryData} columns={columns} />;
};