// src/App.tsx
import { useRef, useState, useLayoutEffect } from 'react';
import { useScroll, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import { CaseDashboard } from './features/caseDashboard/CaseDashboard';
import styles from './App.module.css';
import { ToastContainer } from './components/ToastContainer';
import { AppHeader } from './features/appHeader/AppHeader';
// NEW: Import CaseHeader here to create the single unit
import { CaseHeader } from './features/caseHeader/CaseHeader';
import { mockCaseData } from './data/caseData';

// NEW: Define total header height for clamping logic
const TOTAL_HEADER_HEIGHT = 64 + 310; // AppHeader + estimated CaseHeader height

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollContainerRef });

  const headerY = useMotionValue(0);

  // NEW: Add a ref and state to dynamically measure the header unit's height
  const headerUnitRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // This effect measures the combined header height and sets it on the spacer
  useLayoutEffect(() => {
    const measureHeight = () => {
      if (headerUnitRef.current) {
        setHeaderHeight(headerUnitRef.current.offsetHeight);
      }
    };
    measureHeight();
    // Re-measure on window resize
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, []);


  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    const currentY = headerY.get();

    let newY = currentY - diff;
    
    // Clamp the value based on the measured height
    const finalY = clamp(newY, -headerHeight, 0);

    headerY.set(finalY);
  });

  return (
    <div ref={scrollContainerRef} className={styles.appContainer}>
      
      {/* NEW: This is the single animated unit, positioned fixed */}
      <motion.header
        ref={headerUnitRef}
        className={styles.fixedHeaderUnit}
        style={{ y: headerY }}
      >
        <AppHeader />
        <CaseHeader data={mockCaseData} />
      </motion.header>

      {/* NEW: This spacer div pushes the content down by the correct amount */}
      <div className={styles.headerSpacer} style={{ height: headerHeight }} />

      <main className={styles.appMain}>
        <CaseDashboard />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;