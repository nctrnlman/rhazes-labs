import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { MetricsInput } from "@/components/admin/metrics-input"
import { createProject } from "../actions"

export default function NewProjectPage() {
  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Project</h1>
      <form action={createProject} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input name="title" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug (optional — auto from title)</label>
            <input name="slug" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea name="description" required rows={2} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Case study content</label>
          <TiptapEditor name="content" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input name="category" defaultValue="Web" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input name="order" type="number" defaultValue={0} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tech stack (comma-separated)</label>
          <input name="techStack" placeholder="Next.js, TypeScript, Prisma" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input name="imageUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Live URL</label>
            <input name="liveUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input name="githubUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Impact metrics</label>
          <MetricsInput name="impactMetrics" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" /> Featured
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Project</Button>
      </form>
    </div>
  )
}
