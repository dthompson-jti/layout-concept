// src/data/toastAtoms.ts
import { atom } from 'jotai';
import { nanoid } from 'nanoid';

export interface Toast {
  id: string;
  message: string;
  icon: string;
}

export const toastsAtom = atom<Toast[]>([]);

// Helper atom to add a new toast
export const addToastAtom = atom(
  null,
  (get, set, { message, icon }: { message: string; icon: string }) => {
    const newToast: Toast = { id: nanoid(), message, icon };
    set(toastsAtom, [...get(toastsAtom), newToast]);
  }
);