// src/features/caseDashboard/TilePlaceholder.tsx
import React from 'react';
import { TileComponentProps } from './dashboardState';

const placeholderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '150px',
  color: 'var(--surface-fg-secondary)',
  backgroundColor: 'var(--surface-bg-secondary)',
  borderRadius: 'var(--spacing-2)',
  margin: 'var(--spacing-4)',
  border: '1px dashed var(--surface-border-secondary)',
};

interface TilePlaceholderProps extends TileComponentProps {
  title: string;
}

export const TilePlaceholder = ({ title }: TilePlaceholderProps) => {
  return <div style={placeholderStyle}>{title} - Coming Soon</div>;
};