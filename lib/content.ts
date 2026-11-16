import {
  Camera,
  Cctv,
  Cable,
  Gauge,
  Monitor,
  Network,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Contrato", href: "#contrato" },
  { label: "Kits", href: "#kits" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

export const stats = [
  { value: "2010", label: "No mercado desde" },
  { value: "+15", label: "Anos de experiência" },
  { value: "Itaperi", label: "Loja física" },
] as const;

export const ticker = [
  "Contrato de manutenção",
  "Assistência técnica",
  "Câmeras de segurança",
  "Redes Wi-Fi e cabeada",
  "Kits CFTV",
  "PCs montados",
];

export const brands = ["Intelbras", "HiLook", "Ubiquiti"];

export type Item = { icon: LucideIcon; title: string; description: string };

export const pains: Item[] = [
  {
    icon: Wifi,
    title: "Wi-Fi que cai na hora H",
    description:
      "Rede instável é prejuízo: venda parada, equipe esperando e cliente reclamando.",
  },
  {
    icon: Gauge,
    title: "PC lento de dar desespero",
    description:
      "Limpeza, troca por SSD e ajuste fino. Chega de esperar a máquina ligar.",
  },
  {
    icon: Cctv,
    title: "Câmera com ponto cego",
    description:
      "Câmera mal posicionada não vê o que importa — e de noite, menos ainda.",
  },
  {
    icon: Cable,
    title: "Gambiarra disfarçada",
    description:
      "Cabo solto, rack bagunçado, emenda escondida. Uma hora a conta chega.",
  },
];

export type Service = Item & { message: string; bullets?: string[] };

export const services: Service[] = [
  {
    icon: Wrench,
    title: "Contrato de Manutenção",
    description:
      "O seguro de vida da sua infraestrutura: a gente acompanha, previne e resolve antes de virar problema.",
    bullets: ["Monitoramento dia e noite", "Manutenção preventiva", "Suporte rápido"],
    message: "Olá! Quero saber mais sobre o contrato de manutenção para minha empresa.",
  },
  {
    icon: Monitor,
    title: "Assistência Técnica",
    description:
      "Limpeza de notebook, troca por SSD, montagem de PC e setup gamer. Melhor que tutorial do YouTube.",
    message: "Olá! Preciso de assistência técnica para um computador/notebook.",
  },
  {
    icon: Camera,
    title: "Câmeras de Segurança",
    description:
      "Projeto sem pontos cegos, visão noturna e gravação. Câmera também é gestão, não só contra roubo.",
    message: "Olá! Quero um orçamento de câmeras de segurança.",
  },
  {
    icon: Network,
    title: "Redes Wi-Fi e Cabeada",
    description:
      "Rede cabeada é o coração do negócio. Wi-Fi corporativo bem posicionado, com equipamentos Ubiquiti.",
    message: "Olá! Quero um orçamento de rede Wi-Fi/cabeada.",
  },
];

export const compare = {
  react: {
    title: "Reagir",
    subtitle: "Sem contrato",
    items: [
      "O problema aparece no pior momento",
      "Conserto às pressas, custo maior",
      "Equipe parada esperando o técnico",
    ],
  },
  prevent: {
    title: "Prever",
    subtitle: "Com contrato Fortal Connect",
    items: [
      "Monitoramento dia e noite",
      "Manutenção preventiva programada",
      "Suporte rápido quando precisar",
    ],
  },
};

export type Kit = {
  title: string;
  tag: string;
  specs: string[];
  message: string;
};

export const kits: Kit[] = [
  {
    title: "Kit 4 câmeras HiLook",
    tag: "CFTV",
    specs: ["4 câmeras", "DVR 4 canais", "HD 1 TB", "Rack", "100 m de cabo"],
    message: "Olá! Quero o preço atual do kit 4 câmeras HiLook.",
  },
  {
    title: "Kit 4 câmeras Intelbras",
    tag: "CFTV",
    specs: ["4 câmeras", "DVR 4 canais", "HD 1 TB", "Rack", "100 m de cabo"],
    message: "Olá! Quero o preço atual do kit 4 câmeras Intelbras.",
  },
  {
    title: "PCs montados e testados",
    tag: "Computadores",
    specs: ["Core i3", "Core i5", "Core i7 gamer", "SSD", "Testado na bancada"],
    message: "Olá! Quero saber os PCs montados disponíveis e os preços.",
  },
];

export const aboutPoints = [
  "Desde 2010 em Fortaleza",
  "Atendimento para empresas e residências",
  "Soluções sob medida para cada cliente",
  "Loja física no Pátio Jardins Itaperi",
];

export const faq = [
  {
    q: "Como funciona o contrato de manutenção?",
    a: "A gente acompanha sua infraestrutura com monitoramento e manutenção preventiva programada, e dá suporte rápido quando algo sai do normal. O escopo é montado conforme o tamanho da sua operação.",
  },
  {
    q: "Quanto custa?",
    a: "Depende da quantidade de equipamentos e do tipo de atendimento. Fazemos o orçamento sem compromisso pelo WhatsApp.",
  },
  {
    q: "Vocês atendem residência?",
    a: "Sim. Atendemos empresas e residências — de câmeras e Wi-Fi em casa até a infraestrutura completa do escritório.",
  },
  {
    q: "Vocês vendem equipamentos?",
    a: "Sim: kits de câmeras HiLook e Intelbras e computadores montados e testados. Consulte disponibilidade e preço atual.",
  },
  {
    q: "Qual o horário de atendimento?",
    a: "Segunda a sexta, das 8h às 17h, na nossa sala no Pátio Jardins Itaperi ou pelo WhatsApp.",
  },
];

export const testimonials = [
  {
    name: "Carlos Silva",
    role: "Empresário",
    content:
      "A Fortal Connect transformou completamente a segurança da minha empresa. O sistema de câmeras instalado é de excelente qualidade e o suporte técnico é sempre rápido e eficiente.",
  },
  {
    name: "Ana Oliveira",
    role: "Gerente de TI",
    content:
      "A rede Wi-Fi instalada pela Fortal Connect atendeu perfeitamente às necessidades da nossa empresa. A velocidade e estabilidade são excelentes, e o contrato de manutenção nos dá tranquilidade.",
  },
  {
    name: "Roberto Santos",
    role: "Proprietário de Condomínio",
    content:
      "Contratamos a Fortal Connect para instalar câmeras de segurança em nosso condomínio e o resultado foi excelente. A equipe é muito profissional e o sistema funciona perfeitamente.",
  },
];
