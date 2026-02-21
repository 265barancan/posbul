import CompareTable from "../components/sections/CompareTable";
import AnimatedSection from "../components/ui/AnimatedSection";
import SEO from "../components/ui/SEO";

export default function ComparePage() {
    return (
        <div className="py-8 sm:py-12">
            <SEO
                title="Sanal POS Karşılaştırma"
                path="/karsilastir"
                description="Seçtiğiniz sanal POS sağlayıcılarını komisyon, hız ve özellik bazında yan yana karşılaştırın."
            />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <AnimatedSection>
                    <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
                        Sanal POS <span className="text-primary">Karşılaştırma</span>
                    </h1>
                    <p className="mb-8 text-base text-slate-500 dark:text-slate-400">
                        Seçtiğiniz sanal POS sağlayıcılarını detaylı olarak karşılaştırın.
                    </p>
                </AnimatedSection>
                <CompareTable />
            </div>
        </div>
    );
}
