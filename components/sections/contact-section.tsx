import { SectionHeading } from "@/components/ui/section-heading";
import { Links } from "@/utils/constants";
import { ArrowUpRight, Clock, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import type { CSSProperties } from "react";

const channels = [
  { Icon: Mail, title: "E-mail", detail: Links.EMAIL.replace("mailto:", ""), href: Links.EMAIL },
  { Icon: MapPin, title: "Endereço", detail: Links.ADDRESS, href: Links.MAP },
  { Icon: Clock, title: "Horário", detail: Links.CLOCK.join(" · ") },
  { Icon: Instagram, title: "Instagram", detail: `${Links.INSTAGRAM_HANDLE} — dicas e trabalhos`, href: Links.INSTAGRAM },
];

export function ContactSection() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="section">
      <div className="shell">
        <SectionHeading
          id="contato-titulo"
          label="Contato"
          title="Fale com a gente."
          description="Solicite um orçamento ou tire suas dúvidas. Respondemos rápido."
        />

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-[1.2fr_1fr]">
          <a
            data-reveal
            href={Links.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-primary-500 p-6 text-white transition-transform duration-500 hover:-translate-y-1 sm:p-8"
          >
            <div aria-hidden className="absolute inset-0 bg-grid opacity-40 [--grid-line:0_0%_100%/0.12]" />
            <div className="relative flex items-start justify-between">
              <MessageCircle className="h-8 w-8" strokeWidth={1.75} />
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-primary-500 transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">WhatsApp</p>
              <p className="mt-2 font-display font-bold tracking-tight [font-size:clamp(2rem,1.2rem+3vw,3.5rem)]">
                {Links.PHONE}
              </p>
            </div>
          </a>

          <ul className="grid gap-4">
            {channels.map(({ Icon, title, detail, href }, i) => {
              const body = (
                <>
                  <Icon className="h-5 w-5 shrink-0 text-primary-500" strokeWidth={1.75} />
                  <div className="min-w-0 flex-1">
                    <p className="label-mono !text-[0.65rem]">{title}</p>
                    <p className="mt-1 break-words font-medium">{detail}</p>
                  </div>
                  {href && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary-500" />
                  )}
                </>
              );
              const cls = "card-surface flex items-center gap-4 p-5 sm:p-6";
              return (
                <li key={title} data-reveal style={{ "--d": `${(i + 1) * 90}ms` } as CSSProperties}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`group h-full ${cls}`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={`h-full ${cls}`}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
