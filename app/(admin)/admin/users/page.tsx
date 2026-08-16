import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/admin/delete-button"
import { createUser, deleteUser } from "./actions"
import { UserPlus } from "lucide-react"

export default async function AdminUsersPage() {
  const [users, session] = await Promise.all([
    prisma.user.findMany({ where: { password: { not: null } }, orderBy: { email: "asc" } }),
    auth(),
  ])

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-muted-foreground">People who can sign in to this admin panel.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8">
        <div className="divide-y divide-border">
          {users.map((u) => (
            <div key={u.id} className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">{u.name || u.email}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
              {u.id === session?.user?.id ? (
                <span className="text-xs text-muted-foreground">You</span>
              ) : (
                <DeleteButton action={deleteUser} id={u.id} label="Remove access" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-accent" /> Add a user
        </h2>
        <form action={createUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input name="name" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input name="email" type="email" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input name="password" type="password" required minLength={8} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <Button type="submit" variant="pill" className="h-auto px-6 py-3 text-sm">Add User</Button>
        </form>
      </div>
    </div>
  )
}
