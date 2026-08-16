import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"

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
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold">How I work</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <StaggerItem key={s.num}>
              <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-accent/20 transition-all duration-300 h-full">
                <span className="text-6xl font-bold gradient-accent opacity-15 block mb-3 leading-none">{s.num}</span>
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
