import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { updatePost } from "../../actions"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Post</h1>
      <form action={updatePost} className="space-y-6">
        <input type="hidden" name="id" value={post.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input name="title" required defaultValue={post.title} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input name="slug" defaultValue={post.slug} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <TiptapEditor name="content" defaultValue={post.content} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cover image URL</label>
            <input name="coverImage" defaultValue={post.coverImage ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select name="status" defaultValue={post.status} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input name="tags" defaultValue={post.tags.join(", ")} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
