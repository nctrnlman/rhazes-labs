import { FadeIn } from "@/components/shared/motion-wrapper"

const companies = ["Home Credit Indonesia", "Dulux Indonesia", "Armada Hasil Sagara", "Paramount Land", "Superindo", "Lawson Indonesia", "CBN", "Codenito"]

export function TrustedBySection() {
  return (
    <section className="py-14">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <FadeIn><p className="text-center text-xs font-semibold text-muted-foreground/50 uppercase tracking-[0.2em] mb-10">Trusted by teams at</p></FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {companies.map((c) => <span key={c} className="text-sm font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 cursor-default">{c}</span>)}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
