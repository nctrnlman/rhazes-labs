"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { createLowlight } from "lowlight"
import { useState } from "react"
import { Bold, Italic, Heading2, Code, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from "lucide-react"
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
