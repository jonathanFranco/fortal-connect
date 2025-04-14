"use client";

import { ContactInfoItem } from "@/components/ui/contact-info-item";
import { SectionTitle } from "@/components/ui/section-title";
import { Links } from "@/utils/constants";
import { motion, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  type ContactCard = {
    icon: LucideIcon;
    title: string;
    details: string | string[];
    href?: string;
  };

  const contactInfo: ContactCard[] = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: Links.PHONE,
      href: Links.WHATSAPP,
    },
    {
      icon: Mail,
      title: "E-mail",
      details: Links.EMAIL.replace("mailto:", ""),
      href: Links.EMAIL,
    },
    {
      icon: MapPin,
      title: "Endereço",
      details: Links.ADDRESS,
      href: Links.MAP,
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      details: Links.CLOCK,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20 md:py-28 lg:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[300px] w-[300px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] h-[250px] w-[250px] rounded-full bg-primary-700/5 blur-3xl" />
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
            badge="Contato"
            title="Fale Conosco"
            description="Entre em contato para solicitar um orçamento ou tirar suas dúvidas."
            badgeClassName="bg-primary-500/10 text-primary-500border-primary-500/20"
          />
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={itemVariants}>
                {info.href ? (
                  <Link
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={`Abrir ${info.title} em uma nova guia`}
                  >
                    <ContactInfoItem
                      icon={info.icon}
                      title={info.title}
                      details={info.details}
                      className={`cursor-pointer border bg-background/80 p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                        info.title === "WhatsApp"
                          ? "border-primary-500/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-emerald/10"
                          : "border-primary-500/10 hover:border-primary-500/30 hover:bg-primary-500/5 hover:shadow-primary/5"
                      }`}
                      iconClassName={
                        info.title === "WhatsApp"
                          ? "bg-primary-500/10 text-primary-600 group-hover:bg-emerald-500/20 group-hover:text-emerald-700"
                          : undefined
                      }
                      right={
                        info.title === "WhatsApp" ? (
                          <span className="flex items-center gap-2 text-sm font-medium text-emerald-600 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                            Ir para WhatsApp
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        ) : null
                      }
                    />
                  </Link>
                ) : (
                  <ContactInfoItem
                    icon={info.icon}
                    title={info.title}
                    details={info.details}
                    className="border border-primary-500/10 bg-background/80 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-primary-500/5 hover:shadow-lg hover:shadow-primary/5"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-10 h-20 w-20 rounded-full border border-primary-500/10 bg-primary-500/5" />
        <div className="absolute top-20 left-10 h-12 w-12 rounded-full border border-primary-700/10 bg-primary-700/5" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
    </section>
  );
}
