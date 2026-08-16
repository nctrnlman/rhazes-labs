import { prisma } from "@/lib/prisma"
import { Quote } from "lucide-react"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"

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
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from clients, colleagues, and collaborators I&apos;ve had the pleasure of working with.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col">
                <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">&ldquo;{t.message}&rdquo;</p>
                <div className="flex items-center gap-3">
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
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
