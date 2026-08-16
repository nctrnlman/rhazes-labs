import Link from "next/link"
import { Download, ArrowRight } from "lucide-react"
import { ExperienceTimeline } from "@/components/shared/experience-timeline"
import { CertificationsGrid } from "@/components/shared/certifications-grid"
import { FadeIn } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Experience",
  description: "Career journey and education timeline of Rhazes Devino — Home Credit Indonesia, Codenito ID, and beyond.",
  alternates: { canonical: "/experience" },
}

export default async function ExperiencePage() {
  const [education, certifications, resumeSetting] = await Promise.all([
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { order: "asc" } }),
    prisma.setting.findUnique({ where: { key: "resume_url" } }),
  ])
  const resumeUrl = resumeSetting?.value
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
                    <p className="text-sm text-foreground font-medium">{e.degree}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5 h-fit">{e.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">› {e.note}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        {certifications.length > 0 && (
          <FadeIn className="mt-16">
            <h2 className="mb-8 text-2xl font-semibold">Certifications</h2>
            <CertificationsGrid certifications={certifications} />
          </FadeIn>
        )}
        <FadeIn className="mt-16 pt-8 border-t border-border text-center">
          <h2 className="mb-2 text-xl font-semibold">Like what you see?</h2>
          <p className="mb-6 text-sm text-muted-foreground">Get the full picture as a resume, or reach out directly.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {resumeUrl && (
              <Button variant="pill-outline" className="h-auto px-6 py-3 text-sm" nativeButton={false} render={<a href={resumeUrl} target="_blank" rel="noopener noreferrer" />}>
                <Download className="h-4 w-4" /> Download Resume
              </Button>
            )}
            <Button variant="pill" className="h-auto px-6 py-3 text-sm" nativeButton={false} render={<Link href="/work-with-me" />}>
              Work With Me <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
