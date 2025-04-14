"use client"

import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border p-6 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500transition-all duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-300 group-hover:w-full"></div>
    </div>
  )
}
