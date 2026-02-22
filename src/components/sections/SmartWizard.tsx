import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "../ui/AnimatedSection";
import { useFilterStore } from "../../store/filterStore";

const STEPS = [
    {
        id: "volume",
        title: "Aylık Cironuz Ne Kadar?",
        options: [
            { label: "0 - 50.000 TL", value: "low" },
            { label: "50.000 - 250.000 TL", value: "medium" },
            { label: "250.000 TL Üzeri", value: "high" },
        ]
    },
    {
        id: "companyType",
        title: "Firma Tipiniz Nedir?",
        options: [
            { label: "Bireysel / Şahıs", value: "bireysel" },
            { label: "Limited / A.Ş.", value: "kurumsal" },
        ]
    },
    {
        id: "installments",
        title: "Taksit Seçeneklerine İhtiyacınız Var mı?",
        options: [
            { label: "Evet, Müşterilerim Taksit İstiyor", value: "yes" },
            { label: "Hayır, Tek Çekim Yeterli", value: "no" },
        ]
    }
];

export default function SmartWizard() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const setSegment = useFilterStore(state => state.setSegment);

    const handleOptionSelect = (stepId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [stepId]: value }));

        if (currentStep < STEPS.length - 1) {
            setTimeout(() => setCurrentStep(prev => prev + 1), 300);
        } else {
            // Final Step - Process answers and navigate
            completeWizard({ ...answers, [stepId]: value });
        }
    };

    const completeWizard = (finalAnswers: Record<string, string>) => {
        // Map answers to store filters
        setSegment(finalAnswers.companyType === "bireysel" ? "bireysel" : "kurumsal");

        // Use timeout to allow state to settle, then navigate
        setTimeout(() => {
            navigate("/karsilastir");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <section className="py-16 sm:py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
            {/* Background Decorations */}
            <div className="absolute top-0 right-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection className="text-center mb-10">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
                        <span className="material-symbols-outlined mr-2 text-[18px]">auto_awesome</span>
                        Akıllı Asistan
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                        Size En Uygun POS Firmasını Bulalım
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        3 kısa soruyu yanıtlayın, işletmenize özel en düşük komisyonlu sanal POS seçeneklerini saniyeler içinde listeleyelim.
                    </p>
                </AnimatedSection>

                {/* Wizard Container */}
                <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:shadow-none">

                    {/* Progress Bar */}
                    <div className="mb-8 relative">
                        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                            <motion.div
                                className="h-full rounded-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                        <div className="mt-2 text-right text-xs font-medium text-slate-500">
                            Adım {currentStep + 1} / {STEPS.length}
                        </div>
                    </div>

                    {/* Question Area */}
                    <div className="min-h-[200px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                                    {STEPS[currentStep].title}
                                </h3>

                                <div className="space-y-3">
                                    {STEPS[currentStep].options.map((option) => {
                                        const isSelected = answers[STEPS[currentStep].id] === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => handleOptionSelect(STEPS[currentStep].id, option.value)}
                                                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${isSelected
                                                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                    : "border-slate-200 hover:border-primary/50 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-primary/50 dark:hover:bg-slate-800/50"
                                                    }`}
                                            >
                                                <span className={`font-semibold text-lg ${isSelected ? "text-primary hover:text-primary" : "text-slate-700 dark:text-slate-200"
                                                    }`}>
                                                    {option.label}
                                                </span>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? "border-primary bg-primary" : "border-slate-300 dark:border-slate-600"
                                                    }`}>
                                                    {isSelected && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="mt-10 flex justify-between items-center relative z-20">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`flex items-center text-sm font-semibold transition-colors ${currentStep === 0 ? "text-slate-300 dark:text-slate-600 cursor-not-allowed" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
                            Geri Dön
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
