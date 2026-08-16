import { prisma } from "@/lib/prisma"
import { ProjectCard } from "@/components/projects/project-card"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Projects" }

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] })
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 max-w-2xl">
          <SectionHeading
            eyebrow="Portfolio"
            title="Projects"
            description="Production-grade systems built for real businesses. Every project ships on time with 99.9%+ uptime."
          />
        </FadeIn>
        {projects.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-lg">Projects coming soon.</p>
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
    </div>
  )
}
