# Rhazes Labs

Personal portfolio and tech hub for **Rhazes Devino** — Full Stack Engineer and founder of [Codenito ID](https://codenito.id). Built as a full-stack Next.js application with a database-driven admin panel, so every piece of content (projects, blog, experience, testimonials, skills) is editable without touching code.

## Tech Stack

| Layer          | Technology                                                                              |
| -------------- | --------------------------------------------------------------------------------------- |
| Framework      | [Next.js](https://nextjs.org) (App Router)                                              |
| Language       | TypeScript                                                                              |
| UI             | React, Tailwind CSS, [Base UI](https://base-ui.com), [shadcn/ui](https://ui.shadcn.com) |
| Animation      | Framer Motion                                                                           |
| Database       | PostgreSQL (Supabase) via [Prisma](https://www.prisma.io)                               |
| Auth           | NextAuth.js (Credentials provider)                                                      |
| Rich text      | Tiptap                                                                                  |
| PDF generation | `@react-pdf/renderer`                                                                   |
| Dynamic images | `next/og` (`ImageResponse`)                                                             |
| Email          | Resend                                                                                  |

## Features

**Public site**

- Home, About, Experience (with certifications), Projects, Blog, Work With Me, Contact, Guestbook, Now
- Auto-generated OG images, blog cover images, and project cover images (no manual design needed)
- SEO: sitemap, robots.txt, JSON-LD structured data, per-page metadata
- One-click **Download Portfolio** — a landscape PDF generated live from the same data that powers the site

**Admin panel** (`/admin`)

- Full CRUD for Projects, Blog Posts, Experience, Education, Certifications, Skills, Testimonials, Users, and Site Settings
- Credentials-based auth — any user created in `/admin/users` can sign in
- Leads inbox for contact form submissions, with email notifications via Resend

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (this project is set up for [Supabase](https://supabase.com))

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file with:

```bash
# Database (Supabase connection strings)
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# Auth
AUTH_SECRET=          # generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Seed / initial admin account
ADMIN_EMAIL=
ADMIN_PASSWORD=

# Email notifications for contact form leads
RESEND_API_KEY=

# Used for sitemap, canonical URLs, and OG images
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up the database

```bash
npx prisma db push   # sync the schema
npm run db:seed      # seed the admin user and starter content
```

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/admin](http://localhost:3000/admin) to sign in with the admin account from your seed.

## Project Structure

```
app/
├── (public)/        # Public-facing pages: about, blog, projects, experience, work-with-me, contact...
├── (admin)/admin/   # Admin panel: CRUD for every content type
├── api/             # Route handlers (contact form, auth, portfolio PDF)
├── blog-cover/       project-cover/   # Auto-generated OG-style cover images
components/
├── home/ shared/ admin/ ui/ ...
lib/
├── prisma.ts  auth.ts  pdf/           # DB client, auth config, PDF document generator
prisma/
├── schema.prisma     seed.ts
scripts/               # One-off data migration/seed scripts
```

## Scripts

| Command           | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Start the dev server                                      |
| `npm run build`   | Production build                                          |
| `npm run start`   | Start the production server                               |
| `npm run lint`    | Run ESLint                                                |
| `npm run db:seed` | Seed the database (admin user, settings, starter content) |

## Deployment

This project deploys cleanly to [Vercel](https://vercel.com). Make sure all environment variables above are set in your deployment environment, and that `NEXT_PUBLIC_SITE_URL` points to your production domain (it drives the sitemap, canonical URLs, and OG images).
