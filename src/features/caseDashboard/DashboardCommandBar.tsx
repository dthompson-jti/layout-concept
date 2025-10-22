// src/features/caseDashboard/DashboardCommandBar.tsx
import { useState } from 'react';
import { useAtom } from 'jotai';
import { dashboardViewModeAtom, isEditModeAtom, DashboardViewMode } from './dashboardState';
import { IconToggleGroup } from '../../components/IconToggleGroup';
import { Tooltip } from '../../components/Tooltip';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from '../../components/Menu';
import styles from './DashboardCommandBar.module.css';

export const DashboardCommandBar = () => {
  const [promptText, setPromptText] = useState('');
  const [viewMode, setViewMode] = useAtom(dashboardViewModeAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const viewToggleOptions = [
    { value: 'grid', label: 'Grid View', icon: 'dashboard' },
    { value: 'list', label: 'List View', icon: 'view_headline' },
  ];

  const handleMenuSelect = (action: () => void) => {
    action();
    setIsMenuOpen(false); // Force close on select
  };

  const moreMenu = (
    <>
      <MenuItem className="menu-item" onSelect={() => handleMenuSelect(() => {})}>
        <span className="material-symbols-rounded">save</span>
        Update layout profile
      </MenuItem>
      <MenuItem className="menu-item" onSelect={() => handleMenuSelect(() => {})}>
        <span className="material-symbols-rounded">capture</span>
        Edit in Screen Studio
      </MenuItem>
      <MenuItem className="menu-item" onSelect={() => handleMenuSelect(() => setIsEditMode(p => !p))}>
        <span className="material-symbols-rounded">edit</span>
        {isEditMode ? 'Done Editing' : 'Edit Layout'}
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
            options={viewToggleOptions}
            value={viewMode}
            onValueChange={(value) => setViewMode(value as DashboardViewMode)}
          />
        </div>
        <MenuRoot open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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