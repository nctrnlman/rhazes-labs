"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare } from "lucide-react"

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} transition={{ duration: 0.25 }} className="fixed bottom-6 right-6 z-40">
          <Link href="/contact" className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-colors hover:bg-accent/90">
            <MessageSquare className="h-4 w-4" />Let&apos;s work together
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
