// src/features/caseDashboard/DataCard.tsx
import { flexRender, Row, Column, ColumnDef } from '@tanstack/react-table';
import { MenuAction } from '../../data/caseDetailData';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from '../../components/Menu';
import { useViewContext } from './ViewContext';
import styles from './DataCard.module.css';

interface DataCardProps<T extends object> {
  row: Row<T>;
  menuActions: (string | MenuAction)[];
}

const getMeta = <T extends object>(colDef: ColumnDef<T>) => colDef.meta as { cardRole?: string } | undefined;

export const DataCard = <T extends object>({ row, menuActions }: DataCardProps<T>) => {
  const visibleCells = row.getVisibleCells();
  const viewContext = useViewContext();

  const renderField = (col: Column<T>) => {
    const cell = visibleCells.find(c => c.column.id === col.id);
    if (!cell) return null;
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

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
        {titleCol && <h4 className={`${styles.title} text-as-link`}>{renderField(titleCol)}</h4>}
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
        {/* NEW: Conditionally render menu in maximized view */}
        {viewContext === 'maximized' && (
          <MenuRoot>
            <MenuTrigger asChild>
              <button className="btn btn-tertiary icon-only">
                <span className="material-symbols-rounded">more_horiz</span>
              </button>
            </MenuTrigger>
            <MenuContent>
              {menuActions.map((action, index) => {
                const label = typeof action === 'string' ? action : action.label;
                const hasSubmenu = typeof action !== 'string' && action.submenu;
                return (
                  <MenuItem key={`${label}-${index}`} className="menu-item">
                    {label}
                    {hasSubmenu && <span className="material-symbols-rounded" style={{ marginLeft: 'auto' }}>chevron_right</span>}
                  </MenuItem>
                );
              })}
            </MenuContent>
          </MenuRoot>
        )}
      </div>
    </div>
  );
};