import { create } from "zustand";

interface FilterStore {
    segment: "bireysel" | "kurumsal";
    sortBy: "commission" | "speed" | "popularity";
    searchQuery: string;
    setSegment: (s: FilterStore["segment"]) => void;
    setSortBy: (s: FilterStore["sortBy"]) => void;
    setSearchQuery: (q: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    segment: "bireysel",
    sortBy: "commission",
    searchQuery: "",
    setSegment: (segment) => set({ segment }),
    setSortBy: (sortBy) => set({ sortBy }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
