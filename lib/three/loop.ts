import { WebGLRenderer } from "three";

export type SceneOptions = {
  dark: boolean;
  reducedMotion: boolean;
  lowPower: boolean;
  onView?: (view: string) => void;
};

export type SceneHandle = {
  setDark(dark: boolean): void;
  setView?(view: string): void;
  dispose(): void;
};

export type SceneInit = (
  container: HTMLElement,
  options: SceneOptions
) => SceneHandle;

export function createRenderer(container: HTMLElement, lowPower: boolean) {
  const renderer = new WebGLRenderer({
    antialias: !lowPower,
    alpha: true,
    powerPreference: lowPower ? "low-power" : "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.75));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = "display:block;width:100%;height:100%";
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);
  return renderer;
}

type LoopHooks = {
  resize(width: number, height: number): void;
  frame(t: number, dt: number): void;
};

export function startLoop(
  container: HTMLElement,
  renderer: WebGLRenderer,
  reducedMotion: boolean,
  hooks: LoopHooks
) {
  let raf = 0;
  let visible = false;
  let last = 0;
  let t = 0;

  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    hooks.frame(t, dt);
    raf = requestAnimationFrame(tick);
  };

  const play = () => {
    if (raf || reducedMotion || !visible || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  const pause = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const redraw = () => {
    if (!raf) hooks.frame(t, 0);
  };

  const resizeObserver = new ResizeObserver(() => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    hooks.resize(w, h);
    redraw();
  });
  resizeObserver.observe(container);

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
    else pause();
  });
  intersection.observe(container);

  const onVisibility = () => (document.hidden ? pause() : play());
  document.addEventListener("visibilitychange", onVisibility);

  return {
    redraw,
    stop() {
      pause();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}

export function trackPointer() {
  const pointer = { x: 0, y: 0, clientX: 0, clientY: 0, active: false };
  const fine = window.matchMedia("(pointer: fine)").matches;
  const onMove = (e: PointerEvent) => {
    pointer.clientX = e.clientX;
    pointer.clientY = e.clientY;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    pointer.active = true;
  };
  if (fine) window.addEventListener("pointermove", onMove, { passive: true });
  return {
    pointer,
    dispose: () => window.removeEventListener("pointermove", onMove),
  };
}
