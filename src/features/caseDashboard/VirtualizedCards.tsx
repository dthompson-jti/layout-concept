// src/features/caseDashboard/VirtualizedCards.tsx
import { useRef } from 'react';
import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataCard } from './DataCard';
import { MenuAction } from '../../data/caseDetailData';
import styles from './VirtualizedCards.module.css';

interface VirtualizedCardsProps<T extends object> {
  rows: Row<T>[];
  rowLimit?: number;
  menuActions: (string | MenuAction)[];
}

export const VirtualizedCards = <T extends object>({ rows, rowLimit, menuActions }: VirtualizedCardsProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const rowsToRender = rowLimit ? rows.slice(0, rowLimit) : rows;

  const rowVirtualizer = useVirtualizer({
    count: rowsToRender.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 180, 
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start ?? 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0) : 0;

  return (
    <div ref={containerRef} className={styles.scrollContainer} data-is-limited={!!rowLimit}>
      <div style={{ height: `${totalSize}px`, position: 'relative' }}>
        {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }} />}
        {virtualRows.map(virtualRow => {
          const row = rowsToRender[virtualRow.index];
          return (
            <div
              key={row.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div style={{ padding: '0 var(--spacing-4) var(--spacing-4)' }}>
                <DataCard row={row} menuActions={menuActions} />
              </div>
            </div>
          );
        })}
        {paddingBottom > 0 && <div style={{ height: `${paddingBottom}px` }} />}
      </div>
    </div>
  );
};