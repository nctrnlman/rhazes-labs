import { prisma } from "@/lib/prisma"
import { FadeIn } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { BookOpen, Code2, Lightbulb, CalendarDays } from "lucide-react"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Now",
  description: "What Rhazes Devino is currently learning, building, and reading — updated regularly.",
  alternates: { canonical: "/now" },
}

export default async function NowPage() {
  const settings = await prisma.setting.findMany({ where: { key: { in: ["now_learning", "now_building", "now_reading", "now_updated_at"] } } })
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]))
  const items = [
    { icon: Lightbulb, label: "Currently Learning", value: s.now_learning ?? "LLMs, NLP, Transformers — diving deep into AI/ML" },
    { icon: Code2, label: "Currently Building", value: s.now_building ?? "Rhazes Labs — this portfolio site" },
    { icon: BookOpen, label: "Currently Reading", value: s.now_reading ?? "Designing Data-Intensive Applications" },
  ]
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-2xl">
        <FadeIn className="mb-12">
          <SectionHeading eyebrow="Real-time" title="What I'm doing now" className="mb-4" />
          {s.now_updated_at && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Last updated: {new Date(s.now_updated_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </FadeIn>
        <div className="space-y-4">
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-6 flex gap-4 hover:border-accent/20 transition-colors">
                <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4} className="mt-10 p-5 rounded-2xl bg-muted/30 border border-border/50">
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            Inspired by Derek Sivers&apos; <a href="https://nownownow.com/about" target="_blank" className="text-accent hover:underline">/now movement</a> — a snapshot of what I&apos;m focused on. Updated from admin panel.
          </p>
        </FadeIn>
      </div>
    </div>
  )
}
