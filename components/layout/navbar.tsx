"use client";

import { nav } from "@/lib/content";
import { Links } from "@/utils/constants";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Logo from "../ui/logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const ids = new Set<string>(nav.map((n) => n.href.slice(1)));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(ids.has(e.target.id) ? e.target.id : "");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main > section").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isDark = resolvedTheme !== "light";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-500 sm:h-16 sm:pl-6 ${
          scrolled || open
            ? "border-border bg-background/75 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#topo" aria-label="Fortal Connect — início" className="shrink-0">
          <Logo className="h-8 w-auto sm:h-9" priority />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const current = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={current ? "location" : undefined}
                    className={`relative flex rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      current
                        ? "bg-foreground/[0.07] text-foreground"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-500 transition-[opacity,transform] duration-300 ${
                        current ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <Sun className="hidden h-[18px] w-[18px] dark:block" />
            <Moon className="h-[18px] w-[18px] dark:hidden" />
          </button>
          <a
            href={Links.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !min-h-10 !px-5 !text-sm md:inline-flex"
          >
            Orçamento <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid h-10 w-10 place-items-center rounded-full bg-foreground/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={`fixed inset-x-3 top-[4.75rem] bottom-3 flex flex-col justify-between overflow-y-auto rounded-3xl border bg-background/95 p-6 backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <ul className="space-y-1">
          {nav.map((item) => {
            const current = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "location" : undefined}
                  className={`flex items-center justify-between border-b border-border/60 py-4 font-display text-3xl font-bold tracking-tight ${
                    current ? "text-primary-500" : ""
                  }`}
                >
                  {item.label}
                  {current && <span aria-hidden className="h-2 w-2 rounded-full bg-primary-500" />}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="space-y-3 pt-8">
          <a
            href={Links.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            Solicitar orçamento <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={Links.CALL} className="btn-ghost w-full">
            {Links.PHONE}
          </a>
        </div>
      </div>
    </header>
  );
}
