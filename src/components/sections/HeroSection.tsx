import { useMemo } from "react";
import { motion } from "framer-motion";
import { useFilterStore } from "../../store/filterStore";
import { getCurrentMonthYear } from "../../utils/formatters";

const TRUST_ITEMS = [
    { icon: "schedule", text: "24 Saatte Ödeme" },
    { icon: "integration_instructions", text: "Ücretsiz Entegrasyon" },
    { icon: "money_off", text: "Aidat Yok" },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export default function HeroSection() {
    const { segment, setSegment } = useFilterStore();
    const monthYear = useMemo(() => getCurrentMonthYear(), []);

    return (
        <section className="relative overflow-hidden py-16 sm:py-24">
            {/* Background gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
                <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl dark:bg-primary/5" />
            </div>

            <motion.div
                className="mx-auto max-w-4xl text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Live Badge */}
                <motion.div
                    variants={itemVariants}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 dark:border-primary/30 dark:bg-primary/10"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-sm font-medium text-primary">
                        Güncel {monthYear} Oranları
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
                >
                    En İyi Sanal POS Oranlarını{" "}
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Saniyeler İçinde
                    </span>{" "}
                    Karşılaştırın
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400"
                >
                    Türkiye'deki tüm sanal POS sağlayıcılarının komisyon oranlarını, ödeme
                    hızlarını ve özelliklerini tek bir platformda karşılaştırın. İşletmeniz
                    için en doğru kararı verin.
                </motion.p>

                {/* Segment Toggle */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800"
                >
                    <button
                        onClick={() => setSegment("bireysel")}
                        className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${segment === "bireysel"
                            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        <span className="material-symbols-outlined mr-1.5 align-middle text-[18px]">person</span>
                        Bireysel Satıcı
                    </button>
                    <button
                        onClick={() => setSegment("kurumsal")}
                        className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${segment === "kurumsal"
                            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            }`}
                    >
                        <span className="material-symbols-outlined mr-1.5 align-middle text-[18px]">business</span>
                        Şirket / Kurumsal
                    </button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
                >
                    {TRUST_ITEMS.map((item) => (
                        <div key={item.text} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <span className="material-symbols-outlined filled text-[20px] text-emerald-500">
                                check_circle
                            </span>
                            <span className="text-sm font-medium">{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
