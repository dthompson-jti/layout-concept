// src/App.tsx
import { useRef } from 'react';
import { useAtom } from 'jotai';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { CaseDashboard } from './features/caseDashboard/CaseDashboard';
import styles from './App.module.css';
import { ToastContainer } from './components/ToastContainer';
import { AppHeader } from './features/appHeader/AppHeader';
import { headerVisibilityAtom } from './features/caseDashboard/dashboardState';

function App() {
  // CHANGE: Use useAtom to get both the value and the setter.
  const [isHeaderVisible, setHeaderVisible] = useAtom(headerVisibilityAtom);
  const mainRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll({ container: mainRef });

  // FIX: Implement more robust, state-aware logic for showing/hiding the header.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // At the very top of the page, always show the header.
    if (latest < 100) {
      if (!isHeaderVisible) setHeaderVisible(true);
      return;
    }

    // If scrolling down and the header is currently visible, hide it.
    if (diff > 0 && isHeaderVisible) {
      setHeaderVisible(false);
    } 
    // If scrolling up and the header is currently hidden, show it.
    else if (diff < 0 && !isHeaderVisible) {
      setHeaderVisible(true);
    }
  });

  return (
    <div className={styles.appContainer}>
      <AppHeader />
      <main ref={mainRef} className={styles.appMain}>
        <CaseDashboard />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;