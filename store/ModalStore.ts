import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  openModal: () => set((state) => ({ isOpen: true })),
  closeModal: () => set((state) => ({ isOpen: false })),
}));
