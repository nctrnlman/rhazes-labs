"use client"

import { useState } from "react"
import { Mail, Send, MapPin, Clock } from "lucide-react"
import { toast } from "sonner"
import { FadeIn } from "@/components/shared/motion-wrapper"

const contactTypes = [
  { value: "recruiter", label: "Recruiter" },
  { value: "client", label: "Potential Client" },
  { value: "collab", label: "Collaboration" },
  { value: "other", label: "Other" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.type || !form.message) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      toast.success("Message sent! I'll get back to you soon.")
    } catch {
      toast.error("Failed to send. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let&apos;s Work{" "}
              <span className="gradient-text">Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <FadeIn delay={0.1} className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:rhazesd@gmail.com" className="font-medium hover:text-blue-500 transition-colors">
                    rhazesd@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2">
            {sent ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Message Sent!</h2>
                <p className="text-muted-foreground">
                  Thanks for reaching out. I&apos;ll review your message and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                      placeholder="Muhammad Rhazes"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium mb-2">
                    I&apos;m reaching out as <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select type...</option>
                    {contactTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project, timeline, and budget..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </main>
  )
}
