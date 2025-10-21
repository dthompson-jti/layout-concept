// src/components/Badge.tsx
import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  // FIX: Replaced 'warning' with 'error' to match the new CSS variant.
  variant: 'success' | 'error' | 'neutral';
  size?: 'small' | 'large';
  className?: string;
  showStatusDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant, size = 'small', className = '', showStatusDot = false }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {showStatusDot && <span className={styles.statusDot}></span>}
      {children}
    </span>
  );
};