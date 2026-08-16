import { prisma } from "@/lib/prisma"
import { FadeIn } from "@/components/shared/motion-wrapper"
import { BlogListClient } from "@/components/blog/blog-list-client"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on engineering, architecture, AI/ML, and building products at scale, by Rhazes Devino.",
  alternates: { canonical: "/blog" },
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" } })
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort()

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
          <BlogListClient posts={posts} tags={tags} />
        )}
      </div>
    </div>
  )
}
