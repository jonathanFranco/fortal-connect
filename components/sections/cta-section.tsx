import { Links } from "@/utils/constants";
import { ArrowUpRight, Building2, ShieldCheck, Zap } from "lucide-react";

const perks = [
  { Icon: Zap, text: "Instalação rápida" },
  { Icon: ShieldCheck, text: "Garantia de 1 ano" },
  { Icon: Building2, text: "Empresas e residências" },
];

export function CTASection() {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary-500 text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid [--grid-line:0_0%_100%/0.1]" />
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 sm:-right-24">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
              style={{ width: n * 180, height: n * 180 }}
            />
          ))}
        </div>

        <div className="shell py-20 sm:py-28">
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">
            Pronto para começar?
          </p>
          <h2 data-reveal className="heading-xl mt-5 max-w-[15ch]">
            Transforme sua segurança e conectividade.
          </h2>
          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={Links.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn group bg-white text-primary-600 hover:bg-white/90"
            >
              Solicitar orçamento
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={Links.CALL}
              className="btn border border-white/30 text-white hover:bg-white/10"
            >
              Ligar agora
            </a>
          </div>
          <ul data-reveal className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6">
            {perks.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4" /> {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
