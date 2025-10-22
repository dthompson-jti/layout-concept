// src/features/caseDashboard/EditModeActions.tsx
import { motion } from 'framer-motion';
import styles from './EditModeActions.module.css';

interface EditModeActionsProps {
  onSave: () => void;
}

export const EditModeActions = ({ onSave }: EditModeActionsProps) => {
  const containerVariants = {
    hidden: { y: '120%', opacity: 0 },
    visible: { y: '0%', opacity: 1 },
  };

  return (
    <motion.div
      className={styles.actionsContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className={styles.infoText}>
        <span>Drag tiles to reorder.</span>
      </div>
      {/* FIX: Update button text to match "Personalize" theme. */}
      <button className="btn btn-primary on-solid" onClick={onSave}>
        Save Personalization
      </button>
    </motion.div>
  );
};