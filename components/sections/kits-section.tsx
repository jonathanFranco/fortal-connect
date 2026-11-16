import { SectionHeading } from "@/components/ui/section-heading";
import { kits } from "@/lib/content";
import { whatsapp } from "@/utils/constants";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

export function KitsSection() {
  return (
    <section id="kits" aria-labelledby="kits-titulo" className="section">
      <div className="shell">
        <SectionHeading
          id="kits-titulo"
          label="Kits e produtos"
          title={
            <>
              Pronto pra instalar, <span className="text-primary-500">pronto pra usar.</span>
            </>
          }
          description="Kits de câmeras completos e computadores montados e testados na nossa bancada. Consulte disponibilidade e preço atual."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
          {kits.map((kit, i) => (
            <li
              key={kit.title}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as CSSProperties}
              className="card-surface flex flex-col p-6 sm:p-7"
            >
              <span className="self-start rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
                {kit.tag}
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-tight">
                {kit.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {kit.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-md bg-foreground/[0.05] px-2.5 py-1 text-xs font-medium text-foreground/80"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
              <a
                href={whatsapp(kit.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost group mt-auto w-full !mt-8"
              >
                Consultar preço atual
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
