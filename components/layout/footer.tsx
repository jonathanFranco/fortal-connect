"use client";

import { Links } from "@/utils/constants";
import { motion, useInView } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Logo from "../ui/logo";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true });

  const socialLinks = [
    { name: "Facebook", href: Links.FACEBOOK, icon: "facebook" },
    { name: "Instagram", href: Links.INSTAGRAM, icon: "instagram" },
    { name: "Whatsapp", href: Links.WHATSAPP, icon: "whatsapp" },
    { name: "Maps", href: Links.MAP, icon: "map" },
  ];

  const footerLinks = [
    { name: "Serviços", href: "#services" },
    { name: "Sobre", href: "#about" },
    { name: "Benefícios", href: "#benefits" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden border-t border-primary-500/10 bg-background"
    >
      <BackgroundDecorations />
      <div className="container relative px-4 py-12 md:px-6 md:py-16">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 text-left divide-y divide-primary-500/10 md:flex-row md:divide-y-0"
        >
          <FooterBrand />
          <FooterLinks links={footerLinks} />
          <FooterSocialLinks socialLinks={socialLinks} />
        </motion.div>
      </div>
      <BottomDecoration />
    </footer>
  );
}

function FooterBrand() {
  return (
    <motion.div
      variants={itemVariants}
      className="flex w-full flex-col items-start space-y-4 py-6 md:w-auto md:py-0"
    >
      <div className="flex items-center gap-2 font-bold text-xl">
        <Logo className="grayscale opacity-50 brightness-100" />
      </div>
      <p className="max-w-xs text-sm text-muted-foreground">
        {`Soluções completas em tecnologia e segurança para sua empresa ou
        residência.`}
      </p>
      <ContactInfo />
    </motion.div>
  );
}

function ContactInfo() {
  const contacts = [
    { Icon: Phone, text: Links.PHONE, href: Links.CALL, aria: "Telefone" },
    {
      Icon: Mail,
      text: Links.EMAIL.replace("mailto:", ""),
      href: Links.EMAIL,
      aria: "E-mail",
    },
    { Icon: MapPin, text: Links.ADDRESS, href: Links.MAP, aria: "Endereço" },
  ];

  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:gap-2">
      {contacts.map(({ Icon, text, href, aria }, index) => (
        <div
          key={index}
          className="flex w-full flex-col items-start gap-2 text-left md:flex-row md:items-start md:gap-3"
        >
          <Icon className="h-4 w-4 shrink-0 text-primary md:mt-0.5 text-muted-foreground" />
          {href ? (
            <a
              href={href}
              aria-label={aria}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="min-w-0 text-sm text-muted-foreground underline-offset-4 hover:underline break-words text-left"
            >
              {text}
            </a>
          ) : (
            <span className="min-w-0 text-sm text-muted-foreground break-words text-left">
              {text}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function FooterLinks({ links }: { links: { name: string; href: string }[] }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex w-full flex-col items-start space-y-4 py-6 md:w-auto md:py-0"
    >
      <h3 className="text-base font-bold">Links Úteis</h3>
      <ul className="flex flex-col items-start gap-2 md:items-start">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FooterSocialLinks({
  socialLinks,
}: {
  socialLinks: { name: string; href: string; icon: string }[];
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex w-full flex-col items-start space-y-4 py-6 md:w-auto md:items-end md:py-0"
    >
      <h3 className="text-base font-bold">{""}</h3>
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <SocialIcon key={social.name} href={social.href} icon={social.icon} />
        ))}
      </div>
      <FooterCopyright />
    </motion.div>
  );
}

function FooterCopyright() {
  return (
    <div className="mt-4 flex h-12 items-center justify-start md:justify-center rounded-full border border-primary-500/10 bg-primary-500/5 px-4 backdrop-blur-sm">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
        {"Fortal Connect. Todos os direitos reservados."}
      </p>
    </div>
  );
}

type SocialIconProps = {
  href: string;
  icon: string;
};

function SocialIcon({ href, icon }: SocialIconProps) {
  const icons = {
    facebook: <Facebook className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    whatsapp: <MessageCircle className="h-5 w-5" />,
    map: <MapPin className="h-5 w-5" />,
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary-500/10 bg-primary-500/5 text-muted-foreground transition-all duration-300 hover:border-primary-500/30 hover:bg-primary-500/10 hover:text-primary"
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        {icons[icon as keyof typeof icons]}
      </div>
      <span className="sr-only">
        {icon.charAt(0).toUpperCase() + icon.slice(1)}
      </span>
    </Link>
  );
}

function BackgroundDecorations() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[300px] w-[300px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute top-[60%] -right-[10%] h-[250px] w-[250px] rounded-full bg-primary-700/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </>
  );
}

function BottomDecoration() {
  return (
    <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-1/2 translate-y-1/2 rounded-full border border-primary-700/10 bg-primary-700/5 opacity-50" />
  );
}

function handleSmoothScroll(event: React.MouseEvent, href: string) {
  if (href.startsWith("#")) {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};
