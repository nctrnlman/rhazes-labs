import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingCTA } from "@/components/layout/floating-cta"
import { prisma } from "@/lib/prisma"

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.setting.findMany({ where: { key: { in: ["availability_status", "availability_label"] } } })
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]))
  return (
    <>
      <Navbar availabilityStatus={s.availability_status} availabilityLabel={s.availability_label} />
      <main className="pt-16 min-h-dvh">{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
