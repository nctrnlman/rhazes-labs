"use client"

import { useState, useEffect } from "react"
import { BookOpen, Send } from "lucide-react"
import { toast } from "sonner"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"

type Entry = {
  id: string
  name: string
  message: string
  createdAt: string
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [form, setForm] = useState({ name: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then(setEntries)
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.message) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      toast.success("Entry submitted! It will appear after review.")
      setForm({ name: "", message: "" })
    } catch {
      toast.error("Failed to submit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container-custom max-w-4xl">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Guestbook
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Leave a <span className="gradient-text">Mark</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Sign my guestbook and let me know you stopped by.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-card border border-border rounded-2xl p-8 mb-12">
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-lg font-medium">Thanks for signing! 🎉</p>
                <p className="text-muted-foreground mt-2">Your entry is pending review and will appear shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-blue-500 hover:underline text-sm"
                >
                  Leave another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-semibold mb-4">Sign the Guestbook</h2>
                <div>
                  <label htmlFor="gb-name" className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="gb-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="gb-message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="gb-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Say something nice..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Sign Guestbook</>
                  )}
                </button>
              </form>
            )}
          </div>
        </FadeIn>

        {entries.length > 0 && (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <StaggerItem key={entry.id}>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-foreground/90 mb-4 leading-relaxed">&ldquo;{entry.message}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{entry.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {entries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No entries yet. Be the first to sign!</p>
          </div>
        )}
      </div>
    </main>
  )
}
