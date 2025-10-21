// src/features/caseHeader/Tag.tsx
import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  label: string;
  visibility: 'mobile' | 'tablet' | 'desktop';
  color: 'orange' | 'blue' | 'gray';
  // CHANGE: Added optional props for new styles
  inverted?: boolean;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, visibility, color, inverted = false, className = '' }) => {
  return (
    <span 
      className={`${styles.tag} ${styles[visibility]} ${styles[color]} ${className}`}
      // CHANGE: Use a data attribute to apply inverted styles conditionally
      data-inverted={inverted}
    >
      {label}
    </span>
  );
};