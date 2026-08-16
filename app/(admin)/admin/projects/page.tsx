import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, ExternalLink, Code2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteProject } from "./actions"

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-muted-foreground">{projects.length} projects</p>
        </div>
        <Button variant="pill" className="h-auto px-5 py-2.5 text-sm" nativeButton={false} render={<Link href="/admin/projects/new" />}>
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No projects yet. Add your first one!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {projects.map((project) => (
              <div key={project.id} className="p-5 flex items-center gap-4">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-muted" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold truncate">{project.title}</p>
                    {project.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {project.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-muted text-xs">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Code2 className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                  <Link href={`/admin/projects/${project.id}/edit`} className="text-xs text-accent hover:underline">Edit</Link>
                  <DeleteButton action={deleteProject} id={project.id} label="Delete project" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
