// src/features/caseDashboard/TileContentToolbar.tsx
import { SearchInput } from '../../components/SearchInput';
import styles from './TileContentToolbar.module.css';

interface TileContentToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  isMultiTable?: boolean;
  tableTitle?: string;
}

export const TileContentToolbar = ({
  searchValue,
  onSearchChange,
  isMultiTable = false,
  tableTitle,
}: TileContentToolbarProps) => {

  if (isMultiTable) {
    return (
      <div className={`${styles.toolbar} ${styles.multiTableToolbar}`}>
        <h4 className={styles.tableTitle}>{tableTitle}</h4>
        <div className={styles.searchWrapper}>
          <SearchInput value={searchValue} onChange={onSearchChange} placeholder={`Filter ${tableTitle?.toLowerCase()}...`} variant="integrated" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrapper}>
        <SearchInput value={searchValue} onChange={onSearchChange} placeholder="Filter items..." variant="integrated" />
      </div>
      {/* FIX: The view mode toggle has been removed as it's now global in the DashboardCommandBar. */}
    </div>
  );
};