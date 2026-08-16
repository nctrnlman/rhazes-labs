import { FadeIn } from "@/components/shared/motion-wrapper"

const industries = ["E-commerce", "Healthcare", "Logistics", "Legal", "FMCG", "Fintech", "HR Technology"]

export function IndustriesSection() {
  return (
    <section className="py-14">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn><p className="text-center text-xs font-semibold text-muted-foreground/50 uppercase tracking-[0.2em] mb-10">Industries I work across</p></FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {industries.map((i) => (
              <span key={i} className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">{i}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
