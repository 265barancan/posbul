import { motion, AnimatePresence } from "framer-motion";
import { useCompareStore } from "../../store/compareStore";
import { PROVIDERS } from "../../constants/providers";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function CompareBar() {
    const { selectedIds, removeProvider, clearAll } = useCompareStore();
    const navigate = useNavigate();

    const selectedProviders = selectedIds
        .map((id) => PROVIDERS.find((p) => p.id === id))
        .filter(Boolean);

    if (selectedIds.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95"
            >
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-3">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                            {selectedIds.length}/3 seçili
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {selectedProviders.map((p) => (
                                <div
                                    key={p!.id}
                                    className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 sm:gap-1.5 sm:px-3 sm:py-1"
                                >
                                    <span className="max-w-[80px] truncate text-[11px] font-semibold text-primary sm:max-w-none sm:text-xs">
                                        {p!.name}
                                    </span>
                                    <button
                                        onClick={() => removeProvider(p!.id)}
                                        className="cursor-pointer text-primary/60 hover:text-primary"
                                        aria-label={`${p!.name} seçimini kaldır`}
                                    >
                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end">
                        <button
                            onClick={clearAll}
                            className="cursor-pointer text-sm font-medium text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            Temizle
                        </button>
                        <Button
                            variant="primary"
                            size="sm"
                            icon="compare_arrows"
                            onClick={() => navigate("/karsilastir")}
                            disabled={selectedIds.length < 2}
                        >
                            Karşılaştır
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
