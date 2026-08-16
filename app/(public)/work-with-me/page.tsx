import Link from "next/link"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { AvailabilityBadge } from "@/components/shared/availability-badge"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { Code2, Layers, MessageSquare, ArrowRight, CheckCircle, Rocket, Building2, Globe2, MessageCircle, User } from "lucide-react"
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

const reasons = [
  { icon: Rocket, title: "Founder-level ownership", description: "I've run Codenito ID from the ground up since 2022, handling discovery, architecture, and delivery myself. That's why I think like an owner, not just a contributor." },
  { icon: Building2, title: "Enterprise-scale experience", description: "I've built systems that handle real production traffic at enterprise scale, so I understand what uptime and reliability actually take." },
  { icon: Globe2, title: "Cross-domain range", description: "I've shipped 15+ systems across e-commerce, healthcare, logistics, fintech, and education. I adapt fast instead of needing months to ramp up." },
]

const steps = ["Discovery call to understand your goals", "Architecture proposal and timeline", "Development in agile sprints", "Deployment and post-launch support"]

const faqs = [
  { q: "Are you open to full-time roles?", a: "Yes. Alongside freelance work and running Codenito ID, I'm open to full-time opportunities that are the right fit." },
  { q: "What's Codenito ID's engagement model?", a: "Usually project-based or an ongoing retainer, depending on scope. We'll figure out the right fit together during the discovery call." },
  { q: "Do you work with international or remote clients?", a: "Yes. I'm based in Jakarta (GMT+7), and Codenito ID is remote-first, so I regularly collaborate with distributed teams." },
  { q: "Can you sign an NDA?", a: "Yes, happy to sign an NDA before we get into project specifics." },
  { q: "How fast do you respond?", a: "Usually within 24 hours. You can also check my live status on the About page." },
]

export default async function WorkWithMePage() {
  const settings = await prisma.setting.findMany({ where: { key: { in: ["availability_status", "availability_label", "social_whatsapp"] } } })
  const s = Object.fromEntries(settings.map((x) => [x.key, x.value]))
  const whatsapp = s.social_whatsapp || "https://wa.me/6281221431716"

  return (
    <div className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <AvailabilityBadge status={s.availability_status} label={s.availability_label} className="mb-6" />
          <SectionHeading
            eyebrow="Hire Me"
            title="Let's build something together"
            description="Available for freelance projects, full-time opportunities, and technical consulting via Codenito ID."
            align="center"
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 max-w-4xl mx-auto">
          <StaggerItem>
            <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                <User className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Hire Me</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                Full-time roles, freelance gigs, or any interesting opportunity. I&apos;d love to hear about it.
              </p>
              <Button variant="pill-outline" className="h-auto w-fit px-5 py-2.5 text-sm" nativeButton={false} render={<Link href="/contact?type=hire" />}>
                Talk to me <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                <Building2 className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Work With Codenito ID</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                Need a dev partner for your business? Codenito ID delivers full-service software solutions end-to-end.
              </p>
              <Button variant="pill" className="h-auto w-fit px-5 py-2.5 text-sm" nativeButton={false} render={<Link href="/contact?type=codenito" />}>
                Talk to Codenito <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn className="mb-8 text-center">
          <h2 className="text-2xl font-semibold">What I bring to the table</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {services.map((sv) => (
            <StaggerItem key={sv.title}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full">
                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-6">
                  <sv.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-4">{sv.title}</h3>
                <ul className="space-y-2">
                  {sv.items.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />{item}</li>)}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="max-w-4xl mx-auto mb-20">
          <h2 className="mb-10 text-center text-2xl font-semibold">Why work with me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <r.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="pill-outline" className="h-auto px-6 py-3 text-sm" nativeButton={false} render={<Link href="/projects" />}>
              See my work <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>

        <FadeIn className="max-w-2xl mx-auto mb-20">
          <h2 className="mb-10 text-center text-2xl font-semibold">How it works</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-5 bg-card border border-border rounded-xl p-5">
                <span className="h-9 w-9 rounded-full bg-muted text-foreground font-bold text-sm flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <p className="font-medium">{step}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <TestimonialsSection />

      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl mx-auto mt-4">
          <h2 className="mb-10 text-center text-2xl font-semibold">Common questions</h2>
          <div className="space-y-4 mb-16">
            {faqs.map((f) => (
              <div key={f.q} className="bg-card border border-border rounded-xl p-5">
                <p className="font-medium mb-1.5">{f.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="pill" size="lg" className="h-auto px-8 py-4" nativeButton={false} render={<Link href="/contact?type=hire" />}>
              Hire me <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="pill-outline" size="lg" className="h-auto px-8 py-4" nativeButton={false} render={<Link href="/contact?type=codenito" />}>
              Talk to Codenito ID
            </Button>
            <Button variant="pill-outline" size="lg" className="h-auto px-8 py-4" nativeButton={false} render={<a href={whatsapp} target="_blank" rel="noopener noreferrer" />}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
