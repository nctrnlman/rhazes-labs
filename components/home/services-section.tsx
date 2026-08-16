import { Code2, Layers, MessageSquare } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"

const services = [
  { icon: Code2, title: "Full Stack Engineer", desc: "End-to-end development from database architecture to polished UI. React, Next.js, NestJS, PostgreSQL, and more." },
  { icon: Layers, title: "Solution Architect", desc: "Designing scalable, maintainable systems. Cloud infra, microservices, CI/CD pipelines, 99.9% uptime SLA." },
  { icon: MessageSquare, title: "Technical Consultant", desc: "Via Codenito ID — guiding businesses from concept to production with 15+ successful deliveries and >90% satisfaction." },
]

export function ServicesSection() {
  return (
    <section className="section-padding bg-card/10">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">What I Offer</p>
          <h2 className="text-3xl sm:text-4xl font-bold">How I can help you</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-accent/30 transition-all duration-300 group">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
