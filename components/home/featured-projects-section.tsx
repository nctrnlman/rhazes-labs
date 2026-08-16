import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ProjectCard } from "@/components/projects/project-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { prisma } from "@/lib/prisma"
import { SectionHeading } from "@/components/shared/section-heading"

export async function FeaturedProjectsSection() {
  const projects = await prisma.project.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 3 })
  return (
    <section className="section-padding bg-card/10">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 flex items-end justify-between">
          <SectionHeading eyebrow="Featured Work" title="Projects that ship" />
          <Link href="/projects" className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
        {projects.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>Projects coming soon.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <StaggerItem key={p.id}>
                <ProjectCard title={p.title} slug={p.slug} description={p.description} techStack={p.techStack}
                  imageUrl={p.imageUrl} liveUrl={p.liveUrl} githubUrl={p.githubUrl}
                  impactMetrics={p.impactMetrics as Record<string, string> | null} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
