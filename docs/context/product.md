# Product

**Rhazes Labs** is the personal portfolio and tech hub of **Muhammad Rhazes Alhambra Andalusia Devino** (Rhazes Devino) — a Full Stack Engineer based in Jakarta, and founder of **Codenito ID**, a remote-first software studio.

## Who this site is for

The site exists to serve three distinct visitor intents, in this order of priority:

1. **Companies or startups who want to hire Rhazes** — full-time roles.
2. **People offering freelance work or any other opportunity.**
3. **Businesses that want to discuss a project with Codenito ID** — the studio, not Rhazes as an individual.

This distinction matters: "hire me" and "hire Codenito" are different audiences with different decision-makers and different value props. The `/work-with-me` page explicitly splits into two tracks ("Hire Me" vs "Work With Codenito ID") for this reason, and the contact form's "reaching out as" field mirrors it (`hire`, `codenito`, `collab`, `other`).

## Site map

- `/` — Home: hero, stats, industries, Codenito highlight, featured projects, services, testimonials, latest writing, how-I-work, final CTA
- `/about` — personal story, principles, skills, photo
- `/experience` — career timeline, education, certifications, resume/portfolio download
- `/projects` — full project list (case studies, many are private/internal systems with no public link)
- `/blog` — technical writing, tag-filterable
- `/work-with-me` — the two-track hire/Codenito pitch, FAQ, testimonials
- `/contact` — contact form (type-aware via `?type=` query param), email/WhatsApp
- `/now`, `/guestbook` — lighter, personal pages
- `/admin` — full CMS for every content type above (Credentials auth, any user in `/admin/users` can sign in)

## Key features unique to this project

- **Download Portfolio**: a landscape, black-and-white PDF generated live from the same database that powers the site (`/api/portfolio-pdf`, built with `@react-pdf/renderer`). Distinct from the separately-uploaded ATS resume PDF.
- **Auto-generated cover images**: blog posts and projects without a manual `imageUrl`/`coverImage` get a branded black-and-white cover generated on the fly via `next/og` (`/blog-cover/[slug]`, `/project-cover/[slug]`). Both routes are intentionally near-identical in structure — see `design-system.md`.
- **Everything is admin-editable**: Projects, Blog, Experience, Education, Certifications, Skills, Testimonials, Settings, Users. There should be no hardcoded content in components that belongs in the database.
