import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/content";
import { Star } from "lucide-react";
import type { CSSProperties } from "react";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="depoimentos-titulo" className="section">
      <div className="shell">
        <SectionHeading
          id="depoimentos-titulo"
          label="Depoimentos"
          title="Quem confia, recomenda."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              data-reveal
              style={{ "--d": `${i * 100}ms` } as CSSProperties}
              className="card-surface flex flex-col p-6 sm:p-8"
            >
              <span aria-hidden className="font-display text-6xl font-extrabold leading-none text-primary-500">
                “
              </span>
              <blockquote className="mt-2 flex-1 text-foreground/85">{t.content}</blockquote>
              <div className="mt-8 flex items-center justify-between gap-4 border-t pt-5">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex text-primary-500" role="img" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
