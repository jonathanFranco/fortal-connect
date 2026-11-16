import { ThreeCanvas } from "@/components/three/three-canvas";
import { Links } from "@/utils/constants";
import { ArrowUpRight } from "lucide-react";

const specs = [
  { value: "Ubiquiti", label: "Equipamentos" },
  { value: "Estável", label: "Conexão" },
  { value: "Segura", label: "Rede" },
];

export function WiFiPremiumSection() {
  return (
    <section
      id="wifi-premium"
      aria-labelledby="wifi-titulo"
      className="dark relative isolate overflow-hidden bg-[#08090b] text-foreground"
    >
      <ThreeCanvas scene="signal" forceDark className="absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#08090b] via-transparent to-[#08090b] md:bg-gradient-to-r md:from-[#08090b]/90 md:via-[#08090b]/40 md:to-transparent"
      />

      <div className="shell flex min-h-[85svh] flex-col justify-center py-24 sm:py-32">
        <p data-reveal className="label-mono flex items-center gap-3">
          <span className="h-px w-8 bg-primary-500" />
          Wi-Fi Premium
        </p>
        <h2 id="wifi-titulo" data-reveal className="heading-xl mt-6 max-w-[13ch]">
          Um novo nível de <span className="text-primary-500">sinal.</span>
        </h2>
        <p data-reveal className="mt-7 max-w-[48ch] text-muted-foreground sm:text-lg">
          Velocidade contratada não basta: sem cabeamento e roteador no lugar
          certo, o Wi-Fi cai e o prejuízo aparece. A gente projeta a rede para
          sua empresa — e até para a barraca de praia.
        </p>

        <div data-reveal className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center">
          <a
            href={Links.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group self-start"
          >
            Quero Wi-Fi Premium
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <dl className="flex gap-8">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="label-mono !text-[0.6rem]">{s.label}</dt>
                <dd className="font-display text-xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="label-mono mt-16 hidden !text-[0.65rem] md:block">
          ↳ Mova o cursor — o sinal acompanha você
        </p>
      </div>
    </section>
  );
}
