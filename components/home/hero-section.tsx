"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Download, Sparkles } from "lucide-react"
import { AvailabilityBadge } from "@/components/shared/availability-badge"

interface Props { availability?: { status: string; label: string }; resumeUrl?: string }

export function HeroSection({ availability, resumeUrl }: Props) {
  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/6 blur-3xl animate-float [animation-delay:3s]" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl animate-float [animation-delay:5s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>
      <div className="container-custom section-padding w-full">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <AvailabilityBadge status={availability?.status} label={availability?.label} className="mb-8" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
              Hi, I&apos;m<br />
              <span className="gradient-accent">Rhazes</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-3 font-light tracking-wide">
            Full Stack Engineer · Founder @ Codenito · Builder
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mb-12 leading-relaxed">
            Building scalable, production-grade systems that empower businesses and communities.
            Based in <strong className="text-foreground/70">Jakarta</strong> — working globally.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4">
            <Link href="/projects" className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-7 py-3.5 text-sm font-semibold hover:bg-accent/90 transition-all duration-200 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5">
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-7 py-3.5 text-sm font-semibold hover:border-accent/30 transition-all duration-200 hover:-translate-y-0.5">
              Work With Me
            </Link>
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3.5">
                <Download className="h-4 w-4" /> Resume
              </a>
            )}
          </motion.div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-border animate-pulse" />
      </motion.div>
    </section>
  )
}
