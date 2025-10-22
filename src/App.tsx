// src/App.tsx
import { useRef, useState, useLayoutEffect } from 'react';
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

  return (
    <div ref={scrollContainerRef} className={styles.appContainer}>
      
      <motion.header
        ref={headerUnitRef}
        className={styles.fixedHeaderUnit}
        style={{ y: headerY }}
      >
        {/* FIX: Add a wrapper div to re-enable pointer events on the content,
            while the parent container lets scroll events pass through. */}
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