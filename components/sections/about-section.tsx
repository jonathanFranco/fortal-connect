import { ThreeCanvas } from "@/components/three/three-canvas";
import { aboutPoints } from "@/lib/content";
import { Check } from "lucide-react";
import type { CSSProperties } from "react";

export function AboutSection() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="section overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p data-reveal className="label-mono flex items-center gap-3">
            <span className="h-px w-8 bg-primary-500" />
            Sobre nós
          </p>
          <h2 id="sobre-titulo" data-reveal className="heading-lg mt-5 text-balance">
            Desde 2010 mantendo Fortaleza <span className="text-primary-500">conectada e protegida.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-[52ch] text-muted-foreground sm:text-lg">
            Mais de 15 anos instalando câmeras, organizando redes e mantendo
            computadores de empresas e residências funcionando. Agora de casa
            nova: nossa sala fica no Pátio Jardins Itaperi. Venha nos visitar.
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {aboutPoints.map((point, i) => (
              <li
                key={point}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as CSSProperties}
                className="flex items-start gap-3 bg-background p-5"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure data-reveal className="relative">
          <div className="viewfinder rounded-2xl [--vf-size:22px]">
          <div className="relative overflow-hidden rounded-2xl border bg-black">
            <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[4/5]">
              <ThreeCanvas scene="cctv" forceDark className="absolute inset-0" />
            </div>
            <div aria-hidden className="scanlines pointer-events-none absolute inset-0" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/85 sm:p-5 sm:text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary-500 animate-blink" />
                Rec
              </span>
              <span>CAM 01 · Fortal</span>
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white sm:p-6">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
                  De experiência
                </p>
                <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">+15 anos</p>
              </div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
                Desde 2010
              </p>
            </figcaption>
          </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
