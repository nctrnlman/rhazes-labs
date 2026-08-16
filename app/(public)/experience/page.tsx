import { ExperienceTimeline } from "@/components/shared/experience-timeline"
import { FadeIn } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Experience",
  description: "Career journey and education timeline of Rhazes Devino — Home Credit Indonesia, Codenito ID, and beyond.",
  alternates: { canonical: "/experience" },
}

export default async function ExperiencePage() {
  const education = await prisma.education.findMany({ orderBy: { order: "asc" } })
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-3xl">
        <FadeIn className="mb-12">
          <SectionHeading eyebrow="Career Journey" title="Experience" />
        </FadeIn>
        <ExperienceTimeline />
        <FadeIn className="mt-4">
          <h2 className="mb-8 text-2xl font-semibold">Education</h2>
          <div className="space-y-4">
            {education.map((e) => (
              <div key={e.id} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">{e.school}</h3>
                    <p className="text-sm text-accent font-medium">{e.degree}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5 h-fit">{e.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">› {e.note}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
