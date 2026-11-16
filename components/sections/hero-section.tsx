import { stats, ticker } from "@/lib/content";
import { Links } from "@/utils/constants";
import { ArrowUpRight } from "lucide-react";
import { HeroVisual } from "./hero-visual";
import type { CSSProperties } from "react";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function HeroSection() {
  return (
    <section id="topo" className="relative isolate overflow-hidden">
      <div className="relative flex min-h-[100svh] flex-col">
        <div
          aria-hidden
          className="absolute -z-10 right-[-20%] top-[10%] h-[70vmin] w-[70vmin] rounded-full bg-primary-500/20 blur-[120px] md:right-[0%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-background/90 via-background/30 to-transparent md:block"
        />

        <div className="shell flex flex-1 flex-col justify-center pb-16 pt-32 sm:pt-36">
          <p className="label-mono animate-rise" style={delay(0)}>
            Informática e segurança eletrônica · desde 2010
          </p>
          <h1 className="heading-xl mt-5 max-w-[14ch]">
            <span className="block animate-rise" style={delay(80)}>
              Rede no ar.
            </span>
            <span className="block animate-rise" style={delay(180)}>
              PC rodando.
            </span>
            <span className="block animate-rise text-primary-500" style={delay(280)}>
              Câmera gravando.
            </span>
          </h1>

          <p
            className="mt-7 max-w-[46ch] text-base text-muted-foreground animate-rise sm:text-lg"
            style={delay(400)}
          >
            Cuidamos dos computadores, do Wi-Fi, do cabeamento e das câmeras da
            sua empresa ou casa em Fortaleza — com manutenção preventiva pra
            nada parar na hora errada.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 animate-rise sm:flex-row"
            style={delay(500)}
          >
            <a
              href={Links.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              Falar no WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#servicos" className="btn-ghost">
              Conheça os serviços
            </a>
          </div>

          <HeroVisual />

          <dl
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t pt-6 animate-rise sm:gap-8 md:mt-14"
            style={delay(650)}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="label-mono !text-[0.6rem] sm:!text-[0.68rem]">{s.label}</dt>
                <dd className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>

      <div className="relative border-y bg-background/60 py-4 backdrop-blur-sm">
        <div className="mask-fade-x flex overflow-hidden">
          <ul className="flex shrink-0 animate-marquee items-center gap-8 pr-8" aria-label="Áreas de atuação">
            {[...ticker, ...ticker].map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= ticker.length}
                className="flex items-center gap-8 whitespace-nowrap font-display text-lg font-semibold tracking-tight sm:text-2xl"
              >
                {t}
                <span className="h-1.5 w-1.5 rotate-45 bg-primary-500" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
