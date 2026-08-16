import { prisma } from "@/lib/prisma"
import { MessageSquare, Mail } from "lucide-react"

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Leads</h1>
        <p className="text-muted-foreground">{leads.length} total contacts</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No leads yet. They&apos;ll appear here when someone contacts you.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {leads.map((lead) => (
              <div key={lead.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold">{lead.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === "new" ? "bg-green-500/10 text-green-500" :
                        lead.status === "read" ? "bg-blue-500/10 text-blue-500" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {lead.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground capitalize">
                        {lead.type}
                      </span>
                    </div>
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1 text-sm text-blue-500 hover:underline mb-3"
                    >
                      <Mail className="w-3 h-3" />{lead.email}
                    </a>
                    <p className="text-sm text-muted-foreground leading-relaxed">{lead.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground flex-shrink-0">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
