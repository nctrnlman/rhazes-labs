import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/shared/motion-wrapper"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"

export function FinalCtaSection() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn className="mx-auto max-w-xl">
          <SectionHeading
            title="Ready to work together?"
            description="Open to full-time roles, freelance work, or building your next system through Codenito ID."
            align="center"
            className="mb-10"
          />
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="pill" size="lg" className="h-auto px-8 py-4" nativeButton={false} render={<Link href="/contact?type=hire" />}>
              Hire me <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="pill-outline" size="lg" className="h-auto px-8 py-4" nativeButton={false} render={<Link href="/contact?type=codenito" />}>
              Talk to Codenito ID
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
