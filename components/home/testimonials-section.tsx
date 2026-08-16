import { prisma } from "@/lib/prisma"
import { Quote } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"

export async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 6,
  })

  if (testimonials.length === 0) return null

  return (
    <section className="section-padding">
      <div className="container-custom">
        <FadeIn className="mb-16">
          <SectionHeading
            title="What People Say"
            description="Feedback from clients, colleagues, and collaborators I've had the pleasure of working with."
            align="center"
          />
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col">
                <Quote className="mb-4 h-8 w-8 text-accent/30" />
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">&ldquo;{t.message}&rdquo;</p>
                <div className="flex items-center gap-3">
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground">
                      {t.name[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
