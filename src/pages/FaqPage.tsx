import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";

const FAQS = [
    {
        q: "Sanal POS nedir?",
        a: "Sanal POS, fiziksel bir POS cihazı olmadan internet üzerinden kredi kartı ve banka kartı ile ödeme almayı sağlayan dijital ödeme altyapısıdır.",
    },
    {
        q: "Hangi sanal POS sağlayıcısını seçmeliyim?",
        a: "Seçiminiz iş modelinize bağlıdır. Düşük komisyon istiyorsanız Param, hızlı ödeme istiyorsanız PayTR, kolay entegrasyon istiyorsanız iyzico iyi seçeneklerdir. Karşılaştırma aracımızı kullanarak ihtiyaçlarınıza en uygun sağlayıcıyı bulabilirsiniz.",
    },
    {
        q: "Sanal POS entegrasyonu ne kadar sürer?",
        a: "Çoğu modern sanal POS sağlayıcısı detaylı API dokümantasyonu ve SDK'lar sunar. Basit bir entegrasyon 1-3 gün, kapsamlı bir entegrasyon 1-2 hafta sürebilir.",
    },
    {
        q: "Komisyon oranları neden farklı?",
        a: "Komisyon oranları sağlayıcıya, sektöre, aylık işlem hacmine ve taksit sayısına göre değişir. Yüksek hacimli işletmeler genellikle daha düşük oranlar alabilir.",
    },
    {
        q: "3D Secure nedir?",
        a: "3D Secure, online kart ödemelerinde ek bir güvenlik katmanı sağlayan doğrulama sistemidir. Müşteriden SMS veya mobil uygulama ile onay istenir.",
    },
    {
        q: "POSBul ücretsiz mi?",
        a: "Evet! POSBul'u kullanmak tamamen ücretsizdir. Sağlayıcıları karşılaştırma, komisyon hesaplama ve blog içeriklerimizden ücretsiz faydalanabilirsiniz.",
    },
];

export default function FaqPage() {
    return (
        <div className="py-10 sm:py-16">
            <SEO
                title="Sıkça Sorulan Sorular"
                path="/sss"
                description="Sanal POS nedir? Nasıl seçilir? POSBul hakkında en çok merak edilen soruların yanıtları."
            />
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                        Sıkça Sorulan <span className="text-primary">Sorular</span>
                    </h1>
                    <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
                        Sanal POS ve POSBul hakkında en çok merak edilen sorular.
                    </p>
                </AnimatedSection>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <AnimatedSection
                            key={i}
                            delay={i * 0.08}
                            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                        >
                            <h3 className="flex items-start gap-3 text-base font-semibold text-slate-900 dark:text-white">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    ?
                                </span>
                                {faq.q}
                            </h3>
                            <p className="mt-3 pl-9 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {faq.a}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
}
