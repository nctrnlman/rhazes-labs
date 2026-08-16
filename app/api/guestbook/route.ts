import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const entries = await prisma.guestbookEntry.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(entries)
}

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json()

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message required" }, { status: 400 })
    }

    const entry = await prisma.guestbookEntry.create({
      data: { name, message },
    })

    return NextResponse.json({ success: true, id: entry.id })
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
