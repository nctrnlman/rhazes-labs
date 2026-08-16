"use server"

import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function readingTimeFrom(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/admin/blog")
  revalidatePath("/admin")
  revalidatePath("/blog")
  revalidatePath("/")
  if (slug) revalidatePath(`/blog/${slug}`)
}

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))
  const status = String(formData.get("status") || "draft")
  const content = String(formData.get("content") || "")

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      content,
      coverImage: String(formData.get("coverImage") || "") || null,
      tags: String(formData.get("tags") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      status,
      publishedAt: status === "published" ? new Date() : null,
      readingTime: readingTimeFrom(content),
    },
  })

  revalidateBlogPaths(slug)
  redirect("/admin/blog")
}

export async function updatePost(formData: FormData) {
  const id = String(formData.get("id"))
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))
  const status = String(formData.get("status") || "draft")
  const content = String(formData.get("content") || "")

  const existing = await prisma.blogPost.findUnique({ where: { id } })

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      coverImage: String(formData.get("coverImage") || "") || null,
      tags: String(formData.get("tags") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      status,
      publishedAt: status === "published" ? (existing?.publishedAt ?? new Date()) : null,
      readingTime: readingTimeFrom(content),
    },
  })

  revalidateBlogPaths(slug)
  redirect("/admin/blog")
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id"))
  const post = await prisma.blogPost.delete({ where: { id } })
  revalidateBlogPaths(post.slug)
}
