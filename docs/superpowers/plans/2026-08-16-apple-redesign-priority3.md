# Apple-Style Redesign — Priority 3 Admin Panel Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the foundation tokens/primitives to the admin panel (`app/(admin)/admin/**`, `components/admin/admin-sidebar.tsx`). No `ScrollStory` here — the admin panel is an internal tool, not a marketing surface, per the design spec's rollout order.

**Architecture:** Continues the foundation, Priority 1, and Priority 2 plans — presentation-layer edits only, no data-fetching/server-action changes. Also fixes the same `.btn-primary`/hardcoded-color bug classes found in the public pages, plus a new one specific to the admin dashboard: a Tailwind dynamic-class bug where `` `bg-${stat.color}-500/10` `` template strings can't be picked up by Tailwind's static class scanner and silently render unstyled.

**Tech Stack:** Same as prior plans.

## Global Constraints

- No changes to Prisma schema, API routes, server actions (`"use server"` functions), or auth flow — every button/link fix here is a pure class/markup change.
- No new unit tests — verification is `npm run build` + manual visual check (admin routes require auth — see each task's manual-check note).
- Headline weight capped at 600 (`font-semibold`), not 700 (`font-bold`).
- Semantic status colors (green = new/published/approve, red = reject/delete, yellow = featured star) are kept as-is — they carry meaning, not brand styling, so they're not part of the "single accent" rule. Only non-semantic uses of `blue-500`/`purple-500`/dynamic color strings are converted to the `accent` token.
- Do not commit after every task — one commit at the very end of this plan.

---

## Task 1: `AdminSidebar`

**Files:**
- Modify: `components/admin/admin-sidebar.tsx`

- [ ] **Step 1: Replace the logo tile gradient with a solid accent fill**

Replace:
```tsx
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
```
with:
```tsx
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white">
```

- [ ] **Step 2: Fix the active nav item color**

Replace:
```tsx
                  ? "bg-blue-500/10 text-blue-500"
```
with:
```tsx
                  ? "bg-accent/10 text-accent"
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: deferred to Task 2 (the sidebar renders on every admin page, so it's confirmed together with the dashboard).

---

## Task 2: Admin dashboard (`admin/page.tsx`)

**Files:**
- Modify: `app/(admin)/admin/page.tsx`

**Interfaces:** none new.

- [ ] **Step 1: Fix the dynamic-class bug — replace the 4-color rainbow with a static accent color for every stat tile**

Tailwind can't see `` `bg-${stat.color}-500/10` `` at build time (it needs complete, literal class strings in source), so those tiles currently render with no background/icon color at all. Replace the `stats` array — remove the `color` field:

```tsx
  const stats = [
    { label: "Projects", value: projectCount, icon: FolderOpen },
    { label: "Published Posts", value: postCount, icon: FileText },
    { label: "New Leads", value: newLeads, icon: MessageSquare },
    { label: "Pending Guestbook", value: pendingGuests, icon: BookOpen },
  ]
```

Replace the tile markup:
```tsx
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
```
with:
```tsx
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="text-3xl font-semibold">{stat.value}</p>
```

- [ ] **Step 2: Fix the "read" lead-status badge color and cap heading weight**

Replace:
```tsx
                    lead.status === "read" ? "bg-blue-500/10 text-blue-500" :
```
with:
```tsx
                    lead.status === "read" ? "bg-accent/10 text-accent" :
```
Replace:
```tsx
        <h1 className="text-2xl font-bold">Dashboard</h1>
```
with:
```tsx
        <h1 className="text-2xl font-semibold">Dashboard</h1>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: `npm run dev`, sign in with the configured `ADMIN_EMAIL` Google account and open `/admin` — confirm all 4 stat tiles now show an accent-colored icon tile (previously unstyled/invisible), and the sidebar's active-page highlight and logo tile use the accent color. If signing in isn't practical in this environment, at minimum confirm via `npm run build` that the template-literal class bug is gone (no more `` `bg-${...}` `` patterns in the diff).

---

## Task 3: Admin settings page

**Files:**
- Modify: `app/(admin)/admin/settings/page.tsx`

**Interfaces:**
- Consumes: `Button` from `@/components/ui/button`.

- [ ] **Step 1: Cap the heading weight**

Replace:
```tsx
        <h1 className="text-2xl font-bold">Settings</h1>
```
with:
```tsx
        <h1 className="text-2xl font-semibold">Settings</h1>
```

- [ ] **Step 2: Fix the input focus ring color**

Replace:
```tsx
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-sm"
```
with:
```tsx
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/50 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
```

- [ ] **Step 3: Fix the undefined `.btn-primary` submit button**

Replace:
```tsx
          <button
            type="submit"
            className="btn-primary px-8 py-3 rounded-xl font-semibold text-sm"
          >
            Save All Settings
          </button>
```
with:
```tsx
          <Button type="submit" variant="pill" className="h-auto px-8 py-3 text-sm">
            Save All Settings
          </Button>
```
Add the import at the top of the file:
```tsx
import { Button } from "@/components/ui/button"
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/settings` (authenticated) — confirm the "Save All Settings" button now renders as a filled accent pill instead of unstyled, and input focus rings are accent-colored.

---

## Task 4: Admin leads page

**Files:**
- Modify: `app/(admin)/admin/leads/page.tsx`

- [ ] **Step 1: Cap the heading weight**

Replace:
```tsx
        <h1 className="text-2xl font-bold">Leads</h1>
```
with:
```tsx
        <h1 className="text-2xl font-semibold">Leads</h1>
```

- [ ] **Step 2: Fix the "read" status badge and the mailto link color**

Replace:
```tsx
                        lead.status === "read" ? "bg-blue-500/10 text-blue-500" :
```
with:
```tsx
                        lead.status === "read" ? "bg-accent/10 text-accent" :
```
Replace:
```tsx
                      className="flex items-center gap-1 text-sm text-blue-500 hover:underline mb-3"
```
with:
```tsx
                      className="mb-3 flex items-center gap-1 text-sm text-accent hover:underline"
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/leads` — confirm the "read" status badge and email link use accent blue.

---

## Task 5: Admin projects page

**Files:**
- Modify: `app/(admin)/admin/projects/page.tsx`

**Interfaces:**
- Consumes: `Button` from `@/components/ui/button`.

- [ ] **Step 1: Cap the heading weight**

Replace:
```tsx
          <h1 className="text-2xl font-bold">Projects</h1>
```
with:
```tsx
          <h1 className="text-2xl font-semibold">Projects</h1>
```

- [ ] **Step 2: Fix the undefined `.btn-primary` "Add Project" link**

Replace:
```tsx
        <Link
          href="/admin/projects/new"
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Link>
```
with:
```tsx
        <Button variant="pill" className="h-auto px-5 py-2.5 text-sm" render={<Link href="/admin/projects/new" />}>
          <Plus className="h-4 w-4" /> Add Project
        </Button>
```
Add the import:
```tsx
import { Button } from "@/components/ui/button"
```

- [ ] **Step 3: Fix the no-image placeholder gradient**

Replace:
```tsx
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0" />
```
with:
```tsx
                  <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-accent/20" />
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/projects` — confirm "Add Project" renders as a filled accent pill, and any project without an image shows a flat accent-tinted placeholder instead of a blue-to-purple gradient block.

---

## Task 6: Admin testimonials page

**Files:**
- Modify: `app/(admin)/admin/testimonials/page.tsx`

- [ ] **Step 1: Cap the heading weight**

Replace:
```tsx
          <h1 className="text-2xl font-bold">Testimonials</h1>
```
with:
```tsx
          <h1 className="text-2xl font-semibold">Testimonials</h1>
```

- [ ] **Step 2: Fix the no-avatar placeholder gradient**

Replace:
```tsx
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
```
with:
```tsx
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-white">
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/testimonials` — confirm any testimonial without an avatar shows a solid accent circle with the initial, not a blue-to-purple gradient.

---

## Task 7: Admin blog page

**Files:**
- Modify: `app/(admin)/admin/blog/page.tsx`

**Interfaces:**
- Consumes: `Button` from `@/components/ui/button`.

- [ ] **Step 1: Cap the heading weight**

Replace:
```tsx
          <h1 className="text-2xl font-bold">Blog</h1>
```
with:
```tsx
          <h1 className="text-2xl font-semibold">Blog</h1>
```

- [ ] **Step 2: Fix the undefined `.btn-primary` "New Post" link**

Replace:
```tsx
        <Link
          href="/admin/blog/new"
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
```
with:
```tsx
        <Button variant="pill" className="h-auto px-5 py-2.5 text-sm" render={<Link href="/admin/blog/new" />}>
          <Plus className="h-4 w-4" /> New Post
        </Button>
```
Add the import:
```tsx
import { Button } from "@/components/ui/button"
```

- [ ] **Step 3: Fix the no-cover-image placeholder gradient and the "View" link color**

Replace:
```tsx
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
```
with:
```tsx
                  <div className="h-12 w-16 flex-shrink-0 rounded-lg bg-accent/20" />
```
Replace:
```tsx
                  className="text-xs text-blue-500 hover:underline flex-shrink-0"
```
with:
```tsx
                  className="flex-shrink-0 text-xs text-accent hover:underline"
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/blog` — confirm "New Post" renders as a filled accent pill, cover-less posts show a flat accent-tinted placeholder, and the "View" link is accent-colored.

---

## Task 8: Admin guestbook page

**Files:**
- Modify: `app/(admin)/admin/guestbook/page.tsx`

- [ ] **Step 1: Cap heading weights**

Replace:
```tsx
        <h1 className="text-2xl font-bold">Guestbook</h1>
```
with:
```tsx
        <h1 className="text-2xl font-semibold">Guestbook</h1>
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/guestbook` — confirm the heading weight matches the rest of the admin panel; approve/reject buttons keep their green/red semantic colors unchanged.

---

## Final Step: Commit

- [ ] **Commit all Priority 3 changes in one commit**

```bash
git add \
  components/admin/admin-sidebar.tsx \
  "app/(admin)/admin/page.tsx" \
  "app/(admin)/admin/settings/page.tsx" \
  "app/(admin)/admin/leads/page.tsx" \
  "app/(admin)/admin/projects/page.tsx" \
  "app/(admin)/admin/testimonials/page.tsx" \
  "app/(admin)/admin/blog/page.tsx" \
  "app/(admin)/admin/guestbook/page.tsx" \
  docs/superpowers/plans/2026-08-16-apple-redesign-priority3.md
git commit -m "$(cat <<'EOF'
Roll out apple-style design to the admin panel

Also fixes the undefined .btn-primary class, a Tailwind dynamic-class
bug on the dashboard stat tiles (bg-${color}-500 template strings can't
be statically scanned, so they rendered unstyled), and hardcoded
blue-500/purple-500 colors, replacing them with the accent token.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
