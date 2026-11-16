"use client";

import type { SceneHandle, SceneInit } from "@/lib/three/loop";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const scenes: Record<string, () => Promise<{ default: SceneInit }>> = {
  map: () => import("@/lib/three/map-scene"),
  signal: () => import("@/lib/three/signal-scene"),
  cctv: () => import("@/lib/three/cctv-scene"),
};

type Props = {
  scene: keyof typeof scenes;
  className?: string;
  forceDark?: boolean;
  view?: string;
  onView?: (view: string) => void;
};

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ThreeCanvas({ scene, className, forceDark, view, onView }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = useRef<SceneHandle | null>(null);
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const dark = forceDark || resolvedTheme !== "light";
  const darkRef = useRef(dark);
  darkRef.current = dark;
  const viewRef = useRef(view);
  viewRef.current = view;
  const onViewRef = useRef(onView);
  onViewRef.current = onView;

  useEffect(() => {
    const el = ref.current;
    if (!el || !supportsWebGL()) return;
    let cancelled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        scenes[scene]().then(({ default: init }) => {
          if (cancelled) return;
          handle.current = init(el, {
            dark: darkRef.current,
            reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
            lowPower:
              window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4,
            onView: (v) => onViewRef.current?.(v),
          });
          if (viewRef.current) handle.current.setView?.(viewRef.current);
          requestAnimationFrame(() => setReady(true));
        });
      },
      { rootMargin: "300px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      handle.current?.dispose();
      handle.current = null;
    };
  }, [scene]);

  useEffect(() => {
    handle.current?.setDark(dark);
  }, [dark]);

  useEffect(() => {
    if (view) handle.current?.setView?.(view);
  }, [view]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
    />
  );
}
