import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterStore } from "../../store/filterStore";
import { useProviders } from "../../hooks/useProviders";
import type { Provider } from "../../types/provider.types";
import ProviderCard from "../providers/ProviderCard";
import ProviderCardSkeleton from "../providers/ProviderCardSkeleton";
import ProviderDetailModal from "../providers/ProviderDetailModal";
import Select from "../ui/Select";
import SearchBar from "../ui/SearchBar";
import AnimatedSection from "../ui/AnimatedSection";

const SORT_LABELS: Record<string, string> = {
    commission: "En Düşük Komisyon",
    speed: "En Hızlı Ödeme",
    popularity: "En Popüler",
};

export default function ProviderGrid() {
    const { segment, sortBy, setSortBy, searchQuery, setSearchQuery } = useFilterStore();
    const { providers, isLoading } = useProviders();
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [showAll, setShowAll] = useState(false);

    const filtered = useMemo(() => {
        let result = providers.filter(
            (p) => p.segment === "her ikisi" || p.segment === segment
        );

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.subtitle.toLowerCase().includes(q) ||
                    p.features.some((f) => f.toLowerCase().includes(q))
            );
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case "commission":
                    return a.commissionRate.min - b.commissionRate.min;
                case "speed":
                    return a.paymentSpeedHours - b.paymentSpeedHours;
                case "popularity":
                    return b.reviewCount - a.reviewCount;
                default:
                    return 0;
            }
        });

        return result;
    }, [providers, segment, sortBy, searchQuery]);

    const displayed = showAll ? filtered : filtered.slice(0, 3);

    const handleInfoClick = useCallback(
        (id: string) => {
            const provider = providers.find((p) => p.id === id) ?? null;
            setSelectedProvider(provider);
        },
        [providers]
    );

    const handleCloseModal = useCallback(() => {
        setSelectedProvider(null);
    }, []);

    return (
        <section id="oranlar" className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <AnimatedSection className="sticky top-16 z-20 -mx-4 mb-8 flex flex-col gap-4 border-b border-slate-200/60 bg-background-light/80 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 dark:border-slate-800/60 dark:bg-background-dark/80">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                                Sanal POS Sağlayıcıları
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {isLoading ? "Yükleniyor..." : `${filtered.length} sağlayıcı listeleniyor`}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-48">
                                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                            </div>
                            <div className="w-48">
                                <Select
                                    icon="sort"
                                    value={sortBy}
                                    onChange={(e) =>
                                        setSortBy(e.target.value as "commission" | "speed" | "popularity")
                                    }
                                    aria-label="Sıralama seçin"
                                >
                                    {Object.entries(SORT_LABELS).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Skeleton Loading */}
                {isLoading && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <ProviderCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Provider List */}
                {!isLoading && (
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {displayed.map((provider, index) => (
                                <motion.div
                                    key={provider.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.35, delay: index * 0.08 }}
                                >
                                    <ProviderCard
                                        provider={provider}
                                        onInfoClick={handleInfoClick}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && filtered.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                        <span className="material-symbols-outlined mb-3 text-[48px] text-slate-300 dark:text-slate-600">
                            search_off
                        </span>
                        <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                            Aramanızla eşleşen sağlayıcı bulunamadı
                        </p>
                    </div>
                )}

                {/* Load More */}
                {!isLoading && !showAll && filtered.length > 3 && (
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            onClick={() => setShowAll(true)}
                            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary dark:border-slate-600 dark:text-slate-300 dark:hover:border-primary/50 dark:hover:bg-primary/10 dark:hover:text-primary"
                        >
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            Tüm Sağlayıcıları Gör ({filtered.length - 3} daha)
                        </button>
                    </motion.div>
                )}

                {/* Detail Modal */}
                <ProviderDetailModal
                    provider={selectedProvider}
                    isOpen={selectedProvider !== null}
                    onClose={handleCloseModal}
                />
            </div>
        </section>
    );
}
