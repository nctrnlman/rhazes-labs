import { cn } from "@/lib/utils"

interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <span className="mb-3 block text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="mb-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {description}
        </p>
      )}
    </div>
  )
}
