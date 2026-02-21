import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";

const VALUES = [
    {
        icon: "verified",
        title: "Güvenilir Veri",
        description: "Tüm komisyon oranları ve sağlayıcı bilgileri düzenli olarak güncellenir ve doğrulanır.",
    },
    {
        icon: "compare",
        title: "Tarafsız Karşılaştırma",
        description: "Hiçbir sağlayıcıyla ticari ilişkimiz yoktur. Tamamen bağımsız ve tarafsız karşılaştırma sunarız.",
    },
    {
        icon: "groups",
        title: "Topluluk Odaklı",
        description: "Kullanıcı yorumları ve değerlendirmeleri ile gerçek deneyimlere dayalı bilgi sağlarız.",
    },
    {
        icon: "speed",
        title: "Hızlı & Kolay",
        description: "Karmaşık tablolar yerine sade ve anlaşılır arayüzle saniyeler içinde karar verin.",
    },
];

export default function AboutPage() {
    return (
        <div className="py-10 sm:py-16">
            <SEO
                title="Hakkımızda"
                path="/hakkimizda"
                description="POSBul, Türkiye'deki sanal POS sağlayıcılarını karşılaştırmanızı kolaylaştıran bağımsız bir platformdur."
            />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                        POSBul <span className="text-primary">Hakkında</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
                        POSBul, Türkiye'deki sanal POS sağlayıcılarını karşılaştırmanızı kolaylaştıran bağımsız bir platformdur.
                        Amacımız, e-ticaret yapan işletmelerin doğru ödeme altyapısını seçmesine yardımcı olmaktır.
                    </p>
                </AnimatedSection>

                {/* Mission */}
                <AnimatedSection delay={0.1} className="mb-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center sm:p-8">
                    <span className="material-symbols-outlined mb-3 text-[32px] text-primary">rocket_launch</span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Misyonumuz</h2>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Her ölçekteki işletmenin, ihtiyaçlarına en uygun sanal POS çözümünü kolayca bulabilmesini sağlamak.
                        Karmaşık komisyon tablolarını sadeleştirerek zamandan ve paradan tasarruf ettirmek.
                    </p>
                </AnimatedSection>

                {/* Values */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {VALUES.map((v, i) => (
                        <AnimatedSection
                            key={v.title}
                            delay={i * 0.1}
                            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <span className="material-symbols-outlined text-[22px] text-primary">{v.icon}</span>
                            </div>
                            <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-white">{v.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{v.description}</p>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Stats */}
                <AnimatedSection delay={0.3} className="mt-12 grid grid-cols-3 gap-4 text-center">
                    {[
                        { value: "6+", label: "Sağlayıcı" },
                        { value: "10K+", label: "Aylık Ziyaretçi" },
                        { value: "7/24", label: "Güncel Veri" },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                            <p className="text-2xl font-extrabold text-primary">{stat.value}</p>
                            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                        </div>
                    ))}
                </AnimatedSection>
            </div>
        </div>
    );
}
