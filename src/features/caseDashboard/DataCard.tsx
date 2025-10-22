// src/features/caseDashboard/DataCard.tsx
import { flexRender, Row, Column, ColumnDef } from '@tanstack/react-table';
import styles from './DataCard.module.css';

interface DataCardProps<T extends object> {
  row: Row<T>;
}

// Helper to safely get meta from a column definition
const getMeta = <T extends object>(colDef: ColumnDef<T>) => colDef.meta as { cardRole?: string } | undefined;

export const DataCard = <T extends object>({ row }: DataCardProps<T>) => {
  const visibleCells = row.getVisibleCells();

  const renderField = (col: Column<T>) => {
    const cell = visibleCells.find(c => c.column.id === col.id);
    if (!cell) return null;
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  // Find columns based on the meta property in their definitions
  const titleCol = visibleCells.map(c => c.column).find(c => getMeta(c.columnDef)?.cardRole === 'title');
  const subtitleCol = visibleCells.map(c => c.column).find(c => getMeta(c.columnDef)?.cardRole === 'subtitle');
  const badgeCol = visibleCells.map(c => c.column).find(c => getMeta(c.columnDef)?.cardRole === 'badge');
  const metaCols = visibleCells.map(c => c.column).filter(c => {
    const meta = getMeta(c.columnDef);
    return !meta?.cardRole || meta.cardRole === 'meta';
  });

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {titleCol && <h4 className={styles.title}>{renderField(titleCol)}</h4>}
        {badgeCol && <div className={styles.badge}>{renderField(badgeCol)}</div>}
      </div>

      {subtitleCol && <p className={styles.subtitle}>{renderField(subtitleCol)}</p>}

      {metaCols.length > 0 && (
        <div className={styles.metaGrid}>
          {metaCols.map(col => (
            <div key={col.id} className={styles.metaItem}>
              <span className={styles.metaKey}>{col.columnDef.header as string}</span>
              <span className={styles.metaValue}>{renderField(col)}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className={styles.cardActions}>
        {/* Inline action buttons will go here */}
      </div>
    </div>
  );
};