"use server"

import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function parseMetrics(raw: FormDataEntryValue | null) {
  try {
    const obj = JSON.parse(String(raw ?? "{}"))
    return Object.keys(obj).length > 0 ? obj : null
  } catch {
    return null
  }
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/admin/projects")
  revalidatePath("/admin")
  revalidatePath("/projects")
  revalidatePath("/")
  if (slug) revalidatePath(`/projects/${slug}`)
}

export async function createProject(formData: FormData) {
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))

  await prisma.project.create({
    data: {
      title,
      slug,
      description: String(formData.get("description") ?? ""),
      content: String(formData.get("content") || "") || null,
      techStack: String(formData.get("techStack") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      imageUrl: String(formData.get("imageUrl") || "") || null,
      liveUrl: String(formData.get("liveUrl") || "") || null,
      githubUrl: String(formData.get("githubUrl") || "") || null,
      category: String(formData.get("category") || "Web"),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
      impactMetrics: parseMetrics(formData.get("impactMetrics")),
    },
  })

  revalidateProjectPaths(slug)
  redirect("/admin/projects")
}

export async function updateProject(formData: FormData) {
  const id = String(formData.get("id"))
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description: String(formData.get("description") ?? ""),
      content: String(formData.get("content") || "") || null,
      techStack: String(formData.get("techStack") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      imageUrl: String(formData.get("imageUrl") || "") || null,
      liveUrl: String(formData.get("liveUrl") || "") || null,
      githubUrl: String(formData.get("githubUrl") || "") || null,
      category: String(formData.get("category") || "Web"),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
      impactMetrics: parseMetrics(formData.get("impactMetrics")),
    },
  })

  revalidateProjectPaths(slug)
  redirect("/admin/projects")
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id"))
  const project = await prisma.project.delete({ where: { id } })
  revalidateProjectPaths(project.slug)
}
