import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createSkill } from "../actions"

export default function NewSkillPage() {
  return (
    <div className="p-8 max-w-lg">
      <Link href="/admin/skills" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Skills
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Skill</h1>
      <form action={createSkill} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input name="category" required placeholder="Frontend, Backend, Database..." className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Skill Name</label>
          <input name="name" required placeholder="Next.js" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Level</label>
          <select name="level" defaultValue="Proficient" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm">
            <option value="Expert">Expert</option>
            <option value="Proficient">Proficient</option>
            <option value="Learning">Learning</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={0} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Skill</Button>
      </form>
    </div>
  )
}
