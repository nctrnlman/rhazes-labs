import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { createPost } from "../actions"

export default function NewPostPage() {
  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Post</h1>
      <form action={createPost} className="space-y-6">
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
          <label className="block text-sm font-medium mb-2">Content</label>
          <TiptapEditor name="content" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cover image URL</label>
            <input name="coverImage" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select name="status" defaultValue="draft" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input name="tags" placeholder="Next.js, AI/ML" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Post</Button>
      </form>
    </div>
  )
}
