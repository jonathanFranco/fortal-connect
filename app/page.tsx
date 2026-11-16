import { ChatLauncher } from "@/components/chat/chat-launcher";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { RevealObserver } from "@/components/reveal-observer";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CTASection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { KitsSection } from "@/components/sections/kits-section";
import { MaintenanceSection } from "@/components/sections/maintenance-section";
import { PainsSection } from "@/components/sections/pains-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WiFiPremiumSection } from "@/components/sections/wifi-premium-section";
import { structuredData } from "@/lib/seo";

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="conteudo">
        <HeroSection />
        <PainsSection />
        <ServicesSection />
        <MaintenanceSection />
        <WiFiPremiumSection />
        <KitsSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <ChatLauncher />
      <RevealObserver />
    </>
  );
}
