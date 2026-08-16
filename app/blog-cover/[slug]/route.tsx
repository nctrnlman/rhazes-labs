import { ImageResponse } from "next/og"
import { prisma } from "@/lib/prisma"

export const contentType = "image/png"

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  const title = post?.title ?? "Rhazes Labs"
  const category = post?.tags[0] ?? "Writing"
  const tags = post?.tags.slice(1, 4) ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#09090B",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#A1A1AA", fontWeight: 600 }}>
          {category}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 40 ? 56 : 68,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#A1A1AA",
                border: "1px solid #27272A",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
