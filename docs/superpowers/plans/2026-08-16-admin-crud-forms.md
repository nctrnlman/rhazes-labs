# Admin CRUD Forms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The admin panel's Projects, Blog, and Testimonials pages are currently read-only — "Add Project"/"New Post" link to routes that don't exist (404), and Testimonials has no add UI at all. Build create/edit/delete for all three, so the user can manage every piece of site content from `/admin` without touching code or `prisma/seed.ts`.

**Architecture:** Server Actions (`"use server"`) per entity in a colocated `actions.ts` file, native HTML forms (no client form-state libraries — matches the existing Settings/Guestbook pattern already in the codebase), `redirect()` back to the list page on success, `revalidatePath` on every public route that reads the entity. Images are plain URL text inputs (no file upload — Supabase Storage isn't wired up in this project yet; that's a separate, later piece of work). Rich text (`Project.content`, `BlogPost.content`) uses a new Tiptap editor component, since the Tiptap packages are already a dependency but no editor component exists yet.

**Tech Stack:** Next.js Server Actions, Prisma, Tiptap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-image`, `@tiptap/extension-placeholder`, `@tiptap/extension-code-block-lowlight`, `lowlight`), existing shadcn `Input`/`Textarea`/`Button` primitives, plain native `<select>`/`<input type="checkbox">` for pickers/toggles (not Base UI `Select`/`Switch` — those aren't native form controls and add integration risk with plain `action={serverAction}` forms; native elements just work).

## Global Constraints

- No image upload — URL text inputs only, per user decision.
- Every mutation ends with `redirect()` to the entity's admin list page and `revalidatePath` on the admin list, the admin dashboard (`/admin`, since it shows counts), and every public route that renders the entity.
- Delete requires a browser `confirm()` before submitting — no silent deletes.
- Slugs auto-generate from title on create, are editable, and must be unique (Prisma will throw on collision — surface it as a form error, don't crash).
- Follow the existing admin visual language already rolled out (flat `bg-card border border-border`, `text-2xl font-semibold` page headings, `Button variant="pill"` for primary actions).

---

## Task 1: Shared building blocks

**Files:**
- Modify: `lib/utils.ts` — add `slugify`
- Create: `components/admin/delete-button.tsx`
- Create: `components/admin/tiptap-editor.tsx`
- Create: `components/admin/metrics-input.tsx`

**Interfaces:**
- Produces: `slugify(text: string): string`; `DeleteButton({ action, id, label? })` client component; `TiptapEditor({ name, defaultValue? })` client component (renders a hidden `<input name={name}>` carrying the HTML for native form submission); `MetricsInput({ name, defaultValue? })` client component (same hidden-input-carries-JSON pattern, for `Project.impactMetrics`).

- [ ] **Step 1: `slugify` in `lib/utils.ts`**

Add:
```ts
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
```

- [ ] **Step 2: `components/admin/delete-button.tsx`**

```tsx
"use client"

interface Props {
  action: (formData: FormData) => void
  id: string
  label?: string
}

export function DeleteButton({ action, id, label = "Delete" }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`${label}? This can't be undone.`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-xs text-red-500 hover:underline">
        {label}
      </button>
    </form>
  )
}
```

- [ ] **Step 3: `components/admin/tiptap-editor.tsx`**

```tsx
"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { createLowlight } from "lowlight"
import { useState } from "react"
import { Bold, Italic, Heading2, Code, List, ListOrdered, LinkIcon, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const lowlight = createLowlight()

export function TiptapEditor({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [html, setHtml] = useState(defaultValue)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Write the case study / post content…" }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: { class: "prose prose-neutral dark:prose-invert max-w-none min-h-48 focus:outline-none px-3 py-2" },
    },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  })

  if (!editor) return null

  const btn = (active: boolean) =>
    cn("p-1.5 rounded hover:bg-muted transition-colors", active && "bg-muted text-accent")

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-1.5">
        <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></button>
        <button type="button" className={btn(editor.isActive("link"))} onClick={() => {
          const url = window.prompt("URL")
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}><LinkIcon className="h-4 w-4" /></button>
        <button type="button" className={btn(false)} onClick={() => {
          const url = window.prompt("Image URL")
          if (url) editor.chain().focus().setImage({ src: url }).run()
        }}><ImageIcon className="h-4 w-4" /></button>
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  )
}
```

- [ ] **Step 4: `components/admin/metrics-input.tsx`**

```tsx
"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

type Row = { key: string; value: string }

function parseDefault(json?: Record<string, string> | null): Row[] {
  if (!json) return [{ key: "", value: "" }]
  const rows = Object.entries(json).map(([key, value]) => ({ key, value }))
  return rows.length > 0 ? rows : [{ key: "", value: "" }]
}

export function MetricsInput({ name, defaultValue }: { name: string; defaultValue?: Record<string, string> | null }) {
  const [rows, setRows] = useState<Row[]>(() => parseDefault(defaultValue))

  const json = JSON.stringify(
    Object.fromEntries(rows.filter((r) => r.key.trim()).map((r) => [r.key.trim(), r.value.trim()]))
  )

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={row.key}
            onChange={(e) => setRows(rows.map((r, j) => (j === i ? { ...r, key: e.target.value } : r)))}
            placeholder="uptime"
            className="w-1/2 rounded-lg border border-border bg-background/50 px-3 py-1.5 text-sm"
          />
          <input
            value={row.value}
            onChange={(e) => setRows(rows.map((r, j) => (j === i ? { ...r, value: e.target.value } : r)))}
            placeholder="99.9%"
            className="w-1/2 rounded-lg border border-border bg-background/50 px-3 py-1.5 text-sm"
          />
          <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="p-1.5 text-muted-foreground hover:text-red-500">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => setRows([...rows, { key: "", value: "" }])} className="flex items-center gap-1 text-xs text-accent hover:underline">
        <Plus className="h-3 w-3" /> Add metric
      </button>
      <input type="hidden" name={name} value={json} />
    </div>
  )
}
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds (no consumers yet, so this only confirms these files type-check on their own).

---

## Task 2: Projects create/edit/delete

**Files:**
- Create: `app/(admin)/admin/projects/actions.ts`
- Create: `app/(admin)/admin/projects/new/page.tsx`
- Create: `app/(admin)/admin/projects/[id]/edit/page.tsx`
- Modify: `app/(admin)/admin/projects/page.tsx`

**Interfaces:**
- Consumes: `slugify` from `@/lib/utils`, `TiptapEditor`, `MetricsInput`, `DeleteButton` from `@/components/admin/*`.
- Produces: `createProject`, `updateProject`, `deleteProject` Server Actions exported from `actions.ts`.

- [ ] **Step 1: `app/(admin)/admin/projects/actions.ts`**

```ts
"use server"

import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function parseMetrics(raw: FormDataEntryValue | null) {
  try {
    const obj = JSON.parse(String(raw ?? "{}"))
    return Object.keys(obj).length > 0 ? obj : null
  } catch {
    return null
  }
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/admin/projects")
  revalidatePath("/admin")
  revalidatePath("/projects")
  revalidatePath("/")
  if (slug) revalidatePath(`/projects/${slug}`)
}

export async function createProject(formData: FormData) {
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))

  await prisma.project.create({
    data: {
      title,
      slug,
      description: String(formData.get("description") ?? ""),
      content: String(formData.get("content") || "") || null,
      techStack: String(formData.get("techStack") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      imageUrl: String(formData.get("imageUrl") || "") || null,
      liveUrl: String(formData.get("liveUrl") || "") || null,
      githubUrl: String(formData.get("githubUrl") || "") || null,
      category: String(formData.get("category") || "Web"),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
      impactMetrics: parseMetrics(formData.get("impactMetrics")),
    },
  })

  revalidateProjectPaths(slug)
  redirect("/admin/projects")
}

export async function updateProject(formData: FormData) {
  const id = String(formData.get("id"))
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description: String(formData.get("description") ?? ""),
      content: String(formData.get("content") || "") || null,
      techStack: String(formData.get("techStack") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      imageUrl: String(formData.get("imageUrl") || "") || null,
      liveUrl: String(formData.get("liveUrl") || "") || null,
      githubUrl: String(formData.get("githubUrl") || "") || null,
      category: String(formData.get("category") || "Web"),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
      impactMetrics: parseMetrics(formData.get("impactMetrics")),
    },
  })

  revalidateProjectPaths(slug)
  redirect("/admin/projects")
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id"))
  const project = await prisma.project.delete({ where: { id } })
  revalidateProjectPaths(project.slug)
}
```

- [ ] **Step 2: The shared form markup — `app/(admin)/admin/projects/new/page.tsx`**

```tsx
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { MetricsInput } from "@/components/admin/metrics-input"
import { createProject } from "../actions"

export default function NewProjectPage() {
  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Project</h1>
      <form action={createProject} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input name="title" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug (optional — auto from title)</label>
            <input name="slug" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea name="description" required rows={2} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Case study content</label>
          <TiptapEditor name="content" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input name="category" defaultValue="Web" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input name="order" type="number" defaultValue={0} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tech stack (comma-separated)</label>
          <input name="techStack" placeholder="Next.js, TypeScript, Prisma" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input name="imageUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Live URL</label>
            <input name="liveUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input name="githubUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Impact metrics</label>
          <MetricsInput name="impactMetrics" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" /> Featured
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Project</Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: `app/(admin)/admin/projects/[id]/edit/page.tsx`** — same form, pre-filled, posting to `updateProject`

```tsx
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { MetricsInput } from "@/components/admin/metrics-input"
import { updateProject } from "../../actions"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Project</h1>
      <form action={updateProject} className="space-y-6">
        <input type="hidden" name="id" value={project.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input name="title" required defaultValue={project.title} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input name="slug" defaultValue={project.slug} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea name="description" required rows={2} defaultValue={project.description} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Case study content</label>
          <TiptapEditor name="content" defaultValue={project.content ?? ""} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input name="category" defaultValue={project.category} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input name="order" type="number" defaultValue={project.order} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tech stack (comma-separated)</label>
          <input name="techStack" defaultValue={project.techStack.join(", ")} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input name="imageUrl" defaultValue={project.imageUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Live URL</label>
            <input name="liveUrl" defaultValue={project.liveUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input name="githubUrl" defaultValue={project.githubUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Impact metrics</label>
          <MetricsInput name="impactMetrics" defaultValue={project.impactMetrics as Record<string, string> | null} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={project.featured} className="h-4 w-4 rounded border-border" /> Featured
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Wire Edit/Delete into the list — modify `app/(admin)/admin/projects/page.tsx`**

Add the import:
```tsx
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteProject } from "./actions"
```
Replace the per-row action icons block:
```tsx
                <div className="flex items-center gap-2 flex-shrink-0">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Code2 className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                </div>
```
with:
```tsx
                <div className="flex items-center gap-3 flex-shrink-0">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Code2 className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                  <Link href={`/admin/projects/${project.id}/edit`} className="text-xs text-accent hover:underline">Edit</Link>
                  <DeleteButton action={deleteProject} id={project.id} label="Delete project" />
                </div>
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check (authenticated): open `/admin/projects`, click "Add Project" — form loads (not 404), fill it in, submit — redirects back to the list with the new project showing, "Edit" opens it pre-filled, "Delete project" prompts a confirm and removes it. Check `/projects` and `/` on the public site reflect the change (revalidation working).

---

## Task 3: Blog create/edit/delete

**Files:**
- Create: `app/(admin)/admin/blog/actions.ts`
- Create: `app/(admin)/admin/blog/new/page.tsx`
- Create: `app/(admin)/admin/blog/[id]/edit/page.tsx`
- Modify: `app/(admin)/admin/blog/page.tsx`

**Interfaces:** same shape as Task 2, for `BlogPost`.

- [ ] **Step 1: `app/(admin)/admin/blog/actions.ts`**

```ts
"use server"

import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function readingTimeFrom(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/admin/blog")
  revalidatePath("/admin")
  revalidatePath("/blog")
  revalidatePath("/")
  if (slug) revalidatePath(`/blog/${slug}`)
}

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))
  const status = String(formData.get("status") || "draft")
  const content = String(formData.get("content") || "")

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      content,
      coverImage: String(formData.get("coverImage") || "") || null,
      tags: String(formData.get("tags") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      status,
      publishedAt: status === "published" ? new Date() : null,
      readingTime: readingTimeFrom(content),
    },
  })

  revalidateBlogPaths(slug)
  redirect("/admin/blog")
}

export async function updatePost(formData: FormData) {
  const id = String(formData.get("id"))
  const title = String(formData.get("title") ?? "")
  const slug = slugify(String(formData.get("slug") || title))
  const status = String(formData.get("status") || "draft")
  const content = String(formData.get("content") || "")

  const existing = await prisma.blogPost.findUnique({ where: { id } })

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      coverImage: String(formData.get("coverImage") || "") || null,
      tags: String(formData.get("tags") ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      status,
      publishedAt: status === "published" ? (existing?.publishedAt ?? new Date()) : null,
      readingTime: readingTimeFrom(content),
    },
  })

  revalidateBlogPaths(slug)
  redirect("/admin/blog")
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id"))
  const post = await prisma.blogPost.delete({ where: { id } })
  revalidateBlogPaths(post.slug)
}
```

- [ ] **Step 2: `app/(admin)/admin/blog/new/page.tsx`**

```tsx
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { createPost } from "../actions"

export default function NewPostPage() {
  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Post</h1>
      <form action={createPost} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input name="title" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug (optional — auto from title)</label>
            <input name="slug" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <TiptapEditor name="content" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cover image URL</label>
            <input name="coverImage" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select name="status" defaultValue="draft" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input name="tags" placeholder="Next.js, AI/ML" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Post</Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: `app/(admin)/admin/blog/[id]/edit/page.tsx`** — same fields, pre-filled, posting to `updatePost`

```tsx
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { updatePost } from "../../actions"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) notFound()

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Post</h1>
      <form action={updatePost} className="space-y-6">
        <input type="hidden" name="id" value={post.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input name="title" required defaultValue={post.title} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input name="slug" defaultValue={post.slug} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <TiptapEditor name="content" defaultValue={post.content} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cover image URL</label>
            <input name="coverImage" defaultValue={post.coverImage ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select name="status" defaultValue={post.status} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input name="tags" defaultValue={post.tags.join(", ")} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Wire Edit/Delete into the list — modify `app/(admin)/admin/blog/page.tsx`**

Add the import:
```tsx
import { DeleteButton } from "@/components/admin/delete-button"
import { deletePost } from "./actions"
```
Replace:
```tsx
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs text-accent hover:underline flex-shrink-0"
                >
                  View
                </Link>
```
with:
```tsx
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link href={`/blog/${post.slug}`} className="text-xs text-accent hover:underline">View</Link>
                  <Link href={`/admin/blog/${post.id}/edit`} className="text-xs text-accent hover:underline">Edit</Link>
                  <DeleteButton action={deletePost} id={post.id} label="Delete post" />
                </div>
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/blog`, create a post with status "Published", confirm it appears on `/blog` and in the homepage "Latest Writing" section; edit it back to "Draft" and confirm it disappears from both; delete it and confirm it's gone everywhere.

---

## Task 4: Testimonials create/edit/delete

**Files:**
- Create: `app/(admin)/admin/testimonials/actions.ts`
- Create: `app/(admin)/admin/testimonials/new/page.tsx`
- Create: `app/(admin)/admin/testimonials/[id]/edit/page.tsx`
- Modify: `app/(admin)/admin/testimonials/page.tsx`

**Interfaces:** same shape as Task 2/3, for `Testimonial`.

- [ ] **Step 1: `app/(admin)/admin/testimonials/actions.ts`**

```ts
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function revalidateTestimonialPaths() {
  revalidatePath("/admin/testimonials")
  revalidatePath("/")
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      avatarUrl: String(formData.get("avatarUrl") || "") || null,
      message: String(formData.get("message") ?? ""),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateTestimonialPaths()
  redirect("/admin/testimonials")
}

export async function updateTestimonial(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.testimonial.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      avatarUrl: String(formData.get("avatarUrl") || "") || null,
      message: String(formData.get("message") ?? ""),
      featured: formData.get("featured") === "on",
      order: Number(formData.get("order") ?? 0),
    },
  })
  revalidateTestimonialPaths()
  redirect("/admin/testimonials")
}

export async function deleteTestimonial(formData: FormData) {
  const id = String(formData.get("id"))
  await prisma.testimonial.delete({ where: { id } })
  revalidateTestimonialPaths()
}
```

- [ ] **Step 2: `app/(admin)/admin/testimonials/new/page.tsx`**

```tsx
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createTestimonial } from "../actions"

export default function NewTestimonialPage() {
  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Testimonials
      </Link>
      <h1 className="text-2xl font-semibold mb-8">New Testimonial</h1>
      <form action={createTestimonial} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input name="name" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <input name="role" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input name="company" required className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Avatar URL</label>
            <input name="avatarUrl" className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea name="message" required rows={4} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={0} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" /> Featured (shows on homepage)
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Create Testimonial</Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: `app/(admin)/admin/testimonials/[id]/edit/page.tsx`** — same fields, pre-filled, posting to `updateTestimonial`

```tsx
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { updateTestimonial } from "../../actions"

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const t = await prisma.testimonial.findUnique({ where: { id } })
  if (!t) notFound()

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Testimonials
      </Link>
      <h1 className="text-2xl font-semibold mb-8">Edit Testimonial</h1>
      <form action={updateTestimonial} className="space-y-6">
        <input type="hidden" name="id" value={t.id} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input name="name" required defaultValue={t.name} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <input name="role" required defaultValue={t.role} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input name="company" required defaultValue={t.company} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Avatar URL</label>
            <input name="avatarUrl" defaultValue={t.avatarUrl ?? ""} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea name="message" required rows={4} defaultValue={t.message} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Order</label>
          <input name="order" type="number" defaultValue={t.order} className="w-full rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={t.featured} className="h-4 w-4 rounded border-border" /> Featured (shows on homepage)
        </label>
        <Button type="submit" variant="pill" className="h-auto px-6 py-3">Save Changes</Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Add the "Add Testimonial" entry point and wire Edit/Delete — modify `app/(admin)/admin/testimonials/page.tsx`**

Add imports:
```tsx
import Link from "next/link"
import { Plus } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteTestimonial } from "./actions"
import { Button } from "@/components/ui/button"
```
Replace:
```tsx
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-muted-foreground">{testimonials.length} testimonials</p>
        </div>
      </div>
```
with:
```tsx
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-muted-foreground">{testimonials.length} testimonials</p>
        </div>
        <Button variant="pill" className="h-auto px-5 py-2.5 text-sm" nativeButton={false} render={<Link href="/admin/testimonials/new" />}>
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      </div>
```
Replace the `<p className="text-sm text-muted-foreground mt-1">Add them directly via database seeding.</p>` line — delete it entirely (no longer true).

Replace the per-row content block:
```tsx
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{t.name}</p>
                      {t.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t.role} @ {t.company}</p>
                    <p className="text-sm leading-relaxed">&ldquo;{t.message}&rdquo;</p>
                  </div>
```
with:
```tsx
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{t.name}</p>
                      {t.featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t.role} @ {t.company}</p>
                    <p className="text-sm leading-relaxed">&ldquo;{t.message}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Link href={`/admin/testimonials/${t.id}/edit`} className="text-xs text-accent hover:underline">Edit</Link>
                    <DeleteButton action={deleteTestimonial} id={t.id} label="Delete testimonial" />
                  </div>
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds.

Manual check: open `/admin/testimonials`, click "Add Testimonial", fill it in with "Featured" checked, submit — confirm it appears on the list and on the homepage testimonials section. Edit and delete it, confirm both work.

---

## Final Step: Commit

- [ ] **Commit all CRUD work in one commit**

```bash
git add lib/utils.ts components/admin "app/(admin)/admin/projects" "app/(admin)/admin/blog" "app/(admin)/admin/testimonials" docs/superpowers/plans/2026-08-16-admin-crud-forms.md
git commit -m "$(cat <<'EOF'
Add create/edit/delete forms for Projects, Blog, and Testimonials

The admin panel's "Add Project"/"New Post" links previously pointed to
routes that didn't exist (404), and Testimonials had no add UI at all —
all three were effectively read-only, blocking the user from managing
their own site content without touching prisma/seed.ts directly.

Adds a shared Tiptap rich-text editor, a repeatable key-value input for
Project.impactMetrics, and a confirm-guarded delete button, reused
across all three entities' new/edit forms and Server Actions.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
