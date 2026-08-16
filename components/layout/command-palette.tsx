"use client"
import { useRouter } from "next/navigation"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Code2, FileText, Home, Mail, User, Briefcase, BookOpen, Users, Clock } from "lucide-react"

const pages = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Code2 },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/work-with-me", label: "Work With Me", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/guestbook", label: "Guestbook", icon: Users },
  { href: "/now", label: "Now", icon: Clock },
]

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter()
  function nav(href: string) { router.push(href); onOpenChange(false) }
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages.map((p) => (
            <CommandItem key={p.href} onSelect={() => nav(p.href)} className="cursor-pointer">
              <p.icon className="h-4 w-4 text-muted-foreground" />{p.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
