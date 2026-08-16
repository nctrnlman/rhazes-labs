"use client"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.ceil(end / 80))
    const timer = setInterval(() => { start = Math.min(start + step, end); setCount(start); if (start >= end) clearInterval(timer) }, 20)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsSection({ stats }: { stats?: Record<string, string> }) {
  const items = [
    { label: "Users Served", display: 7, suffix: "K+" },
    { label: "Countries", display: 20, suffix: "+" },
    { label: "Projects Delivered", display: 15, suffix: "+" },
    { label: "Years Experience", display: 3, suffix: "+" },
    { label: "Uptime SLA", display: 99, suffix: ".99%" },
  ]
  return (
    <section className="border-y border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-14">
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {items.map((item) => (
            <StaggerItem key={item.label} className="text-center">
              <p className="mb-2 text-3xl font-semibold text-foreground sm:text-4xl">
                <Counter end={item.display} suffix={item.suffix} />
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
