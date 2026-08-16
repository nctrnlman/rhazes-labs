import Link from "next/link"
import { Code2, Link2, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-accent">Rhazes Devino</p>
            <p className="text-sm text-muted-foreground">Full Stack Engineer · Founder · Builder</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="https://github.com/rhazes" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors"><Code2 className="h-5 w-5" /></Link>
            <Link href="https://linkedin.com/in/rhazes" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors"><Link2 className="h-5 w-5" /></Link>
            <Link href="mailto:rhazesd@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors"><Mail className="h-5 w-5" /></Link>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Rhazes Labs. Built with Next.js.</p>
        </div>
      </div>
    </footer>
  )
}
