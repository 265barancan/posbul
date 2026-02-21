import { Link } from "react-router-dom";
import AnimatedSection from "../components/ui/AnimatedSection";

export default function NotFoundPage() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center py-16">
            <AnimatedSection className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600">
                        search_off
                    </span>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    404
                </h1>
                <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
                    Aradığınız sayfa bulunamadı.
                </p>
                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                    Bu sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                >
                    <span className="material-symbols-outlined text-[18px]">home</span>
                    Ana Sayfaya Dön
                </Link>
            </AnimatedSection>
        </div>
    );
}
