import {
  Navbar,
  HeroSection,
  StatsSection,
  BenefitsSection,
  FeaturesSection,
  RoleCardsSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  Footer
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <FeaturesSection />
      <RoleCardsSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
