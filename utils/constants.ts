const WHATSAPP_NUMBER = "5585981751616";
const DEFAULT_MESSAGE = "Olá, Fortal Connect! Vim pelo site e gostaria de um orçamento.";

export function whatsapp(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export class Links {
  public static readonly COMPANY_NAME = "Fortal Connect";
  public static readonly WHATSAPP = whatsapp();
  public static readonly INSTAGRAM = "https://www.instagram.com/fortalconnect";
  public static readonly INSTAGRAM_HANDLE = "@fortalconnect";
  public static readonly EMAIL = "mailto:comercial@fortalconnect.com.br";
  public static readonly FACEBOOK = "https://www.facebook.com/fortalconnect";
  public static readonly PHONE = "(85) 98175-1616";
  public static readonly CALL = "tel:+5585981751616";
  public static readonly ADDRESS =
    "Av. Bernardo Manoel, 9050, Sala 03 — Pátio Jardins Itaperi, Fortaleza – CE";
  public static readonly MAP = "https://maps.app.goo.gl/GgEgpvmRDp1RUqmY7";
  public static readonly CLOCK = ["Segunda a sexta, 8h às 17h"];
}
