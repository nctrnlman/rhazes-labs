import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, ExternalLink, Code2, Tag } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } })
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } })
  if (!project) return { title: "Not Found" }
  return { title: `${project.title} — Rhazes Labs`, description: project.description }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } })
  if (!project) notFound()

  const metrics = project.impactMetrics as Record<string, string> | null

  return (
    <main className="pt-24 pb-20">
      <div className="container-custom max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {project.imageUrl && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium capitalize">
            {project.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{project.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{project.description}</p>

        <div className="flex gap-3 mb-12">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm border border-border hover:bg-muted/50 transition-colors"
            >
              <Code2 className="w-4 h-4" /> View Code
            </a>
          )}
        </div>

        {metrics && Object.keys(metrics).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold gradient-text">{value}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{key.replace(/_/g, " ")}</p>
              </div>
            ))}
          </div>
        )}

        {project.techStack.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-500" /> Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium">{tech}</span>
              ))}
            </div>
          </div>
        )}

        {project.content && (
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        )}
      </div>
    </main>
  )
}
