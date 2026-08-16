"use client"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"

type SkillItem = { id: string; name: string; level: string }
type SkillCategory = { name: string; skills: SkillItem[] }

const w: Record<string, string> = { Expert: "100%", Proficient: "70%", Learning: "40%" }
const c: Record<string, string> = { Expert: "bg-foreground", Proficient: "bg-foreground/60", Learning: "bg-foreground/30" }

export function SkillsVisualization({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((cat) => (
        <div key={cat.name} className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/60" />
            <h3 className="font-semibold text-sm">{cat.name}</h3>
          </div>
          <StaggerContainer className="space-y-3">
            {cat.skills.map((sk) => (
              <StaggerItem key={sk.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{sk.name}</span>
                  <span className="text-xs text-muted-foreground">{sk.level}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c[sk.level] ?? "bg-foreground/60"} transition-all duration-700`} style={{ width: w[sk.level] ?? "70%" }} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      ))}
    </div>
  )
}
