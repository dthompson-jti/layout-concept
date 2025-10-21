// src/features/caseHeader/Tag.tsx
import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  label: string;
  visibility: 'mobile' | 'tablet' | 'desktop';
  color: 'orange' | 'blue' | 'gray';
  // CHANGE: Replace 'inverted' with a more semantic 'variant' prop.
  variant?: 'default' | 'solid';
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, visibility, color, variant = 'default', className = '' }) => {
  return (
    <span 
      className={`${styles.tag} ${styles[visibility]} ${className}`}
      // CHANGE: Use data attributes for both color and variant for clean CSS targeting.
      data-color={color}
      data-variant={variant}
    >
      {label}
    </span>
  );
};