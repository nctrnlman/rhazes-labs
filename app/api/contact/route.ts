import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendLeadNotification } from "@/lib/resend"

export async function POST(req: Request) {
  try {
    const { name, email, type, message } = await req.json()

    if (!name || !email || !type || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: { name, email, type, message },
    })

    await sendLeadNotification({ name, email, type, message })

    return NextResponse.json({ success: true, id: lead.id })
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
