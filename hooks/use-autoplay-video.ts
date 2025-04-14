import { useCallback, useEffect, useRef, useState } from "react";

export type UseAutoplayVideoOptions = {
  active?: boolean;
  retryOnInteraction?: boolean;
  retryOnVisibility?: boolean;
  defaultCrossOrigin?: "anonymous" | "use-credentials";
};

export function useAutoplayVideo(options: UseAutoplayVideoOptions = {}) {
  const {
    active = true,
    retryOnInteraction = true,
    retryOnVisibility = true,
    defaultCrossOrigin,
  } = options;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  const tryPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    try {
      (el as any).playsInline = true;
    } catch {}

    try {
      el.setAttribute("playsinline", "true");
      el.setAttribute("webkit-playsinline", "true");
      el.setAttribute("x5-playsinline", "true");
    } catch {}

    const playPromise = el.play?.();
    if (
      playPromise &&
      typeof (playPromise as Promise<void>).catch === "function"
    ) {
      (playPromise as Promise<void>).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!active || videoError) return;
    tryPlay();
  }, [active, videoError, tryPlay]);

  useEffect(() => {
    if (!retryOnInteraction || videoError) return;
    const onFirstInteract = () => {
      tryPlay();
      document.removeEventListener("touchstart", onFirstInteract);
      document.removeEventListener("click", onFirstInteract);
    };
    document.addEventListener("touchstart", onFirstInteract, { once: true });
    document.addEventListener("click", onFirstInteract, { once: true });
    return () => {
      document.removeEventListener("touchstart", onFirstInteract);
      document.removeEventListener("click", onFirstInteract);
    };
  }, [retryOnInteraction, videoError, tryPlay]);

  useEffect(() => {
    if (!retryOnVisibility || videoError) return;
    const onVis = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [retryOnVisibility, videoError, tryPlay]);

  const getVideoProps = useCallback(
    (
      extra: React.VideoHTMLAttributes<HTMLVideoElement> = {}
    ): React.VideoHTMLAttributes<HTMLVideoElement> => ({
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      controls: false,
      preload: extra.preload ?? "auto",
      crossOrigin: extra.crossOrigin ?? defaultCrossOrigin,
      onLoadedData: (e) => {
        tryPlay();
        extra.onLoadedData?.(e as any);
      },
      onCanPlay: (e) => {
        tryPlay();
        extra.onCanPlay?.(e as any);
      },
      onPlay: (e) => {
        const el = videoRef.current;
        if (el) el.muted = true;
        extra.onPlay?.(e as any);
      },
      onError: (e) => {
        setVideoError(true);
        extra.onError?.(e as any);
      },
      ...extra,
    }),
    [defaultCrossOrigin, tryPlay]
  );

  return { videoRef, videoError, setVideoError, tryPlay, getVideoProps };
}
