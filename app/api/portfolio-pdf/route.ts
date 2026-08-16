import { renderToBuffer } from "@react-pdf/renderer"
import { prisma } from "@/lib/prisma"
import { PortfolioDocument } from "@/lib/pdf/portfolio-document"

export async function GET() {
  const [settings, experiences, education, skills, projects] = await Promise.all([
    prisma.setting.findMany(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 4 }),
  ])
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]))

  const doc = PortfolioDocument({
    name: "Muhammad Rhazes Alhambra Andalusia Devino",
    tagline: "Full Stack Engineer · Founder @ Codenito ID",
    summary:
      s.site_description ||
      "Full Stack Engineer, Founder of Codenito ID. Building scalable, production-grade systems. Based in Jakarta, working globally.",
    email: "rhazesd@gmail.com",
    location: "Jakarta, Indonesia",
    linkedin: s.social_linkedin || "https://linkedin.com/in/rhazes",
    github: s.social_github || "https://github.com/rhazes",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    experiences,
    education,
    skills,
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      techStack: p.techStack,
      liveUrl: p.liveUrl,
      impactMetrics: p.impactMetrics as Record<string, string> | null,
    })),
  })

  const buffer = await renderToBuffer(doc)

  return new Response(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Rhazes-Devino-Portfolio.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  })
}
