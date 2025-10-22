// src/features/caseDashboard/hooks/useScrollSpy.ts
import { useState, useEffect, useRef, RefObject } from 'react';

// FIX: Update options to Omit 'root' to prevent passing a ref's .current value from the render phase.
// The root will be derived from the scrollContainerRef inside the hook's effect.
export const useScrollSpy = (
  elementIds: string[],
  options: Omit<IntersectionObserverInit, 'root'>,
  scrollContainerRef: RefObject<HTMLElement | null>
): string => {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);
  const isAtBottom = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    const elements = elementIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      if (scrollHeight - scrollTop - clientHeight < 1) {
        if (!isAtBottom.current) {
          isAtBottom.current = true;
          setActiveId(elementIds[elementIds.length - 1]);
        }
      } else {
        isAtBottom.current = false;
      }
    };
    
    // FIX: Construct the final options object inside the effect to safely access the ref's current value.
    const observerOptions = {
      ...options,
      root: scrollContainer,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (isAtBottom.current) return;

      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(intersectingEntries[0].target.id);
      }
    }, observerOptions);

    elements.forEach(el => observer.current?.observe(el));
    scrollContainer.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      observer.current?.disconnect();
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  // FIX: The options object is now a dependency, but it should be stable if wrapped in useMemo in the parent.
  }, [elementIds, options, scrollContainerRef]);

  return activeId;
};