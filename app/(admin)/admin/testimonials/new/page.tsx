import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createTestimonial } from "../actions"

export default function NewTestimonialPage() {
  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Testimonials
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Testimonial</h1>
      <form action={createTestimonial} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input name="name" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <input name="role" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input name="company" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Avatar URL</label>
            <input name="avatarUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea name="message" required rows={4} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={0} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" /> Featured (shows on homepage)
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Testimonial</Button>
      </form>
    </div>
  )
}
