import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import Input from "../ui/Input";
import AnimatedSection from "../ui/AnimatedSection";
import { useToastStore } from "../../store/toastStore";

export default function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            setError("");

            if (!email.trim()) {
                setError("E-posta adresi boş bırakılamaz.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("Geçerli bir e-posta adresi girin.");
                return;
            }

            setSubmitted(true);
            useToastStore.getState().addToast({
                message: "Başarıyla abone oldunuz! Teşekkürler.",
                variant: "success",
            });
        },
        [email]
    );

    return (
        <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection animation="scale-in">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-8 sm:p-12 lg:p-16">
                        {/* Background Decoration */}
                        <div className="pointer-events-none absolute -right-8 -top-8 opacity-10 sm:opacity-15">
                            <span className="material-symbols-outlined text-[200px] text-white sm:text-[280px]">
                                analytics
                            </span>
                        </div>
                        <div className="pointer-events-none absolute -bottom-4 -left-4 opacity-5">
                            <span className="material-symbols-outlined text-[140px] text-white">
                                trending_up
                            </span>
                        </div>

                        <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                            {/* Content */}
                            <div className="max-w-xl">
                                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                    Oran değişikliklerinden anında haberdar olun
                                </h2>
                                <p className="mt-3 text-base leading-relaxed text-white/80">
                                    Komisyon oranları değiştiğinde, yeni sağlayıcılar eklendiğinde veya
                                    özel kampanyalar başladığında size haber verelim. Ayda en fazla 2
                                    e-posta.
                                </p>
                            </div>

                            {/* Form */}
                            <div className="w-full max-w-sm">
                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center gap-3 rounded-xl bg-white/20 p-4 backdrop-blur-sm"
                                        >
                                            <span className="material-symbols-outlined filled text-[24px] text-emerald-300">
                                                check_circle
                                            </span>
                                            <p className="text-sm font-medium text-white">
                                                Başarıyla abone oldunuz! Teşekkürler.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-3"
                                        >
                                            <Input
                                                type="email"
                                                placeholder="ornek@email.com"
                                                icon="mail"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                error={error}
                                                className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
                                                aria-label="E-posta adresiniz"
                                            />
                                            <Button
                                                type="submit"
                                                variant="secondary"
                                                className="w-full justify-center bg-white text-primary font-bold hover:bg-white/90"
                                                icon="send"
                                            >
                                                Abone Ol
                                            </Button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
