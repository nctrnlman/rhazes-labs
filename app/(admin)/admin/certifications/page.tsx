import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Plus, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteCertification } from "./actions"

export default async function AdminCertificationsPage() {
  const items = await prisma.certification.findMany({ orderBy: { order: "asc" } })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Certifications</h1>
          <p className="text-muted-foreground">{items.length} certifications</p>
        </div>
        <Button variant="pill" className="h-auto px-5 py-2.5 text-sm" nativeButton={false} render={<Link href="/admin/certifications/new" />}>
          <Plus className="h-4 w-4" /> Add Certification
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No certifications yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((c) => (
              <div key={c.id} className="p-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.issueDate}{c.expiry ? ` · ${c.expiry}` : ""}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link href={`/admin/certifications/${c.id}/edit`} className="text-xs text-accent hover:underline">Edit</Link>
                  <DeleteButton action={deleteCertification} id={c.id} label="Delete certification" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
