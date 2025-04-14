"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Empresário",
      content:
        "A Fortal Connect transformou completamente a segurança da minha empresa. O sistema de câmeras instalado é de excelente qualidade e o suporte técnico é sempre rápido e eficiente.",
    },
    {
      name: "Ana Oliveira",
      role: "Gerente de TI",
      content:
        "A rede Wi-Fi instalada pela Fortal Connect atendeu perfeitamente às necessidades da nossa empresa. A velocidade e estabilidade são excelentes, e o contrato de manutenção nos dá tranquilidade.",
    },
    {
      name: "Roberto Santos",
      role: "Proprietário de Condomínio",
      content:
        "Contratamos a Fortal Connect para instalar câmeras de segurança em nosso condomínio e o resultado foi excelente. A equipe é muito profissional e o sistema funciona perfeitamente.",
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
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-muted/80 via-muted to-muted/80 py-20 md:py-28 lg:py-32"
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
            badge="Depoimentos"
            title="O que nossos clientes dizem"
            description="Veja o que nossos clientes têm a dizer sobre nossos serviços e atendimento."
            badgeClassName="bg-primary-500/10 text-primary-500border-primary-500/20"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                className="h-full border-primary-500/10 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-primary-500/5 hover:shadow-lg hover:shadow-primary/5"
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
