import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Plus, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteExperience } from "./actions"

export default async function AdminExperiencePage() {
  const items = await prisma.experience.findMany({ orderBy: { order: "asc" } })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Experience</h1>
          <p className="text-muted-foreground">{items.length} entries</p>
        </div>
        <Button variant="pill" className="h-auto px-5 py-2.5 text-sm" nativeButton={false} render={<Link href="/admin/experience/new" />}>
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No experience entries yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((e) => (
              <div key={e.id} className="p-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{e.role}</p>
                  <p className="text-sm text-accent">{e.company}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.type} · {e.period}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link href={`/admin/experience/${e.id}/edit`} className="text-xs text-accent hover:underline">Edit</Link>
                  <DeleteButton action={deleteExperience} id={e.id} label="Delete experience" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
