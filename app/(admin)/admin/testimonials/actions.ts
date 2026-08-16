"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials")
  revalidatePath("/")
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      avatarUrl: String(formData.get("avatarUrl") || "") || null,
      message: String(formData.get("message") ?? ""),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateTestimonialPaths()
  redirect("/admin/testimonials")
}

export async function updateTestimonial(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.testimonial.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      avatarUrl: String(formData.get("avatarUrl") || "") || null,
      message: String(formData.get("message") ?? ""),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateTestimonialPaths()
  redirect("/admin/testimonials")
}

export async function deleteTestimonial(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.testimonial.delete({ where: { id } })
  revalidateTestimonialPaths()
}
