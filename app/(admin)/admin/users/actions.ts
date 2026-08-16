"use server"

import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/password"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
  const name = String(formData.get("name") ?? "")
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  if (!email || !password) return

  await prisma.user.create({
    data: { name, email, password: hashPassword(password) },
  })

  revalidatePath("/admin/users")
}

export async function deleteUser(formData: FormData) {
  const id = String(formData.get("id"))
  const session = await auth()

  if (session?.user?.id === id) return
  const count = await prisma.user.count()
  if (count <= 1) return

  await prisma.user.delete({ where: { id } })
  revalidatePath("/admin/users")
}
