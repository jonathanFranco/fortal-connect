"use client";

import { MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const loadPanel = () => import("./chat-panel");
const ChatPanel = dynamic(loadPanel, { ssr: false });

const TEASER_KEY = "fc-chat-teaser-dismissed";

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
    }
  }, []);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const id = window.setTimeout(() => setTeaser(true), 9000);
    return () => window.clearTimeout(id);
  }, []);

  const openChat = () => {
    setMounted(true);
    setOpen(true);
    dismissTeaser();
  };

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  return (
    <>
      {mounted && <ChatPanel open={open} onClose={close} />}

      <div
        className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-5 sm:right-5 ${
          open ? "max-sm:hidden" : ""
        }`}
      >
        {teaser && !open && (
          <div className="relative max-w-[17rem] animate-rise rounded-2xl rounded-br-md border bg-card p-4 pr-9 text-sm shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)]">
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dispensar convite"
              className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-foreground/5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="font-semibold">Precisa de um orçamento?</p>
            <p className="mt-1 text-muted-foreground">
              Responde 3 perguntinhas e a gente já te atende no WhatsApp.
            </p>
            <button
              type="button"
              onClick={openChat}
              className="mt-3 text-sm font-semibold text-primary-500 hover:underline"
            >
              Começar agora →
            </button>
          </div>
        )}

        <button
          ref={launcherRef}
          type="button"
          onClick={() => (open ? close() : openChat())}
          onPointerEnter={() => void loadPanel()}
          onFocus={() => void loadPanel()}
          aria-expanded={open}
          aria-controls="chat-atendimento"
          aria-label={open ? "Fechar atendimento" : "Abrir atendimento"}
          className="flex h-14 items-center gap-2 rounded-full bg-primary-500 px-4 text-white shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.8)] transition-transform duration-300 hover:-translate-y-0.5 sm:pr-5"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          <span className="hidden text-sm font-semibold sm:inline">
            {open ? "Fechar" : "Fale com a gente"}
          </span>
        </button>
      </div>
    </>
  );
}
