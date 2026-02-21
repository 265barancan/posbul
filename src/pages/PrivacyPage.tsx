import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";

export default function PrivacyPage() {
    return (
        <div className="py-10 sm:py-16">
            <SEO
                title="Gizlilik Politikası"
                path="/gizlilik"
                description="POSBul gizlilik politikası. KVKK kapsamında kişisel verilerin korunması."
            />
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
                        Gizlilik <span className="text-primary">Politikası</span>
                    </h1>
                    <p className="mb-8 text-sm text-slate-400">Son güncelleme: Şubat 2026</p>
                </AnimatedSection>

                <AnimatedSection delay={0.1} className="prose-sm space-y-6">
                    {[
                        {
                            title: "1. Toplanan Veriler",
                            body: "POSBul, yalnızca hizmet kalitesini artırmak amacıyla anonim kullanım verileri toplar. Newsletter aboneliğinde sağladığınız e-posta adresiniz güvenli sunucularda saklanır.",
                        },
                        {
                            title: "2. Çerezler",
                            body: "Sitemizde tema tercihinizi (açık/koyu mod) saklamak için yerel depolama (localStorage) kullanılmaktadır. Üçüncü taraf izleme çerezleri kullanılmamaktadır.",
                        },
                        {
                            title: "3. Verilerin Paylaşılması",
                            body: "Kişisel verileriniz hiçbir koşulda üçüncü taraflarla paylaşılmaz veya satılmaz. Sağlayıcı başvuru bağlantıları sizi direkt olarak ilgili sağlayıcının sitesine yönlendirir.",
                        },
                        {
                            title: "4. Veri Güvenliği",
                            body: "Tüm veriler SSL/TLS şifrelemesi ile korunmaktadır. KVKK (6698 sayılı Kişisel Verilerin Korunması Kanunu) kapsamındaki haklarınız saklıdır.",
                        },
                        {
                            title: "5. Haklarınız",
                            body: "KVKK kapsamında kişisel verilerinize erişim, düzeltme veya silme talebinde bulunabilirsiniz. Taleplerinizi info@posbul.com adresine iletebilirsiniz.",
                        },
                    ].map((section) => (
                        <div key={section.title}>
                            <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                                {section.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {section.body}
                            </p>
                        </div>
                    ))}
                </AnimatedSection>
            </div>
        </div>
    );
}
