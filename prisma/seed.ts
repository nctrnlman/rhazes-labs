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
    { key: "resume_url", value: "" },
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

  // Blog posts
  await prisma.blogPost.upsert({
    where: { slug: "building-scalable-nextjs-apps" },
    update: {},
    create: {
      title: "Building Scalable Next.js Apps with Prisma and Supabase",
      slug: "building-scalable-nextjs-apps",
      content: "<p>Next.js 15 with App Router has fundamentally changed how we build full-stack applications. In this post, I'll walk through my production setup combining Next.js, Prisma ORM, and Supabase PostgreSQL.</p><h2>The Stack</h2><p>This combination gives you type-safe database queries, real-time capabilities, and edge-ready deployment — all without managing infrastructure.</p>",
      tags: ["Next.js", "Prisma", "Supabase", "TypeScript"],
      status: "published",
      publishedAt: new Date(),
      readingTime: 8,
    },
  })

  await prisma.blogPost.upsert({
    where: { slug: "my-ai-ml-learning-journey" },
    update: {},
    create: {
      title: "My AI/ML Learning Journey as a Full Stack Engineer",
      slug: "my-ai-ml-learning-journey",
      content: "<p>After 3 years of building production web apps, I decided to seriously invest in AI and ML. Here's how I'm approaching it as a software engineer with no formal ML background.</p><h2>Where I Started</h2><p>I began with fast.ai's Practical Deep Learning course — it's hands-on and immediately applicable.</p>",
      tags: ["AI", "Machine Learning", "Learning", "Career"],
      status: "published",
      publishedAt: new Date(),
      readingTime: 6,
    },
  })

  console.log("✓ Blog posts seeded")

  // Testimonials
  await prisma.testimonial.upsert({
    where: { id: "t1" },
    update: {},
    create: {
      id: "t1",
      name: "Ahmad Fauzi",
      role: "CTO",
      company: "Startup Jakarta",
      message: "Rhazes delivered our MVP in 3 weeks, on budget and beyond expectations. His full-stack expertise and attention to detail made the difference.",
      featured: true,
      order: 1,
    },
  })

  await prisma.testimonial.upsert({
    where: { id: "t2" },
    update: {},
    create: {
      id: "t2",
      name: "Siti Rahayu",
      role: "Product Manager",
      company: "TechCo Indonesia",
      message: "Working with Rhazes was seamless. He understood our requirements immediately and translated them into clean, maintainable code.",
      featured: true,
      order: 2,
    },
  })

  await prisma.testimonial.upsert({
    where: { id: "t3" },
    update: {},
    create: {
      id: "t3",
      name: "Budi Santoso",
      role: "Founder",
      company: "Digital Agency",
      message: "Rhazes's technical consulting helped us avoid costly architecture mistakes early. His recommendations saved us months of refactoring.",
      featured: true,
      order: 3,
    },
  })

  console.log("✓ Testimonials seeded")
  console.log("\n✅ Database seeded successfully!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
