import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { IndustriesSection } from "@/components/home/industries-section"
import { CodenitoSection } from "@/components/home/codenito-section"
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section"
import { ServicesSection } from "@/components/home/services-section"
import { HowIWorkSection } from "@/components/home/how-i-work-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { LatestWritingSection } from "@/components/home/latest-writing-section"
import { FinalCtaSection } from "@/components/home/final-cta-section"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const settings = await prisma.setting.findMany()
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]))
  return (
    <>
      <HeroSection
        availability={{ status: s.availability_status ?? "open", label: s.availability_label ?? "Open to opportunities" }}
        resumeUrl={s.resume_url}
      />
      <StatsSection stats={s} />
      <IndustriesSection />
      <CodenitoSection />
      <FeaturedProjectsSection />
      <ServicesSection />
      <TestimonialsSection />
      <LatestWritingSection />
      <HowIWorkSection />
      <FinalCtaSection />
    </>
  )
}
