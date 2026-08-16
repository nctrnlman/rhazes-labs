import { config } from "dotenv"
config({ path: ".env" })
config({ path: ".env.local", override: true })

import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../lib/password"

const prisma = new PrismaClient()

async function main() {
  // Admin user
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: { password: hashPassword(process.env.ADMIN_PASSWORD) },
      create: {
        email: process.env.ADMIN_EMAIL,
        name: "Rhazes Devino",
        password: hashPassword(process.env.ADMIN_PASSWORD),
      },
    })
    console.log("✓ Admin user seeded")
  } else {
    console.warn("⚠ ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin user seed")
  }

  // Settings
  const settings = [
    { key: "availability_status", value: "open" },
    { key: "availability_label", value: "Open to opportunities" },
    { key: "now_learning", value: "Large Language Models & RAG pipelines" },
    { key: "now_building", value: "Rhazes Labs — personal tech hub & portfolio" },
    { key: "now_reading", value: "Designing Machine Learning Systems by Chip Huyen" },
    { key: "now_updated_at", value: new Date().toISOString() },
    { key: "stats_users", value: "7K+" },
    { key: "stats_countries", value: "20+" },
    { key: "stats_projects", value: "15+" },
    { key: "stats_years", value: "3+" },
    { key: "stats_uptime", value: "99.99%" },
    { key: "response_time", value: "< 24 hours" },
    { key: "resume_url", value: "/resume/Rhazes-Devino-Resume.pdf" },
  ]

  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s })
  }
  console.log("✓ Settings seeded")

  // Projects
  await prisma.project.upsert({
    where: { slug: "codenito-id" },
    update: {},
    create: {
      title: "Codenito.id",
      slug: "codenito-id",
      description: "Full-service digital studio offering web development, mobile apps, and technical consulting for Indonesian businesses.",
      category: "startup",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Prisma"],
      featured: true,
      order: 1,
      impactMetrics: { clients: "10+", uptime: "99.9%", satisfaction: "100%" },
    },
  })

  await prisma.project.upsert({
    where: { slug: "hci-platform" },
    update: {},
    create: {
      title: "HCI Learning Platform",
      slug: "hci-platform",
      description: "Human-Computer Interaction education platform built for Asia e University with interactive course modules.",
      category: "education",
      techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
      featured: true,
      order: 2,
      impactMetrics: { students: "500+", courses: "12", completion: "78%" },
    },
  })

  await prisma.project.upsert({
    where: { slug: "fintech-dashboard" },
    update: {},
    create: {
      title: "Fintech Analytics Dashboard",
      slug: "fintech-dashboard",
      description: "Real-time financial analytics dashboard for MAA-era fintech operations with advanced data visualizations.",
      category: "fintech",
      techStack: ["Vue.js", "Python", "FastAPI", "Redis", "Chart.js"],
      featured: true,
      order: 3,
      impactMetrics: { transactions: "50K+", latency: "< 100ms", uptime: "99.99%" },
    },
  })

  console.log("✓ Projects seeded")

  console.log("✓ Blog posts seeded")

  // Testimonials (real LinkedIn recommendations)
  const testimonials = [
    {
      id: "t1",
      name: "Azzahra H Gunawan",
      role: "IT Governance, Risk & Compliance",
      company: "Crowe Indonesia",
      message: "Rhazes is not only an excellent full stack engineer but also an exceptional teammate. What stands out the most is his ability to take ideas from our discussions and turn them into real, working solutions — whether we're dealing with front-end complexities or back-end architecture.",
      order: 1,
    },
    {
      id: "t2",
      name: "Riki Eprilion Saputra",
      role: "Back End Developer",
      company: "Jobseeker Company",
      message: "Rhazes consistently demonstrated exceptional technical expertise, a strong work ethic, and a collaborative spirit. They are always willing to lend a helping hand and share their knowledge with others, fostering a positive and productive work environment.",
      order: 2,
    },
    {
      id: "t3",
      name: "Ilham",
      role: "Software QA Engineer",
      company: "",
      message: "Rhazes consistently delivered high-quality code and solutions, demonstrating a deep understanding of both front-end and back-end technologies. Their commitment to quality is commendable — Rhazes actively participated in our QA processes, ensuring every feature met rigorous standards.",
      order: 3,
    },
    {
      id: "t4",
      name: "Yudi Maryadi",
      role: "Fullstack Developer",
      company: "",
      message: "Rhazes consistently demonstrates a strong aptitude for understanding intricate issues and devising innovative tools to address them, ensuring more efficient workflows and enhanced productivity. His talent for creating applications that streamline and simplify tasks makes him a valuable asset.",
      order: 4,
    },
    {
      id: "t5",
      name: "Khaled Makkawirelang",
      role: "System Officer",
      company: "",
      message: "Rhazes possesses a deep understanding of web development, programming languages, and the necessary frameworks to create interactive and effective websites. His expertise, work ethic, dedication, and enthusiasm for continuous learning make him someone truly deserving of this recommendation.",
      order: 5,
    },
    {
      id: "t6",
      name: "Ariiq Yusuf Dhiya Ulhaq",
      role: "Fullstack Engineer",
      company: "",
      message: "Rhazes memiliki pemahaman yang mendalam tentang pengembangan web, bahasa pemrograman, dan framework yang diperlukan untuk membuat web yang interaktif dan efektif. Dia memiliki kemampuan komunikasi yang baik, mendengarkan dengan seksama, dan selalu bersedia memberikan masukan konstruktif.",
      order: 6,
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: { ...t, featured: true },
      create: { ...t, featured: true },
    })
  }

  console.log("✓ Testimonials seeded")
  console.log("\n✅ Database seeded successfully!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
