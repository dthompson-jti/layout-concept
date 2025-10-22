// src/features/caseDashboard/TileContentToolbar.tsx
import { IconToggleGroup } from '../../components/IconToggleGroup';
import { SearchInput } from '../../components/SearchInput';
// FIX: Import the type for the view mode.
import { TileContentViewMode } from './dashboardState';
import styles from './TileContentToolbar.module.css';

interface TileContentToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  isMultiTable?: boolean;
  tableTitle?: string;
  // FIX: Add props to support the view mode toggle.
  viewMode?: TileContentViewMode;
  onViewModeChange?: (mode: TileContentViewMode) => void;
  showToggle?: boolean;
}

export const TileContentToolbar = ({
  searchValue,
  onSearchChange,
  isMultiTable = false,
  tableTitle,
  // FIX: Destructure new props.
  viewMode,
  onViewModeChange,
  showToggle = false, // Default to false
}: TileContentToolbarProps) => {

  const viewToggleOptions = [
    { value: 'table', label: 'Table View', icon: 'data_table' },
    { value: 'cards', label: 'Card View', icon: 'view_agenda' },
  ];

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
      {/* FIX: Conditionally render the toggle based on the showToggle prop. */}
      {showToggle && onViewModeChange && viewMode && (
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