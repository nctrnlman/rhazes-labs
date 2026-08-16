import { ExperienceTimeline } from "@/components/shared/experience-timeline"
import { FadeIn } from "@/components/shared/motion-wrapper"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Experience" }

const education = [
  { school: "Asia e University", degree: "Bachelor of ICT (Hons)", period: "Aug 2021 – Oct 2025", location: "Subang Jaya, Malaysia", note: "Final Project: Talent Hiring Smart Matching System" },
  { school: "Purwadhika Digital Technology School", degree: "Full Stack Web Development", period: "Jan 2023 – Sep 2023", location: "Jakarta", note: "Final Project: Multi-Warehouse E-Commerce" },
  { school: "University of Indonesia – CCIT", degree: "Diploma in Software Engineering – NIIT", period: "Aug 2021 – Aug 2023", location: "Depok | GPA: 3.65", note: "BNSP National Programmer Certification" },
]

export default function ExperiencePage() {
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-3xl">
        <FadeIn className="mb-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Career Journey</p>
          <h1 className="text-4xl sm:text-5xl font-bold">Experience</h1>
        </FadeIn>
        <ExperienceTimeline />
        <FadeIn className="mt-4">
          <h2 className="text-2xl font-bold mb-8">Education</h2>
          <div className="space-y-4">
            {education.map((e) => (
              <div key={e.school} className="bg-card border border-border rounded-2xl p-6">
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
