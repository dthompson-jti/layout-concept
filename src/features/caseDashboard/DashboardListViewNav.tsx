// src/features/caseDashboard/DashboardListViewNav.tsx
import React from 'react';
import { useAtomValue } from 'jotai';
import { TileConfig, tileMetaFamily } from './dashboardState';
import styles from './DashboardListViewNav.module.css';

interface NavItemProps {
  tile: TileConfig;
  isActive: boolean;
  onClick: (tileId: string) => void;
}

// Sub-component to access atom state for each tile individually
const NavItem = ({ tile, isActive, onClick }: NavItemProps) => {
  const meta = useAtomValue(tileMetaFamily(tile.id));
  
  return (
    <li>
      <a
        className={isActive ? styles.active : ''}
        onClick={() => onClick(tile.id)}
      >
        {meta.isUpdated && <span className={styles.updateDot} title="Updated" />}
        <span className={styles.navLabel}>{tile.title}</span>
      </a>
    </li>
  );
};


interface DashboardListViewNavProps {
  tiles: TileConfig[];
  activeTileId: string;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  headerHeight: number;
}

export const DashboardListViewNav = ({ tiles, activeTileId, scrollContainerRef, headerHeight }: DashboardListViewNavProps) => {

  const handleNavClick = (tileId: string) => {
    const container = scrollContainerRef.current;
    const element = document.getElementById(tileId);

    if (container && element instanceof HTMLElement) {
      const buffer = 24; // Space below the sticky header
      const targetScrollTop = element.offsetTop - headerHeight - buffer;

      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        {tiles.map((tile) => (
          <NavItem
            key={tile.id}
            tile={tile}
            isActive={activeTileId === tile.id}
            onClick={handleNavClick}
          />
        ))}
      </ul>
    </nav>
  );
};