import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteSkill } from "./actions"

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } })
  const categories = Object.values(
    skills.reduce<Record<string, { name: string; skills: typeof skills }>>((acc, sk) => {
      acc[sk.category] ??= { name: sk.category, skills: [] }
      acc[sk.category].skills.push(sk)
      return acc
    }, {})
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Skills</h1>
          <p className="text-muted-foreground">{skills.length} skills across {categories.length} categories</p>
        </div>
        <Button variant="pill" className="h-auto px-5 py-2.5 text-sm" nativeButton={false} render={<Link href="/admin/skills/new" />}>
          <Plus className="h-4 w-4" /> Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No skills yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
                <h2 className="font-semibold text-sm">{cat.name}</h2>
              </div>
              <div className="divide-y divide-border">
                {cat.skills.map((sk) => (
                  <div key={sk.id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-sm">{sk.name}</p>
                      <p className="text-xs text-muted-foreground">{sk.level}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Link href={`/admin/skills/${sk.id}/edit`} className="text-xs text-accent hover:underline">Edit</Link>
                      <DeleteButton action={deleteSkill} id={sk.id} label="Delete skill" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
