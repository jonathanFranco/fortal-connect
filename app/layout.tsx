import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const sans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Fortal Connect — Informática e Segurança Eletrônica em Fortaleza",
  description:
    "Manutenção de computadores e redes para empresas, assistência técnica no Itaperi, instalação de câmeras de segurança e redes Wi-Fi e cabeada em Fortaleza. Desde 2010.",
  keywords: [
    "manutenção de TI para empresas Fortaleza",
    "assistência técnica Itaperi",
    "instalação de câmeras Fortaleza",
    "rede Wi-Fi empresarial Fortaleza",
    "kit CFTV Intelbras",
  ],
  openGraph: {
    title: "Fortal Connect — Informática e Segurança Eletrônica em Fortaleza",
    description:
      "Rede no ar, PC rodando, câmera gravando. Manutenção, assistência técnica, câmeras e redes desde 2010.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    siteName: "Fortal Connect",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4f1" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="fc-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
