import { create } from "zustand";

interface ThemeStore {
    isDark: boolean;
    toggle: () => void;
    init: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
    isDark: false,
    toggle: () => {
        const next = !get().isDark;
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        set({ isDark: next });
    },
    init: () => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const isDark = stored ? stored === "dark" : prefersDark;
        document.documentElement.classList.toggle("dark", isDark);
        set({ isDark });
    },
}));
