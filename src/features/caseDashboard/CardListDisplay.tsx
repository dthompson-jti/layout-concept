// src/features/caseDashboard/CardListDisplay.tsx
// FIX: This file was renamed from VirtualizedCards.tsx and completely refactored.
// It no longer uses virtualization, instead implementing a simple CSS-based scrolling container.
// This fixes card bunching issues and correctly implements the "scrolling portal" feature.

import { Row } from '@tanstack/react-table';
import { DataCard } from './DataCard';
import { MenuAction } from '../../data/caseDetailData';
import styles from './CardListDisplay.module.css';

interface CardListDisplayProps<T extends object> {
  rows: Row<T>[];
  rowLimit?: number;
  menuActions: (string | MenuAction)[];
}

export const CardListDisplay = <T extends object>({ rows, rowLimit, menuActions }: CardListDisplayProps<T>) => {
  const rowsToRender = rowLimit ? rows.slice(0, rowLimit) : rows;

  return (
    <div className={styles.scrollContainer} data-is-limited={!!rowLimit}>
      <div className={styles.cardList}>
        {rowsToRender.map(row => (
          <DataCard key={row.id} row={row} menuActions={menuActions} />
        ))}
      </div>
    </div>
  );
};