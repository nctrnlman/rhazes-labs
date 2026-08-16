"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function revalidateEducationPaths() {
  revalidatePath("/admin/education")
  revalidatePath("/experience")
}

export async function createEducation(formData: FormData) {
  await prisma.education.create({
    data: {
      school: String(formData.get("school") ?? ""),
      degree: String(formData.get("degree") ?? ""),
      period: String(formData.get("period") ?? ""),
      location: String(formData.get("location") ?? ""),
      note: String(formData.get("note") || "") || null,
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateEducationPaths()
  redirect("/admin/education")
}

export async function updateEducation(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.education.update({
    where: { id },
    data: {
      school: String(formData.get("school") ?? ""),
      degree: String(formData.get("degree") ?? ""),
      period: String(formData.get("period") ?? ""),
      location: String(formData.get("location") ?? ""),
      note: String(formData.get("note") || "") || null,
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateEducationPaths()
  redirect("/admin/education")
}

export async function deleteEducation(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.education.delete({ where: { id } })
  revalidateEducationPaths()
}
