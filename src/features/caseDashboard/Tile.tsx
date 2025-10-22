// src/features/caseDashboard/Tile.tsx
import React from 'react';
import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { Badge } from '../../components/Badge';
import { Tooltip } from '../../components/Tooltip';
import { DashboardViewMode, tileMetaFamily } from './dashboardState';
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from '../../components/Menu';
import { MenuAction } from '../../data/caseDetailData';
import styles from './Tile.module.css';

interface TileProps {
  tileId: string;
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  onToggleCollapse: (id: string) => void;
  onMaximize: () => void;
  isEditMode: boolean;
  dragHandleProps?: DraggableSyntheticListeners;
  viewMode?: DashboardViewMode;
  menuActions: (string | MenuAction)[];
}

export const Tile = ({
  tileId,
  title,
  children,
  isCollapsed,
  onToggleCollapse,
  onMaximize,
  isEditMode,
  dragHandleProps,
  viewMode = 'grid',
  menuActions,
}: TileProps) => {
  // FIX: Removed the `y` animation to prevent the "bouncing" effect.
  // The animation will now be a simple, clean vertical expansion.
  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
  };

  const tileMeta = useAtomValue(tileMetaFamily(tileId));

  const summaryText =
    tileMeta.count !== undefined ? `${tileMeta.count.toLocaleString()} items` : '';

  return (
    <div className={styles.tileWrapper} data-view-mode={viewMode} data-collapsed={isCollapsed}>
      <div className={styles.tileHeader}>
        <div className={styles.headerLeft}>
          {isEditMode ? (
            <div {...dragHandleProps} className={styles.dragHandle}>
              <span className="material-symbols-rounded">drag_indicator</span>
              <h3>{title}</h3>
            </div>
          ) : (
            <div className={styles.titleGroup}>
              <h3>{title}</h3>
              {tileMeta.isUpdated && <Badge variant="info">Updated</Badge>}
            </div>
          )}
        </div>

        <div className={styles.tileActions}>
          <div className={styles.secondaryActions}>
            <Tooltip content="Maximize">
              <button className="btn btn-quaternary icon-only" onClick={onMaximize} disabled={isEditMode}>
                <span className="material-symbols-rounded">fullscreen</span>
              </button>
            </Tooltip>
            <MenuRoot>
              <Tooltip content="More Options">
                <MenuTrigger asChild>
                  <button className="btn btn-quaternary icon-only" disabled={isEditMode}>
                    <span className="material-symbols-rounded">more_horiz</span>
                  </button>
                </MenuTrigger>
              </Tooltip>
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
          </div>
          <Tooltip content={isCollapsed ? 'Expand' : 'Collapse'}>
            <button
              className={`btn btn-quaternary icon-only ${styles.collapseButton}`}
              onClick={() => onToggleCollapse(tileId)}
              aria-expanded={!isCollapsed}
              disabled={isEditMode}
            >
              <span className="material-symbols-rounded">expand_more</span>
            </button>
          </Tooltip>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {!isCollapsed ? (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={contentVariants}
            // FIX: Use a gentler, non-springy easing curve for a more natural feel.
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={styles.tileBodyWrapper}
          >
            <div className={styles.tileBody}>{children}</div>
          </motion.div>
        ) : (
          <div className={styles.collapsedSummary}>{summaryText}</div>
        )}
      </AnimatePresence>
    </div>
  );
};