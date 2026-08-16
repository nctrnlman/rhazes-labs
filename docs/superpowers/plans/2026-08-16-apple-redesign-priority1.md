# Apple-Style Redesign — Priority 1 Page Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the foundation primitives (`Button` pill variants, `SectionHeading`, `ScrollStory`, flat `bg-card`/`border-border` surfaces, apple-blue accent) to the highest-visibility public pages: Home, About, Projects (list + detail), Work-With-Me.

**Architecture:** Continues the foundation plan (`docs/superpowers/plans/2026-08-16-apple-redesign-foundation.md`) — presentation-layer edits only, no data-fetching changes. Also fixes two pre-existing, unrelated bugs discovered while reading these files: an undefined `.btn-primary` CSS class used on several buttons (renders unstyled), and duplicated `border border-border` class fragments left over from the foundation's mechanical `.glass` rename in `codenito-section.tsx` and `project-card.tsx`.

**Tech Stack:** Same as foundation plan — Next.js App Router, Tailwind v4, Framer Motion, shadcn/ui `Button`.

## Global Constraints

- No changes to Prisma schema, API routes, or auth flow.
- No new unit tests — verification is `npm run build` + manual visual check.
- Headline weight capped at 600 (`font-semibold`), not 700 (`font-bold`) — per foundation spec §1.
- `ScrollStory` reserved for hero-tier sections only — per foundation spec §4. Used here only in the Home hero.
- Do not commit after every task — one commit at the very end of this plan.
- Real content (bio copy, hero photo) is out of scope — see "Open Dependencies" in the design spec. Where a hero photo would go, use a placeholder slot, not a fabricated image.

---

## Task 1: Rebuild the Home hero with `ScrollStory`

**Files:**
- Modify: `components/home/hero-section.tsx`

**Interfaces:**
- Consumes: `ScrollStory` from `@/components/shared/motion-wrapper`, `Button` from `@/components/ui/button`.
- Produces: no signature change — `HeroSection({ availability?, resumeUrl? })` stays the same, only its internals change.

- [ ] **Step 1: Replace the file contents**

```tsx
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
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds (the `Sparkles` import that was unused before is gone; `User` from `lucide-react` is a valid export).

Run: `npm run dev`, open `/` — confirm the hero shows a two-column layout (text + placeholder portrait panel on desktop, portrait hidden below `lg`), the headline is semibold (not as heavy as before), and scrolling down causes the whole hero to shrink/fade as it's replaced by the stats bar beneath it (the `ScrollStory` effect). Toggle OS reduced-motion and confirm the hero renders as a static block instead.

---

## Task 2: Polish remaining Home sections

**Files:**
- Modify: `components/home/stats-section.tsx`
- Modify: `components/home/trusted-by-section.tsx`
- Modify: `components/home/featured-projects-section.tsx`
- Modify: `components/home/codenito-section.tsx`
- Modify: `components/home/services-section.tsx`
- Modify: `components/home/how-i-work-section.tsx`
- Modify: `components/home/testimonials-section.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading` (new usage in featured-projects, services, how-i-work, testimonials sections).
- Produces: no signature changes to any of these components.

- [ ] **Step 1: `stats-section.tsx`** — replace the gradient-clipped counter text with a solid accent color (apple.com doesn't gradient-clip large numbers)

Replace:
```tsx
              <p className="text-3xl sm:text-4xl font-bold gradient-accent mb-2">
```
with:
```tsx
              <p className="mb-2 text-3xl font-semibold text-accent sm:text-4xl">
```

- [ ] **Step 2: `trusted-by-section.tsx`** — no changes needed, already flat and minimal (skip).

- [ ] **Step 3: `featured-projects-section.tsx`** — swap the hand-rolled heading for `SectionHeading`

Replace:
```tsx
        <FadeIn className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Featured Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Projects that ship</h2>
          </div>
          <Link href="/projects" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mb-12 flex items-end justify-between">
          <SectionHeading eyebrow="Featured Work" title="Projects that ship" />
          <Link href="/projects" className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
```
Add the import at the top of the file:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```

- [ ] **Step 4: `codenito-section.tsx`** — dedupe the doubled border classes left by the foundation's mechanical rename

Replace:
```tsx
        <div className="rounded-3xl bg-card border border-border border border-border/50 p-8 sm:p-12 overflow-hidden relative">
```
with:
```tsx
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
```

- [ ] **Step 5: `services-section.tsx`** — swap the hand-rolled heading for `SectionHeading`

Replace:
```tsx
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">What I Offer</p>
          <h2 className="text-3xl sm:text-4xl font-bold">How I can help you</h2>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mb-14">
          <SectionHeading eyebrow="What I Offer" title="How I can help you" align="center" />
        </FadeIn>
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```

- [ ] **Step 6: `how-i-work-section.tsx`** — swap the heading and drop the gradient-clipped step numbers for a solid, lower-opacity accent

Replace:
```tsx
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold">How I work</h2>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mb-14">
          <SectionHeading eyebrow="Process" title="How I work" align="center" />
        </FadeIn>
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```
Replace:
```tsx
                <span className="text-6xl font-bold gradient-accent opacity-15 block mb-3 leading-none">{s.num}</span>
```
with:
```tsx
                <span className="mb-3 block text-6xl font-semibold leading-none text-accent opacity-15">{s.num}</span>
```

- [ ] **Step 7: `testimonials-section.tsx`** — swap the heading, drop the gradient-clipped word and the hardcoded `blue-500`/`purple-500` fallback avatar in favor of the accent token

Replace:
```tsx
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feedback from clients, colleagues, and collaborators I&apos;ve had the pleasure of working with.
          </p>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mb-16">
          <SectionHeading
            title="What People Say"
            description="Feedback from clients, colleagues, and collaborators I've had the pleasure of working with."
            align="center"
          />
        </FadeIn>
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```
Replace:
```tsx
                <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
```
with:
```tsx
                <Quote className="mb-4 h-8 w-8 text-accent/30" />
```
Replace:
```tsx
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
```
with:
```tsx
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-white">
```

- [ ] **Step 8: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, scroll through `/` past the hero — confirm each section heading now uses the consistent eyebrow+title `SectionHeading` pattern, numbers/quote icons/avatar fallback use the accent blue instead of stray `blue-500`/`purple-500`/gradient-clip, and the Codenito panel border no longer looks doubled-up.

---

## Task 3: Fix `project-card.tsx` (dedupe borders, drop stray gradient)

**Files:**
- Modify: `components/projects/project-card.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: no signature change — used as-is by `featured-projects-section.tsx` (Task 2) and `app/(public)/projects/page.tsx` (Task 5).

- [ ] **Step 1: Dedupe the border classes**

Replace:
```tsx
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
```
with:
```tsx
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check (deferred to Task 5's verification, since this component isn't rendered standalone): confirmed together with the projects list page.

---

## Task 4: About page polish

**Files:**
- Modify: `app/(public)/about/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading` (replacing the hand-rolled eyebrow+`h1`).

- [ ] **Step 1: Replace the page header block**

Replace:
```tsx
        <FadeIn>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">About Me</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">The story so far</h1>
        </FadeIn>
```
with:
```tsx
        <FadeIn>
          <SectionHeading eyebrow="About Me" title="The story so far" className="mb-8" />
        </FadeIn>
```
Add the import at the top of the file:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```

- [ ] **Step 2: Cap the "Skills & Expertise" sub-heading weight to semibold**

Replace:
```tsx
          <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
```
with:
```tsx
          <h2 className="mb-8 text-2xl font-semibold">Skills & Expertise</h2>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/about` — confirm the header uses the same eyebrow+title treatment as the homepage sections, and the page otherwise reads as before (flat response-time card from the foundation pass, no glass).

---

## Task 5: Projects list + detail page polish (and fix the undefined `.btn-primary` class)

**Files:**
- Modify: `app/(public)/projects/page.tsx`
- Modify: `app/(public)/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading`; `Button` from `@/components/ui/button`.

- [ ] **Step 1: `projects/page.tsx`** — replace the hand-rolled header

Replace:
```tsx
        <FadeIn className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">Production-grade systems built for real businesses. Every project ships on time with 99.9%+ uptime.</p>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mb-12 max-w-2xl">
          <SectionHeading
            eyebrow="Portfolio"
            title="Projects"
            description="Production-grade systems built for real businesses. Every project ships on time with 99.9%+ uptime."
          />
        </FadeIn>
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```

- [ ] **Step 2: `projects/[slug]/page.tsx`** — fix the undefined `.btn-primary` class on the Live Demo button, and swap hardcoded `blue-500` for the accent token

Replace:
```tsx
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
```
with:
```tsx
          {project.liveUrl && (
            <Button variant="pill" className="h-auto px-6 py-3" render={<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}>
              <ExternalLink className="h-4 w-4" /> Live Demo
            </Button>
          )}
```
Add the import:
```tsx
import { Button } from "@/components/ui/button"
```
Replace:
```tsx
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium capitalize">
```
with:
```tsx
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium capitalize text-accent">
```
Replace:
```tsx
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{project.title}</h1>
```
with:
```tsx
        <h1 className="mb-4 text-3xl font-semibold leading-tight md:text-5xl">{project.title}</h1>
```
Replace:
```tsx
                <p className="text-2xl font-bold gradient-text">{value}</p>
```
with:
```tsx
                <p className="text-2xl font-semibold text-foreground">{value}</p>
```
Replace:
```tsx
              <Tag className="w-5 h-5 text-blue-500" /> Tech Stack
```
with:
```tsx
              <Tag className="h-5 w-5 text-accent" /> Tech Stack
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/projects` — confirm the header matches the shared pattern and cards look correct (no doubled border). Open a project detail page (`/projects/codenito-id` from the seed data) — confirm the "Live Demo" button now renders as a filled accent pill (previously it had no background/text color at all, since `.btn-primary` didn't exist), and the category badge / tech stack icon use the accent blue instead of a hardcoded blue.

---

## Task 6: Work-With-Me page polish

**Files:**
- Modify: `app/(public)/work-with-me/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading`; `Button` from `@/components/ui/button`.

- [ ] **Step 1: Replace the hero header block**

Replace:
```tsx
        <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Hire Me</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Let&apos;s build something together</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">Available for freelance projects, full-time opportunities, and technical consulting via Codenito ID.</p>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <SectionHeading
            eyebrow="Hire Me"
            title="Let's build something together"
            description="Available for freelance projects, full-time opportunities, and technical consulting via Codenito ID."
            align="center"
          />
        </FadeIn>
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```

- [ ] **Step 2: Replace the final CTA link with the pill `Button`**

Replace:
```tsx
            <Link href="/contact" className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-8 py-4 font-semibold hover:bg-accent/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/25">
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
```
with:
```tsx
            <Button variant="pill" size="lg" className="h-auto px-8 py-4" render={<Link href="/contact" />}>
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Button>
```
Add the import:
```tsx
import { Button } from "@/components/ui/button"
```

- [ ] **Step 3: Cap the "How it works" sub-heading weight to semibold**

Replace:
```tsx
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
```
with:
```tsx
          <h2 className="mb-10 text-center text-2xl font-semibold">How it works</h2>
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/work-with-me` — confirm the header matches the shared pattern and the final CTA renders as the same pill button style used elsewhere on the site.

---

## Final Step: Commit

- [ ] **Commit all Priority 1 changes in one commit**

```bash
git add \
  components/home/hero-section.tsx \
  components/home/stats-section.tsx \
  components/home/featured-projects-section.tsx \
  components/home/codenito-section.tsx \
  components/home/services-section.tsx \
  components/home/how-i-work-section.tsx \
  components/home/testimonials-section.tsx \
  components/projects/project-card.tsx \
  "app/(public)/about/page.tsx" \
  "app/(public)/projects/page.tsx" \
  "app/(public)/projects/[slug]/page.tsx" \
  "app/(public)/work-with-me/page.tsx" \
  docs/superpowers/plans/2026-08-16-apple-redesign-priority1.md
git commit -m "$(cat <<'EOF'
Roll out apple-style design to Priority 1 pages (Home, About, Projects, Work-With-Me)

Also fixes the undefined .btn-primary class and doubled border classes
left over from the foundation's mechanical .glass rename.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
