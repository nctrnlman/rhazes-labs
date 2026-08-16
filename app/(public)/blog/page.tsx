import { prisma } from "@/lib/prisma"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import Link from "next/link"
import Image from "next/image"
import { Clock, Eye, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on engineering, architecture, AI/ML, and building products at scale, by Rhazes Devino.",
  alternates: { canonical: "/blog" },
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" } })
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 max-w-2xl">
          <SectionHeading
            eyebrow="Writing"
            title="Blog"
            description="Thoughts on engineering, architecture, AI/ML, and building products at scale."
          />
        </FadeIn>
        {posts.length === 0 ? (
          <FadeIn className="text-center py-24 text-muted-foreground">
            <p className="text-lg mb-2">Articles coming soon.</p>
            <p className="text-sm">Follow me on LinkedIn for updates.</p>
          </FadeIn>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
                  <div className="relative h-44 bg-muted">
                    <Image
                      src={post.coverImage || `/blog-cover/${post.slug}`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
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
      </div>
    </div>
  )
}
