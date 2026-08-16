import Link from "next/link"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { Code2, Layers, MessageSquare, ArrowRight, CheckCircle } from "lucide-react"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Work With Me",
  description: "Hire Rhazes Devino for full stack development, solution architecture, or technical consulting via Codenito ID.",
  alternates: { canonical: "/work-with-me" },
}

const services = [
  { icon: Code2, title: "Full Stack Development", items: ["Web apps & APIs end-to-end", "React, Next.js, NestJS, Spring Boot", "PostgreSQL, MongoDB, Redis", "Responsive, production-ready UI"] },
  { icon: Layers, title: "Solution Architecture", items: ["System design & tech stack selection", "Cloud infra (AWS, Docker, K8s)", "Microservices & scalable architecture", "99.9% uptime SLA"] },
  { icon: MessageSquare, title: "Technical Consulting", items: ["Via Codenito ID studio", "Discovery to deployment", "Team leadership & project management", "15+ projects delivered"] },
]

const steps = ["Discovery call — understand your goals", "Architecture proposal & timeline", "Development in agile sprints", "Deployment + post-launch support"]

export default function WorkWithMePage() {
  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <SectionHeading
            eyebrow="Hire Me"
            title="Let's build something together"
            description="Available for freelance projects, full-time opportunities, and technical consulting via Codenito ID."
            align="center"
          />
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-4">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />{item}</li>)}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="max-w-2xl mx-auto">
          <h2 className="mb-10 text-center text-2xl font-semibold">How it works</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-5 bg-card border border-border rounded-xl p-5">
                <span className="h-9 w-9 rounded-full bg-accent/10 text-accent font-bold text-sm flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="pill" size="lg" className="h-auto px-8 py-4" nativeButton={false} render={<Link href="/contact" />}>
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
