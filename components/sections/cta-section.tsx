"use client";

import { Button } from "@/components/ui/button";
import { Links } from "@/utils/constants";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { JSX, useRef } from "react";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 py-20 md:py-28 lg:py-32 text-primary-foreground"
    >
      <BackgroundDecorations />
      <GridOverlay />
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <HeaderContent isInView={isInView} />
          <ActionButtons isInView={isInView} />
          <Features isInView={isInView} />
        </div>
      </div>
      <BottomDecoration />
    </section>
  );
}

function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-[60%] -right-[10%] h-[250px] w-[250px] rounded-full bg-white/10 blur-3xl" />
    </div>
  );
}

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}

function HeaderContent({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-white"
    >
      <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
        {"Pronto para começar?"}
      </div>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
        {"Transforme sua segurança e conectividade"}
      </h2>
      <p className="mx-auto max-w-[800px] text-lg/relaxed md:text-xl/relaxed lg:text-2xl/relaxed">
        {`Entre em contato hoje mesmo e descubra como a Fortal Connect pode ajudar
        sua empresa ou residência.`}
      </p>
    </motion.div>
  );
}

function ActionButtons({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col gap-4 sm:flex-row"
    >
      <Button
        size="lg"
        variant="secondary"
        className="group relative overflow-hidden rounded-full bg-white px-8 py-6 text-lg text-primary-500 transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20"
        asChild
      >
        <Link href={Links.WHATSAPP} target="_blank" rel="noopener noreferrer">
          <span className="relative z-10">{"Solicitar Orçamento"}</span>
          <span className="absolute inset-0 z-0 translate-y-[100%] bg-gradient-to-r from-white to-white/80 opacity-0 transition-all duration-300 group-hover:translate-y-[0%] group-hover:opacity-100"></span>
          <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="rounded-full border-white/20 bg-white/10 px-8 py-6 text-lg text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
        asChild
      >
        <Link href={Links.CALL}>{"Ligar Agora"}</Link>
      </Button>
    </motion.div>
  );
}

function Features({ isInView }: { isInView: boolean }) {
  const features = [
    {
      icon: (
        <>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </>
      ),
      text: "Instalação rápida",
    },
    {
      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
      text: "Garantia de 1 ano",
    },
    {
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </>
      ),
      text: "Suporte 24/7",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white"
    >
      {features.map((feature, index) => (
        <FeatureItem key={index} icon={feature.icon} text={feature.text} />
      ))}
    </motion.div>
  );
}

function FeatureItem({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          {icon}
        </svg>
      </div>
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
}

function BottomDecoration() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
}
