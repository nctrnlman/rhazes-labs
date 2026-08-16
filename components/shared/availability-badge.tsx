import { cn } from "@/lib/utils"

interface Props { status?: string; label?: string; className?: string }

export function AvailabilityBadge({ status = "open", label = "Open to opportunities", className }: Props) {
  const colors: Record<string, string> = { open: "bg-green-500", limited: "bg-yellow-500", closed: "bg-red-500" }
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-1.5 text-xs font-medium", className)}>
      <span className={cn("h-2 w-2 rounded-full animate-pulse", colors[status] ?? "bg-green-500")} />
      {label}
    </span>
  )
}
