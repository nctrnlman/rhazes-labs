import { config } from "dotenv"
config({ path: ".env" })
config({ path: ".env.local", override: true })

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const slugs = [
  "from-bootcamp-to-founder",
  "why-nestjs-for-production-apis",
  "migrating-legacy-php-to-laravel-without-downtime",
  "serving-7000-users-20-countries-competition-platform",
  "first-six-months-learning-llms-and-rag",
  "multi-tenant-saas-architecture-nextjs-prisma",
  "solution-architecture-101-startups",
  "docker-kubernetes-for-small-teams",
  "running-a-remote-first-studio-in-indonesia",
  "postgresql-vs-mongodb-choosing-the-right-database",
]

async function main() {
  // Rename the old CCIT-titled post to the new bootcamp-titled version, if it still exists under the old slug
  const old = await prisma.blogPost.findUnique({ where: { slug: "from-ccit-to-founder" } })
  if (old) {
    await prisma.blogPost.update({
      where: { slug: "from-ccit-to-founder" },
      data: {
        slug: "from-bootcamp-to-founder",
        title: "From Bootcamp to Founder: Lessons from Building Codenito ID",
        content: old.content
          .replace(/CCIT-UI/g, "Asia e University")
          .replace(
            "a Diploma in Software Engineering at Asia e University, a full stack bootcamp at Purwadhika,",
            "a full stack bootcamp at Purwadhika, a Bachelor's in Information Communication Technology at Asia e University,"
          ),
      },
    })
    console.log("✓ Renamed from-ccit-to-founder → from-bootcamp-to-founder")
  }

  // Stagger publish dates going backward from today, roughly weekly, so the
  // blog doesn't look like 10 posts landed in the same second.
  const now = Date.now()
  const WEEK = 7 * 24 * 60 * 60 * 1000
  let count = 0
  for (let i = 0; i < slugs.length; i++) {
    const publishedAt = new Date(now - (slugs.length - 1 - i) * WEEK)
    await prisma.blogPost.update({
      where: { slug: slugs[i] },
      data: { status: "published", publishedAt },
    })
    count++
  }
  console.log(`✅ Published ${count} posts.`)
}

main().finally(() => prisma.$disconnect())
