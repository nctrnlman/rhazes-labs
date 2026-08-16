import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(lead: {
  name: string
  email: string
  type: string
  message: string
}) {
  try {
    await resend.emails.send({
      from: "Rhazes Labs <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `New ${lead.type} inquiry from ${lead.name}`,
      html: `<h2>New Contact from Rhazes Labs</h2><p><strong>Name:</strong> ${lead.name}</p><p><strong>Email:</strong> ${lead.email}</p><p><strong>Type:</strong> ${lead.type}</p><p><strong>Message:</strong></p><p>${lead.message}</p>`,
    })
  } catch (e) {
    console.error("Email send failed:", e)
  }
}
