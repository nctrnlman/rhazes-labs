"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Download, User } from "lucide-react"
import { AvailabilityBadge } from "@/components/shared/availability-badge"
import { ScrollStory } from "@/components/shared/motion-wrapper"
import { Button } from "@/components/ui/button"

interface Props { availability?: { status: string; label: string }; resumeUrl?: string }

export function HeroSection({ availability, resumeUrl }: Props) {
  return (
    <ScrollStory className="border-b border-border">
      <div className="container-custom section-padding grid w-full items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AvailabilityBadge status={availability?.status} label={availability?.label} className="mb-8" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h1 className="mb-6 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Hi, I&apos;m<br />
              <span className="text-accent">Rhazes</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3 text-xl font-light tracking-wide text-muted-foreground sm:text-2xl">
            Full Stack Engineer · Founder @ Codenito · Builder
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground/80 sm:text-lg">
            Building scalable, production-grade systems that empower businesses and communities.
            Based in <strong className="text-foreground/70">Jakarta</strong> — working globally.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4">
            <Button variant="pill" size="lg" className="h-auto px-7 py-3.5" render={<Link href="/projects" />}>
              View Projects <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="pill-outline" size="lg" className="h-auto px-7 py-3.5" render={<Link href="/work-with-me" />}>
              Work With Me
            </Button>
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <Download className="h-4 w-4" /> Resume
              </a>
            )}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden aspect-[4/5] items-center justify-center rounded-3xl border border-border bg-muted lg:flex">
          <User className="h-16 w-16 text-muted-foreground/30" strokeWidth={1} />
        </motion.div>
      </div>
    </ScrollStory>
  )
}
