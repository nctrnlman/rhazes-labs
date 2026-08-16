"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function revalidateSkillPaths() {
  revalidatePath("/admin/skills")
  revalidatePath("/about")
}

export async function createSkill(formData: FormData) {
  await prisma.skill.create({
    data: {
      category: String(formData.get("category") ?? ""),
      name: String(formData.get("name") ?? ""),
      level: String(formData.get("level") || "Proficient"),
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateSkillPaths()
  redirect("/admin/skills")
}

export async function updateSkill(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.skill.update({
    where: { id },
    data: {
      category: String(formData.get("category") ?? ""),
      name: String(formData.get("name") ?? ""),
      level: String(formData.get("level") || "Proficient"),
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateSkillPaths()
  redirect("/admin/skills")
}

export async function deleteSkill(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.skill.delete({ where: { id } })
  revalidateSkillPaths()
}
