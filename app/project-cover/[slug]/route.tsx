import { ImageResponse } from "next/og"
import { prisma } from "@/lib/prisma"

export const contentType = "image/png"

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } })
  const title = project?.title ?? "Rhazes Labs"
  const category = project?.category ?? "Project"
  const tech = project?.techStack.slice(0, 3) ?? []

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
          {tech.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#A1A1AA",
                border: "1px solid #27272A",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
