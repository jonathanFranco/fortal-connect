import { pains } from "@/lib/content";
import type { CSSProperties } from "react";

export function PainsSection() {
  return (
    <section id="dores" aria-labelledby="dores-titulo" className="section !pb-0">
      <div className="shell">
        <h2
          id="dores-titulo"
          data-reveal
          className="heading-lg max-w-[22ch] text-balance"
        >
          Se alguma dessas parece familiar, <span className="text-primary-500">a gente resolve.</span>
        </h2>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pains.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              data-reveal
              style={{ "--d": `${i * 80}ms` } as CSSProperties}
              className="group bg-background p-6 transition-colors duration-500 hover:bg-card sm:p-7"
            >
              <Icon
                className="h-7 w-7 text-primary-500 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                strokeWidth={1.75}
              />
              <h3 className="mt-6 font-display text-lg font-bold leading-tight tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
