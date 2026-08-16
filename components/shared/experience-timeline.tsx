import { FadeIn } from "@/components/shared/motion-wrapper"
import { prisma } from "@/lib/prisma"

export async function ExperienceTimeline() {
  const exps = await prisma.experience.findMany({ orderBy: { order: "asc" } })

  return (
    <div className="space-y-0">
      {exps.map((e, i) => (
        <FadeIn key={e.id} delay={i * 0.1}>
          <div className="relative flex gap-5">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="mt-2 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20" />
              {i < exps.length - 1 && <div className="w-px flex-1 bg-border/50 mt-2 mb-0" style={{ minHeight: "3rem" }} />}
            </div>
            <div className="pb-10 w-full">
              <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/20 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{e.role}</h3>
                    <p className="text-sm font-semibold text-accent">{e.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5 flex-shrink-0 whitespace-nowrap">{e.period}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {e.highlights.map((h) => <li key={h} className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 flex-shrink-0">›</span>{h}</li>)}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {e.techStack.map((t) => <span key={t} className="text-xs bg-muted/80 rounded-full px-2.5 py-1">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
