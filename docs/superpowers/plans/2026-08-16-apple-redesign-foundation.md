# Apple-Style Redesign — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the token/primitive foundation for the apple.com-style redesign (light-first colors, self-hosted font, flat card surfaces, pill buttons, `SectionHeading`, `ScrollStory`) so every subsequent page-rollout plan can consume it without re-deriving styles.

**Architecture:** Presentation-layer-only changes to `app/globals.css`, `app/layout.tsx`, `components/ui/button.tsx`, and `components/shared/motion-wrapper.tsx`, plus a mechanical sitewide rename of the `.glass` card treatment to flat `bg-card border border-border`. No Prisma schema, route handler, or data-fetching changes anywhere in this plan.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4 (CSS-first tokens in `globals.css` + legacy `tailwind.config.ts` for content/darkMode/plugins), Framer Motion, `next/font/google`, shadcn/ui (`base-nova` style) + `@base-ui/react` primitives.

## Global Constraints

- No changes to Prisma schema, API routes, or auth flow (per spec Non-Goals).
- No new unit tests — this is a presentation-only change; verification is `npm run build` + manual visual check (per spec §5 QA).
- Do not commit after every task — do the work continuously, one commit at the very end of this plan (per explicit user instruction).
- Follow existing motion conventions already in `components/shared/motion-wrapper.tsx`: `duration: 0.5`, ease `[0.21, 0.47, 0.32, 0.98]`, `margin: "-50px"`, stagger `0.08`.

---

## Task 1: Retheme color tokens + section spacing

**Files:**
- Modify: `app/globals.css:1-24` (root/light tokens), `app/globals.css:26-41` (`.dark` tokens), `app/globals.css:109-119` (`.section-padding`)

**Interfaces:**
- Produces: `--accent` / `--color-accent` now resolves to an apple-blue hue in both light and dark; `.section-padding` now has more generous vertical rhythm at the `lg` breakpoint. Later tasks and all page-rollout plans consume these as-is via existing Tailwind utility classes (`bg-accent`, `text-accent`, `.section-padding`) — no renames.

- [ ] **Step 1: Update the accent token in both color blocks**

In `app/globals.css`, in the `:root` block:

```css
  --accent: oklch(0.52 0.18 255);
```
(replaces the current `--accent: oklch(0.55 0.22 250);`)

In the `.dark` block:

```css
  --accent: oklch(0.68 0.16 255);
```
(replaces the current `--accent: oklch(0.62 0.2 250);`)

- [ ] **Step 2: Widen section padding at the `lg` breakpoint**

Replace:

```css
.section-padding {
  padding: 5rem 1rem;
}

@media (min-width: 640px) {
  .section-padding { padding: 6rem 1.5rem; }
}

@media (min-width: 1024px) {
  .section-padding { padding: 7rem 2rem; }
}
```

with:

```css
.section-padding {
  padding: 6rem 1rem;
}

@media (min-width: 640px) {
  .section-padding { padding: 7rem 1.5rem; }
}

@media (min-width: 1024px) {
  .section-padding { padding: 9rem 2rem; }
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds, no CSS/type errors.

Run: `npm run dev`, open `http://localhost:3000` — confirm the CTA button, links, and any `text-accent`/`bg-accent` usage now render the new blue, and that section vertical spacing on the homepage is visibly larger.

---

## Task 2: Self-host Inter via `next/font/google`, default theme to light

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css:1` (remove CDN import), `app/globals.css:63` (`--font-sans`), `app/globals.css:74` (`body` font-family)

**Interfaces:**
- Consumes: nothing new.
- Produces: CSS variable `--font-inter` available globally (set on `<html>`), referenced by `--font-sans` and `body { font-family }`. `ThemeProvider` now defaults to `"light"`. Later tasks/pages don't need to reference the font directly — it's inherited via `body`.

- [ ] **Step 1: Remove the Google Fonts CDN import**

In `app/globals.css`, delete line 1:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

- [ ] **Step 2: Point the font tokens at the self-hosted variable**

In `app/globals.css`, in the `@theme inline` block, replace:

```css
  --font-sans: Inter, system-ui, sans-serif;
```

with:

```css
  --font-sans: var(--font-inter), system-ui, sans-serif;
```

And in the `body` rule, replace:

```css
  font-family: Inter, system-ui, sans-serif;
```

with:

```css
  font-family: var(--font-inter), system-ui, sans-serif;
```

- [ ] **Step 3: Load the font in `app/layout.tsx` and switch the default theme**

In `app/layout.tsx`, add the import and font instance:

```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})
```

Then update the returned JSX (metadata object is unchanged):

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open the site in a private/incognito window (no theme in localStorage) — confirm it loads in light mode by default, and in browser devtools Network tab confirm no request to `fonts.googleapis.com` (font now served from `/_next/static/media/...`).

---

## Task 3: Flatten card surfaces sitewide (`.glass` → flat `bg-card`/`border-border`)

**Files:**
- Modify: `app/globals.css:81-93` (`.glass` / `.glass-card` rules)
- Modify (mechanical class rename only, no structural changes) — every file below that currently has a bare `glass` class token, **except** `components/layout/navbar.tsx` (kept, see Task 7):
  - `app/not-found.tsx`
  - `app/(public)/contact/page.tsx`
  - `app/(public)/experience/page.tsx`
  - `app/(public)/projects/[slug]/page.tsx`
  - `app/(public)/work-with-me/page.tsx`
  - `app/(public)/blog/page.tsx`
  - `app/(public)/about/page.tsx`
  - `app/(public)/blog/[slug]/page.tsx`
  - `app/(public)/now/page.tsx`
  - `app/(public)/guestbook/page.tsx`
  - `app/(admin)/admin/page.tsx`
  - `app/(admin)/admin/settings/page.tsx`
  - `app/(admin)/admin/leads/page.tsx`
  - `app/(admin)/admin/projects/page.tsx`
  - `app/(admin)/admin/testimonials/page.tsx`
  - `app/(admin)/admin/blog/page.tsx`
  - `app/(admin)/admin/guestbook/page.tsx`
  - `components/home/testimonials-section.tsx`
  - `components/home/how-i-work-section.tsx`
  - `components/home/codenito-section.tsx`
  - `components/home/services-section.tsx`
  - `components/home/hero-section.tsx`
  - `components/projects/project-card.tsx`
  - `components/shared/skills-visualization.tsx`
  - `components/shared/experience-timeline.tsx`

**Interfaces:**
- Produces: no more `.glass-card` class (deleted, was already unused). `.glass` now means "navbar translucent-on-scroll blur" only — every other surface uses plain Tailwind `bg-card border border-border`. Page-rollout plans should use `bg-card border border-border` (or nothing, per apple.com's flatter card style) for any new card-like element, not `.glass`.

- [ ] **Step 1: Redefine `.glass` (navbar-only) and delete `.glass-card`**

In `app/globals.css`, replace:

```css
.glass {
  background: oklch(from var(--foreground) l c h / 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid oklch(from var(--foreground) l c h / 0.08);
}

.glass-card {
  background: oklch(from var(--card) l c h / 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid oklch(from var(--border) l c h / 0.5);
}
```

with:

```css
.glass {
  background: oklch(from var(--background) l c h / 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

- [ ] **Step 2: Mechanically rename the `glass` class token to flat card classes everywhere except the navbar**

Run this from the repo root (safe: verified via grep that none of these files contain "glass" as a substring of any other class name — e.g. no "glassmorphism" — so a plain substring replace is unambiguous):

```bash
FILES=(
  "app/not-found.tsx"
  "app/(public)/contact/page.tsx"
  "app/(public)/experience/page.tsx"
  "app/(public)/projects/[slug]/page.tsx"
  "app/(public)/work-with-me/page.tsx"
  "app/(public)/blog/page.tsx"
  "app/(public)/about/page.tsx"
  "app/(public)/blog/[slug]/page.tsx"
  "app/(public)/now/page.tsx"
  "app/(public)/guestbook/page.tsx"
  "app/(admin)/admin/page.tsx"
  "app/(admin)/admin/settings/page.tsx"
  "app/(admin)/admin/leads/page.tsx"
  "app/(admin)/admin/projects/page.tsx"
  "app/(admin)/admin/testimonials/page.tsx"
  "app/(admin)/admin/blog/page.tsx"
  "app/(admin)/admin/guestbook/page.tsx"
  "components/home/testimonials-section.tsx"
  "components/home/how-i-work-section.tsx"
  "components/home/codenito-section.tsx"
  "components/home/services-section.tsx"
  "components/home/hero-section.tsx"
  "components/projects/project-card.tsx"
  "components/shared/skills-visualization.tsx"
  "components/shared/experience-timeline.tsx"
)
for f in "${FILES[@]}"; do
  sed -i '' 's/glass/bg-card border border-border/g' "$f"
done
```

(`sed -i ''` is the BSD/macOS form used by this repo's environment; use `sed -i` without the empty string on GNU/Linux.)

- [ ] **Step 3: Verify**

Run: `git diff --stat` — expect exactly the 24 files above (plus `app/globals.css`) changed, no others.

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev` and spot-check 3 pages (`/`, `/projects`, `/contact`) — cards should now render as flat `bg-card` panels with a thin `border-border` outline, no blur. The navbar should still show its blur when scrolled (Task 7 will retheme its exact look, but it must still visually work now).

---

## Task 4: Add pill button variants

**Files:**
- Modify: `components/ui/button.tsx:9-21` (`variants.variant` map)

**Interfaces:**
- Consumes: existing `buttonVariants` cva config, existing `variant`/`size` prop contract — unchanged for current variants.
- Produces: two new `variant` values, `"pill"` and `"pill-outline"`, usable as `<Button variant="pill">` / `<Button variant="pill-outline">` anywhere `Button` is already imported. Page-rollout plans use these for marketing CTAs instead of hand-rolled `<Link className="rounded-full ...">` markup.

- [ ] **Step 1: Add the two variants**

In `components/ui/button.tsx`, inside the `variants.variant` object, add two new entries (after `link:`):

```ts
        link: "text-primary underline-offset-4 hover:underline",
        pill: "rounded-full bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 px-6",
        "pill-outline": "rounded-full border border-border bg-transparent hover:border-accent/40 hover:-translate-y-0.5 px-6",
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds (cva/TypeScript will widen the `variant` prop union automatically — no other type changes needed).

Manual check: temporarily drop `<Button variant="pill">Test</Button>` and `<Button variant="pill-outline">Test</Button>` into any page during `npm run dev`, confirm both render as pill-shaped buttons with the expected fill/outline treatment, then remove the temporary markup (page-rollout plans will add the real usages).

---

## Task 5: Add `SectionHeading` shared component

**Files:**
- Create: `components/shared/section-heading.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`.
- Produces: `SectionHeading({ eyebrow?, title, description?, align?, className? })` — exported for use by every page-rollout plan as the standard section header pattern.

- [ ] **Step 1: Create the component**

```tsx
import { cn } from "@/lib/utils"

interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <span className="mb-3 block text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="mb-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {description}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds (new file has no consumers yet, so this only checks it type-checks cleanly on its own).

Manual check: temporarily import and render `<SectionHeading eyebrow="Test" title="Hello World" description="Description text" align="center" />` on any page during `npm run dev`, confirm the eyebrow/title/description render with the expected hierarchy, then remove the temporary usage.

---

## Task 6: Add `ScrollStory` to `motion-wrapper.tsx`

**Files:**
- Modify: `components/shared/motion-wrapper.tsx`

**Interfaces:**
- Consumes: `motion`, `useScroll`, `useTransform`, `useReducedMotion` from `framer-motion`; `cn` from `@/lib/utils`.
- Produces: `ScrollStory({ children, className? })` — a sticky, scroll-linked wrapper for hero-tier sections. Falls back to a plain static `<div>` under `prefers-reduced-motion`. Consumed by the homepage hero (and optionally one more flagship section) in the Priority 1 rollout plan.

- [ ] **Step 1: Add the new imports and component**

In `components/shared/motion-wrapper.tsx`, update the import line:

```tsx
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion"
```

Add `cn` to the existing imports (new import line):

```tsx
import { cn } from "@/lib/utils"
```

Append this new export at the end of the file:

```tsx
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
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: temporarily wrap any tall block of content in `<ScrollStory>...</ScrollStory>` on a page during `npm run dev`, scroll past it, confirm it sticks and fades/scales out; then toggle OS "reduce motion" and confirm it renders as a plain static block instead. Remove the temporary usage after checking.

---

## Task 7: Retheme the navbar

**Files:**
- Modify: `components/layout/navbar.tsx:40` (desktop header classes), `components/layout/navbar.tsx:65` (mobile menu panel classes)

**Interfaces:**
- Consumes: the redefined `.glass` class from Task 3 (blur-only, no border).
- Produces: no interface change — same `Navbar` component signature.

- [ ] **Step 1: Update the desktop header classes**

In `components/layout/navbar.tsx`, replace:

```tsx
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "glass border-b border-border/50 py-3" : "py-5")}>
```

with:

```tsx
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "glass shadow-sm py-3" : "py-5")}>
```

- [ ] **Step 2: Update the mobile menu panel classes**

Replace:

```tsx
          <div className="md:hidden glass border-t border-border/50 px-4 py-4">
```

with:

```tsx
          <div className="md:hidden glass shadow-sm px-4 py-4">
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev` — scroll the homepage, confirm the navbar transitions to a blurred, borderless bar with a soft shadow on scroll (no visible bottom border line). Open the mobile menu (narrow viewport) and confirm the same treatment.

---

## Final Step: Commit

- [ ] **Commit all foundation changes in one commit**

```bash
git add app/globals.css app/layout.tsx components/ui/button.tsx components/shared/section-heading.tsx components/shared/motion-wrapper.tsx components/layout/navbar.tsx app/not-found.tsx "app/(public)" "app/(admin)" components/home components/projects/project-card.tsx components/shared/skills-visualization.tsx components/shared/experience-timeline.tsx
git commit -m "$(cat <<'EOF'
Add apple-style design foundation: light-first tokens, self-hosted font, flat cards, pill buttons, SectionHeading, ScrollStory

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
