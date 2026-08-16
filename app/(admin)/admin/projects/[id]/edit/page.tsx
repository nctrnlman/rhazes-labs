import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { MetricsInput } from "@/components/admin/metrics-input"
import { updateProject } from "../../actions"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Project</h1>
      <form action={updateProject} className="space-y-6">
        <input type="hidden" name="id" value={project.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input name="title" required defaultValue={project.title} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input name="slug" defaultValue={project.slug} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea name="description" required rows={2} defaultValue={project.description} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Case study content</label>
          <TiptapEditor name="content" defaultValue={project.content ?? ""} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input name="category" defaultValue={project.category} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Period</label>
            <input name="period" defaultValue={project.period ?? ""} placeholder="Jan 2025 – Present" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input name="order" type="number" defaultValue={project.order} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tech stack (comma-separated)</label>
          <input name="techStack" defaultValue={project.techStack.join(", ")} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input name="imageUrl" defaultValue={project.imageUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Live URL</label>
            <input name="liveUrl" defaultValue={project.liveUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input name="githubUrl" defaultValue={project.githubUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Impact metrics</label>
          <MetricsInput name="impactMetrics" defaultValue={project.impactMetrics as Record<string, string> | null} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={project.featured} className="h-4 w-4 rounded border-border" /> Featured
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
