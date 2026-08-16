"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { ScrollStory } from "@/components/shared/motion-wrapper";
import { Button } from "@/components/ui/button";

interface Props {
  availability?: { status: string; label: string };
  resumeUrl?: string;
}

export function HeroSection({ availability, resumeUrl }: Props) {
  return (
    <ScrollStory className="border-b border-border">
      <div className="container-custom section-padding grid w-full items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AvailabilityBadge
              status={availability?.status}
              label={availability?.label}
              className="mb-8"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="mb-5 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Hi, I&apos;m
              <br />
              <span className="text-foreground">Rhazes</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-3 text-xl font-light tracking-wide text-muted-foreground sm:text-2xl"
          >
            Software Engineer building production-grade software, from
            idea to launch.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground/80 sm:text-lg"
          >
            3+ years shipping scalable systems for clients across
            e-commerce, healthcare, logistics, and more. Founder of{" "}
            <strong className="text-foreground/70">Codenito ID</strong>,
            based in{" "}
            <strong className="text-foreground/70">Jakarta</strong>, working
            globally.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8 flex items-center gap-5 text-sm text-muted-foreground"
          >
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 leading-none transition-colors hover:text-foreground"
              >
                <Download className="h-3.5 w-3.5" /> Resume
              </a>
            )}
            <a
              href="/api/portfolio-pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 leading-none transition-colors hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5" /> Portfolio
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="pill"
              size="lg"
              className="h-auto px-7 py-3.5"
              nativeButton={false}
              render={<Link href="/projects" />}
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="pill-outline"
              size="lg"
              className="h-auto px-7 py-3.5"
              nativeButton={false}
              render={<Link href="/work-with-me" />}
            >
              Work With Me
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden items-center justify-center lg:flex"
        >
          <div className="relative h-56 w-56 overflow-hidden rounded-full border border-border shadow-xl shadow-foreground/5 xl:h-64 xl:w-64">
            <Image
              src="/images/rhazes-profile.jpg"
              alt="Rhazes Devino"
              fill
              className="object-cover grayscale contrast-125 brightness-95"
              priority
              quality={100}
              sizes="256px"
            />
          </div>
        </motion.div>
      </div>
    </ScrollStory>
  );
}
