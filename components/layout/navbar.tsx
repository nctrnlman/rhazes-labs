"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvailabilityBadge } from "@/components/shared/availability-badge"
import { CommandPalette } from "@/components/layout/command-palette"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/experience", label: "Experience" },
  { href: "/work-with-me", label: "Work With Me" },
  { href: "/contact", label: "Contact" },
]

export function Navbar({ availabilityStatus, availabilityLabel }: { availabilityStatus?: string; availabilityLabel?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(true) } }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "glass shadow-sm py-3" : "py-5")}>
        <nav className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-lg font-semibold text-accent">Rhazes</span>
            <span className="text-muted-foreground text-sm font-mono">.labs</span>
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCmdOpen(true)} className="hidden md:flex items-center gap-2 text-xs text-muted-foreground border border-border/50 rounded-lg px-3 py-1.5 hover:border-border transition-colors bg-card/30 backdrop-blur-sm">
              <Terminal className="h-3 w-3" /><span>⌘K</span>
            </button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-9 w-9">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="md:hidden glass shadow-sm px-4 py-4">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block py-3 text-sm font-medium border-b border-border/30 last:border-0" onClick={() => setMobileOpen(false)}>{l.label}</Link>
            ))}
          </div>
        )}
      </header>
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  )
}
