import { create } from "zustand";

interface CompareStore {
    selectedIds: string[];
    addProvider: (id: string) => void;
    removeProvider: (id: string) => void;
    clearAll: () => void;
    isSelected: (id: string) => boolean;
}

const MAX_COMPARE = 3;

export const useCompareStore = create<CompareStore>((set, get) => ({
    selectedIds: [],
    addProvider: (id) => {
        const { selectedIds } = get();
        if (selectedIds.length < MAX_COMPARE && !selectedIds.includes(id)) {
            set({ selectedIds: [...selectedIds, id] });
        }
    },
    removeProvider: (id) =>
        set((s) => ({ selectedIds: s.selectedIds.filter((x) => x !== id) })),
    clearAll: () => set({ selectedIds: [] }),
    isSelected: (id) => get().selectedIds.includes(id),
}));
