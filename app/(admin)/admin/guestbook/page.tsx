import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Check, X, BookOpen } from "lucide-react"

async function approveEntry(id: string) {
  "use server"
  await prisma.guestbookEntry.update({ where: { id }, data: { approved: true } })
  revalidatePath("/admin/guestbook")
}

async function rejectEntry(id: string) {
  "use server"
  await prisma.guestbookEntry.delete({ where: { id } })
  revalidatePath("/admin/guestbook")
}

export default async function AdminGuestbookPage() {
  const pending = await prisma.guestbookEntry.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
  })
  const approved = await prisma.guestbookEntry.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Guestbook</h1>
        <p className="text-muted-foreground">{pending.length} pending · {approved.length} approved</p>
      </div>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Pending Review</h2>
          <div className="bg-card border border-border rounded-2xl divide-y divide-border">
            {pending.map((entry) => (
              <div key={entry.id} className="p-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{entry.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <form action={approveEntry.bind(null, entry.id)}>
                    <button type="submit" className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                  </form>
                  <form action={rejectEntry.bind(null, entry.id)}>
                    <button type="submit" className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-4">Approved ({approved.length})</h2>
        {approved.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No approved entries yet.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl divide-y divide-border">
            {approved.map((entry) => (
              <div key={entry.id} className="p-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{entry.message}</p>
                </div>
                <form action={rejectEntry.bind(null, entry.id)}>
                  <button type="submit" className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
