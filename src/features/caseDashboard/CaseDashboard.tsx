// src/features/caseDashboard/CaseDashboard.tsx
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
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
import { Tile } from './Tile';
import { EditModeOverlay } from './EditModeOverlay';
import { HiddenTilesTray } from './HiddenTilesTray';
import { DashboardCommandBar } from './DashboardCommandBar';
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
  const TileContent = TILE_COMPONENT_MAP[tile.componentKey] || TILE_COMPONENT_MAP.Default;
  const title = tile.componentKey.replace(/([A-Z])/g, ' $1').trim();
  
  const [headerControls, setHeaderControls] = useState<React.ReactNode>(null);

  const isCollapsed = viewMode === 'list' ? false : tile.isCollapsed;

  return (
    <motion.div layoutId={`tile-container-${tile.id}`} ref={setNodeRef} style={style} {...attributes}>
      <Tile
        tileId={tile.id}
        title={title}
        isCollapsed={isCollapsed}
        onMaximize={() => onMaximize(tile)}
        dragHandleProps={listeners}
        headerControls={headerControls}
        isEditMode={isEditMode}
        viewMode={viewMode}
        onToggleCollapse={onToggleCollapse}
      >
        <TileContent tileId={tile.id} setHeaderControls={setHeaderControls} />
      </Tile>
    </motion.div>
  );
};

export const CaseDashboard = () => {
  const [layout, setLayout] = useAtom(userLayoutAtom);
  const [isEditMode] = useAtom(isEditModeAtom);
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
        <EditModeOverlay isEditMode={isEditMode} onExitEditMode={() => { /* Placeholder */ }} />
        
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
            <Tile tileId={activeTile.id} title={activeTile.componentKey.replace(/([A-Z])/g, ' $1').trim()} isCollapsed={false} onToggleCollapse={() => {}} onMaximize={() => {}} isEditMode={true}>
              <div style={{ height: '100px', width: '100%' }} />
            </Tile>
          )}
        </DragOverlay>

        <HiddenTilesTray hiddenTiles={hiddenTiles} onUnhide={(id: string) => setLayout(prev => prev.map(t => t.id === id ? { ...t, isHidden: false } : t))} />
      </div>

      <AnimatePresence>
        {maximizedTile && MaximizedContent && (
          <motion.div className={styles.modalBackdrop}>
            <motion.div className={styles.modalContentWrapper} layoutId={`tile-container-${maximizedTile.id}`}>
              <div className={styles.modalHeader}>
                <h2>{maximizedTile.componentKey.replace(/([A-Z])/g, ' $1').trim()}</h2>
                <button className="btn btn-tertiary icon-only" onClick={() => setMaximizedTile(null)}>
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
              <div className={styles.modalBody}>
                <MaximizedContent tileId={maximizedTile.id} setHeaderControls={() => {}} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DndContext>
  );
};