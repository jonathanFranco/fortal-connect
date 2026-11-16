import { SectionHeading } from "@/components/ui/section-heading";
import { compare } from "@/lib/content";
import { whatsapp } from "@/utils/constants";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { CSSProperties } from "react";

export function MaintenanceSection() {
  const { react, prevent } = compare;
  return (
    <section id="contrato" aria-labelledby="contrato-titulo" className="section !pt-0">
      <div className="shell">
        <SectionHeading
          id="contrato-titulo"
          label="Contrato de manutenção"
          title={
            <>
              Prever ou reagir? <span className="text-primary-500">Prevenir sai mais barato.</span>
            </>
          }
          description="Sua infraestrutura funcionando sem susto: a gente acompanha de perto e age antes de virar prejuízo."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20">
          <div data-reveal className="rounded-2xl border border-dashed p-6 sm:p-8">
            <p className="label-mono">{react.subtitle}</p>
            <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground/60">
              {react.title}
            </h3>
            <ul className="mt-8 space-y-4">
              {react.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-foreground/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            style={{ "--d": "120ms" } as CSSProperties}
            className="viewfinder rounded-2xl [--vf-color:hsl(var(--primary))] [--vf-size:22px]"
          >
            <div className="h-full rounded-2xl border border-primary-500/40 bg-primary-500/[0.06] p-6 sm:p-8">
              <p className="label-mono !text-primary-500">{prevent.subtitle}</p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight">{prevent.title}</h3>
              <ul className="mt-8 space-y-4">
                {prevent.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-medium">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsapp("Olá! Quero saber mais sobre o contrato de manutenção para minha empresa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group mt-10"
              >
                Montar meu contrato
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
