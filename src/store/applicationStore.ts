import { create } from "zustand";
import type { Provider } from "../types/provider.types";

interface ApplicationState {
    isOpen: boolean;
    selectedProvider: Provider | null;
    isGeneral: boolean;
    openModal: (params?: { provider?: Provider | null; isGeneral?: boolean }) => void;
    closeModal: () => void;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
    isOpen: false,
    selectedProvider: null,
    isGeneral: false,
    openModal: ({ provider = null, isGeneral = false } = {}) =>
        set({ isOpen: true, selectedProvider: provider, isGeneral }),
    closeModal: () => set({ isOpen: false, selectedProvider: null, isGeneral: false }),
}));
