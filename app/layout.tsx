import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { prisma } from "@/lib/prisma"
import { cache } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const DEFAULT_SITE_NAME = "Rhazes Devino"
const DEFAULT_DESCRIPTION =
  "Full Stack Engineer, Founder of Codenito ID. Building scalable, production-grade systems. Based in Jakarta, working globally."
const DEFAULT_GITHUB = "https://github.com/rhazes"
const DEFAULT_LINKEDIN = "https://linkedin.com/in/rhazes"
const DEFAULT_INSTAGRAM = "https://www.instagram.com/rhazes.d/"

const getSiteSettings = cache(async () => {
  const rows = await prisma.setting.findMany({
    where: { key: { in: ["site_name", "site_description", "social_github", "social_linkedin", "social_instagram"] } },
  })
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  return {
    siteName: map.site_name || DEFAULT_SITE_NAME,
    description: map.site_description || DEFAULT_DESCRIPTION,
    github: map.social_github || DEFAULT_GITHUB,
    linkedin: map.social_linkedin || DEFAULT_LINKEDIN,
    instagram: map.social_instagram || DEFAULT_INSTAGRAM,
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const { siteName, description } = await getSiteSettings()
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${siteName} — Full Stack Engineer & Founder`, template: `%s | ${siteName}` },
    description,
    keywords: ["full stack engineer", "software engineer", "Jakarta", "Codenito", "Next.js", "NestJS", "React"],
    authors: [{ name: "Muhammad Rhazes Alhambra Andalusia Devino" }],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: "Rhazes Labs",
      title: `${siteName} — Full Stack Engineer & Founder`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} — Full Stack Engineer & Founder`,
      description,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { description, github, linkedin } = await getSiteSettings()

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Rhazes Alhambra Andalusia Devino",
    alternateName: "Rhazes Devino",
    jobTitle: "Full Stack Engineer",
    description,
    url: SITE_URL,
    email: "mailto:rhazesd@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
    worksFor: { "@type": "Organization", name: "Codenito ID", url: "https://codenito.id" },
    sameAs: [github, linkedin],
  }

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
