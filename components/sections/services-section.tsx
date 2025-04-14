"use client";

import { FeatureCard } from "@/components/ui/feature-card";
import { SectionTitle } from "@/components/ui/section-title";
import { motion, useInView } from "framer-motion";
import { Camera, Network, Phone, Wrench } from "lucide-react";
import { useRef } from "react";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Wrench,
      title: "Contratos de Manutenção",
      description:
        "Manutenção preventiva e corretiva para garantir o funcionamento contínuo dos seus equipamentos.",
    },
    {
      icon: Phone,
      title: "Assistência Técnica",
      description:
        "Suporte técnico especializado para resolver problemas e otimizar o desempenho dos seus sistemas.",
    },
    {
      icon: Camera,
      title: "Câmeras de Segurança",
      description:
        "Instalação e manutenção de sistemas de vigilância para proteger seu patrimônio e garantir segurança.",
    },
    {
      icon: Network,
      title: "Redes Wi-Fi e Cabeada",
      description:
        "Projeto e implementação de redes de alta performance, garantindo conectividade estável e segura.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20 md:py-28 lg:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] h-[300px] w-[300px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute top-[60%] -left-[10%] h-[250px] w-[250px] rounded-full bg-primary-700/5 blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            badge="Nossos Serviços"
            title="Soluções Completas"
            description="Oferecemos uma ampla gama de serviços para atender todas as suas necessidades tecnológicas e de segurança."
            badgeClassName="bg-primary-500/10 text-primary-500border-primary-500/20"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 md:gap-8 lg:gap-10"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="group h-full border-primary-500/10 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-primary-500/5 hover:shadow-lg hover:shadow-primary/5"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute bottom-10 left-10 h-20 w-20 rounded-full border border-primary-500/10 bg-primary-500/5" />
        <div className="absolute top-20 right-10 h-12 w-12 rounded-full border border-primary-700/10 bg-primary-700/5" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
