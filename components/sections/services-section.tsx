import { SectionHeading } from "@/components/ui/section-heading";
import { brands, services } from "@/lib/content";
import { whatsapp } from "@/utils/constants";
import { ArrowUpRight, Check } from "lucide-react";
import type { CSSProperties } from "react";

export function ServicesSection() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="section">
      <div className="shell">
        <SectionHeading
          id="servicos-titulo"
          label="Serviços"
          title={
            <>
              Soluções completas, <span className="text-primary-500">do cabo à câmera.</span>
            </>
          }
          description="Quatro frentes, uma equipe. Cada serviço com orçamento direto no WhatsApp."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-5">
          {services.map(({ icon: Icon, title, description, bullets, message }, i) => {
            const featured = i === 0;
            return (
              <li
                key={title}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as CSSProperties}
                className={featured ? "md:col-span-3" : ""}
              >
                <a
                  href={whatsapp(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex h-full flex-col overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8 ${
                    featured
                      ? "rounded-2xl bg-primary-500 text-white"
                      : "card-surface"
                  }`}
                >
                  {featured ? (
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [--grid-line:0_0%_100%/0.1]" />
                  ) : (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-primary-500/0 blur-3xl transition-colors duration-500 group-hover:bg-primary-500/20"
                    />
                  )}

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className={`viewfinder grid h-14 w-14 place-items-center rounded-lg ${
                        featured ? "text-white [--vf-color:rgb(255_255_255/0.6)]" : "text-primary-500"
                      }`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    {featured && (
                      <span className="rounded-full bg-white px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-primary-600">
                        Mais procurado
                      </span>
                    )}
                  </div>

                  <h3 className="relative mt-10 font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                    {title}
                  </h3>
                  <p className={`relative mt-3 max-w-[42ch] ${featured ? "text-white/85" : "text-muted-foreground"}`}>
                    {description}
                  </p>

                  {bullets && (
                    <ul className="relative mt-6 flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-x-8">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-sm font-medium">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-primary-500">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span
                    className={`relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold transition-colors ${
                      featured ? "text-white" : "text-foreground/70 group-hover:text-primary-500"
                    }`}
                  >
                    {featured ? "Quero um contrato" : "Pedir orçamento"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  {!featured && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary-500 transition-transform duration-500 group-hover:scale-x-100"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="label-mono">Trabalhamos com</span>
          {brands.map((b) => (
            <span key={b} className="font-display text-lg font-bold tracking-tight text-foreground/60">
              {b}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
