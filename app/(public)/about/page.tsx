import Link from "next/link"
import Image from "next/image"
import { Clock, Download, ArrowRight, Search, Layers, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { SkillsVisualization } from "@/components/shared/skills-visualization"
import { CopyEmailButton } from "@/components/shared/copy-email-button"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "About",
  description: "Full Stack Engineer based in Jakarta with 3+ years building production-grade systems. Founder of Codenito ID, actively learning AI/ML.",
  alternates: { canonical: "/about" },
}

const principles = [
  { icon: Search, title: "Understand Deeply", description: "I dig into the problem before writing a line of code, so what I build actually solves it." },
  { icon: Layers, title: "Build for the Long Run", description: "Scalable, maintainable systems over quick hacks. Production doesn't forgive shortcuts." },
  { icon: ShieldCheck, title: "Follow Through", description: "Ownership doesn't stop at launch day. I stay accountable for what I ship, whether I'm leading end-to-end or part of a larger team." },
]

export default async function AboutPage() {
  const [settings, skills] = await Promise.all([
    prisma.setting.findMany(),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ])
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]))
  const categories = Object.values(
    skills.reduce<Record<string, { name: string; skills: { id: string; name: string; level: string }[] }>>((acc, sk) => {
      acc[sk.category] ??= { name: sk.category, skills: [] }
      acc[sk.category].skills.push({ id: sk.id, name: sk.name, level: sk.level })
      return acc
    }, {})
  )
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-5xl">
        <FadeIn>
          <SectionHeading eyebrow="About Me" title="The story so far" className="mb-8" />
        </FadeIn>
        <FadeIn delay={0.1} className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px] lg:items-start">
          <div className="space-y-5 max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m <strong className="text-foreground">Muhammad Rhazes Alhambra Andalusia Devino</strong>, a Full Stack Engineer based in Jakarta with 3+ years of experience building scalable, production-grade systems. I care deeply about ownership, quality, and shipping things that actually make a difference.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In 2022, I founded <strong className="text-foreground">Codenito ID</strong>, a remote-first software studio where we&apos;ve delivered 15+ production systems for clients across e-commerce, healthcare, logistics, legal, and FMCG, including the digital competition platform for Dulux Indonesia&apos;s 2025 competition and an operational journal system for PT Armada Hasil Sagara&apos;s logistics tracking.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Day to day, I work across the full stack, from system architecture down to the smallest interface detail, and often wear the Solution Architect and Project Manager hats too.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m also actively expanding into <strong className="text-foreground">AI/ML</strong>, exploring LLMs, NLP, transformers, and RAG systems. My long-term goal is to collaborate with talented teams globally, building solutions that empower people and businesses.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm">
              <Link href="/experience" className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors">
                My full career journey <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors">
                See my work <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border border-border shadow-xl shadow-foreground/5">
              <Image
                src="/images/rhazes-profile.jpg"
                alt="Rhazes Devino"
                fill
                className="object-cover grayscale contrast-125 brightness-95"
                quality={100}
                sizes="224px"
              />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.15} className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                <p.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="mb-1.5 font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          ))}
        </FadeIn>
        <FadeIn delay={0.2}>
          <h2 className="mb-8 text-2xl font-semibold">Skills & Expertise</h2>
          <SkillsVisualization categories={categories} />
        </FadeIn>
        <FadeIn delay={0.3} className="mt-14 p-6 bg-card border border-border rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-foreground flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Response Time</p>
              <p className="text-sm text-muted-foreground">{s.response_time ?? "Usually responds within 24 hours"}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyEmailButton email="rhazesd@gmail.com" />
            <Button variant="pill-outline" className="h-auto px-4 py-2.5 text-sm" nativeButton={false} render={<a href="/api/portfolio-pdf" target="_blank" rel="noopener noreferrer" />}>
              <Download className="h-4 w-4" /> Download Portfolio
            </Button>
            <Button variant="pill" className="h-auto px-4 py-2.5 text-sm" nativeButton={false} render={<Link href="/work-with-me" />}>
              Work With Me <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
