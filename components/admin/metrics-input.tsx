"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

type Row = { key: string; value: string }

function parseDefault(json?: Record<string, string> | null): Row[] {
  if (!json) return [{ key: "", value: "" }]
  const rows = Object.entries(json).map(([key, value]) => ({ key, value }))
  return rows.length > 0 ? rows : [{ key: "", value: "" }]
}

export function MetricsInput({ name, defaultValue }: { name: string; defaultValue?: Record<string, string> | null }) {
  const [rows, setRows] = useState<Row[]>(() => parseDefault(defaultValue))

  const json = JSON.stringify(
    Object.fromEntries(rows.filter((r) => r.key.trim()).map((r) => [r.key.trim(), r.value.trim()]))
  )

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={row.key}
            onChange={(e) => setRows(rows.map((r, j) => (j === i ? { ...r, key: e.target.value } : r)))}
            placeholder="uptime"
            className="w-1/2 rounded-lg border border-border bg-background/50 px-3 py-1.5 text-sm"
          />
          <input
            value={row.value}
            onChange={(e) => setRows(rows.map((r, j) => (j === i ? { ...r, value: e.target.value } : r)))}
            placeholder="99.9%"
            className="w-1/2 rounded-lg border border-border bg-background/50 px-3 py-1.5 text-sm"
          />
          <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="p-1.5 text-muted-foreground hover:text-red-500">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => setRows([...rows, { key: "", value: "" }])} className="flex items-center gap-1 text-xs text-accent hover:underline">
        <Plus className="h-3 w-3" /> Add metric
      </button>
      <input type="hidden" name={name} value={json} />
    </div>
  )
}
