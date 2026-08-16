"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface Post {
  id: string
  slug: string
  title: string
  tags: string[]
  coverImage: string | null
  publishedAt: Date | null
  readingTime: number | null
  viewCount: number
}

export function BlogListClient({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag]
  )

  return (
    <>
      {tags.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              activeTag === null ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                activeTag === tag ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground">
          <p>No articles with this tag yet.</p>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.coverImage || `/blog-cover/${post.slug}`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                  <h3 className="font-semibold text-lg mb-4 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                    {post.readingTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime} min</span>}
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.viewCount}</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </>
  )
}
