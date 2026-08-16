import { Clock } from "lucide-react"
import { FadeIn } from "@/components/shared/motion-wrapper"
import { SkillsVisualization } from "@/components/shared/skills-visualization"
import { CopyEmailButton } from "@/components/shared/copy-email-button"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "About" }

export default async function AboutPage() {
  const settings = await prisma.setting.findMany()
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]))
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-5xl">
        <FadeIn>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">About Me</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">The story so far</h1>
        </FadeIn>
        <FadeIn delay={0.1} className="space-y-5 mb-16 max-w-3xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m <strong className="text-foreground">Muhammad Rhazes Alhambra Andalusia Devino</strong> — a Full Stack Engineer based in Jakarta with 3+ years of experience building scalable, production-grade systems. I care deeply about ownership, quality, and shipping things that actually make a difference.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            In 2022, I founded <strong className="text-foreground">Codenito ID</strong>, a remote-first software studio where we&apos;ve delivered 15+ production systems for clients in e-commerce, healthcare, logistics, and FMCG. I&apos;m also a Full Stack Engineer at <strong className="text-foreground">Home Credit Indonesia</strong>, building Omnichannel contact center systems at scale.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m actively expanding into <strong className="text-foreground">AI/ML</strong> — LLMs, NLP, transformers, and RAG systems. My long-term dream: collaborate with talented teams globally, building solutions that empower people and businesses.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
          <SkillsVisualization />
        </FadeIn>
        <FadeIn delay={0.3} className="mt-14 p-6 bg-card border border-border rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-accent flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Response Time</p>
              <p className="text-sm text-muted-foreground">{s.response_time ?? "Usually responds within 24 hours"}</p>
            </div>
          </div>
          <CopyEmailButton email="rhazesd@gmail.com" />
        </FadeIn>
      </div>
    </div>
  )
}
