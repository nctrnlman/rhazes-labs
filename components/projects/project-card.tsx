import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Code2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Props {
  title: string; slug: string; description: string; techStack: string[]
  imageUrl?: string | null; liveUrl?: string | null; githubUrl?: string | null
  impactMetrics?: Record<string, string> | null
}

export function ProjectCard({ title, slug, description, techStack, imageUrl, liveUrl, githubUrl, impactMetrics }: Props) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
      <Link href={`/projects/${slug}`} className="flex-1">
        {imageUrl ? (
          <div className="relative h-48 overflow-hidden">
            <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-accent/10 to-cyan-500/5 flex items-center justify-center">
            <span className="text-5xl font-bold text-accent/20">{title[0]}</span>
          </div>
        )}
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{description}</p>
          {impactMetrics && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(impactMetrics).slice(0, 2).map(([k, v]) => (
                <span key={k} className="text-xs bg-accent/10 text-accent rounded-full px-2.5 py-0.5 font-medium">{v} {k}</span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 4).map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
            {techStack.length > 4 && <Badge variant="secondary" className="text-xs">+{techStack.length - 4}</Badge>}
          </div>
        </div>
      </Link>
      {(liveUrl || githubUrl) && (
        <div className="px-6 pb-5 flex gap-4 border-t border-border/30 pt-4">
          {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"><ArrowUpRight className="h-3 w-3" />Live</a>}
          {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"><Code2 className="h-3 w-3" />GitHub</a>}
        </div>
      )}
    </div>
  )
}
