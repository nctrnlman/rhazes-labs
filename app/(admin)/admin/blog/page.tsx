import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Eye, Clock } from "lucide-react"

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-muted-foreground">{posts.length} posts</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No blog posts yet. Write your first one!</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <div key={post.id} className="p-5 flex items-center gap-4">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold truncate">{post.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                      post.status === "published" ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.viewCount} views</span>
                    {post.readingTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min</span>}
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {post.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-muted text-xs">{t}</span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs text-blue-500 hover:underline flex-shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
