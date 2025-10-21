// src/features/caseHeader/Tag.tsx
import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  label: string;
  visibility: 'mobile' | 'tablet' | 'desktop';
  color: 'orange' | 'blue' | 'gray';
}

export const Tag: React.FC<TagProps> = ({ label, visibility, color }) => {
  return (
    <span className={`${styles.tag} ${styles[visibility]} ${styles[color]}`}>
      {label}
    </span>
  );
};