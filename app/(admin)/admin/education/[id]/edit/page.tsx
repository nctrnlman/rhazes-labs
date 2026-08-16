import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { updateEducation } from "../../actions"

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const e = await prisma.education.findUnique({ where: { id } })
  if (!e) notFound()

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Education
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Education</h1>
      <form action={updateEducation} className="space-y-6">
        <input type="hidden" name="id" value={e.id} />
        <div>
          <label className="block text-sm font-medium mb-2">School</label>
          <input name="school" required defaultValue={e.school} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Degree</label>
          <input name="degree" required defaultValue={e.degree} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Period</label>
            <input name="period" required defaultValue={e.period} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input name="location" required defaultValue={e.location} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Note</label>
          <input name="note" defaultValue={e.note ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={e.order} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
