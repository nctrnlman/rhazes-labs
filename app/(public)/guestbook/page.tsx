import type { Metadata } from "next"
import { GuestbookContent } from "@/components/guestbook/guestbook-content"

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign the guestbook and leave a message for Rhazes Devino.",
  alternates: { canonical: "/guestbook" },
}

export default function GuestbookPage() {
  return <GuestbookContent />
}
