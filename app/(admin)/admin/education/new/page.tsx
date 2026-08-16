import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createEducation } from "../actions"

export default function NewEducationPage() {
  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/education" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Education
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Education</h1>
      <form action={createEducation} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">School</label>
          <input name="school" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Degree</label>
          <input name="degree" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Period</label>
            <input name="period" required placeholder="Aug 2021 – Aug 2023" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input name="location" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Note</label>
          <input name="note" placeholder="Final Project: ..." className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={0} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Education</Button>
      </form>
    </div>
  )
}
