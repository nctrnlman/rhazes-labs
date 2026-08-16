"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function revalidateCertificationPaths() {
  revalidatePath("/admin/certifications")
  revalidatePath("/experience")
}

export async function createCertification(formData: FormData) {
  await prisma.certification.create({
    data: {
      name: String(formData.get("name") ?? ""),
      issuer: String(formData.get("issuer") ?? ""),
      issueDate: String(formData.get("issueDate") ?? ""),
      expiry: String(formData.get("expiry") || "") || null,
      credentialId: String(formData.get("credentialId") || "") || null,
      skills: String(formData.get("skills") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateCertificationPaths()
  redirect("/admin/certifications")
}

export async function updateCertification(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.certification.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      issuer: String(formData.get("issuer") ?? ""),
      issueDate: String(formData.get("issueDate") ?? ""),
      expiry: String(formData.get("expiry") || "") || null,
      credentialId: String(formData.get("credentialId") || "") || null,
      skills: String(formData.get("skills") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateCertificationPaths()
  redirect("/admin/certifications")
}

export async function deleteCertification(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.certification.delete({ where: { id } })
  revalidateCertificationPaths()
}
