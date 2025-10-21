// src/data/tanstack-table.d.ts
// FIX: Import RowData to make it available within the module declaration.
import { RowData } from '@tanstack/react-table';
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // FIX: The generic parameters <TData extends RowData, TValue> must exactly match
  // the original library's declaration for augmentation to be successful.
  interface ColumnMeta<TData extends RowData, TValue> {
    priority?: number;
    cardRole?: 'title' | 'subtitle' | 'badge' | 'meta';
  }
}