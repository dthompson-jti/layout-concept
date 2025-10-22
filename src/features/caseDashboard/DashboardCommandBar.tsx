// src/features/caseDashboard/DashboardCommandBar.tsx
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { isEditModeAtom, globalViewModeAtom, GlobalViewMode } from './dashboardState';
import { IconToggleGroup } from '../../components/IconToggleGroup';
import { Tooltip } from '../../components/Tooltip';
// FIX: Import MenuSeparator component.
import { MenuRoot, MenuTrigger, MenuContent, MenuItem, MenuSeparator } from '../../components/Menu';
import styles from './DashboardCommandBar.module.css';

// A simple hook to detect screen size, kept within this file.
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};


export const DashboardCommandBar = () => {
  const [promptText, setPromptText] = useState('');
  const [viewMode, setViewMode] = useAtom(globalViewModeAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const desktopViewToggleOptions = [
    { value: 'list', label: 'List View', icon: 'view_headline' },
    { value: 'masonry-cards', label: 'Grid View (Cards)', icon: 'dashboard' },
    { value: 'masonry-table', label: 'Grid View (Tables)', icon: 'data_table' },
  ];

  const mobileViewToggleOptions = [
    { value: 'masonry-cards', label: 'Card View', icon: 'dashboard' },
    { value: 'masonry-table', label: 'Table View', icon: 'data_table' },
  ];
  
  const currentOptions = isMobile ? mobileViewToggleOptions : desktopViewToggleOptions;

  useEffect(() => {
    if (isMobile && viewMode === 'list') {
      setViewMode('masonry-cards');
    }
  }, [isMobile, viewMode, setViewMode]);


  const handleMenuSelect = (action: () => void) => {
    action();
  };

  // FIX: Reorder menu items and update text as requested.
  const moreMenu = (
    <>
      <MenuItem className="menu-item" onSelect={() => handleMenuSelect(() => setIsEditMode(p => !p))}>
        <span className="material-symbols-rounded">edit</span>
        {isEditMode ? 'Done Personalizing' : 'Personalize Layout'}
      </MenuItem>
      <MenuItem className="menu-item" onSelect={() => handleMenuSelect(() => {})}>
        <span className="material-symbols-rounded">save</span>
        Update layout profile
      </MenuItem>
      <MenuSeparator className="menu-separator" />
      <MenuItem className="menu-item" onSelect={() => handleMenuSelect(() => {})}>
        <span className="material-symbols-rounded">capture</span>
        Edit in Screen Studio
      </MenuItem>
    </>
  );

  return (
    <div className={styles.commandBar}>
      <div className={styles.aiPromptWrapper}>
        <button className={`${styles.promptButton} ${styles.attachButton}`} aria-label="Attach file">
          <span className="material-symbols-rounded">add</span>
        </button>
        <input
          type="text"
          className={styles.promptInput}
          placeholder="Start typing a prompt"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          size={1} 
        />
        <button
          className={`btn btn-secondary ${styles.submitButton}`}
          aria-label="Submit prompt"
          disabled={!promptText}
        >
          <span className="material-symbols-rounded">arrow_upward</span>
        </button>
      </div>

      <div className={styles.viewControls}>
        <div className={styles.toggleWrapper}>
          <IconToggleGroup
            options={currentOptions}
            value={viewMode}
            onValueChange={(value) => {
              if (value) setViewMode(value as GlobalViewMode)
            }}
          />
        </div>
        <MenuRoot>
          <Tooltip content="More Options">
            <MenuTrigger asChild>
              <button className="btn btn-secondary icon-only">
                <span className="material-symbols-rounded">more_horiz</span>
              </button>
            </MenuTrigger>
          </Tooltip>
          <MenuContent>{moreMenu}</MenuContent>
        </MenuRoot>
      </div>
    </div>
  );
};