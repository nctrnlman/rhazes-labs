import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Calendar, Clock, Eye, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    select: { slug: true },
  })
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return { title: "Not Found" }
  const description = post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
      publishedTime: post.publishedAt?.toISOString(),
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description },
  }
}

async function incrementView(slug: string) {
  try {
    await prisma.blogPost.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    })
  } catch {}
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug, status: "published" } })
  if (!post) notFound()

  await incrementView(slug)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.coverImage ?? undefined,
    author: { "@type": "Person", name: "Muhammad Rhazes Alhambra Andalusia Devino" },
  }

  return (
    <main className="pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container-custom max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {post.coverImage && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Tag className="w-3 h-3" />{tag}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-12 pb-8 border-b border-border">
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />{post.readingTime} min read
            </span>
          )}
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />{post.viewCount} views
          </span>
        </div>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-border">
          <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground">
              R
            </div>
            <div>
              <p className="font-semibold">Muhammad Rhazes</p>
              <p className="text-sm text-muted-foreground">Full Stack Engineer & Founder @ Codenito.id</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
