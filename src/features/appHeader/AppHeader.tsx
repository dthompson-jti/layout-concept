// src/features/appHeader/AppHeader.tsx
import { useState, useEffect } from 'react';
import { Tooltip } from '../../components/Tooltip';
import { Select, SelectItem } from '../../components/Select';
// FIX: Removed unused CaseInfo import
import { mockUser, mockCaseList, mockLanguages, Language } from '../../data/appHeaderData';
import styles from './AppHeader.module.css';

const ActionButton = ({ icon, label }: { icon: string; label: string }) => (
  <Tooltip content={label}>
    <button className={styles.actionButton} aria-label={label}>
      <span className="material-symbols-rounded">{icon}</span>
    </button>
  </Tooltip>
);

export const AppHeader = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [currentLanguage, setCurrentLanguage] = useState(mockLanguages[0].value);

  const currentCase = mockCaseList[0];
  const currentDate = new Date().toLocaleDateString('EN-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const headerContent = isMobile ? (
    <>
      <div className={styles.leftGroup}>
        <button className={styles.actionButton} aria-label="Open menu">
          <span className="material-symbols-rounded">menu</span>
        </button>
        <div className={styles.separator}></div>
        <span className={styles.appTitle}>LASC Civil Hackathon Demo</span>
      </div>
      <div className={styles.rightGroup}>
        <button className={styles.actionButton} aria-label="More options">
          <span className="material-symbols-rounded">more_vert</span>
        </button>
      </div>
    </>
  ) : (
    <>
      <div className={styles.leftGroup}>
        <ActionButton icon="apps" label="Logo" />
        <ActionButton icon="calendar_today" label="Calendar" />
        <ActionButton icon="calculate" label="Calculator" />
        <ActionButton icon="print" label="Print" />
        <ActionButton icon="note_add" label="Add Note" />
        <ActionButton icon="notifications" label="Alarm" />
        <ActionButton icon="help" label="Help" />
        <ActionButton icon="logout" label="Logout" />
        
        <div className={styles.searchContainer}>
          <span className={`material-symbols-rounded ${styles.searchIcon}`}>search</span>
          <input type="text" placeholder="Search..." className={styles.searchInput} />
        </div>

        <div className={styles.languagePickerContainer}>
            <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                {mockLanguages.map((lang: Language) => <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>)}
            </Select>
        </div>

        <span className={styles.userInfo}>{mockUser.name}</span>
        <span className={styles.dateInfo}>{currentDate}</span>
        <span className={styles.appTitle}>LASC Civil Hackathon Demo</span>
      </div>
      
      <div className={styles.rightGroup}>
        <div className={styles.caseInfo}>
            <span className="material-symbols-rounded">folder_open</span>
            <button className={styles.casePickerButton}>
                <span>25STLC00161</span>
                <span className="material-symbols-rounded">expand_more</span>
            </button>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.departmentInfo}>
          <span className="material-symbols-rounded">calendar_month</span>
          <span>{currentCase.department}</span>
        </div>
      </div>
    </>
  );

  return (
    <header className={styles.header}>
      {headerContent}
    </header>
  );
};

// A simple hook to detect screen size, kept within this file.
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};