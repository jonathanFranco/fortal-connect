import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/lib/content";
import { Plus } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="section">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading id="faq-titulo" label="Dúvidas" title="Perguntas frequentes." />
        </div>

        <div data-reveal className="divide-y border-y">
          {faq.map(({ q, a }) => (
            <details key={q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold tracking-tight transition-colors hover:text-primary-500">
                {q}
                <Plus className="h-5 w-5 shrink-0 text-primary-500 transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[60ch] pb-6 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
