<div align="center">

<img src="public/logo-light.png" alt="Fortal Connect" width="260" />

# Fortal Connect

**Informática e Segurança Eletrônica em Fortaleza — desde 2010.**

Landing page institucional com cenas 3D interativas, chat guiado que leva direto pro WhatsApp e SEO local caprichado.

[![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-000?logo=threedotjs)](https://threejs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-runtime-fbf0df?logo=bun)](https://bun.sh)

🌐 **[www.fortalconnect.com.br](https://www.fortalconnect.com.br)**

</div>

---

## ✨ Destaques

- 🗺️ **Cenas 3D em Three.js**, carregadas sob demanda só quando entram na tela:
  - **Mapa** — Brasil → Ceará → Fortaleza, com anéis de cobertura.
  - **Sinal** — campo de partículas reagindo ao ponteiro (Wi-Fi Premium).
  - **CFTV** — cidade em grade com **simulação de trânsito** (semáforos, aceleração, frenagem e fila de carros) sob o olhar das câmeras.
- ♿ **Respeita o usuário**: `prefers-reduced-motion`, modo *low power* em aparelhos fracos, fallback sem WebGL e canvas `aria-hidden`.
- 💬 **Chat guiado** — fluxo de perguntas que monta um resumo e abre o WhatsApp com a mensagem pronta.
- 🔍 **SEO local** — JSON-LD `LocalBusiness` + `FAQPage`, `sitemap.xml`, `robots.txt`, manifest e Open Graph.
- 🌗 **Tema claro/escuro** com `next-themes`, e as cenas 3D trocam de paleta junto.
- 📦 **Export estático** (`output: "export"`) — roda em qualquer hospedagem, inclusive cPanel.

## 🧱 Stack

| Camada | Ferramentas |
| --- | --- |
| Framework | Next.js 15 (App Router) · React 19 · TypeScript |
| Estilo | Tailwind CSS · shadcn/ui (Radix) · lucide-react |
| 3D | Three.js com shaders próprios |
| Formulários | react-hook-form · zod · react-imask |
| Runtime / CI | Bun · GitHub Actions · deploy via FTP |

## 🚀 Começando

Requer [Bun](https://bun.sh) (ou Node 20+ com pnpm).

```bash
bun install
bun dev          # http://localhost:3000
```

Prefere não instalar o Bun? Rode o mesmo ambiente de dev, com hot reload, via Docker:

```bash
docker compose up --build
```

Detalhes em [`docker-readme.md`](docker-readme.md).

| Script | O que faz |
| --- | --- |
| `bun dev` | Servidor de desenvolvimento |
| `bun run build` | Gera o site estático em `out/` |
| `bun run lint` | Lint do Next |

Para conferir o build localmente, sirva a pasta `out/` com qualquer servidor estático:

```bash
bun run build && bunx serve out
```

## 🗂️ Estrutura

```text
app/                 # layout, página única, sitemap, robots, manifest
components/
  sections/          # hero, serviços, manutenção, wi-fi, kits, FAQ, contato...
  chat/              # launcher + painel do chat guiado
  three/             # <ThreeCanvas> — carrega a cena certa via import dinâmico
  layout/            # navbar e footer
  ui/                # componentes shadcn/ui
lib/
  content.ts         # todo o texto do site (serviços, kits, FAQ, depoimentos)
  chat-flow.ts       # passos e ramificações do chat
  seo.ts             # dados estruturados (JSON-LD)
  three/             # cenas: map, signal, cctv + simulação de trânsito
utils/constants.ts   # contatos, WhatsApp, endereço, redes sociais
public/              # logos, og-image, .htaccess
```

## ✏️ Editando conteúdo

Quase tudo que aparece na página é dado, não JSX:

- **Textos, serviços, kits, FAQ** → [`lib/content.ts`](lib/content.ts)
- **Telefone, WhatsApp, e-mail, endereço, horário** → [`utils/constants.ts`](utils/constants.ts)
- **Perguntas do chat** → [`lib/chat-flow.ts`](lib/chat-flow.ts)
- **Dados para o Google** → [`lib/seo.ts`](lib/seo.ts)

## 🎥 Cenas 3D

Cada cena exporta um `SceneInit` (`container, options) => SceneHandle` e usa os helpers de [`lib/three/loop.ts`](lib/three/loop.ts) para renderer, loop e ponteiro. O [`ThreeCanvas`](components/three/three-canvas.tsx) cuida de:

1. checar suporte a WebGL;
2. esperar o elemento ficar visível (`IntersectionObserver`);
3. importar a cena dinamicamente (code-splitting);
4. repassar mudanças de tema e liberar recursos no unmount.

Nova cena = novo arquivo em `lib/three/` + uma entrada no mapa `scenes` do `ThreeCanvas`.

## 🚢 Deploy

Todo push na `master` dispara o workflow [`deploy.yml`](.github/workflows/deploy.yml): instala com Bun, gera `out/` e envia por FTP para o cPanel.

Secrets necessários no repositório:

| Secret | Descrição |
| --- | --- |
| `CPANEL_FTP_HOST` | Host FTP |
| `CPANEL_FTP_USER` | Usuário FTP |
| `CPANEL_FTP_PASS` | Senha FTP |

> ⚠️ O deploy usa `dangerous-clean-slate: true` — o diretório remoto é limpo a cada envio.

## 📍 Contato

**Fortal Connect** · Av. Bernardo Manoel, 9050, Sala 03 — Pátio Jardins Itaperi, Fortaleza – CE
📞 (85) 98175-1616 · ✉️ comercial@fortalconnect.com.br · 📸 [@fortalconnect](https://www.instagram.com/fortalconnect)
