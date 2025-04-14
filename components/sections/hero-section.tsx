"use client";

import { Button } from "@/components/ui/button";
import { Links } from "@/utils/constants";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Shield, Wifi, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAutoplayVideo } from "@/hooks/use-autoplay-video";

const FloatingIcon = ({ icon: Icon, delay, x, y }: any) => (
  <motion.div
    className="absolute"
    style={{
      top: `calc(50% + ${y * 5}px)`,
      left: `calc(50% + ${x * 5}px)`,
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: [y, -y, y],
      x: [x, -x, x],
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      y: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 5,
        delay,
        repeatType: "reverse",
      },
      x: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 5,
        delay,
        repeatType: "reverse",
      },
    }}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background p-2 shadow-lg">
      <Icon className="h-6 w-6 text-primary-500" />
    </div>
  </motion.div>
);

const HeroHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-4"
  >
    <div className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/5 px-3 py-1 text-sm font-medium text-primary">
      {"Soluções em tecnologia e segurança"}
    </div>
    <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
      <span className="block">{"Proteja e conecte"}</span>
      <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
        {"seu mundo digital"}
      </span>
    </h1>
    <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
      {`Manutenção, assistência técnica, câmeras de segurança e redes de alta
      performance para sua empresa ou residência.`}
    </p>
  </motion.div>
);

const HeroButtons = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex flex-col gap-4 sm:flex-row"
  >
    <Button
      asChild
      size="lg"
      className="group relative overflow-hidden rounded-full bg-primary-500 px-8 py-6 text-lg transition-all hover:bg-primary-500/90 hover:shadow-lg hover:shadow-primary/20"
    >
      <Link
        href={Links.WHATSAPP}
        className="text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="relative z-10">{"Solicitar Orçamento"}</span>
        <span className="absolute inset-0 z-0 translate-y-[100%] bg-gradient-to-r from-primary-500 to-primary-700 opacity-0 transition-all duration-300 group-hover:translate-y-[0%] group-hover:opacity-100"></span>
        <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
    <Button
      variant="outline"
      size="lg"
      asChild
      className="rounded-full border-primary-500/20 px-8 py-6 text-lg hover:bg-primary-500/5 hover:text-primary"
    >
      <Link
        href="#services"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("services")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {"Conheça Nossos Serviços"}
      </Link>
    </Button>
  </motion.div>
);

const HeroHighlights = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
  >
    {[
      "Atendimento 24/7",
      "Profissionais certificados",
      "Garantia de serviço",
    ].map((highlight, index) => (
      <span key={index} className="flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-primary-500"></span>
        {highlight}
      </span>
    ))}
  </motion.div>
);

const HeroImage = ({
  floatingIcons,
  videoError,
  setVideoError,
  getVideoSrc,
}: any) => {
  const { videoRef, getVideoProps } = useAutoplayVideo();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative flex items-center justify-center"
    >
      <div className="relative h-[300px] w-[300px] md:h-[500px] md:w-[500px]">
        <div className="absolute inset-0 rounded-full border border-primary-500/20 bg-gradient-to-br from-background via-primary/5 to-primary-700/5"></div>
        <div className="absolute inset-4 overflow-hidden rounded-full border border-primary-500/10 bg-background/80 shadow-xl backdrop-blur-sm">
          {!videoError ? (
            <video
              ref={videoRef}
              className="w-full h-full rounded-xl object-cover"
              {...getVideoProps({
                poster: "/placeholder.jpg",
                crossOrigin: "anonymous",
                onError: () => setVideoError(true),
              })}
              aria-label="Vídeo de fundo: Equipe Fortal Connect"
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
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-primary-500/60 via-primary-500/30 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const getVideoSrc = () => {
    const url = "https://cdn.pixabay.com/video/2025/10/06/308209_large.mp4";
    try {
      return url;
    } catch {
      setVideoError(true);
    }
    return url;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const floatingIcons = [
    { icon: Shield, delay: 0, x: -15, y: -20 },
    { icon: Wifi, delay: 0.5, x: 20, y: 15 },
    { icon: Camera, delay: 1, x: -20, y: 10 },
    { icon: Wrench, delay: 1.5, x: 15, y: -15 },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary-500/5 via-background to-primary-700/5 pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32 xl:pt-32 xl:pb-40">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] xl:h-[450px] xl:w-[450px] rounded-full bg-primary-700/5 blur-3xl" />
        <div className="absolute top-[40%] left-[20%] h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px] rounded-full bg-primary-500/5 blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1000px] md:max-w-[1100px] lg:max-w-[1200px] xl:max-w-[1400px]">
          <div className="grid gap-8 md:gap-12 grid-cols-1 xl:grid-cols-2 lg:gap-16 xl:gap-20 items-center place-items-center">
            <div className="flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
              <HeroHeader />
              <HeroButtons />
              <HeroHighlights />
            </div>

            <div className="flex justify-center lg:justify-end">
              <HeroImage
                floatingIcons={floatingIcons}
                videoError={videoError}
                setVideoError={setVideoError}
                getVideoSrc={getVideoSrc}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
