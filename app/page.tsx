"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CTASection } from "@/components/sections/cta-section";
import { WiFiPremiumSection } from "@/components/sections/wifi-premium-section";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { PageLoader } from "@/components/page-loader";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex min-h-screen flex-col"
      >
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <BenefitsSection />
          <TestimonialsSection />
          <WiFiPremiumSection />
          <ContactSection />
          <CTASection />
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </motion.div>
    </>
  );
}
