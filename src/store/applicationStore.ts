import { create } from "zustand";
import type { Provider } from "../types/provider.types";

interface ApplicationState {
    isOpen: boolean;
    selectedProvider: Provider | null;
    openModal: (provider?: Provider | null) => void;
    closeModal: () => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
    isOpen: false,
    selectedProvider: null,
    openModal: (provider = null) => set({ isOpen: true, selectedProvider: provider }),
    closeModal: () => set({ isOpen: false, selectedProvider: null }),
}));
