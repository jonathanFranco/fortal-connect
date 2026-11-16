"use client";

import {
  START,
  flow,
  isOpenNow,
  nextStep,
  whatsappLink,
  type Answer,
  type Step,
} from "@/lib/chat-flow";
import { ArrowLeft, ArrowUp, MessageCircle, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

const TYPING_MS = 650;

function pathFrom(answers: Answer[]): string[] {
  const ids = [START];
  for (const a of answers) ids.push(nextStep(flow[a.stepId], a.value));
  return ids;
}

function remaining(id: string): number {
  const step = flow[id];
  if (step.kind === "summary") return 0;
  const nexts = step.kind === "choice" ? step.options.map((o) => o.next) : [step.next];
  return 1 + Math.min(...nexts.map(remaining));
}

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [revealed, setRevealed] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [online, setOnline] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const path = useMemo(() => pathFrom(answers), [answers]);
  const current: Step = flow[path[path.length - 1]];
  const ready = revealed >= current.bot.length;
  const progress = answers.length / (answers.length + remaining(current.id));

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(current.bot.length);
      return;
    }
    setRevealed(0);
    const timers = current.bot.map((_, i) =>
      window.setTimeout(() => setRevealed(i + 1), TYPING_MS * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [current]);

  useEffect(() => {
    if (open) setOnline(isOpenNow());
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [revealed, answers, sent]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (!open || !ready) return;
    if (!panelRef.current?.contains(document.activeElement)) return;
    actionsRef.current?.querySelector<HTMLElement>("button, textarea, a")?.focus();
  }, [open, ready, current]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const small = window.matchMedia("(max-width: 639px)").matches;
    if (small) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      if (small) document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const answer = (value: string) => {
    if (current.kind === "summary") return;
    setAnswers((a) => [...a, { stepId: current.id, field: current.field, value }]);
    setText("");
    setSent(false);
  };

  const back = () => {
    setAnswers((a) => a.slice(0, -1));
    setText("");
    setSent(false);
  };

  const restart = () => {
    setAnswers([]);
    setText("");
    setSent(false);
  };

  const submitText = () => {
    if (current.kind !== "input") return;
    const v = text.trim();
    if (!v && !current.optional) return;
    answer(v);
  };

  const onTextKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitText();
    }
  };

  const filled = answers.filter((a) => a.value.trim());

  return (
    <div
      id="chat-atendimento"
      ref={panelRef}
      role="dialog"
      aria-label="Atendimento Fortal Connect"
      aria-hidden={!open}
      inert={!open}
      tabIndex={-1}
      className={`fixed z-[60] flex flex-col overflow-hidden bg-card shadow-[0_30px_80px_-20px_rgb(0_0_0/0.65)] outline-none transition-[opacity,transform,visibility] duration-300 ease-out
        inset-0 sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[390px] sm:rounded-3xl sm:border
        ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-6 opacity-0"}`}
    >
      <header className="relative flex items-center gap-3 border-b px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4">
        <button
          type="button"
          onClick={back}
          disabled={!answers.length}
          aria-label="Voltar uma pergunta"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft className="h-[18px] w-[18px]" />
        </button>
        <img src="/mark.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[0.95rem] font-bold leading-tight">Fortal Connect</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground" title="Atendimento seg–sex, 8h–17h">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${online ? "bg-emerald-500" : "bg-amber-500"}`} />
            {online ? "Online agora" : "Fora do horário"}
          </p>
        </div>
        <button
          type="button"
          onClick={restart}
          disabled={!answers.length}
          aria-label="Recomeçar conversa"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30"
        >
          <RotateCcw className="h-[17px] w-[17px]" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar atendimento"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5"
        >
          <X className="h-5 w-5" />
        </button>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary-500 transition-transform duration-500"
          style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
        />
      </header>

      <div
        ref={scrollRef}
        aria-live="polite"
        className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-3 py-5 sm:px-4"
      >
        {path.map((id, i) => {
          const step = flow[id];
          const isCurrent = i === path.length - 1;
          const shown = isCurrent ? step.bot.slice(0, revealed) : step.bot;
          const given = answers[i];
          return (
            <div key={`${id}-${i}`} className="space-y-2">
              {shown.map((line, j) => (
                <p
                  key={j}
                  className="w-fit max-w-[85%] animate-rise rounded-2xl rounded-tl-md bg-muted px-4 py-2.5 text-[0.95rem] leading-snug"
                >
                  {line}
                </p>
              ))}
              {isCurrent && !ready && <Typing />}
              {given && (
                <p className="ml-auto w-fit max-w-[85%] animate-rise whitespace-pre-wrap break-words rounded-2xl rounded-tr-md bg-primary-500 px-4 py-2.5 text-[0.95rem] leading-snug text-white">
                  {given.value.trim() || <span className="italic opacity-80">Pular</span>}
                </p>
              )}
            </div>
          );
        })}

        {ready && current.kind === "choice" && (
          <div ref={actionsRef} className="flex animate-rise flex-wrap justify-end gap-2 pt-2">
            {current.options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => answer(o.label)}
                className="min-h-11 rounded-full border border-primary-500/50 bg-background px-4 py-2 text-left text-sm font-medium text-foreground transition-colors hover:border-primary-500 hover:bg-primary-500 hover:text-white focus-visible:bg-primary-500 focus-visible:text-white"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {ready && current.kind === "summary" && (
          <div ref={actionsRef} className="animate-rise space-y-3 pt-2">
            <dl className="divide-y rounded-2xl border bg-background text-sm">
              {filled.map((a) => (
                <div key={a.stepId} className="flex gap-3 px-4 py-2.5">
                  <dt className="w-28 shrink-0 text-muted-foreground">{a.field}</dt>
                  <dd className="min-w-0 break-words font-medium">{a.value.trim()}</dd>
                </div>
              ))}
            </dl>
            <a
              href={whatsappLink(answers)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSent(true)}
              className="btn-primary w-full"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar no WhatsApp
            </a>
            <button
              type="button"
              onClick={restart}
              className="w-full rounded-full py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Recomeçar
            </button>
            {sent && (
              <p className="w-fit max-w-[85%] animate-rise rounded-2xl rounded-tl-md bg-muted px-4 py-2.5 text-[0.95rem] leading-snug">
                Abrimos o WhatsApp com sua mensagem pronta. É só tocar em enviar!
              </p>
            )}
          </div>
        )}
      </div>

      {ready && current.kind === "input" && (
        <div
          ref={actionsRef}
          className="border-t p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4"
        >
          <div className="flex items-end gap-2 rounded-3xl border bg-background p-1.5 pl-4 focus-within:border-primary-500">
            <label htmlFor="chat-input" className="sr-only">
              {current.bot[current.bot.length - 1]}
            </label>
            <textarea
              id="chat-input"
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 500))}
              onKeyDown={onTextKey}
              placeholder={current.placeholder}
              autoComplete={current.field === "Nome" ? "name" : "off"}
              className="max-h-28 min-h-10 flex-1 resize-none bg-transparent py-2 text-[16px] leading-snug outline-none [field-sizing:content] placeholder:text-muted-foreground"
            />
            {current.optional && !text.trim() ? (
              <button
                type="button"
                onClick={() => answer("")}
                className="h-10 shrink-0 rounded-full px-4 text-sm font-semibold text-foreground/70 transition-colors hover:bg-foreground/5"
              >
                Pular
              </button>
            ) : (
              <button
                type="button"
                onClick={submitText}
                disabled={!text.trim()}
                aria-label="Enviar resposta"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-500 text-white transition-opacity disabled:opacity-40"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Typing() {
  return (
    <p
      role="status"
      aria-label="Digitando"
      className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-md bg-muted px-4 py-3.5"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot h-1.5 w-1.5 rounded-full bg-foreground/50"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </p>
  );
}
