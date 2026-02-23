import HeroSection from "../components/sections/HeroSection";
import ProviderGrid from "../components/sections/ProviderGrid";
import CalculatorSection from "../components/sections/CalculatorSection";
import WhyUsSection from "../components/sections/WhyUsSection";
import NewsletterCTA from "../components/sections/NewsletterCTA";
import CompareBar from "../components/sections/CompareBar";
import CustomProposalsSection from "../components/sections/CustomProposalsSection";
import SmartWizard from "../components/sections/SmartWizard";
import SEO from "../components/ui/SEO";

export default function HomePage() {
    return (
        <>
            <SEO
                path="/"
                description="Türkiye'nin en güncel sanal POS karşılaştırma platformu. iyzico, PayTR, Param ve daha fazlasını komisyon oranları, ödeme hızı ve özellikleriyle karşılaştırın."
            />
            <HeroSection />
            <SmartWizard />
            <ProviderGrid />
            <CustomProposalsSection />
            <CalculatorSection />
            <WhyUsSection />
            <NewsletterCTA />
            <CompareBar />
        </>
    );
}
