import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = { title: "Sign In" }

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold text-accent">Rhazes Labs</p>
          <p className="text-sm text-muted-foreground">Sign in to the admin panel</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
