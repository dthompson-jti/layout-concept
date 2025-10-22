// src/features/caseDashboard/ViewContext.tsx
import { createContext, useContext } from 'react';

export type DashboardViewContextType = 'masonry' | 'maximized';

export const ViewContext = createContext<DashboardViewContextType>('masonry');

export const useViewContext = () => useContext(ViewContext);