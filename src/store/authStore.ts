import { create } from "zustand";

export type UserRole = "ADMIN" | "MERCHANT";

interface AuthState {
    isAuthenticated: boolean;
    user: { email: string; name: string; role: UserRole; providerId?: string } | null;
    login: (email: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false, // Default is logged out
    user: null,

    // Mock login for now since Firebase phase was skipped
    login: (email: string) => {
        if (email.toLowerCase() === "merchant@paytr.com") {
            set({
                isAuthenticated: true,
                user: { email, name: "PayTR Temsilcisi", role: "MERCHANT", providerId: "p1" } // p1 = PayTR mock id
            });
        } else {
            set({
                isAuthenticated: true,
                user: { email, name: "Admin Kullanıcı", role: "ADMIN" }
            });
        }
    },

    logout: () => set({ isAuthenticated: false, user: null }),
}));
