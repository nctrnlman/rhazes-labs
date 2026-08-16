import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { updateCertification } from "../../actions"

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const c = await prisma.certification.findUnique({ where: { id } })
  if (!c) notFound()

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/certifications" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Certifications
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Certification</h1>
      <form action={updateCertification} className="space-y-6">
        <input type="hidden" name="id" value={c.id} />
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input name="name" required defaultValue={c.name} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Issuer</label>
          <input name="issuer" required defaultValue={c.issuer} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Issue Date</label>
            <input name="issueDate" required defaultValue={c.issueDate} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expiry (optional)</label>
            <input name="expiry" defaultValue={c.expiry ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Credential ID (optional)</label>
          <input name="credentialId" defaultValue={c.credentialId ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
          <input name="skills" defaultValue={c.skills.join(", ")} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={c.order} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
