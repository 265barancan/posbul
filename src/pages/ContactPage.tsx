import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";

export default function ContactPage() {
    return (
        <div className="py-10 sm:py-16">
            <SEO
                title="İletişim"
                path="/iletisim"
                description="POSBul ile iletişime geçin. Sorularınız ve önerileriniz için bize ulaşın."
            />
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                        Bize <span className="text-primary">Ulaşın</span>
                    </h1>
                    <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
                        Sorularınız veya önerleriniz için bizimle iletişime geçebilirsiniz.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
                    >
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Adınız
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Adınızı girin"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                    E-posta
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="ornek@email.com"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Konu
                            </label>
                            <input
                                id="subject"
                                type="text"
                                placeholder="Mesajınızın konusu"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Mesajınız
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="Mesajınızı yazın..."
                                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:w-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">send</span>
                            Gönder
                        </button>
                    </form>
                </AnimatedSection>

                {/* Contact info */}
                <AnimatedSection delay={0.2} className="mt-10 grid gap-4 sm:grid-cols-3">
                    {[
                        { icon: "mail", label: "E-posta", value: "info@posbul.com" },
                        { icon: "schedule", label: "Çalışma Saatleri", value: "Pzt-Cum 09:00-18:00" },
                        { icon: "location_on", label: "Konum", value: "İstanbul, Türkiye" },
                    ].map((item) => (
                        <div
                            key={item.icon}
                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <span className="material-symbols-outlined text-[20px] text-primary">{item.icon}</span>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-400">{item.label}</p>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </AnimatedSection>
            </div>
        </div>
    );
}
