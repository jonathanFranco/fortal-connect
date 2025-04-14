"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useAutoplayVideo } from "@/hooks/use-autoplay-video";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { videoRef, videoError, getVideoProps } = useAutoplayVideo({
    active: isInView,
    defaultCrossOrigin: "anonymous",
  });

  const getVideoSrc = () => {
    const url =
      "https://cdn.pixabay.com/video/2018/03/09/14900-259623335_large.mp4";
    try {
      return url;
    } catch {
  // fallback: hook also sets error on onError; nothing to do here
    }
    return url;
  };

  const features = [
    "Profissionais altamente qualificados",
    "Atendimento personalizado",
    "Soluções sob medida para cada cliente",
    "Compromisso com qualidade e eficiência",
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-muted/80 via-muted to-muted/80 py-20 md:py-28 lg:py-32"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[300px] w-[300px] rounded-full bg-primary-500/5 blur-3xl" />
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
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary">
                {"Sobre Nós"}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="block">{"Fortal Connect"}</span>
                <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  {"Excelência em tecnologia"}
                </span>
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                {`Somos uma empresa especializada em soluções tecnológicas e de
                segurança, com anos de experiência no mercado. Nossa missão é
                proporcionar tranquilidade e eficiência através de serviços de
                alta qualidade.`}
              </p>
            </div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid gap-3"
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-base font-medium">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <div className="rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary">
                {"Desde 2010"}
              </div>
              <div className="rounded-full bg-primary-700/10 px-4 py-2 text-sm font-medium text-secondary">
                {"100+ Cidades"}
              </div>
              <div className="rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary">
                {"Equipe certificada"}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-primary-500/10 bg-background/50 p-2 shadow-xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-700/5 opacity-50" />
              {!videoError ? (
                <video
                  ref={videoRef}
                  className="w-full aspect-[3/2] rounded-xl object-cover"
                  aria-label="Vídeo de fundo: Equipe Fortal Connect"
                  {...getVideoProps({ poster: "/placeholder.jpg" })}
                >
                  <source src={getVideoSrc()} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Equipe Fortal Connect"
                  className="w-full aspect-[3/2] rounded-xl object-cover"
                />
              )}

              <motion.div
                className="absolute bottom-3 right-3 rounded-xl border border-primary-500/10 bg-background p-4 shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {"Clientes atendidos"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">1.000+</p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-primary-500 to-primary-700" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full border border-primary-700/10 bg-primary-700/5" />
            <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full border border-primary-500/10 bg-primary-500/5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
