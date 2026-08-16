import { config } from "dotenv"
config({ path: ".env" })
config({ path: ".env.local", override: true })

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const rows = [
    {
      role: "Full Stack Developer",
      company: "Home Credit Indonesia",
      period: "Sep 2024 – Present",
      type: "Full-time · Hybrid · Jakarta, Indonesia",
      description:
        "Full Stack Developer on the Omnichannel Contact Center team, building and maintaining customer interaction systems on the Genesys platform. I work across frontend, backend, and systems integration to improve efficiency, compliance, and agent productivity for HCI's OPS, CRM, and CRS teams.",
      highlights: [
        "Engineered Genesys WDE plugins for call record history, CUID-based call restrictions, and data masking to meet OJK personal data protection standards.",
        "Built a WebView integration that embeds CRM and ticketing systems directly inside the agent desktop.",
        "Led backend integration for the Samsung Finance+ voicebot, enabling real-time interaction capture and sync with internal systems.",
        "Served as PIC and system analyst for the Affinity middleware handover, running knowledge transfer sessions and debugging routing, blacklist, and queue logic across 12+ core apps.",
        "Built internal ops dashboards that automate RSL reporting with advanced filters and export tools for CRM, OPS, and CRS teams.",
        "Delivered under Agile sprints and supported deployments and incidents using ITIL-aligned workflows with Jira, Splunk, and GitLab CI/CD.",
      ],
      techStack: ["Java Spring Boot", ".NET", "Groovy", "AngularJS", "Oracle PL/SQL", "Docker", "Kubernetes", "Genesys"],
      order: 1,
    },
    {
      role: "Founder & Full Stack Engineer",
      company: "Codenito ID",
      period: "Sep 2022 – Present",
      type: "Self-employed · Remote",
      description:
        "Founded and scaled Codenito ID, a remote-first software studio delivering custom, end-to-end digital solutions for clients across e-commerce, healthcare, logistics, legal, and FMCG.",
      highlights: [
        "Led 15+ successful software deliveries with 100% on-time launches and over 90% client satisfaction.",
        "Built and led a cross-functional team of 8+ across product, engineering, QA, DevOps, and digital marketing.",
        "Owned the full project lifecycle from discovery and architecture to deployment and optimization, often as Solution Architect, Product Owner, and Project Manager at once.",
        "Standardized development workflows and introduced internal tooling that cut the average development cycle by 35%.",
        "Built and maintained relationships with 3+ strategic partners to support long-term business continuity and growth.",
        "Delivered a digital competition platform for Dulux Indonesia's 2025 competition and an operational journal system for PT Armada Hasil Sagara's logistics tracking, alongside systems for healthcare providers, law firms, and online businesses.",
      ],
      techStack: ["Next.js", "React", "NestJS", "Laravel", "Spring Boot", "PostgreSQL", "MongoDB", "Docker", "AWS"],
      order: 2,
    },
    {
      role: "Full Stack Engineer",
      company: "Jobseeker Company",
      period: "Jan 2024 – Sep 2024",
      type: "Contract · On-site · Bali, Indonesia",
      description:
        "Full Stack Engineer on the B2B production team, developing and customizing enterprise HR solutions for major clients, including an external HRMS and an internal HRIS covering payroll, attendance, and employee self-service.",
      highlights: [
        "Delivered full-cycle implementation of two enterprise HR systems, customized for corporate clients including Paramount Land, Superindo, Lawson Indonesia, and CBN.",
        "Worked closely with the B2B production team and project managers to scope, gather feedback, and deliver on aggressive timelines.",
        "Customized system modules to fit each client's operational workflows, compliance needs, and reporting requirements.",
        "Contributed to the platform's migration from v2 to v3, improving scalability, performance, and maintainability.",
        "Ensured platform reliability across deployments through proactive debugging and QA collaboration.",
      ],
      techStack: ["React.js", "Node.js", "Laravel", "Spring Boot", "PHP", "MySQL", "MongoDB", "AWS"],
      order: 3,
    },
    {
      role: "IT Programmer",
      company: "PT Mineral Alam Abadi",
      period: "Jun 2023 – Sep 2023",
      type: "Internship · On-site · Jakarta, Indonesia",
      description:
        "Full Stack Developer Intern delivering two major web-based systems for internal operations and public presence, covering full-cycle development, system migration, and feature expansion.",
      highlights: [
        "Migrated the legacy Enterprise Internal Portal from native PHP to Laravel, improving code structure, maintainability, and performance.",
        "Built IT Service Desk and General Affairs modules for employees to submit IT requests, item requisitions, and service tickets.",
        "Implemented WhatsApp API integration to send real-time notifications on ticket updates and request statuses.",
        "Designed and deployed a new company profile website with a dynamic content management system, including a blog and company overview.",
        "Built a career page with backend tools for HR to post vacancies, manage applications, and track candidate progress.",
      ],
      techStack: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
      order: 4,
    },
  ]

  for (const r of rows) {
    const matchTerm = r.company.startsWith("PT ") ? r.company.replace("PT ", "") : r.company
    const existing = await prisma.experience.findFirst({ where: { company: { contains: matchTerm } } })
    if (existing) {
      await prisma.experience.update({ where: { id: existing.id }, data: r })
      console.log("Updated:", r.role, "@", r.company)
    } else {
      await prisma.experience.create({ data: r })
      console.log("Created:", r.role, "@", r.company)
    }
  }

  console.log("✓ Experience data updated")
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
