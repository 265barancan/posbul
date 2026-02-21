import { create } from "zustand";

export interface Toast {
    id: string;
    message: string;
    variant: "success" | "error" | "info" | "warning";
    duration?: number;
}

interface ToastStore {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

let toastId = 0;

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = String(++toastId);
        set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));

        const duration = toast.duration ?? 3000;
        setTimeout(() => {
            set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
        }, duration);
    },
    removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
