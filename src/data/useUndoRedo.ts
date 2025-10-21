// src/data/useUndoRedo.ts
import { atom, useAtom } from 'jotai';

// This is a placeholder implementation. A real implementation would be more complex.
const historyAtom = atom<string[]>(['initial state']);
const historyIndexAtom = atom(0);

const undoAtom = atom(
    get => get(historyIndexAtom) > 0,
    (get, set) => {
        const currentIndex = get(historyIndexAtom);
        if (currentIndex > 0) {
            set(historyIndexAtom, currentIndex - 1);
        }
    }
)

const redoAtom = atom(
    get => get(historyIndexAtom) < get(historyAtom).length - 1,
    (get, set) => {
        const currentIndex = get(historyIndexAtom);
        const history = get(historyAtom);
        if (currentIndex < history.length - 1) {
            set(historyIndexAtom, currentIndex + 1);
        }
    }
)

export const useUndoRedo = () => {
    const [canUndo, undo] = useAtom(undoAtom);
    const [canRedo, redo] = useAtom(redoAtom);
    
    return { canUndo, undo, canRedo, redo };
};