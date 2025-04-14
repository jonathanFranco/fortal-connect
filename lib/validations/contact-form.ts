import { z } from "zod";

const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().regex(phoneRegex, {
    message: "Telefone inválido. Use o formato: (XX) XXXXX-XXXX",
  }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
    .max(500, { message: "A mensagem deve ter no máximo 500 caracteres" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
