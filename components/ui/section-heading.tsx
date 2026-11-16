import type { CSSProperties, ReactNode } from "react";

type Props = {
  label: string;
  title: ReactNode;
  description?: string;
  id?: string;
};

export function SectionHeading({ label, title, description, id }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end md:gap-12">
      <div data-reveal>
        <p className="label-mono flex items-center gap-3">
          <span className="h-px w-8 bg-primary-500" />
          {label}
        </p>
        <h2 id={id} className="heading-lg mt-5 text-balance">
          {title}
        </h2>
      </div>
      {description && (
        <p data-reveal style={{ "--d": "120ms" } as CSSProperties} className="text-muted-foreground md:pb-2">
          {description}
        </p>
      )}
    </div>
  );
}
