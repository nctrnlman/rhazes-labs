"use client"

import { useState } from "react"
import { Award, ChevronDown } from "lucide-react"

interface Cert {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiry: string | null
  skills: string[]
}

export function CertificationsGrid({ certifications }: { certifications: Cert[] }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? certifications : certifications.slice(0, 6)

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-xl p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Award className="h-4 w-4 text-foreground" />
            </div>
            <h3 className="mb-1 text-sm font-semibold leading-snug">{c.name}</h3>
            <p className="text-xs text-muted-foreground">{c.issuer}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {c.issueDate}
              {c.expiry ? ` · ${c.expiry}` : ""}
            </p>
            {c.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.skills.slice(0, 3).map((s) => (
                  <span key={s} className="rounded-full bg-muted/80 px-2 py-0.5 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {certifications.length > 6 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mx-auto mt-8 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? "Show less" : `Show all ${certifications.length} certifications`}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  )
}
