// src/features/caseDashboard/CaseDashboard.tsx
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { createPortal } from 'react-dom';
import Masonry from 'react-masonry-css';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';

import { TILE_COMPONENT_MAP } from './TileRegistry';
import { userLayoutAtom, isEditModeAtom, TileConfig, maximizedTileAtom, activeDragIdAtom, dashboardViewModeAtom, DashboardViewMode } from './dashboardState';
import { caseDetailDataMap, MenuAction } from '../../data/caseDetailData';
import { Tile } from './Tile';
import { HiddenTilesTray } from './HiddenTilesTray';
import { DashboardCommandBar } from './DashboardCommandBar';
import { EditModeActions } from './EditModeActions';
import { ViewContext } from './ViewContext';
import styles from './CaseDashboard.module.css';

interface SortableTileProps {
  tile: TileConfig;
  isEditMode: boolean;
  viewMode: DashboardViewMode;
  onToggleCollapse: (id: string) => void;
  onMaximize: (tile: TileConfig) => void;
}

const SortableTile = ({ tile, isEditMode, viewMode, onToggleCollapse, onMaximize }: SortableTileProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tile.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 100 : 'auto' };
  const TileContent = TILE_COMPONENT_MAP[tile.componentKey];
  
  if (!TileContent) {
    return <div>Error: Unknown tile component '{tile.componentKey}'</div>;
  }
  
  const isCollapsed = viewMode === 'list' ? false : tile.isCollapsed;
  const menuActions: (string | MenuAction)[] = caseDetailDataMap.get(tile.id)?.menu.actions || [];

  return (
    <motion.div
      // DEFINITIVE FIX: Change `layout` to `layout="position"`.
      // This tells Framer Motion to ONLY animate position changes (like for DnD)
      // and to IGNORE size changes. The size animation will now be handled
      // exclusively by the AnimatePresence block inside the Tile component,
      // which uses the correct non-springy ease curve. This resolves the conflict.
      layout="position"
      layoutId={`tile-container-${tile.id}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <Tile
        tileId={tile.id}
        title={tile.title}
        isCollapsed={isCollapsed}
        onMaximize={() => onMaximize(tile)}
        dragHandleProps={listeners}
        isEditMode={isEditMode}
        viewMode={viewMode}
        onToggleCollapse={onToggleCollapse}
        menuActions={menuActions}
      >
        <TileContent tileId={tile.id} menuActions={menuActions} />
      </Tile>
    </motion.div>
  );
};

export const CaseDashboard = () => {
  const [layout, setLayout] = useAtom(userLayoutAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const [activeId, setActiveId] = useAtom(activeDragIdAtom);
  const [maximizedTile, setMaximizedTile] = useAtom(maximizedTileAtom);
  const [viewMode] = useAtom(dashboardViewModeAtom);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const visibleTiles = useMemo(() => layout.filter((t: TileConfig) => !t.isHidden), [layout]);
  const hiddenTiles = useMemo(() => layout.filter((t: TileConfig) => t.isHidden), [layout]);
  const activeTile = useMemo(() => layout.find((t: TileConfig) => t.id === activeId), [activeId, layout]);

  const handleToggleCollapse = (id: string) => {
    if (isEditMode) return;
    setLayout((prev) => prev.map((tile) => tile.id === id ? { ...tile, isCollapsed: !tile.isCollapsed } : tile));
  };

  const handleDragStart = (event: DragStartEvent) => setActiveId(String(event.active.id));
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLayout((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const masonryBreakpoints = { default: 3, 1280: 2, 768: 1 };
  const MaximizedContent = maximizedTile ? TILE_COMPONENT_MAP[maximizedTile.componentKey] : null;
  const maximizedMenuActions: (string | MenuAction)[] = maximizedTile ? caseDetailDataMap.get(maximizedTile.id)?.menu.actions || [] : [];

  const tilesToRender = visibleTiles.map(tile => (
    <SortableTile
      key={tile.id}
      tile={tile}
      isEditMode={isEditMode}
      viewMode={viewMode}
      onToggleCollapse={handleToggleCollapse}
      onMaximize={setMaximizedTile}
    />
  ));

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.dashboardContainer}>
        <AnimatePresence>
          {isEditMode && (
            <div className={styles.editModeActionsWrapper}>
              <EditModeActions onSave={() => setIsEditMode(false)} />
            </div>
          )}
        </AnimatePresence>
        
        <DashboardCommandBar />

        <div className={styles.contentArea}>
          <SortableContext items={visibleTiles.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {viewMode === 'grid' ? (
              <Masonry breakpointCols={masonryBreakpoints} className={styles.masonryGrid} columnClassName={styles.masonryGridColumn}>
                {tilesToRender}
              </Masonry>
            ) : (
              <div className={styles.listViewContainer}>
                {tilesToRender}
              </div>
            )}
          </SortableContext>
        </div>
        
        <DragOverlay dropAnimation={null}>
          {activeTile && (
            <Tile tileId={activeTile.id} title={activeTile.title} isCollapsed={false} onToggleCollapse={() => {}} onMaximize={() => {}} isEditMode={true} menuActions={[]}>
              <div style={{ height: '100px', width: '100%' }} />
            </Tile>
          )}
        </DragOverlay>

        <HiddenTilesTray hiddenTiles={hiddenTiles} onUnhide={(id: string) => setLayout(prev => prev.map(t => t.id === id ? { ...t, isHidden: false } : t))} />
      </div>

      {createPortal(
        <AnimatePresence>
          {maximizedTile && MaximizedContent && (
            <motion.div
              className={styles.modalBackdrop}
              initial={{ backgroundColor: 'rgba(10, 12, 18, 0)' }}
              animate={{ backgroundColor: 'rgba(10, 12, 18, 0.7)' }}
              exit={{ backgroundColor: 'rgba(10, 12, 18, 0)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className={styles.modalContentWrapper} layoutId={`tile-container-${maximizedTile.id}`}>
                <div className={styles.modalHeader}>
                  <h2>{maximizedTile.title}</h2>
                  <button className="btn btn-tertiary icon-only" onClick={() => setMaximizedTile(null)}>
                    <span className="material-symbols-rounded">close</span>
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <ViewContext.Provider value="maximized">
                    <MaximizedContent tileId={maximizedTile.id} menuActions={maximizedMenuActions} />
                  </ViewContext.Provider>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </DndContext>
  );
};