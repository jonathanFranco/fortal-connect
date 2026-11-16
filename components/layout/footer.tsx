import { nav } from "@/lib/content";
import { Links } from "@/utils/constants";
import { ArrowUp, Facebook, Instagram, MapPin, MessageCircle } from "lucide-react";
import Logo from "../ui/logo";

const social = [
  { label: "Instagram", href: Links.INSTAGRAM, Icon: Instagram },
  { label: "Facebook", href: Links.FACEBOOK, Icon: Facebook },
  { label: "WhatsApp", href: Links.WHATSAPP, Icon: MessageCircle },
  { label: "Google Maps", href: Links.MAP, Icon: MapPin },
];

export function Footer() {
  return (
    <footer className="relative border-t">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo className="h-10 w-auto" />
          <p className="max-w-xs text-sm text-muted-foreground">
            Soluções completas em tecnologia e segurança para sua empresa ou
            residência.
          </p>
          <div className="flex gap-2">
            {social.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-primary-500 hover:text-primary-500"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Rodapé" className="space-y-4">
          <p className="label-mono">Navegação</p>
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-primary-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <p className="label-mono">Contato</p>
          <ul className="space-y-2.5 text-sm text-foreground/80">
            <li>
              <a href={Links.CALL} className="hover:text-primary-500">
                {Links.PHONE}
              </a>
            </li>
            <li>
              <a href={Links.EMAIL} className="break-all hover:text-primary-500">
                {Links.EMAIL.replace("mailto:", "")}
              </a>
            </li>
            <li>
              <a
                href={Links.MAP}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500"
              >
                {Links.ADDRESS}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="shell flex flex-col gap-4 pb-24 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Fortal Connect. Todos os direitos reservados.
            </p>
            <p className="label-mono !text-[0.6rem]">3.7319° S · 38.5267° W — Fortaleza, CE</p>
          </div>
          <a
            href="#topo"
            className="group inline-flex items-center gap-3 self-start text-sm font-medium text-foreground/80 transition-colors hover:text-primary-500 sm:self-auto sm:mr-36"
          >
            Voltar ao topo
            <span className="grid h-10 w-10 place-items-center rounded-full border transition-colors group-hover:border-primary-500">
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
