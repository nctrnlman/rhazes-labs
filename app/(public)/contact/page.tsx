import type { Metadata } from "next"
import { ContactContent } from "@/components/contact/contact-content"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rhazes Devino — for recruiting, project work, or collaboration. Usually responds within 24 hours.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return <ContactContent />
}
