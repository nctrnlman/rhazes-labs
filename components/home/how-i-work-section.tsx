import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"

const steps = [
  { num: "01", title: "Discovery", desc: "Deep dive into your goals, technical constraints, and success criteria. Define scope and architecture approach." },
  { num: "02", title: "Architecture", desc: "Design scalable system architecture, select the right tech stack, and create a clear delivery roadmap." },
  { num: "03", title: "Build", desc: "Agile development with frequent demos, code reviews, CI/CD, and continuous integration from day one." },
  { num: "04", title: "Deploy", desc: "Production deployment with monitoring, documentation, and post-launch support to ensure smooth operation." },
]

export function HowIWorkSection() {
  return (
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-14">
          <SectionHeading eyebrow="Process" title="How I work" align="center" />
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <StaggerItem key={s.num}>
              <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300 h-full">
                <span className="mb-3 block text-6xl font-semibold leading-none text-accent opacity-15">{s.num}</span>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
