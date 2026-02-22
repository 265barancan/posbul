import { useState, useMemo } from "react";
import type { Provider } from "../../types/provider.types";
import { formatCommission, formatCurrency } from "../../utils/formatters";
import { REVIEWS } from "../../constants/reviews";
import { useApplicationStore } from "../../store/applicationStore";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

interface ProviderDetailModalProps {
    provider: Provider | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProviderDetailModal({
    provider,
    isOpen,
    onClose,
}: ProviderDetailModalProps) {
    const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");
    const { openModal } = useApplicationStore();

    const providerReviews = useMemo(
        () => (provider ? REVIEWS.filter((r) => r.providerId === provider.id) : []),
        [provider]
    );

    if (!provider) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={provider.name} size="lg">
            {/* Tab Switcher */}
            <div className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                <button
                    onClick={() => setActiveTab("info")}
                    className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all ${activeTab === "info"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                        }`}
                >
                    <span className="material-symbols-outlined mr-1 align-middle text-[16px]">info</span>
                    Detaylar
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all ${activeTab === "reviews"
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                        }`}
                >
                    <span className="material-symbols-outlined mr-1 align-middle text-[16px]">rate_review</span>
                    Yorumlar ({providerReviews.length})
                </button>
            </div>

            {activeTab === "info" ? (
                <div className="space-y-6">
                    {/* Header info */}
                    <div className="flex items-start gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                            <span className="material-symbols-outlined text-[32px] text-primary">
                                account_balance
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {provider.subtitle}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {provider.description}
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                            <p className="text-xs font-medium text-slate-400">Komisyon Oranı</p>
                            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                {formatCommission(provider.commissionRate.min, provider.commissionRate.max)}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                            <p className="text-xs font-medium text-slate-400">Ödeme Hızı</p>
                            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                {provider.paymentSpeed}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                            <p className="text-xs font-medium text-slate-400">Aylık Ücret</p>
                            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                {formatCurrency(provider.monthlyFee)}
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                            <p className="text-xs font-medium text-slate-400">Kurulum Ücreti</p>
                            <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                                {formatCurrency(provider.setupFee)}
                            </p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`material-symbols-outlined filled text-[20px] ${star <= Math.round(provider.rating)
                                        ? "text-amber-400"
                                        : "text-slate-300 dark:text-slate-600"
                                        }`}
                                >
                                    star
                                </span>
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {provider.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-slate-400">
                            ({provider.reviewCount} değerlendirme)
                        </span>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                            Özellikler
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {provider.features.map((f) => (
                                <Badge key={f} variant="primary">
                                    {f}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                        <Button
                            variant="primary"
                            className="flex-1"
                            icon="arrow_forward"
                            iconPosition="right"
                            onClick={() => {
                                onClose();
                                openModal(provider);
                            }}
                        >
                            Hemen Başvur
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Kapat
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Reviews list */}
                    {providerReviews.length > 0 ? (
                        <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                            {providerReviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                            Henüz yorum yapılmamış. İlk yorumu siz yapın!
                        </p>
                    )}

                    {/* Add review form */}
                    <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                        <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                            Yorum Ekle
                        </h4>
                        <ReviewForm onSubmit={() => { }} />
                    </div>
                </div>
            )}
        </Modal>
    );
}
