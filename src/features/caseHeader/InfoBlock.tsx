// src/features/caseHeader/InfoBlock.tsx
import React from 'react';
import styles from './InfoBlock.module.css';

// This interface defines the props for our component
interface InfoBlockProps {
  label: string;
  icon?: string;
  children: React.ReactNode;
}

// FIX: Re-establishing the component with a clear named export.
// This ensures it can be imported correctly with `import { InfoBlock } from './InfoBlock';`
export const InfoBlock: React.FC<InfoBlockProps> = ({ label, icon, children }) => {
  // Render inline style if an icon is provided
  if (icon) {
    return (
      <div className={`${styles.infoBlock} ${styles.inline}`}>
        <span className="material-symbols-rounded">{icon}</span>
        <p>{children}</p>
      </div>
    );
  }

  // Render stacked style by default
  return (
    <div className={`${styles.infoBlock} ${styles.stacked}`}>
      <label>{label}</label>
      <div>{children}</div>
    </div>
  );
};