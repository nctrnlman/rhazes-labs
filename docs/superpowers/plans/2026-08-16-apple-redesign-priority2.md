# Apple-Style Redesign — Priority 2 Page Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the foundation primitives to the remaining public content pages: Experience, Blog (list + detail), Now, Contact, and Guestbook (the last was omitted from the design spec's Priority 2 list by oversight — it's a public page in the same visibility tier as Now/Contact, so it's included here).

**Architecture:** Continues `docs/superpowers/plans/2026-08-16-apple-redesign-foundation.md` and `...-priority1.md` — presentation-layer edits only. Also fixes the same two pre-existing bug classes found in Priority 1: undefined `.btn-primary` class, and hardcoded `blue-500`/`purple-500` colors that should use the `accent` token instead.

**Tech Stack:** Same as prior plans — Next.js App Router, Tailwind v4, Framer Motion, `@base-ui/react`-backed shadcn `Button` (uses a `render` prop, not `asChild` — see Priority 1 plan for why).

## Global Constraints

- No changes to Prisma schema, API routes, or auth flow.
- No new unit tests — verification is `npm run build` + manual visual check.
- Headline weight capped at 600 (`font-semibold`), not 700 (`font-bold`).
- Do not commit after every task — one commit at the very end of this plan.

---

## Task 1: Experience page + timeline

**Files:**
- Modify: `app/(public)/experience/page.tsx`
- Modify: `components/shared/experience-timeline.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading`.

- [ ] **Step 1: `experience/page.tsx`** — replace the header and cap heading weights

Replace:
```tsx
        <FadeIn className="mb-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Career Journey</p>
          <h1 className="text-4xl sm:text-5xl font-bold">Experience</h1>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mb-12">
          <SectionHeading eyebrow="Career Journey" title="Experience" />
        </FadeIn>
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```
Replace:
```tsx
          <h2 className="text-2xl font-bold mb-8">Education</h2>
```
with:
```tsx
          <h2 className="mb-8 text-2xl font-semibold">Education</h2>
```

- [ ] **Step 2: `experience-timeline.tsx`** — drop the gradient-clipped company name for a solid accent color

Replace:
```tsx
                    <p className="gradient-accent font-semibold text-sm">{e.company}</p>
```
with:
```tsx
                    <p className="text-sm font-semibold text-accent">{e.company}</p>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/experience` — confirm the header matches the shared pattern and company names render in solid accent blue (not gradient-clipped).

---

## Task 2: Blog list + detail pages

**Files:**
- Modify: `app/(public)/blog/page.tsx`
- Modify: `app/(public)/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading`.

- [ ] **Step 1: `blog/page.tsx`** — replace the header

Replace:
```tsx
        <FadeIn className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Writing</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg">Thoughts on engineering, architecture, AI/ML, and building products at scale.</p>
        </FadeIn>
```
with:
```tsx
        <FadeIn className="mb-12 max-w-2xl">
          <SectionHeading
            eyebrow="Writing"
            title="Blog"
            description="Thoughts on engineering, architecture, AI/ML, and building products at scale."
          />
        </FadeIn>
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```

- [ ] **Step 2: `blog/[slug]/page.tsx`** — fix hardcoded blue-500 tag pills, cap the title weight, replace the gradient avatar fallback with the accent token

Replace:
```tsx
            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium">
```
with:
```tsx
            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
```
Replace:
```tsx
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
```
with:
```tsx
        <h1 className="mb-6 text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
```
Replace:
```tsx
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
```
with:
```tsx
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-white">
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/blog` and a post detail page — confirm tag pills, title weight, and the author avatar fallback all match the accent-driven, flat treatment used elsewhere.

---

## Task 3: Now page

**Files:**
- Modify: `app/(public)/now/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading`.

- [ ] **Step 1: Replace the header**

Replace:
```tsx
        <FadeIn className="mb-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">Real-time</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">What I&apos;m doing now</h1>
          {s.now_updated_at && (
```
with:
```tsx
        <FadeIn className="mb-12">
          <SectionHeading eyebrow="Real-time" title="What I'm doing now" className="mb-4" />
          {s.now_updated_at && (
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/now` — confirm the header matches the shared pattern; the "last updated" line, learning/building/reading cards, and the `/now movement` footnote are unchanged.

---

## Task 4: Contact page

**Files:**
- Modify: `app/(public)/contact/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading`; `Button` from `@/components/ui/button`.

- [ ] **Step 1: Replace the header**

Replace:
```tsx
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let&apos;s Work{" "}
              <span className="gradient-text">Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>
```
with:
```tsx
        <FadeIn>
          <div className="mb-16">
            <SectionHeading
              title="Let's Work Together"
              description="Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours."
              align="center"
            />
          </div>
        </FadeIn>
```
Add the imports:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
```

- [ ] **Step 2: Fix the three `blue-500` icon tiles (Email, Location, Response Time)**

Replace (appears 3 times, once per tile — apply to each occurrence individually since surrounding icon/label text differs):
```tsx
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
```
with:
```tsx
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
```
(three occurrences — for Mail, MapPin, and Clock tiles)

Replace:
```tsx
                  <Mail className="w-5 h-5 text-blue-500" />
```
with:
```tsx
                  <Mail className="h-5 w-5 text-accent" />
```
Replace:
```tsx
                  <a href="mailto:rhazesd@gmail.com" className="font-medium hover:text-blue-500 transition-colors">
```
with:
```tsx
                  <a href="mailto:rhazesd@gmail.com" className="font-medium transition-colors hover:text-accent">
```
Replace:
```tsx
                  <MapPin className="w-5 h-5 text-blue-500" />
```
with:
```tsx
                  <MapPin className="h-5 w-5 text-accent" />
```
Replace:
```tsx
                  <Clock className="w-5 h-5 text-blue-500" />
```
with:
```tsx
                  <Clock className="h-5 w-5 text-accent" />
```

- [ ] **Step 3: Fix the sent-confirmation heading weight**

Replace:
```tsx
                <h2 className="text-2xl font-bold mb-3">Message Sent!</h2>
```
with:
```tsx
                <h2 className="mb-3 text-2xl font-semibold">Message Sent!</h2>
```

- [ ] **Step 4: Fix the three form inputs' focus ring color**

Replace (three occurrences — name, email, and message/textarea inputs share this exact class string; the `<select>` also shares it):
```tsx
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
```
with:
```tsx
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
```
And for the `<select>` and `<textarea>` (same class string, note the `<textarea>` variant has ` resize-none` appended — keep that suffix):
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
```
with:
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
```
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none"
```
with:
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
```

- [ ] **Step 5: Fix the undefined `.btn-primary` submit button — replace with the `Button` component**

Replace:
```tsx
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
```
with:
```tsx
                <Button type="submit" disabled={loading} variant="pill" size="lg" className="h-auto w-full justify-center px-6 py-4">
                  {loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
```

Note: `h-auto` is required alongside the explicit `py-4` — the `size="lg"` variant sets a fixed `h-9`, and Tailwind's border-box sizing would otherwise clip the padding. The `px-6`/`py-4` here (passed via `className`, which is always the last class group merged) intentionally override the smaller padding baked into `size="lg"`.

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/contact` — confirm the header matches the shared pattern, the three info tiles use accent blue instead of a hardcoded blue, form field focus rings are accent-colored, and the submit button now renders as a proper filled pill (previously unstyled due to the missing `.btn-primary` class). Submit the form (with the dev server's DB — if unreachable, at minimum confirm the button shows the loading spinner state).

---

## Task 5: Guestbook page

**Files:**
- Modify: `app/(public)/guestbook/page.tsx`

**Interfaces:**
- Consumes: `SectionHeading` from `@/components/shared/section-heading`; `Button` from `@/components/ui/button`.

- [ ] **Step 1: Replace the header**

Replace:
```tsx
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Guestbook
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Leave a <span className="gradient-text">Mark</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Sign my guestbook and let me know you stopped by.
            </p>
```
with:
```tsx
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
              <BookOpen className="h-4 w-4 text-accent" />
              Guestbook
            </div>
            <SectionHeading title="Leave a Mark" description="Sign my guestbook and let me know you stopped by." align="center" />
```
Add the import:
```tsx
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
```

- [ ] **Step 2: Fix the "leave another message" link and the two focus rings**

Replace:
```tsx
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-blue-500 hover:underline text-sm"
                >
                  Leave another message
                </button>
```
with:
```tsx
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-accent hover:underline"
                >
                  Leave another message
                </button>
```
Replace (two occurrences — name input and message textarea; textarea keeps its ` resize-none` suffix):
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
```
with:
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
```
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none"
```
with:
```tsx
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
```

- [ ] **Step 3: Fix the undefined `.btn-primary` submit button**

Replace:
```tsx
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Sign Guestbook</>
                  )}
                </button>
```
with:
```tsx
                <Button type="submit" disabled={loading} variant="pill" className="h-auto px-8 py-3">
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <><Send className="h-4 w-4" /> Sign Guestbook</>
                  )}
                </Button>
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev`, open `/guestbook` — confirm the header matches the shared pattern, the submit button renders as a filled pill instead of unstyled, and the focus rings/badge icon use the accent token.

---

## Final Step: Commit

- [ ] **Commit all Priority 2 changes in one commit**

```bash
git add \
  "app/(public)/experience/page.tsx" \
  components/shared/experience-timeline.tsx \
  "app/(public)/blog/page.tsx" \
  "app/(public)/blog/[slug]/page.tsx" \
  "app/(public)/now/page.tsx" \
  "app/(public)/contact/page.tsx" \
  "app/(public)/guestbook/page.tsx" \
  docs/superpowers/plans/2026-08-16-apple-redesign-priority2.md
git commit -m "$(cat <<'EOF'
Roll out apple-style design to Priority 2 pages (Experience, Blog, Now, Contact, Guestbook)

Also fixes the undefined .btn-primary class and hardcoded blue-500/
purple-500 colors, replacing them with the accent token throughout.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
