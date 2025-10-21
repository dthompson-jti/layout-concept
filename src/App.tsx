// src/App.tsx
// CORRECTED: The path reflects that CaseDashboard.tsx is NOT in a 'components' subdirectory.
import { CaseDashboard } from './features/caseDashboard/CaseDashboard';
import styles from './App.module.css';
import { ToastContainer } from './components/ToastContainer';

function App() {
  return (
    <div className={styles.appContainer}>
      <main className={styles.appMain}>
        {/* CaseDashboard now provides its own header, so it's a direct child of main */}
        <CaseDashboard />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;