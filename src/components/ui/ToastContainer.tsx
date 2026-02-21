import { motion, AnimatePresence } from "framer-motion";
import { useToastStore, type Toast } from "../../store/toastStore";

const ICON_MAP: Record<Toast["variant"], string> = {
    success: "check_circle",
    error: "error",
    info: "info",
    warning: "warning",
};

const COLOR_MAP: Record<Toast["variant"], string> = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-primary",
    warning: "bg-amber-500",
};

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed right-4 top-20 z-50 flex flex-col gap-2 sm:right-6">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 60, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="flex min-w-[280px] max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${COLOR_MAP[toast.variant]}`}
                        >
                            <span className="material-symbols-outlined text-[16px] text-white">
                                {ICON_MAP[toast.variant]}
                            </span>
                        </div>
                        <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                            {toast.message}
                        </p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="cursor-pointer shrink-0 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                            aria-label="Bildirimi kapat"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
