import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";

export default function TermsPage() {
    return (
        <div className="py-10 sm:py-16">
            <SEO
                title="Kullanım Koşulları"
                path="/kullanim-kosullari"
                description="POSBul kullanım koşulları. Hizmet tanımı, sorumluluk sınırları ve yasal bilgiler."
            />
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
                        Kullanım <span className="text-primary">Koşulları</span>
                    </h1>
                    <p className="mb-8 text-sm text-slate-400">Son güncelleme: Şubat 2026</p>
                </AnimatedSection>

                <AnimatedSection delay={0.1} className="prose-sm space-y-6">
                    {[
                        {
                            title: "1. Hizmet Tanımı",
                            body: "POSBul, Türkiye'deki sanal POS sağlayıcılarını karşılaştıran ücretsiz bir bilgi platformudur. Sunulan bilgiler yalnızca bilgilendirme amaçlıdır ve finansal tavsiye niteliği taşımaz.",
                        },
                        {
                            title: "2. Kullanım Koşulları",
                            body: "Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız. İçeriklerimizi kişisel kullanım amacıyla görüntüleyebilirsiniz. Ticari amaçlı kopyalama veya dağıtım yazılı izin gerektirir.",
                        },
                        {
                            title: "3. Bilgi Doğruluğu",
                            body: "Komisyon oranları ve sağlayıcı bilgileri düzenli olarak güncellenmekle birlikte, anlık değişiklikler nedeniyle farklılıklar olabilir. Güncel oranlar için ilgili sağlayıcının resmi sitesini kontrol ediniz.",
                        },
                        {
                            title: "4. Bağlantılar",
                            body: "Sitemizdeki 'Hemen Başvur' bağlantıları sizi üçüncü taraf sağlayıcıların web sitelerine yönlendirir. Bu sitelerin içerikleri ve gizlilik politikaları bizim sorumluluğumuzda değildir.",
                        },
                        {
                            title: "5. Sorumluluk Sınırı",
                            body: "POSBul, platformda yayınlanan bilgilere dayanarak alınan kararlardan kaynaklanan doğrudan veya dolaylı zararlardan sorumlu tutulamaz.",
                        },
                        {
                            title: "6. Değişiklikler",
                            body: "Bu kullanım koşulları önceden bildirimde bulunmaksızın güncellenebilir. Güncellenmiş koşullar sitede yayınlandığı anda yürürlüğe girer.",
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
