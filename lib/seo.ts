import { faq, services } from "@/lib/content";
import { Links } from "@/utils/constants";

export const SITE_URL = "https://www.fortalconnect.com.br";

const abs = (path: string) => new URL(path, SITE_URL).toString();

export function structuredData() {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#empresa`,
    name: "Fortal Connect",
    slogan: "Informática e Segurança Eletrônica",
    description:
      "Contrato de manutenção de computadores e redes, assistência técnica, câmeras de segurança e redes Wi-Fi e cabeada em Fortaleza, desde 2010.",
    url: SITE_URL,
    image: abs("/og-image.jpg"),
    logo: abs("/logo-light.png"),
    telephone: "+55-85-98175-1616",
    email: Links.EMAIL.replace("mailto:", ""),
    foundingDate: "2010",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Bernardo Manoel, 9050, Sala 03 - Pátio Jardins Itaperi",
      addressLocality: "Fortaleza",
      addressRegion: "CE",
      addressCountry: "BR",
    },
    hasMap: Links.MAP,
    areaServed: { "@type": "City", name: "Fortaleza" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    knowsAbout: ["Intelbras", "HiLook", "Ubiquiti", "CFTV", "Redes Wi-Fi", "Cabeamento estruturado"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
    sameAs: [Links.INSTAGRAM, Links.FACEBOOK],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: SITE_URL,
    name: "Fortal Connect",
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#empresa` },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return [business, website, faqPage];
}
