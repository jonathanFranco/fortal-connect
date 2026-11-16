"use client";

import { ThreeCanvas } from "@/components/three/three-canvas";
import { Globe2, Map as MapIcon, MapPin } from "lucide-react";
import { useState } from "react";

const VIEWS = [
  { id: "globo", label: "Globo", Icon: Globe2 },
  { id: "brasil", label: "Brasil", Icon: MapIcon },
  { id: "ceara", label: "Ceará", Icon: MapPin },
] as const;
type View = (typeof VIEWS)[number]["id"];

export function HeroVisual() {
  const [shown, setShown] = useState<View>("globo");
  const [chosen, setChosen] = useState<View>();

  const pick = (v: View) => {
    setChosen(v);
    setShown(v);
  };

  return (
    <div className="relative -mx-4 mt-6 sm:-mx-6 md:static md:m-0">
      <ThreeCanvas
        scene="map"
        view={chosen}
        onView={(v) => setShown(v as View)}
        className="h-[min(100vw,26rem)] md:absolute md:inset-0 md:-z-10 md:h-auto"
      />

      <div className="relative z-10 mx-auto -mt-1 w-fit md:absolute md:left-[min(calc(75%+31svh),calc(100%-3.5rem))] md:top-1/2 md:m-0 md:-translate-y-1/2">
        <div
          role="radiogroup"
          aria-label="Visualização do mapa"
          className="flex animate-rise overflow-hidden rounded-md border bg-background/40 backdrop-blur-sm [--d:700ms] md:flex-col"
        >
          {VIEWS.map(({ id, label, Icon }) => {
            const active = shown === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={label}
                title={label}
                onClick={() => pick(id)}
                className={`grid h-10 w-10 place-items-center border-l transition-colors first:border-l-0 md:border-l-0 md:border-t md:first:border-t-0 ${
                  active
                    ? "bg-foreground/[0.08] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
