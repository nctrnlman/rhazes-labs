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

export const metadata: Metadata = {
  title: { default: "Rhazes Devino — Full Stack Engineer & Founder", template: "%s | Rhazes Devino" },
  description: "Full Stack Engineer, Founder of Codenito ID. Building scalable, production-grade systems. Based in Jakarta, working globally.",
  keywords: ["full stack engineer", "software engineer", "Jakarta", "Codenito", "Next.js", "NestJS", "React"],
  authors: [{ name: "Muhammad Rhazes Alhambra Andalusia Devino" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Rhazes Labs",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
