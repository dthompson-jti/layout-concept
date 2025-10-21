// src/features/appHeader/AppHeader.tsx
import { useState, useEffect } from 'react';
import { Tooltip } from '../../components/Tooltip';
import { Select, SelectItem } from '../../components/Select';
import { mockUser, mockCaseList, mockLanguages, CaseInfo, Language } from '../../data/appHeaderData';
import styles from './AppHeader.module.css';

// A simple hook to detect screen size, kept within this file to adhere to project structure constraints.
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

const ActionButton = ({ icon, label }: { icon: string; label: string }) => (
  <Tooltip content={label}>
    <button className={styles.actionButton} aria-label={label}>
      <span className="material-symbols-rounded">{icon}</span>
    </button>
  </Tooltip>
);

// FIX: Added the 'export' keyword to make this component available for import.
export const AppHeader = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [currentCaseId, setCurrentCaseId] = useState(mockCaseList[0].id);
  const [currentLanguage, setCurrentLanguage] = useState(mockLanguages[0].value);

  const currentCase = mockCaseList.find(c => c.id === currentCaseId) || mockCaseList[0];
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (isMobile) {
    return (
      <header className={styles.header}>
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
      </header>
    );
  }

  return (
    <header className={styles.header}>
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
        <div className={styles.casePickerContainer}>
          <Select value={currentCaseId} onValueChange={setCurrentCaseId}>
            {mockCaseList.map((c: CaseInfo) => <SelectItem key={c.id} value={c.id}>{c.id}</SelectItem>)}
          </Select>
        </div>
        <div className={styles.departmentInfo}>
          <span className="material-symbols-rounded">calendar_month</span>
          <span>{currentCase.department}</span>
        </div>
      </div>
    </header>
  );
};