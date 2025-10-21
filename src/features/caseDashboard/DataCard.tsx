// src/features/caseDashboard/DataCard.tsx
import { flexRender, Row, Column } from '@tanstack/react-table';
import styles from './DataCard.module.css';

interface DataCardProps<T extends object> {
  row: Row<T>;
  visiblePriority: number;
}

const getMeta = <T extends object>(col: Column<T>) => col.columnDef.meta;

export const DataCard = <T extends object>({ row, visiblePriority }: DataCardProps<T>) => {
  const instantiatedColumns = row.getVisibleCells().map(cell => cell.column);

  const visibleColumns = instantiatedColumns.filter(col => {
    const meta = getMeta(col);
    // FIX: This check is now type-safe because of our new declaration file.
    // TypeScript knows `priority` is a valid (and optional) number property.
    return meta?.priority && meta.priority <= visiblePriority;
  });

  const renderField = (col: Column<T>) => {
    const cell = row.getVisibleCells().find(c => c.column.id === col.id);
    if (!cell) return null;
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  // FIX: All accesses to `meta.cardRole` are now type-safe.
  const titleCol = visibleColumns.find(c => getMeta(c)?.cardRole === 'title');
  const subtitleCol = visibleColumns.find(c => getMeta(c)?.cardRole === 'subtitle');
  const badgeCol = visibleColumns.find(c => getMeta(c)?.cardRole === 'badge');
  const metaCols = visibleColumns.filter(c => {
    const meta = getMeta(c);
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