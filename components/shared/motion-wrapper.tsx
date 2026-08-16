"use client"

import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface Props { children: React.ReactNode; className?: string; delay?: number }

export function FadeIn({ children, className, delay = 0 }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }} className={className}>
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className={className}>
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } } }} className={className}>
      {children}
    </motion.div>
  )
}

export function ScrollStory({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const y = useTransform(scrollYProgress, [0, 1], [0, -40])
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={cn("relative h-[140vh]", className)}>
      <motion.div style={{ opacity, scale, y }} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {children}
      </motion.div>
    </div>
  )
}
