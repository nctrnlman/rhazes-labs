import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { prisma } from "@/lib/prisma"

export async function LatestWritingSection() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 3,
  })

  if (posts.length === 0) return null

  return (
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 flex items-end justify-between">
          <SectionHeading eyebrow="Latest Writing" title="Thoughts & notes" />
          <Link href="/blog" className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>
                <h3 className="mb-3 line-clamp-2 font-semibold transition-colors group-hover:text-accent">{post.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  {post.readingTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime} min</span>}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
