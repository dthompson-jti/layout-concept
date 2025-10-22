// src/components/Badge.tsx
import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  // FIX: Added 'info' variant to support new UI requirements.
  variant: 'success' | 'error' | 'neutral' | 'info';
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