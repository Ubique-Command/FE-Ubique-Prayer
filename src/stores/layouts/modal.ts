import { create } from "zustand";

type ModalState = {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  setActiveModal: (activeModal) => set({ activeModal }),
}));
