// src/features/caseDashboard/VirtualizedCards.tsx
import { useRef } from 'react';
import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataCard } from './DataCard';
import styles from './VirtualizedCards.module.css';

interface VirtualizedCardsProps<T extends object> {
  rows: Row<T>[];
  rowLimit?: number;
}

export const VirtualizedCards = <T extends object>({ rows, rowLimit }: VirtualizedCardsProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const rowsToRender = rowLimit ? rows.slice(0, rowLimit) : rows;

  const rowVirtualizer = useVirtualizer({
    count: rowsToRender.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 180, 
    overscan: 10, // Increased overscan for smoother scrolling
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  
  // FIX: This calculation was correct, but needed to be combined with the style fix below.
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
                // FIX: This is the critical change to fix the "bunching up".
                // We explicitly set the height of the positioned container to the size
                // calculated by the virtualizer. This ensures each item occupies the
                // correct vertical space.
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div style={{ padding: '0 var(--spacing-4) var(--spacing-4)' }}>
                <DataCard row={row} />
              </div>
            </div>
          );
        })}
        {paddingBottom > 0 && <div style={{ height: `${paddingBottom}px` }} />}
      </div>
    </div>
  );
};