import { useApplicationStore } from "../../store/applicationStore";
import Button from "../ui/Button";

export default function CustomProposalsSection() {
    const { openModal } = useApplicationStore();

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-16 text-center shadow-2xl dark:from-slate-800 dark:to-slate-900 sm:px-12 lg:px-20">
                    {/* Decorative Background Elements */}
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent" />

                    <div className="relative z-10 mx-auto max-w-3xl">
                        <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[32px] text-white">
                                diamond
                            </span>
                        </div>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            İşletmenize Özel VIP Teklifler
                        </h2>
                        <p className="mb-10 text-lg leading-relaxed text-slate-300">
                            Aradığınız komisyon oranlarını veya taksit avantajlarını bulamadınız mı? Yüksek ciro hedefleriniz için alanında en iyi 3 kurumdan işletmenize özel VIP fiyatlandırma talep edin.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="w-full bg-white text-slate-900 hover:bg-slate-50 hover:text-primary sm:w-auto"
                                icon="mail"
                                onClick={() => openModal({ isGeneral: true })}
                            >
                                Hemen Özel Teklif İsteyin
                            </Button>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
                                Ücretsiz Danışmanlık
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
                                24 Saatte Geri Dönüş
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
                                VIP Komisyon Oranları
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
