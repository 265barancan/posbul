import { motion } from "framer-motion";
import AnimatedSection from "../ui/AnimatedSection";

const FEATURES = [
    {
        icon: "update",
        title: "Güncel Veriler",
        description:
            "Tüm sağlayıcı komisyon oranları ve özellikleri her ay düzenli olarak güncellenir. Karar verirken her zaman en güncel bilgilere sahip olursunuz.",
    },
    {
        icon: "bolt",
        title: "Hızlı Başvuru",
        description:
            "Seçtiğiniz sağlayıcıya tek tıkla yönlendirin. Başvuru süreçlerini hızlandıran entegrasyonlarımız ile vakit kaybetmeyin.",
    },
    {
        icon: "sentiment_satisfied",
        title: "Tamamen Ücretsiz",
        description:
            "POSBul'u kullanmak için herhangi bir ücret ödemenize gerek yok. Tüm karşılaştırma araçlarımız sonsuza kadar ücretsizdir.",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" as const },
    },
};

export default function WhyUsSection() {
    return (
        <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <AnimatedSection className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                        Neden POS<span className="text-primary">Bul</span>?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-base text-slate-500 dark:text-slate-400">
                        İşletmeniz için en uygun sanal POS'u bulmanın en kolay yolu.
                    </p>
                </AnimatedSection>

                {/* Feature Cards */}
                <motion.div
                    className="mt-12 grid gap-6 sm:grid-cols-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    {FEATURES.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/30"
                        >
                            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                                <span className="material-symbols-outlined text-[28px] text-primary">
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
