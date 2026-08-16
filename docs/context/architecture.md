# Architecture

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (CSS-first tokens in `app/globals.css`) · Prisma 6 + PostgreSQL (Supabase) · NextAuth v5 beta (Credentials provider) · `@base-ui/react` · shadcn/ui (`base-nova` style) · Framer Motion · Tiptap · `@react-pdf/renderer` · `next/og` (`ImageResponse`) · Resend.

**This is not the Next.js in your training data.** `AGENTS.md` at the repo root flags this explicitly — read the relevant guide in `node_modules/next/dist/docs/` before writing App Router code, and treat deprecation notices as authoritative over prior knowledge.

## Data model (`prisma/schema.prisma`)

Everything a visitor sees on the public site is admin-editable and DB-backed — there should be no hardcoded arrays of "content" left in components. Key models:

- `Project` — `title`, `slug`, `description`, `content` (rich HTML, optional), `period`, `techStack[]`, `imageUrl`/`liveUrl`/`githubUrl` (all optional — see content-guidelines.md on private projects), `featured`, `category`, `impactMetrics` (JSON), `order`
- `BlogPost` — `title`, `slug`, `content`, `coverImage`, `tags[]`, `status` (`draft`/`published`), `publishedAt`, `readingTime`, `viewCount`
- `Experience` — `role`, `company`, `period`, `type`, `description`, `highlights[]`, `techStack[]`, `order`
- `Education`, `Certification`, `Skill` — supporting career-page data
- `Testimonial` — `name`, `role`, `company` (optional — some real testimonials have no listed company), `message`, `featured`
- `Setting` — key/value store for site-wide config (`site_name`, `social_*`, `resume_url`, `availability_*`, `response_time`, stats, etc.) — read via `prisma.setting.findMany()` and reduced to an object
- `User` — has `password` (scrypt-hashed via `lib/password.ts`) for Credentials auth; any row with a password can sign in to `/admin`
- `Lead`, `GuestbookEntry` — inbound form submissions

## Auth

Credentials-based, not OAuth. `lib/auth.ts` checks any `User` row with a matching email + scrypt-hashed password — not restricted to a single hardcoded admin. New admin users are created via `/admin/users`, which hashes the password server-side.

## Admin CRUD pattern

Every entity under `/admin/<entity>` follows the same four-file shape:
```
app/(admin)/admin/<entity>/page.tsx           # list
app/(admin)/admin/<entity>/actions.ts         # createX / updateX / deleteX server actions
app/(admin)/admin/<entity>/new/page.tsx       # create form
app/(admin)/admin/<entity>/[id]/edit/page.tsx # edit form
```
When adding a new content type, copy this shape rather than inventing a new one, and add the nav entry to `components/admin/admin-sidebar.tsx`.

## Auto-generated images

`app/blog-cover/[slug]/route.tsx` and `app/project-cover/[slug]/route.tsx` are **intentionally near-identical** Route Handlers using `next/og`'s `ImageResponse` — same layout, same font sizing thresholds, same black/white palette. If you change one, change the other to match, or note explicitly why they should diverge.

**Gotcha**: the special file-convention routes (`opengraph-image.tsx`, `icon.tsx`) get a hashed suffix in their actual served URL — they cannot be linked to directly with `<img src>`. For anything that needs a stable, linkable URL (like a blog/project cover embedded in a card), use a plain Route Handler (`route.tsx` exporting `GET`) instead, as done here.

## Portfolio PDF (`lib/pdf/portfolio-document.tsx`)

Generated live from the database at `/api/portfolio-pdf`, landscape A4, pure black/white, distinct from the separately-uploaded ATS resume. Known `@react-pdf/renderer` gotchas hit during development:

- Helvetica (PDF base font) only supports WinAnsi/Latin-1 — a Unicode arrow (`→`) renders as a broken glyph. Run any DB-sourced text through the `clean()` helper before rendering.
- `letterSpacing` combined with `Helvetica-Bold` causes uneven/glued glyph spacing — don't apply `letterSpacing` to bold text; uppercase strings in JS instead of using a `textTransform` style.
- Prefer **one continuous `<Page>`** with `wrap={false}` only on small atomic units (a single card, a single list item) rather than large blocks (a whole multi-bullet experience entry). Marking a large block `wrap={false}` forces the whole next page to jump if it doesn't fit the remaining space, leaving large wasted blank areas — this was found and fixed after the Experience section got much longer than the original placeholder data.
- Prisma's typed `Style[]` arrays don't accept `false` in a conditional — use `condition ? styleA : undefined`, not `condition && styleA`.

## Scripts (`scripts/`)

One-off, idempotent data-migration/seed scripts (run with `npx tsx scripts/<name>.ts`). They load env via `dotenv` explicitly (`.env` then `.env.local` with `override: true`) since they run outside the Next.js runtime. Follow this pattern for any future one-off data import rather than writing ad-hoc DB mutations elsewhere.
