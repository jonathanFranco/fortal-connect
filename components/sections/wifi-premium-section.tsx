"use client";

import { useAutoplayVideo } from "@/hooks/use-autoplay-video";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function WiFiPremiumSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { videoRef, videoError, getVideoProps } = useAutoplayVideo({
    active: inView,
    defaultCrossOrigin: "anonymous",
  });

  const getVideoSrc = () => {
    return "https://cdn.pixabay.com/video/2020/08/27/48420-453832153_large.mp4";
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="wifi-premium"
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-to-bl from-primary-500/5 via-background to-primary-100/5 py-20 md:py-28 lg:py-32"
      aria-labelledby="wifi-premium-heading"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-10 h-[360px] w-[360px] rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute bottom-10 -right-10 h-[280px] w-[280px] rounded-full bg-primary-700/10 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative">
        <div className="grid items-center gap-10 md:gap-12 lg:gap-16 xl:gap-20 md:grid-cols-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="order-2 mx-auto w-[260px] sm:w-[300px] md:order-1"
            aria-hidden
          >
            <div className="relative aspect-[9/19] w-full rounded-[2.2rem] border border-black/40 bg-black shadow-2xl shadow-primary/20">
              <div className="absolute left-1/2 top-1.5 h-4 w-24 -translate-x-1/2 rounded-b-2xl bg-black/70" />
              <div className="absolute inset-[6px] overflow-hidden rounded-[2rem] border border-white/5 bg-black">
                {!videoError ? (
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    aria-label="Vídeo de demonstração Wi‑Fi Premium"
                    {...getVideoProps({ poster: "/placeholder.jpg" })}
                  >
                    <source src={getVideoSrc()} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src="/placeholder.jpg"
                    alt="Wi‑Fi Premium"
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="order-1 md:order-2"
          >
            <div
              className={`inline-flex bg-primary-500/10 items-center mb-5 rounded-full border border-primary-500/20 px-3 py-1 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
            >
              {" WI‑FI PREMIUM"}
            </div>
            <h2
              id="wifi-premium-heading"
              className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              <span className="block">{"Um novo nível de excelência"}</span>
              <span className="block text-primary-500">{"em redes Wi‑Fi"}</span>
            </h2>

            <p className="mt-4 max-w-[56ch] text-lg text-muted-foreground">
              {`Oferecemos conexão estável e de alta velocidade, garantindo
              desempenho superior para empresas e usuários que precisam de
              internet confiável, segura e eficiente.`}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
