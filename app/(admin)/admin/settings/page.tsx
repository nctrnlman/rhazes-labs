import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"

const settingGroups = [
  {
    title: "Availability",
    settings: [
      { key: "availability_status", label: "Status", placeholder: "open | limited | closed" },
      { key: "availability_label", label: "Label", placeholder: "Available for work" },
    ],
  },
  {
    title: "Now Page",
    settings: [
      { key: "now_learning", label: "Learning", placeholder: "What are you learning?" },
      { key: "now_building", label: "Building", placeholder: "What are you building?" },
      { key: "now_reading", label: "Reading", placeholder: "What are you reading?" },
    ],
  },
  {
    title: "Stats",
    settings: [
      { key: "stats_users", label: "Users (e.g. 7K+)", placeholder: "7K+" },
      { key: "stats_countries", label: "Countries", placeholder: "20+" },
      { key: "stats_projects", label: "Projects", placeholder: "15+" },
      { key: "stats_years", label: "Years", placeholder: "3+" },
      { key: "stats_uptime", label: "Uptime", placeholder: "99.99%" },
    ],
  },
  {
    title: "Contact",
    settings: [
      { key: "response_time", label: "Response Time", placeholder: "< 24 hours" },
      { key: "resume_url", label: "Resume URL", placeholder: "https://..." },
    ],
  },
]

async function updateSettings(formData: FormData) {
  "use server"
  const entries = Array.from(formData.entries()) as [string, string][]
  for (const [key, value] of entries) {
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }
  revalidatePath("/")
  revalidatePath("/now")
  revalidatePath("/admin/settings")
}

export default async function AdminSettingsPage() {
  const allSettings = await prisma.setting.findMany()
  const settingsMap = Object.fromEntries(allSettings.map((s) => [s.key, s.value]))

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage site-wide content from here.</p>
      </div>

      <form action={updateSettings}>
        <div className="space-y-8">
          {settingGroups.map((group) => (
            <div key={group.title} className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">{group.title}</h2>
              <div className="space-y-4">
                {group.settings.map((setting) => (
                  <div key={setting.key}>
                    <label htmlFor={setting.key} className="block text-sm font-medium mb-2">
                      {setting.label}
                    </label>
                    <input
                      id={setting.key}
                      name={setting.key}
                      type="text"
                      defaultValue={settingsMap[setting.key] || ""}
                      placeholder={setting.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button type="submit" variant="pill" className="h-auto px-8 py-3 text-sm">
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
