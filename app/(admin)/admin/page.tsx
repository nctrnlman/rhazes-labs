import { prisma } from "@/lib/prisma"
import { FolderOpen, FileText, MessageSquare, BookOpen } from "lucide-react"

export default async function AdminDashboardPage() {
  const [projectCount, postCount, newLeads, pendingGuests] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count({ where: { status: "published" } }),
    prisma.lead.count({ where: { status: "new" } }),
    prisma.guestbookEntry.count({ where: { approved: false } }),
  ])

  const stats = [
    { label: "Projects", value: projectCount, icon: FolderOpen, color: "blue" },
    { label: "Published Posts", value: postCount, icon: FileText, color: "purple" },
    { label: "New Leads", value: newLeads, icon: MessageSquare, color: "green" },
    { label: "Pending Guestbook", value: pendingGuests, icon: BookOpen, color: "orange" },
  ]

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Rhazes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-6">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>
        {recentLeads.length === 0 ? (
          <p className="text-muted-foreground text-sm">No leads yet.</p>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-sm">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email} · {lead.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    lead.status === "new" ? "bg-green-500/10 text-green-500" :
                    lead.status === "read" ? "bg-blue-500/10 text-blue-500" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {lead.status}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString()}
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
