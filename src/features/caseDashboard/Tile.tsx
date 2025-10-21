// src/features/caseDashboard/Tile.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Import the correct type from dnd-kit
import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { Tooltip } from '../../components/Tooltip';
import styles from './Tile.module.css';

interface TileProps {
  tileId: string;
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  onToggleCollapse: (id: string) => void;
  onMaximize: () => void;
  isEditMode: boolean;
  // FIX: Replace 'any' with the specific type
  dragHandleProps?: DraggableSyntheticListeners;
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
}: TileProps) => {
  const contentVariants = {
    collapsed: { height: 0, opacity: 0, y: -10 },
    expanded: { height: 'auto', opacity: 1, y: 0 },
  };

  return (
    <div className={styles.tileWrapper}>
      <div className={styles.tileHeader}>
        {isEditMode ? (
          <div {...dragHandleProps} className={styles.dragHandle}>
            <span className="material-symbols-rounded">drag_indicator</span>
            <h3>{title}</h3>
          </div>
        ) : (
          <h3>{title}</h3>
        )}

        <div className={styles.tileActions}>
          <Tooltip content={isCollapsed ? 'Expand' : 'Collapse'}>
            <button
              className="btn btn-tertiary icon-only"
              onClick={() => onToggleCollapse(tileId)}
              aria-expanded={!isCollapsed}
              disabled={isEditMode}
            >
              <span className="material-symbols-rounded">
                {isCollapsed ? 'unfold_more' : 'unfold_less'}
              </span>
            </button>
          </Tooltip>
          <Tooltip content="Maximize">
            <button
              className="btn btn-tertiary icon-only"
              onClick={onMaximize}
              disabled={isEditMode}
            >
              <span className="material-symbols-rounded">fullscreen</span>
            </button>
          </Tooltip>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={contentVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.tileBodyWrapper}
          >
            <div className={styles.tileBody}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};