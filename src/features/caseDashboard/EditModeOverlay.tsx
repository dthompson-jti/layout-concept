// src/features/caseDashboard/EditModeOverlay.tsx
// This is a placeholder for the overlay shown in edit mode.
export const EditModeOverlay = ({ isEditMode, onExitEditMode }: { isEditMode: boolean; onExitEditMode: () => void; }) => {
  if (!isEditMode) return null;
  // A real implementation would have a more prominent UI.
  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 100 }}>
      <button className="btn btn-primary" onClick={onExitEditMode}>Done Editing</button>
    </div>
  );
};