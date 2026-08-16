import Link from "next/link"
import { ArrowUpRight, Users, Package, TrendingUp, Star } from "lucide-react"
import { FadeIn } from "@/components/shared/motion-wrapper"

const coStats = [
  { icon: Package, label: "Projects Delivered", value: "15+" },
  { icon: Users, label: "Team Members", value: "8+" },
  { icon: Star, label: "Client Satisfaction", value: ">90%" },
  { icon: TrendingUp, label: "Revenue Growth", value: "3× 2025" },
]

export function CodenitoSection() {
  return (
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-card border border-border border border-border/50 p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/6 blur-3xl" />
          <FadeIn className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">My Studio</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Codenito ID</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                A remote-first software studio I founded in 2022. We deliver production-grade systems for clients in e-commerce, healthcare, logistics, and FMCG — with 100% on-time delivery record.
              </p>
              <Link href="https://codenito.id" target="_blank" className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-semibold hover:opacity-80 transition-opacity">
                Visit Codenito <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {coStats.map((s) => (
                <div key={s.label} className="bg-background/40 rounded-2xl p-5 border border-border/50 hover:border-accent/30 transition-colors">
                  <s.icon className="h-5 w-5 text-accent mb-3" />
                  <p className="text-2xl font-bold mb-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
