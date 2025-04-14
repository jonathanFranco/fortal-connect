"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ContactInfoItemProps {
  icon: LucideIcon;
  title: string;
  details: string | string[];
  className?: string;
  right?: ReactNode;
  iconClassName?: string;
}

export function ContactInfoItem({
  icon: Icon,
  title,
  details,
  className = "",
  right,
  iconClassName = "",
}: ContactInfoItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg ${className}`}
    >
      <div className="flex items-center gap-4 w-full">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 transition-all duration-300 group-hover:scale-110 ${iconClassName}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold">{title}</h3>
          {Array.isArray(details) ? (
            details.map((detail, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {detail}
              </p>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">{details}</p>
          )}
        </div>
      </div>
      {right ? <div className="ml-4">{right}</div> : null}
    </div>
  );
}
