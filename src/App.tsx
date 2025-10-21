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
  const [isHeaderVisible, setHeaderVisible] = useAtom(headerVisibilityAtom);
  // DEBUGGING: Create a ref for the scrollable container.
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // DEBUGGING: Pass the container ref to the useScroll hook to ensure it's
  // listening to the correct element, not the window.
  const { scrollY } = useScroll({ container: scrollContainerRef });

  useMotionValueEvent(scrollY, "change", (latest) => {
    // DEBUGGING: This log is the most critical piece of evidence.
    // If it appears in the console, we know the hook is correctly detecting scroll events.
    console.log('Scroll event fired. Value:', latest);

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // In a "safe zone" at the top, always show the header.
    if (latest < 100) {
      if (!isHeaderVisible) setHeaderVisible(true);
      return;
    }

    // When scrolling down, if the header is visible, hide it.
    if (diff > 0 && isHeaderVisible) {
      setHeaderVisible(false);
    } 
    // When scrolling up, if the header is hidden, show it.
    else if (diff < 0 && !isHeaderVisible) {
      setHeaderVisible(true);
    }
  });

  return (
    // DEBUGGING: Attach the ref to the div that has `overflow-y: auto`.
    <div ref={scrollContainerRef} className={styles.appContainer}>
      <AppHeader />
      <main className={styles.appMain}>
        <CaseDashboard />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;