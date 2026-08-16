# Design System

The direction is **Apple.com**: simple, elegant, premium, black-and-white, with a single blue accent reserved almost exclusively for interactive elements. This was an explicit, repeated instruction from the site owner — treat it as a hard constraint, not a suggestion.

## Color rule (strict)

> "Kalau mau warna biru cuman di tombol atau tulisan di tombol nya atau tombol transparant tapi tulisannya biru, harus persis kaya apple."
> (Blue only on buttons, button text, or transparent buttons with blue text — must look exactly like Apple.)

- **All body text, headings, icons, badges, and decorative elements are black/white/gray** (`text-foreground`, `text-muted-foreground`, `bg-muted`, `bg-foreground text-background`).
- **Blue (`--accent`) is reserved for**: primary buttons, real navigational links (e.g. hover states on inline links), and genuinely interactive selected-states (e.g. command palette selection).
- A full sitewide sweep was done to convert every decorative `accent` usage to a neutral equivalent. If you're adding a new UI element and reach for `text-accent` or `bg-accent`, stop and ask: is this a button or a real link? If not, use `foreground`/`muted` instead.
- Auto-generated images (`opengraph-image.tsx`, `blog-cover`, `project-cover`, `icon`/`apple-icon`) follow the same rule — pure black background (`#09090B`) with white/gray text only, no blue accents baked into static images.

## Color tokens (`app/globals.css`)

Light and dark are both fully specified with independent, hand-tuned values (not a mechanical invert) — the accent blue is intentionally brighter in dark mode for contrast (`oklch(0.68 0.16 255)` vs `oklch(0.52 0.18 255)` light). When adding a new semantic token, always define both `:root` and `.dark` — a past bug was `--destructive` missing its dark variant entirely.

| Token | Light | Dark |
|---|---|---|
| `--background` | `oklch(0.985 0 0)` | `oklch(0.07 0.012 240)` |
| `--foreground` | `oklch(0.09 0.02 240)` | `oklch(0.985 0 0)` |
| `--card` | `oklch(1 0 0)` | `oklch(0.1 0.012 240)` |
| `--muted` | `oklch(0.94 0.01 210)` | `oklch(0.18 0.01 240)` |
| `--muted-foreground` | `oklch(0.46 0.015 240)` | `oklch(0.65 0.012 240)` |
| `--accent` | `oklch(0.52 0.18 255)` | `oklch(0.68 0.16 255)` |
| `--border` | `oklch(0.9 0.006 240)` | `oklch(0.2 0.01 240)` |
| `--destructive` | `oklch(0.51 0.22 25)` | `oklch(0.62 0.22 25)` |

Semantic status colors (red/green/yellow for error/success/featured) intentionally stay as fixed Tailwind palette classes (`text-red-500`, `bg-green-500/10`, etc.) in both themes — this is fine and expected; it's decorative accent color that must stay neutral, not semantic status color.

## Components

- Buttons: `variant="pill"` (solid, `bg-accent`) and `variant="pill-outline"` (bordered, transparent) are the only two variants used for CTAs sitewide. **Gotcha**: the `size` variant's padding classes win over `variant`'s in the cva merge order — always pass an explicit `className="h-auto px-X py-Y"` override.
- This project uses **Base UI** (`@base-ui/react`), not Radix. `<Button asChild>` doesn't exist here — use `<Button render={<Link href="..." />}>`. Base UI's `Button` defaults to `nativeButton={true}`, which warns in the console when `render` targets a non-`<button>` element — always add `nativeButton={false}` in that case.
- `SectionHeading` is the shared heading component (`eyebrow`, `title`, `description`, `align`). Eyebrow text is `text-muted-foreground`, never `text-accent`.

## Apple-style principles (learned through iteration on this project)

- **Curate, don't cram.** A hero or CTA row should have 1-2 primary actions, not four. When a page accumulated too many competing CTAs (hero: View Projects / Work With Me / Resume / Download Portfolio), the fix was decluttering — secondary actions became a small subdued line, not equal-weight buttons.
- **Hairline rules over boxes.** Section headers and card dividers use a 1px border/rule, not filled boxes or heavy dividers. This applies especially to the portfolio PDF, which was redesigned mid-project from boxed/chip-style cards to a "spec sheet" look: top hairline border on cards, big bold numbers for metrics with a small caption underneath instead of bordered chips.
- **No em dashes in prose.** The owner explicitly flagged em-dash-heavy sentences as a tell of AI-generated writing and asked for them removed sitewide, replaced with periods or natural connectors ("and", "so", commas). This applies to on-page copy, generated images, and PDF content — but **not** to legitimate typographic en-dashes in date ranges ("Sep 2024 – Present") or institution names, which are a different, correct use.
- **Write like a person, not a press release.** Rewrite corporate-sounding copy into first-person, concrete, plain language. Avoid restating the same fact twice across adjacent sentences (a recurring note: "founder" and "studio" ended up stated twice in the hero and had to be trimmed to once each).
