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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-x-hidden">
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
