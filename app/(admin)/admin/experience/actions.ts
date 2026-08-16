"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function revalidateExperiencePaths() {
  revalidatePath("/admin/experience")
  revalidatePath("/experience")
}

export async function createExperience(formData: FormData) {
  await prisma.experience.create({
    data: {
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      period: String(formData.get("period") ?? ""),
      type: String(formData.get("type") ?? ""),
      highlights: String(formData.get("highlights") ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
      techStack: String(formData.get("techStack") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateExperiencePaths()
  redirect("/admin/experience")
}

export async function updateExperience(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.experience.update({
    where: { id },
    data: {
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      period: String(formData.get("period") ?? ""),
      type: String(formData.get("type") ?? ""),
      highlights: String(formData.get("highlights") ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
      techStack: String(formData.get("techStack") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateExperiencePaths()
  redirect("/admin/experience")
}

export async function deleteExperience(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.experience.delete({ where: { id } })
  revalidateExperiencePaths()
}
