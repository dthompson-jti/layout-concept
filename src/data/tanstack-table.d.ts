// src/data/tanstack-table.d.ts
import { RowData } from '@tanstack/react-table';
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // FIX: Use a direct eslint-disable comment. This is the most robust way to
  // handle required-but-unused parameters in type declarations. The generic
  // parameters are restored to their original names to ensure a perfect signature match.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    priority?: number;
    cardRole?: 'title' | 'subtitle' | 'badge' | 'meta';
  }
}