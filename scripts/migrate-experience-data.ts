import { config } from "dotenv"
config({ path: ".env" })
config({ path: ".env.local", override: true })

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const experiences = [
  { role: "Full Stack Engineer", company: "Home Credit Indonesia", period: "Sep 2024 – Present", type: "Full-time · Hybrid · Jakarta", highlights: ["Custom Genesys WDE plugins — agent productivity +30%, errors -40%", "Samsung Finance+ Voicebot — 10K+ monthly contract validations", "Wallboard & RSL platform — used by 300+ staff, reporting efficiency +60%", "PIC Affinity middleware — 12+ apps, 99.99% uptime, zero-downtime migration"], techStack: ["Java Spring Boot", "AngularJS", "OracleDB", "Docker", "K8s", "Genesys"], order: 0 },
  { role: "Founder & Full Stack Engineer", company: "Codenito ID", period: "Sep 2022 – Present", type: "Self-employed · Remote", highlights: ["Founded remote-first studio, 8-member cross-functional team", "15+ production-grade systems, 10+ clients, 100% on-time delivery", "Revenue 3× growth in 2025, 3+ strategic partners", "Roles: Solution Architect · Project Manager · Full Stack Engineer"], techStack: ["Next.js", "NestJS", "PostgreSQL", "React", "Docker", "AWS"], order: 1 },
  { role: "Full Stack Engineer", company: "Jobseeker Company", period: "Jan 2024 – Sep 2024", type: "Contract · On-site · Bali", highlights: ["6 custom HRMS modules — time-to-hire -40%", "HRIS: payroll, attendance, employee self-service modules", "Led v1→v2 migration — downtime -30%, performance +35%", "Clients: Paramount Land, Superindo, Lawson Indonesia, CBN"], techStack: ["React.js", "Node.js", "Laravel", "MySQL", "MongoDB", "AWS"], order: 2 },
  { role: "IT Programmer", company: "Mineral Alam Abadi Group", period: "Jun 2023 – Sep 2023", type: "Internship · On-site · Jakarta", highlights: ["Migrated Enterprise Internal Portal: PHP → Laravel", "Company profile + career portal — 500+ applicants in 3 months", "WhatsApp API integration for real-time notifications"], techStack: ["Laravel", "MySQL", "Bootstrap", "JavaScript"], order: 3 },
]

const education = [
  { school: "Asia e University", degree: "Bachelor of ICT (Hons)", period: "Aug 2021 – Oct 2025", location: "Subang Jaya, Malaysia", note: "Final Project: Talent Hiring Smart Matching System", order: 0 },
  { school: "Purwadhika Digital Technology School", degree: "Full Stack Web Development", period: "Jan 2023 – Sep 2023", location: "Jakarta", note: "Final Project: Multi-Warehouse E-Commerce", order: 1 },
  { school: "University of Indonesia – CCIT", degree: "Diploma in Software Engineering – NIIT", period: "Aug 2021 – Aug 2023", location: "Depok | GPA: 3.65", note: "BNSP National Programmer Certification", order: 2 },
]

const skills = [
  { category: "Frontend", items: [{ n: "Next.js", l: "Expert" }, { n: "React.js", l: "Expert" }, { n: "TypeScript", l: "Expert" }, { n: "Tailwind CSS", l: "Expert" }, { n: "AngularJS", l: "Proficient" }] },
  { category: "Backend", items: [{ n: "NestJS", l: "Expert" }, { n: "Node.js", l: "Expert" }, { n: "Spring Boot", l: "Proficient" }, { n: "Laravel", l: "Proficient" }, { n: "FastAPI", l: "Proficient" }] },
  { category: "Database", items: [{ n: "PostgreSQL", l: "Expert" }, { n: "MySQL", l: "Expert" }, { n: "MongoDB", l: "Proficient" }, { n: "OracleDB", l: "Proficient" }, { n: "Firebase", l: "Proficient" }] },
  { category: "DevOps", items: [{ n: "Docker", l: "Expert" }, { n: "Kubernetes", l: "Proficient" }, { n: "AWS", l: "Proficient" }, { n: "CI/CD", l: "Expert" }, { n: "Kafka", l: "Proficient" }] },
  { category: "AI / ML", items: [{ n: "LLMs / RAG", l: "Learning" }, { n: "HuggingFace", l: "Learning" }, { n: "LangChain", l: "Learning" }, { n: "NLP", l: "Learning" }, { n: "PyTorch", l: "Learning" }] },
]

async function main() {
  const expCount = await prisma.experience.count()
  if (expCount === 0) {
    await prisma.experience.createMany({ data: experiences })
    console.log(`✓ ${experiences.length} experiences migrated`)
  } else {
    console.log("· Experiences already present, skipping")
  }

  const eduCount = await prisma.education.count()
  if (eduCount === 0) {
    await prisma.education.createMany({ data: education })
    console.log(`✓ ${education.length} education entries migrated`)
  } else {
    console.log("· Education already present, skipping")
  }

  const skillCount = await prisma.skill.count()
  if (skillCount === 0) {
    const rows = skills.flatMap((cat, ci) =>
      cat.items.map((item, si) => ({
        category: cat.category,
        name: item.n,
        level: item.l,
        order: ci * 100 + si,
      }))
    )
    await prisma.skill.createMany({ data: rows })
    console.log(`✓ ${rows.length} skills migrated`)
  } else {
    console.log("· Skills already present, skipping")
  }

  console.log("\n✅ Migration complete.")
}

main().finally(() => prisma.$disconnect())
