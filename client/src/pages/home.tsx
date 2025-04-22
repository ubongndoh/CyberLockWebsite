import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import SolutionOverview from "@/components/solution-overview";
import Sos2aSection from "@/components/sos2a-section";
import PatentSection from "@/components/patent-section";
import CompetitiveComparison from "@/components/competitive-comparison";
import PricingSection from "@/components/pricing-section";
import DemoSection from "@/components/demo-section";
import ContactSection from "@/components/contact-section";
import RoadmapSection from "@/components/roadmap-section";
import AfaaiSection from "@/components/afaai-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <SolutionOverview />
      <Sos2aSection />
      <PatentSection />
      <AfaaiSection />
      <RoadmapSection />
      <CompetitiveComparison />
      <PricingSection />
      <DemoSection />
      <ContactSection />
    </div>
  );
}
