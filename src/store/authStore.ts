import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    user: { email: string; name: string } | null;
    login: (email: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false, // Default is logged out
    user: null,

    // Mock login for now since Firebase phase was skipped
    login: (email: string) => set({
        isAuthenticated: true,
        user: { email, name: "Admin Kullanıcı" }
    }),

    logout: () => set({ isAuthenticated: false, user: null }),
}));
