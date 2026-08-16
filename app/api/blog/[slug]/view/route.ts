import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const post = await prisma.blogPost.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
      select: { viewCount: true },
    })
    return NextResponse.json({ viewCount: post.viewCount })
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
}
