"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    toast.success("Email copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      <span>{email}</span>
    </button>
  )
}
