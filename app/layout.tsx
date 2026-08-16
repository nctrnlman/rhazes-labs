import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rhazes Devino — Full Stack Engineer & Founder", template: "%s | Rhazes Devino" },
  description: "Full Stack Engineer, Founder of Codenito ID. Building scalable, production-grade systems. Based in Jakarta, working globally.",
  keywords: ["full stack engineer", "software engineer", "Jakarta", "Codenito", "Next.js", "NestJS", "React"],
  authors: [{ name: "Muhammad Rhazes Alhambra Andalusia Devino" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rhazes Labs",
    title: "Rhazes Devino — Full Stack Engineer & Founder",
    description: "Full Stack Engineer, Founder of Codenito ID. Building scalable, production-grade systems. Based in Jakarta, working globally.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhazes Devino — Full Stack Engineer & Founder",
    description: "Full Stack Engineer, Founder of Codenito ID. Building scalable, production-grade systems.",
  },
  robots: { index: true, follow: true },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Rhazes Alhambra Andalusia Devino",
  alternateName: "Rhazes Devino",
  jobTitle: "Full Stack Engineer",
  url: SITE_URL,
  email: "mailto:rhazesd@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
  worksFor: { "@type": "Organization", name: "Codenito ID", url: "https://codenito.id" },
  sameAs: ["https://github.com/rhazes", "https://linkedin.com/in/rhazes"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
