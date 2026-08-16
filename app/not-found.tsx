"use client"

import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <p className="mb-4 text-8xl font-semibold text-foreground">404</p>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md mx-auto font-mono text-sm text-left">
            <p className="text-muted-foreground">
              <span className="text-accent">const</span>{" "}
              <span className="text-green-500">page</span> ={" "}
              <span className="text-orange-500">await</span> findPage(url)
            </p>
            <p className="text-red-500 mt-2">// TypeError: page is undefined</p>
            <p className="text-muted-foreground mt-2">// Looks like this page got lost in the void.</p>
          </div>
        </div>
        <h1 className="text-2xl font-semibold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="pill" className="h-auto px-6 py-3" render={<Link href="/" />}>
            <Home className="w-4 h-4" /> Go Home
          </Button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl font-semibold border border-border hover:bg-muted/50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </main>
  )
}
