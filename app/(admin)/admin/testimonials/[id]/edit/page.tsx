import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { updateTestimonial } from "../../actions"

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const t = await prisma.testimonial.findUnique({ where: { id } })
  if (!t) notFound()

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Testimonials
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Testimonial</h1>
      <form action={updateTestimonial} className="space-y-6">
        <input type="hidden" name="id" value={t.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input name="name" required defaultValue={t.name} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <input name="role" required defaultValue={t.role} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input name="company" required defaultValue={t.company} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Avatar URL</label>
            <input name="avatarUrl" defaultValue={t.avatarUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea name="message" required rows={4} defaultValue={t.message} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={t.order} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={t.featured} className="h-4 w-4 rounded border-border" /> Featured (shows on homepage)
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
