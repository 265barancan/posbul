import { memo } from "react";
import type { Provider } from "../../types/provider.types";
import { formatCommission } from "../../utils/formatters";
import { useCompareStore } from "../../store/compareStore";
import { useApplicationStore } from "../../store/applicationStore";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface ProviderCardProps {
    provider: Provider;
    onInfoClick: (id: string) => void;
}

const ProviderCard = memo(function ProviderCard({
    provider,
    onInfoClick,
}: ProviderCardProps) {
    const { addProvider, removeProvider, selectedIds } = useCompareStore();
    const { openModal } = useApplicationStore();
    const isSelected = selectedIds.includes(provider.id);
    const canAdd = selectedIds.length < 3;

    const toggleCompare = () => {
        if (isSelected) {
            removeProvider(provider.id);
        } else if (canAdd) {
            addProvider(provider.id);
        }
    };

    return (
        <div
            className={`group relative flex flex-col gap-5 rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 md:flex-row md:items-center md:justify-between md:gap-6 ${isSelected
                ? "border-primary/60 ring-2 ring-primary/20"
                : "border-slate-200 hover:border-primary/50 dark:border-slate-800"
                }`}
        >
            {/* Popular Badge */}
            <div className="absolute -top-3 left-6 flex gap-2">
                {provider.isPopular && (
                    <div className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shadow-orange-500/25">
                        En Popüler
                    </div>
                )}
                {(provider.currencyRates || provider.cryptoRates) && (
                    <div className="rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shadow-indigo-500/25 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">public</span>
                        Döviz Destekli
                    </div>
                )}
            </div>

            {/* Compare Checkbox */}
            <button
                onClick={toggleCompare}
                disabled={!isSelected && !canAdd}
                className={`absolute right-4 top-4 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border transition-all md:right-auto md:left-4 md:top-4 ${isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-slate-300 hover:border-primary/50 dark:border-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
                    }`}
                aria-label={isSelected ? `${provider.name} karşılaştırmadan kaldır` : `${provider.name} karşılaştırmaya ekle`}
            >
                {isSelected && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                )}
            </button>

            {/* Logo + Name */}
            <div className="flex items-center gap-4 md:ml-6 md:w-48 md:shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-slate-200 p-1 dark:border-slate-700 dark:bg-slate-800">
                    <img src={provider.logo} alt={provider.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {provider.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {provider.subtitle}
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 md:flex-1 md:gap-8">
                {/* Commission */}
                <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Komisyon
                    </p>
                    <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {formatCommission(provider.commissionRate.min, provider.commissionRate.max)}
                    </p>
                </div>

                {/* Speed */}
                <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Ödeme Hızı
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-emerald-500">bolt</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {provider.paymentSpeed}
                        </span>
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Puan
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined filled text-[18px] text-amber-400">star</span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            {provider.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-400">({provider.reviewCount})</span>
                    </div>
                </div>

                {/* Features (hidden on mobile) */}
                <div className="hidden lg:block">
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Öne Çıkan
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {provider.features.slice(0, 2).map((f) => (
                            <Badge key={f} variant="primary" className="text-[11px]">
                                {f}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:shrink-0">
                <button
                    onClick={() => onInfoClick(provider.id)}
                    className="cursor-pointer rounded-lg border border-slate-200 p-2.5 text-slate-500 transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary dark:border-slate-700 dark:text-slate-400 dark:hover:border-primary/50 dark:hover:bg-primary/10 dark:hover:text-primary"
                    aria-label={`${provider.name} hakkında detaylı bilgi`}
                >
                    <span className="material-symbols-outlined text-[20px]">info</span>
                </button>
                <Button
                    variant="primary"
                    size="md"
                    icon="arrow_forward"
                    iconPosition="right"
                    onClick={() => openModal({ provider })}
                >
                    Hemen Başvur
                </Button>
            </div>
        </div>
    );
});

export default ProviderCard;
