// src/components/Badge.tsx
import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'warning' | 'neutral';
  size?: 'small' | 'large';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant, size = 'small', className = '' }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {children}
    </span>
  );
};