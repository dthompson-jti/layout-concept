// src/features/caseDashboard/VirtualizedCards.tsx
import { useRef, useState, useLayoutEffect } from 'react';
import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataCard } from './DataCard';
import styles from './VirtualizedCards.module.css';

interface VirtualizedCardsProps<T extends object> {
  rows: Row<T>[];
}

const getPriorityFromWidth = (width: number): number => {
  if (width < 480) return 1; // Mobile
  if (width < 768) return 2; // Tablet
  return 3; // Desktop
};

export const VirtualizedCards = <T extends object>({ rows }: VirtualizedCardsProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visiblePriority, setVisiblePriority] = useState(3);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setVisiblePriority(getPriorityFromWidth(entry.contentRect.width));
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 180, 
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start ?? 0 : 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0) : 0;

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div style={{ height: `${totalSize}px`, position: 'relative' }}>
        {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }} />}
        {virtualRows.map(virtualRow => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={row.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
                padding: '0 var(--spacing-4) var(--spacing-4)',
              }}
            >
              {/* FIX: Removed 'columns' prop as it's not needed */}
              <DataCard row={row} visiblePriority={visiblePriority} />
            </div>
          );
        })}
        {paddingBottom > 0 && <div style={{ height: `${paddingBottom}px` }} />}
      </div>
    </div>
  );
};