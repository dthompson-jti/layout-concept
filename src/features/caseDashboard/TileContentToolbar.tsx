// src/features/caseDashboard/TileContentToolbar.tsx
import { IconToggleGroup } from '../../components/IconToggleGroup';
import { SearchInput } from '../../components/SearchInput';
import { TileContentViewMode } from './dashboardState';
import styles from './TileContentToolbar.module.css';

interface TileContentToolbarProps {
  viewMode?: TileContentViewMode;
  onViewModeChange?: (mode: TileContentViewMode) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  isMultiTable?: boolean;
  tableTitle?: string;
  // FIX: Add prop to conditionally show/hide the search input.
  showSearch?: boolean;
}

export const TileContentToolbar = ({
  viewMode,
  onViewModeChange,
  searchValue,
  onSearchChange,
  isMultiTable = false,
  tableTitle,
  showSearch = true, // Default to true
}: TileContentToolbarProps) => {

  const viewToggleOptions = [
    { value: 'table', label: 'Table View', icon: 'data_table' },
    { value: 'cards', label: 'Card View', icon: 'view_agenda' },
  ];

  if (isMultiTable) {
    return (
      <div className={`${styles.toolbar} ${styles.multiTableToolbar}`}>
        <h4 className={styles.tableTitle}>{tableTitle}</h4>
        {showSearch && (
          <div className={styles.searchWrapper}>
            <SearchInput value={searchValue} onChange={onSearchChange} placeholder={`Filter ${tableTitle?.toLowerCase()}...`} variant="integrated" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.toolbar}>
      {showSearch && (
        <div className={styles.searchWrapper}>
          <SearchInput value={searchValue} onChange={onSearchChange} placeholder="Filter items..." variant="integrated" />
        </div>
      )}
      {onViewModeChange && viewMode && (
        // FIX: Add a class to style the compact toggle group.
        <div className={styles.viewToggleWrapper}>
          <IconToggleGroup
            options={viewToggleOptions}
            value={viewMode}
            onValueChange={(value) => onViewModeChange(value as TileContentViewMode)}
          />
        </div>
      )}
    </div>
  );
};