# Apple-Style Redesign — Design Specification

**Date:** 2026-08-16
**Project:** rhazes-labs
**Status:** Approved
**Supersedes:** `docs/superpowers/specs/2026-05-12-rhazes-labs-design.md` (visual identity only — "Liquid Glass" motif is replaced by the flat, typography-first direction below; the page inventory and data model from that spec are still accurate and unaffected).

---

## Overview

This is sub-project 1 of 2 for the "make it feel like apple.com and complete my story" request. This spec covers **visual/design-system redesign only** — retheming and restructuring the presentation layer of all pages (public + admin) to feel like apple.com: simple, elegant, premium. It does **not** cover content — copy, bio, project case studies, testimonials, etc. stay as current placeholder/seed data during this phase and will be addressed in a follow-up spec (sub-project 2).

Data-fetching, route handlers, Prisma schema, and business logic are explicitly out of scope and must not change. This is a presentation-layer redesign of an existing, working app.

## Goals

- Every public page and the admin panel share one consistent, apple.com-inspired visual language.
- Light-first color scheme, replacing the current dark-first default.
- Large, confident typography as the primary visual device (not decorative glass/blur effects).
- One flagship scroll-driven "hero" moment on the homepage (and optionally one more flagship section), the rest of the site uses simple, tasteful entrance animations.
- No regression to existing functionality (auth, forms, admin CRUD, sitemap, etc.) or data flow.

## Non-Goals

- Writing/collecting real personal content (bio, project case studies, testimonials, resume data) — sub-project 2.
- Changing the data model, API routes, or auth flow.
- Rebuilding component architecture from scratch (see Approach section).

---

## Approach

**Token-first, shared-primitives, staged rollout.** Build the design foundation once (tokens + a small set of shared primitive components), then sweep pages in priority order, reusing those primitives instead of hand-rolling styles per page. Existing data-fetching and page-level logic (server components fetching via Prisma, route handlers) are preserved untouched — only markup/classes/motion change.

Rejected alternatives:
- **Full rebuild from scratch** — higher risk of breaking working Prisma/data wiring, much longer before any visible progress.
- **Token/color swap only** — fastest, but layout, hero structure, and motion stay as-is; would not read as "apple.com," just a recolored version of the current design.

---

## 1. Design Tokens (`app/globals.css`, `tailwind.config.ts`)

**Color** — light-first:
- Background: near-white / off-white (`oklch(0.985 0 0)` — already the current `--background` light value, just becomes the default instead of `.dark` being default).
- Foreground: near-black.
- Accent: single blue accent tuned closer to Apple's link/CTA blue (`#0071E3`-ish), expressed in the existing `oklch` token format for consistency with current tokens.
- Dark mode retained as a togglable alternative (via `next-themes`, already wired), but `defaultTheme` in `app/layout.tsx` changes from `"dark"` to `"light"`.
- Remove `.glass` / `.glass-card` utility classes from public/admin surfaces — flat backgrounds, no colored translucent card treatment. The navbar keeps a thin blur-on-scroll (see Navbar below) — that's a real apple.com pattern, not the old "Liquid Glass" motif, so it stays.

**Typography:**
- Keep Inter (already close to SF Pro's geometry, widely proven in premium products). Move loading from the current Google Fonts CDN `@import` in `globals.css` to `next/font/google` (self-hosted, preloaded, no extra render-blocking request, no CLS).
- Expand headline scale: hero headlines up to `text-8xl`/`text-9xl` on desktop, tight tracking (`tracking-tight` to `tracking-tighter`).
- Headline weight capped at 600 (semibold) — not 700 (bold). This is a deliberate apple.com trait: large type reads premium at semibold with tight tracking, not bold.
- Body copy stays regular (400), constrained to a readable measure (~65–75ch) inside text-heavy blocks (About, Blog post body, case studies).

**Spacing:**
- Increase `.section-padding` further at the `lg` breakpoint (currently `7rem` — apple.com sections commonly run 8–10rem vertical padding on desktop). Exact value tuned during implementation, not pinned here.

**Radius:**
- Buttons/CTAs: full pill (`rounded-full`) — already used in some places, now becomes the standard for all primary/secondary CTAs.
- Cards: medium radius, no glass border/blur.

## 2. Shared Primitives (new or updated components)

| Primitive | Change |
|---|---|
| `Button` | New "pill" variant: accent-filled and ghost-with-chevron ("Learn more →") styles, used across all marketing CTAs. |
| `Navbar` | Same structure/behavior (sticky, ⌘K command palette, theme toggle — all kept, useful for developer visitors). Retheme: blur + soft shadow only when scrolled, no border/glass-card look. |
| `SectionHeading` (new, `components/shared/`) | Standardizes the oversized headline + optional eyebrow label pattern used at the top of every section, left- or center-aligned. |
| `ScrollReveal` (new, `components/shared/`) | Wraps Framer Motion `whileInView` fade+slide-up entrance with stagger support. Replaces the per-component hand-rolled `motion.div` blocks currently duplicated in every section component (e.g. `hero-section.tsx`). |
| `ScrollStory` (new, `components/shared/`) | Sticky, scroll-linked (Framer Motion `useScroll`/`useTransform`) hero treatment — apple.com product-page style. Used on the homepage hero, and optionally one more flagship section (candidate: Featured Projects). Falls back to a simple static fade under `prefers-reduced-motion` (extends the existing global CSS reduced-motion override to JS-driven scroll animation, not just CSS transitions). |

## 3. Page Rollout Order

Presentation-layer only; no changes to data fetching, route handlers, or Prisma schema in any of these.

- **Priority 1:** `/` (home), `/about`, `/projects` + `/projects/[slug]`, `/work-with-me`
- **Priority 2:** `/experience`, `/blog` + `/blog/[slug]`, `/now`, `/contact`
- **Priority 3:** `app/(admin)/admin/*` — same tokens/primitives, simpler layout (no `ScrollStory`, admin is an internal tool, not a marketing surface)

## 4. Motion & Interaction Rules

- Standard entrance (via `ScrollReveal`): fade + 8–16px slide-up, 400–600ms, spring-ish easing, 30–50ms stagger for lists — this matches the existing motion rules already in use and stays as-is.
- `ScrollStory` (scroll-linked pin/fade/scale) is reserved for hero-tier sections only, per the rollout table above.
- Hover: subtle lift (`-2px` to `-4px` translateY) + soft shadow on cards and buttons, consistent easing across all interactive elements.
- No continuous/looping decorative animation (carried over from the prior spec's rule) except necessary loading states.
- `prefers-reduced-motion` must degrade both CSS transitions (already handled globally) and the new `ScrollStory` JS-driven scroll animation to a static/simple-fade state.

## 5. Testing / QA

This phase changes presentation only — no new business logic, so no new unit tests are required. Manual QA checklist per rolled-out page:
- Visual check in light and dark mode.
- Visual check at mobile and desktop breakpoints.
- `prefers-reduced-motion` check — confirm `ScrollStory` and `ScrollReveal` degrade correctly.
- Font swap sanity check (Inter via `next/font/google`) — no layout shift, no FOUC.
- Confirm no regression in existing functionality per page (forms still submit, admin CRUD still works, auth redirect still works, command palette still opens, sitemap still generates).

---

## Open Dependencies

- Hero visual direction (Priority 1, Home + About) is "professional photo of self + large typography." Needs 1–2 high-quality photos supplied by the user before those sections can be finished; can be stubbed with a placeholder during initial build if photos aren't ready yet.
