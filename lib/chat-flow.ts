import { whatsapp } from "@/utils/constants";

export type Option = { label: string; next: string };

export type Step =
  | { id: string; kind: "choice"; bot: string[]; field: string; options: Option[] }
  | {
      id: string;
      kind: "input";
      bot: string[];
      field: string;
      placeholder: string;
      next: string;
      optional: boolean;
    }
  | { id: string; kind: "summary"; bot: string[] };

export type Answer = { stepId: string; field: string; value: string };

const DETAILS = "detalhes";

const steps: Step[] = [
  {
    id: "start",
    kind: "choice",
    bot: [
      "Oi! Sou o assistente da Fortal Connect.",
      "Responde umas perguntinhas que eu já te mando pro WhatsApp com tudo explicado. Como podemos ajudar?",
    ],
    field: "Serviço",
    options: [
      { label: "Contrato de manutenção", next: "mnt_size" },
      { label: "Assistência técnica", next: "at_device" },
      { label: "Câmeras de segurança", next: "cam_place" },
      { label: "Redes Wi-Fi e cabeada", next: "net_place" },
      { label: "Kits e computadores", next: "kit_item" },
      { label: "Outro assunto", next: "other" },
    ],
  },

  {
    id: "mnt_size",
    kind: "choice",
    bot: ["Boa! O contrato é o seguro de vida da sua infraestrutura.", "Quantos computadores tem na empresa?"],
    field: "Computadores",
    options: [
      { label: "Até 5", next: "mnt_pain" },
      { label: "De 6 a 20", next: "mnt_pain" },
      { label: "Mais de 20", next: "mnt_pain" },
    ],
  },
  {
    id: "mnt_pain",
    kind: "choice",
    bot: ["E o que mais preocupa hoje?"],
    field: "Prioridade",
    options: [
      { label: "Lentidão e travamentos", next: DETAILS },
      { label: "Rede caindo", next: DETAILS },
      { label: "Segurança dos dados", next: DETAILS },
      { label: "Prevenir antes de dar problema", next: DETAILS },
    ],
  },

  {
    id: "at_device",
    kind: "choice",
    bot: ["Bora resolver. Qual é o equipamento?"],
    field: "Equipamento",
    options: [
      { label: "Notebook", next: "at_issue" },
      { label: "Computador (desktop)", next: "at_issue" },
      { label: "PC gamer / setup", next: "at_issue" },
    ],
  },
  {
    id: "at_issue",
    kind: "choice",
    bot: ["O que está acontecendo?"],
    field: "Situação",
    options: [
      { label: "Lento ou travando", next: "at_where" },
      { label: "Não liga", next: "at_where" },
      { label: "Limpeza e manutenção", next: "at_where" },
      { label: "Upgrade (SSD, memória)", next: "at_where" },
      { label: "Montar um PC novo", next: "at_where" },
    ],
  },
  {
    id: "at_where",
    kind: "choice",
    bot: ["Prefere trazer na nossa loja no Pátio Jardins Itaperi ou atendimento no local?"],
    field: "Atendimento",
    options: [
      { label: "Levo na loja", next: DETAILS },
      { label: "Atendimento no local", next: DETAILS },
    ],
  },

  {
    id: "cam_place",
    kind: "choice",
    bot: ["Câmera também é gestão, não só contra roubo.", "Onde vai ser?"],
    field: "Local",
    options: [
      { label: "Casa", next: "cam_status" },
      { label: "Empresa ou comércio", next: "cam_status" },
      { label: "Condomínio", next: "cam_status" },
    ],
  },
  {
    id: "cam_status",
    kind: "choice",
    bot: ["Já tem câmeras instaladas?"],
    field: "Situação",
    options: [
      { label: "Não, quero instalar", next: "cam_count" },
      { label: "Sim, quero ampliar ou trocar", next: "cam_count" },
      { label: "Sim, mas estão com problema", next: DETAILS },
    ],
  },
  {
    id: "cam_count",
    kind: "choice",
    bot: ["Quantas câmeras, mais ou menos?"],
    field: "Quantidade",
    options: [
      { label: "Até 4", next: DETAILS },
      { label: "De 5 a 8", next: DETAILS },
      { label: "Mais de 8", next: DETAILS },
      { label: "Não sei, quero uma visita técnica", next: DETAILS },
    ],
  },

  {
    id: "net_place",
    kind: "choice",
    bot: ["Rede boa é o coração do negócio (e da casa também).", "É para onde?"],
    field: "Local",
    options: [
      { label: "Casa", next: "net_issue" },
      { label: "Empresa ou escritório", next: "net_issue" },
      { label: "Comércio ou área externa", next: "net_issue" },
    ],
  },
  {
    id: "net_issue",
    kind: "choice",
    bot: ["Qual o problema ou objetivo?"],
    field: "Objetivo",
    options: [
      { label: "Wi-Fi fraco em alguns cômodos", next: DETAILS },
      { label: "Rede caindo ou instável", next: DETAILS },
      { label: "Rede nova (cabeamento)", next: DETAILS },
      { label: "Organizar rack e cabos", next: DETAILS },
    ],
  },

  {
    id: "kit_item",
    kind: "choice",
    bot: ["Qual te interessa? Preço muda, então a gente te passa o valor atualizado."],
    field: "Produto",
    options: [
      { label: "Kit 4 câmeras HiLook", next: DETAILS },
      { label: "Kit 4 câmeras Intelbras", next: DETAILS },
      { label: "PC montado (Core i3/i5)", next: DETAILS },
      { label: "PC gamer (Core i7)", next: DETAILS },
    ],
  },

  {
    id: "other",
    kind: "input",
    bot: ["Claro! Conta pra gente o que você precisa."],
    field: "Assunto",
    placeholder: "Escreva aqui…",
    next: "name",
    optional: false,
  },

  {
    id: DETAILS,
    kind: "input",
    bot: ["Quer acrescentar algum detalhe? Bairro, marca do equipamento, urgência…"],
    field: "Detalhes",
    placeholder: "Opcional",
    next: "name",
    optional: true,
  },
  {
    id: "name",
    kind: "input",
    bot: ["Por último: como podemos te chamar?"],
    field: "Nome",
    placeholder: "Seu nome (opcional)",
    next: "summary",
    optional: true,
  },
  {
    id: "summary",
    kind: "summary",
    bot: ["Prontinho! Confere o resumo e envia pelo WhatsApp. A gente responde por lá."],
  },
];

export const flow: Record<string, Step> = Object.fromEntries(steps.map((s) => [s.id, s]));
export const START = "start";

export function nextStep(step: Step, value: string): string {
  if (step.kind === "choice") {
    const opt = step.options.find((o) => o.label === value);
    if (!opt) throw new Error(`Opção inválida "${value}" em ${step.id}`);
    return opt.next;
  }
  if (step.kind === "input") return step.next;
  return step.id;
}

export function buildMessage(answers: Answer[]): string {
  const filled = answers.filter((a) => a.value.trim());
  const name = filled.find((a) => a.field === "Nome")?.value.trim();
  const lines = filled
    .filter((a) => a.field !== "Nome")
    .map((a) => `*${a.field}:* ${a.value.trim()}`);
  return [
    `Olá, Fortal Connect! ${name ? `Aqui é ${name}. ` : ""}Vim pelo site.`,
    "",
    ...lines,
  ].join("\n");
}

export const whatsappLink = (answers: Answer[]) => whatsapp(buildMessage(answers));

export function isOpenNow(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Fortaleza",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);
  const day = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  return !["Sat", "Sun"].includes(day ?? "") && hour >= 8 && hour < 17;
}
