"use client"

interface SectionTitleProps {
  badge?: string
  title: string
  description?: string
  className?: string
  badgeClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  centered?: boolean
}

export function SectionTitle({
  badge,
  title,
  description,
  className = "",
  badgeClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  centered = true,
}: SectionTitleProps) {
  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""} ${className}`}>
      <div className="space-y-2">
        {badge && (
          <div
            className={`inline-flex items-center rounded-full border border-primary-500/20 px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${badgeClassName}`}
          >
            {badge}
          </div>
        )}
        <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${titleClassName}`}>{title}</h2>
        {description && (
          <p
            className={`max-w-[900px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed ${
              centered ? "mx-auto" : ""
            } ${descriptionClassName}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
