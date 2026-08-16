import { prisma } from "@/lib/prisma"
import { Star } from "lucide-react"

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-muted-foreground">{testimonials.length} testimonials</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-12 text-center">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No testimonials yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Add them directly via database seeding.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {testimonials.map((t) => (
              <div key={t.id} className="p-5">
                <div className="flex items-start gap-4">
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-white">
                      {t.name[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{t.name}</p>
                      {t.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t.role} @ {t.company}</p>
                    <p className="text-sm leading-relaxed">&ldquo;{t.message}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
