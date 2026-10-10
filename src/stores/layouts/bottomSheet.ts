import { create } from "zustand";

type BottomSheetState = {
  activeBottomSheet: string | null;
  setActiveBottomSheet: (bottomSheet: string | null) => void;
};

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  activeBottomSheet: null,
  setActiveBottomSheet: (activeBottomSheet) => set({ activeBottomSheet }),
}));

