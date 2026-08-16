"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { loginAction } from "@/app/login/actions"

export function LoginForm() {
  const [error, formAction, pending] = useActionState(loginAction, undefined)

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          placeholder="••••••••"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" disabled={pending} variant="pill" className="h-auto w-full justify-center px-6 py-3">
        {pending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  )
}
