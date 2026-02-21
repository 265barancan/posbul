import { useMemo, useDeferredValue } from "react";
import { motion } from "framer-motion";
import { PROVIDERS } from "../../constants/providers";
import AnimatedSection from "../ui/AnimatedSection";
import { useCalculatorStore } from "../../store/calculatorStore";

const INSTALLMENTS = [1, 2, 3, 6, 9, 12];
const CARD_FAMILIES = ["Tümü", "Bonus", "World", "Maximum", "Axess", "CardFinans", "Paraf"];

export default function CalculatorSection() {
    const { amount, installments, cardFamily, setAmount, setInstallments, setCardFamily } = useCalculatorStore();

    // Defer the amount to avoid lagging while typing
    const deferredAmount = useDeferredValue(amount);

    const results = useMemo(() => {
        if (!deferredAmount || deferredAmount <= 0) return [];

        return PROVIDERS.map((p) => {
            // Mock dynamic rate calculation
            let rate = p.commissionRate.min;

            // Add installment margin (roughly 1.5% per extra installment simulated)
            if (installments > 1) {
                rate += (installments - 1) * 1.25;
            }

            // Mock card family discount/penalty (just to make UI interactive)
            if (cardFamily && cardFamily !== "Tümü") {
                const modifier = (p.name.length + cardFamily.length) % 3 === 0 ? -0.5 : 0.5;
                rate += modifier;
            }

            // Ensure rate doesn't go below minimum reasonable floor
            rate = Math.max(0.99, rate);

            const commission = (deferredAmount * rate) / 100;
            return {
                id: p.id,
                name: p.name,
                commission,
                rate,
            };
        }).sort((a, b) => a.commission - b.commission);
    }, [deferredAmount, installments, cardFamily]);

    const maxCommission = results.length > 0 ? results[results.length - 1].commission : 0;
    const bestProvider = results.length > 0 ? results[0] : null;

    const formatTL = (n: number) =>
        `₺${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        if (raw === "") {
            setAmount(0);
            return;
        }
        setAmount(parseInt(raw));
    };

    return (
        <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                        Gelişmiş <span className="text-primary">Hesaplayıcı</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-base text-slate-500 dark:text-slate-400">
                        Ciro, taksit sayısı ve kart ailesine göre en uygun komisyon oranlarını anında hesaplayın.
                    </p>
                </AnimatedSection>

                {/* Filters */}
                <AnimatedSection delay={0.1} className="mx-auto mt-8 max-w-3xl space-y-6">
                    {/* Amount Input */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-slate-400">
                            calculate
                        </span>
                        <input
                            type="text"
                            value={amount > 0 ? `₺${amount.toLocaleString("tr-TR")}` : ""}
                            onChange={handleInputChange}
                            placeholder="Aylık Cironuz (Örn: ₺50.000)"
                            className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 text-center text-2xl font-bold text-slate-900 placeholder:text-slate-300 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-600"
                            aria-label="Aylık ciro"
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {/* Installments */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Taksit Sayısı
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {INSTALLMENTS.map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setInstallments(num)}
                                        className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${installments === num
                                            ? "bg-primary text-white shadow-sm"
                                            : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                            } border border-slate-200 dark:border-slate-700`}
                                    >
                                        {num === 1 ? "Tek Çekim" : `${num} Taksit`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card Family */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                            <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Özel Kart Ailesi Programı
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {CARD_FAMILIES.map((family) => (
                                    <button
                                        key={family}
                                        onClick={() => setCardFamily(family === "Tümü" ? null : family)}
                                        className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${(cardFamily === family) || (cardFamily === null && family === "Tümü")
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600"
                                            } border`}
                                    >
                                        {family}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Results */}
                {results.length > 0 && (
                    <AnimatedSection delay={0.15} className="mx-auto mt-12 max-w-4xl">
                        {/* Best highlight */}
                        {bestProvider && (
                            <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center dark:border-emerald-800/50 dark:bg-emerald-950/30">
                                <span className="material-symbols-outlined filled mr-2 align-middle text-[20px] text-emerald-500">
                                    emoji_events
                                </span>
                                <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                    <strong className="mr-1">{installments === 1 ? "Tek çekimde" : `${installments} taksitte`}</strong>
                                    en avantajlı sağlayıcı: <strong>{bestProvider.name}</strong> — kesinti:{" "}
                                    <span className="font-bold underline decoration-emerald-400 underline-offset-2">{formatTL(bestProvider.commission)}</span>
                                </span>
                            </div>
                        )}

                        {/* Bar chart */}
                        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
                            {results.map((r, i) => (
                                <motion.div
                                    key={r.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 24,
                                        delay: i * 0.05
                                    }}
                                    className="flex items-center gap-4"
                                >
                                    <span className="w-24 shrink-0 text-right text-sm font-semibold text-slate-700 dark:text-slate-200">
                                        {r.name}
                                    </span>
                                    <div className="relative h-12 flex-1 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                        <motion.div
                                            className={`flex h-full items-center rounded-xl px-4 ${i === 0
                                                ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                                : "bg-gradient-to-r from-primary to-blue-500"
                                                }`}
                                            layout
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${maxCommission > 0 ? (r.commission / maxCommission) * 100 : 0}%`,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 20,
                                            }}
                                        >
                                            <span className="text-sm font-bold text-white drop-shadow-sm whitespace-nowrap overflow-hidden">
                                                {formatTL(r.commission)}
                                            </span>
                                        </motion.div>
                                    </div>
                                    <div className="w-20 shrink-0 text-right">
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">%{r.rate.toFixed(2)}</p>
                                        <p className="text-[10px] text-slate-400">Komisyon</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatedSection>
                )}
            </div>
        </section>
    );
}
