"use client"

import { useRef } from "react"
import { Shield, Wifi, Clock, Wrench, Phone, Camera } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { SectionTitle } from "@/components/ui/section-title"
import { BenefitCard } from "@/components/ui/benefit-card"

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const benefits = [
    {
      icon: Shield,
      title: "Segurança Reforçada",
      description: "Proteja seu patrimônio com sistemas de segurança avançados e monitoramento constante.",
    },
    {
      icon: Wifi,
      title: "Conectividade Estável",
      description: "Redes de alta performance que garantem conexão estável e velocidade para todas as suas operações.",
    },
    {
      icon: Clock,
      title: "Tempo de Resposta Rápido",
      description: "Assistência técnica com tempo de resposta rápido, minimizando interrupções nos seus negócios.",
    },
    {
      icon: Wrench,
      title: "Manutenção Preventiva",
      description: "Evite problemas antes que eles ocorram com nossa manutenção preventiva regular.",
    },
    {
      icon: Phone,
      title: "Suporte Especializado",
      description: "Equipe técnica especializada pronta para resolver qualquer problema com eficiência.",
    },
    {
      icon: Camera,
      title: "Monitoramento 24/7",
      description: "Sistemas de câmeras com monitoramento 24 horas por dia, 7 dias por semana.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20 md:py-28 lg:py-32"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[300px] w-[300px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] h-[250px] w-[250px] rounded-full bg-primary-700/5 blur-3xl" />
      </div>

      {/* Padrão de grade */}
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
            badge="Por que nos escolher"
            title="Benefícios dos Nossos Serviços"
            description="Descubra como nossos serviços podem transformar a segurança e a eficiência da sua empresa ou residência."
            badgeClassName="bg-primary-500/10 text-primary-500border-primary-500/20"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BenefitCard
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                className="group h-full border-primary-500/10 bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-primary-500/5 hover:shadow-lg hover:shadow-primary/5"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Círculos decorativos */}
        <div className="absolute bottom-10 right-10 h-20 w-20 rounded-full border border-primary-500/10 bg-primary-500/5" />
        <div className="absolute top-20 left-10 h-12 w-12 rounded-full border border-primary-700/10 bg-primary-700/5" />
      </div>

      {/* Forma decorativa na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  )
}
