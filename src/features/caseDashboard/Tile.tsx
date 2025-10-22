// src/features/caseDashboard/Tile.tsx
import React from 'react';
import { useAtomValue } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { Tooltip } from '../../components/Tooltip';
import { DashboardViewMode, tileMetaFamily } from './dashboardState';
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
}: TileProps) => {
  const contentVariants = {
    collapsed: { height: 0, opacity: 0, y: -10 },
    expanded: { height: 'auto', opacity: 1, y: 0 },
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
            <>
              {tileMeta.isUpdated && <div className={styles.updatedBadge}>Updated</div>}
              <h3>{title}</h3>
            </>
          )}
        </div>

        <div className={styles.tileActions}>
          <div className={styles.secondaryActions}>
            <Tooltip content="AI Action (Coming Soon)">
              <button className="btn btn-quaternary icon-only" disabled={isEditMode}>
                <span className="material-symbols-rounded">auto_awesome</span>
              </button>
            </Tooltip>
            <Tooltip content="More Options">
              <button className="btn btn-quaternary icon-only" disabled={isEditMode}>
                <span className="material-symbols-rounded">more_vert</span>
              </button>
            </Tooltip>
            <Tooltip content="Maximize">
              <button className="btn btn-quaternary icon-only" onClick={onMaximize} disabled={isEditMode}>
                <span className="material-symbols-rounded">fullscreen</span>
              </button>
            </Tooltip>
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
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