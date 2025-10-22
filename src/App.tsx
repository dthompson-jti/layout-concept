// src/App.tsx
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useScroll, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import { CaseDashboard } from './features/caseDashboard/CaseDashboard';
import styles from './App.module.css';
import { ToastContainer } from './components/ToastContainer';
import { AppHeader } from './features/appHeader/AppHeader';
import { CaseHeader } from './features/caseHeader/CaseHeader';
import { mockCaseData } from './data/caseData';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollContainerRef });

  const headerY = useMotionValue(0);

  const headerUnitRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const measureHeight = () => {
      if (headerUnitRef.current) {
        setHeaderHeight(headerUnitRef.current.offsetHeight);
      }
    };
    measureHeight();
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, []);


  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    const currentY = headerY.get();

    const newY = currentY - diff;
    
    const finalY = clamp(newY, -headerHeight, 0);

    headerY.set(finalY);
  });

  // FIX: Implement direct wheel event handling on the header to enable scroll-through.
  useEffect(() => {
    const headerElement = headerUnitRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!headerElement || !scrollContainer) return;

    const handleWheel = (event: WheelEvent) => {
      // Don't interfere with horizontal scrolling or other special scroll events
      if (event.deltaX !== 0) return;

      // Programmatically scroll the main container
      scrollContainer.scrollTop += event.deltaY;
    };

    headerElement.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      headerElement.removeEventListener('wheel', handleWheel);
    };
  }, []); // Run only once on mount

  return (
    <div ref={scrollContainerRef} className={styles.appContainer}>
      
      <motion.header
        ref={headerUnitRef}
        className={styles.fixedHeaderUnit}
        style={{ y: headerY }}
      >
        <div className={styles.headerContentWrapper}>
          <AppHeader />
          <CaseHeader data={mockCaseData} />
        </div>
      </motion.header>

      <div className={styles.headerSpacer} style={{ height: headerHeight }} />

      <main className={styles.appMain}>
        <CaseDashboard />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;