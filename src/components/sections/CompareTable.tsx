import { useMemo } from "react";
import { useCompareStore } from "../../store/compareStore";
import { useApplicationStore } from "../../store/applicationStore";
import { PROVIDERS } from "../../constants/providers";
import { formatCommission, formatCurrency } from "../../utils/formatters";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const COMPARE_ROWS = [
    { label: "Komisyon Oranı", key: "commission" },
    { label: "Ödeme Hızı", key: "speed" },
    { label: "Puan", key: "rating" },
    { label: "Değerlendirme", key: "reviews" },
    { label: "Aylık Ücret", key: "monthlyFee" },
    { label: "Kurulum Ücreti", key: "setupFee" },
    { label: "3 Taksit", key: "installment3" },
    { label: "6 Taksit", key: "installment6" },
    { label: "12 Taksit", key: "installment12" },
    { label: "Segment", key: "segment" },
    { label: "Özellikler", key: "features" },
] as const;

export default function CompareTable() {
    const { selectedIds } = useCompareStore();
    const { openModal } = useApplicationStore();

    const providers = useMemo(
        () => selectedIds.map((id) => PROVIDERS.find((p) => p.id === id)).filter(Boolean),
        [selectedIds]
    );

    if (providers.length < 2) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                <span className="material-symbols-outlined mb-3 text-[48px] text-slate-300 dark:text-slate-600">
                    compare_arrows
                </span>
                <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                    Karşılaştırmak için en az 2 sağlayıcı seçin
                </p>
                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                    Ana sayfadaki sağlayıcı kartlarından "Karşılaştır" butonuna tıklayın.
                </p>
            </div>
        );
    }

    const getCellValue = (provider: typeof providers[0], key: string) => {
        if (!provider) return "";
        switch (key) {
            case "commission":
                return formatCommission(provider.commissionRate.min, provider.commissionRate.max);
            case "speed":
                return provider.paymentSpeed;
            case "rating":
                return provider.rating.toFixed(1);
            case "reviews":
                return `${provider.reviewCount} yorum`;
            case "monthlyFee":
                return formatCurrency(provider.monthlyFee);
            case "setupFee":
                return formatCurrency(provider.setupFee);
            case "installment3":
                return `%${provider.installmentRates[3].toFixed(2)}`;
            case "installment6":
                return `%${provider.installmentRates[6].toFixed(2)}`;
            case "installment12":
                return `%${provider.installmentRates[12].toFixed(2)}`;
            case "segment":
                return provider.segment === "her ikisi" ? "Bireysel + Kurumsal" : provider.segment;
            case "features":
                return provider.features;
            default:
                return "";
        }
    };

    // Find best values for highlighting
    const bestCommission = Math.min(...providers.map((p) => p!.commissionRate.min));
    const bestSpeed = Math.min(...providers.map((p) => p!.paymentSpeedHours));
    const bestRating = Math.max(...providers.map((p) => p!.rating));

    const isBest = (provider: typeof providers[0], key: string) => {
        if (!provider) return false;
        switch (key) {
            case "commission":
                return provider.commissionRate.min === bestCommission;
            case "speed":
                return provider.paymentSpeedHours === bestSpeed;
            case "rating":
                return provider.rating === bestRating;
            case "installment3":
                return provider.installmentRates[3] === Math.min(...providers.map((p) => p!.installmentRates[3]));
            case "installment6":
                return provider.installmentRates[6] === Math.min(...providers.map((p) => p!.installmentRates[6]));
            case "installment12":
                return provider.installmentRates[12] === Math.min(...providers.map((p) => p!.installmentRates[12]));
            default:
                return false;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
                <thead>
                    <tr>
                        <th className="w-40 pb-6" />
                        {providers.map((p) => (
                            <th key={p!.id} className="pb-6 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                                        <span className="material-symbols-outlined text-[28px] text-primary">
                                            account_balance
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                                        {p!.name}
                                    </span>
                                    <span className="text-xs text-slate-400">{p!.subtitle}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {COMPARE_ROWS.map((row, rowIdx) => (
                        <tr
                            key={row.key}
                            className={rowIdx % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-800/20" : ""}
                        >
                            <td className="rounded-l-lg px-4 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                {row.label}
                            </td>
                            {providers.map((p) => {
                                const value = getCellValue(p, row.key);
                                const best = isBest(p, row.key);
                                return (
                                    <td key={p!.id} className="rounded-r-lg px-4 py-4 text-center">
                                        {row.key === "features" ? (
                                            <div className="flex flex-wrap justify-center gap-1">
                                                {(value as string[]).map((f) => (
                                                    <Badge key={f} variant="primary" className="text-[10px]">
                                                        {f}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <span
                                                className={`text-sm font-semibold ${best
                                                    ? "text-emerald-600 dark:text-emerald-400"
                                                    : "text-slate-700 dark:text-slate-200"
                                                    }`}
                                            >
                                                {value as string}
                                                {best && (
                                                    <span className="material-symbols-outlined ml-1 align-middle text-[14px] text-emerald-500">
                                                        check_circle
                                                    </span>
                                                )}
                                            </span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    {/* CTA Row */}
                    <tr>
                        <td className="px-4 pt-6" />
                        {providers.map((p) => (
                            <td key={p!.id} className="px-4 pt-6 text-center">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon="arrow_forward"
                                    iconPosition="right"
                                    onClick={() => openModal({ provider: p! })}
                                >
                                    Başvur
                                </Button>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
