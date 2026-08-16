import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#09090B",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#A1A1AA", fontWeight: 600, marginBottom: 24 }}>
          Rhazes Devino
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          <div style={{ display: "flex" }}>Full Stack Engineer</div>
          <div style={{ display: "flex" }}>&amp; Founder @ Codenito</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#A1A1AA", marginTop: 32 }}>
          Building production-grade systems. Jakarta, working globally.
        </div>
      </div>
    ),
    { ...size }
  )
}
