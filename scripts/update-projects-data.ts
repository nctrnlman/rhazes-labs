import { config } from "dotenv"
config({ path: ".env" })
config({ path: ".env.local", override: true })

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const projects = [
  {
    title: "Dulux Design Competition 2025",
    slug: "dulux-design-competition-2025",
    description:
      "End-to-end digital platform for Dulux Indonesia's design competition, serving 7,000+ users and sustaining 2,000+ concurrent visitors with zero downtime across 20+ countries. Built as Architect and Lead Backend, covering the judging system, admin dashboard, and analytics.",
    content:
      "<p>As Architect and Lead Backend on this platform, the constraint was simple: this was a public competition site that needed to hold up under real, unpredictable traffic from entrants across 20+ countries, not an internal tool.</p><p>Static-first rendering on Next.js pushed public traffic to the CDN instead of the database. Entry assets went straight to AWS S3, never through the application server. Nginx handled rate limiting and connection handling in front of the Node.js backend, and Grafana dashboards ran from day one for real-time observability.</p><p><a href=\"/blog/serving-7000-users-20-countries-competition-platform\">Read the full write-up</a> on how the architecture held up under load.</p>",
    category: "Platform",
    period: "Jan 2025 – Present",
    techStack: ["Next.js", "Node.js", "MySQL", "AWS S3", "Nginx", "Grafana"],
    impactMetrics: { users: "7K+", concurrent: "2K+", countries: "20+" },
    featured: true,
    order: 1,
  },
  {
    title: "Healthcare Company Management System",
    slug: "healthcare-company-management-system",
    description:
      "Internal management system for a healthcare equipment company, unifying attendance, transactions, product, supplier, customer, and employee management into one operations platform.",
    content:
      "<ul><li>Designed and implemented a location-based attendance system, boosting employee accountability and marketing efforts.</li><li>Developed a transaction management system, ensuring accurate inventory tracking and order fulfillment.</li><li>Created a centralized product management system with real-time access to product information and specifications.</li><li>Built a supplier and customer management system to strengthen relationships and business opportunities.</li><li>Implemented an employee management system tracking performance, training, and attendance data.</li></ul><p>Built with scalability and flexibility in mind to accommodate future business growth and changes.</p>",
    category: "Internal System",
    period: "Mar 2024 – May 2024",
    techStack: ["React.js", "Vite", "Express.js", "MySQL", "Firebase", "OpenCage API"],
    featured: true,
    order: 2,
  },
  {
    title: "Codenito.id Company Profile",
    slug: "codenito-company-profile",
    description:
      "The company profile for Codenito ID, our studio's digital front door showcasing our team, work, and approach.",
    category: "Company Profile",
    period: "Jan 2024",
    techStack: ["React.js", "npm"],
    liveUrl: "https://codenito.id",
    featured: true,
    order: 3,
  },
  {
    title: "Marketing Management System",
    slug: "marketing-management-system",
    description:
      "Location-based attendance and marketing tracking system for PT Sehat Murni Sejahtera, built to keep field data accurate and accessible in real time.",
    category: "Internal System",
    period: "Feb 2024 – Mar 2024",
    techStack: ["React.js", "OpenCage API", "Firebase Storage", "Express.js"],
    featured: false,
    order: 4,
  },
  {
    title: "Operational Journal System",
    slug: "armada-hasil-sagara-operational-journal",
    description:
      "Operational journal and logistics tracking system for PT Armada Hasil Sagara, a shipping industry company, built through Codenito ID to digitize day-to-day operations.",
    category: "Internal System",
    techStack: [],
    featured: false,
    order: 5,
  },
  {
    title: "ERP System (Jakarta Electrical Center)",
    slug: "jakarta-electrical-center-erp",
    description:
      "Enterprise resource planning system built for Jakarta Electrical Center, a hub for electrical and electronics trade, to streamline internal business operations.",
    category: "Internal System",
    techStack: [],
    featured: false,
    order: 6,
  },
  {
    title: "AI Image Generator",
    slug: "ai-image-generator",
    description:
      "A text-to-image tool built with React and OpenAI's API, turning written prompts into generated images in real time.",
    category: "AI",
    period: "Jan 2024",
    techStack: ["React", "Vite", "OpenAI API"],
    featured: false,
    order: 7,
  },
  {
    title: "Mylaw.id Company Profile",
    slug: "mylaw-company-profile",
    description:
      "Company profile for MyLaw, a legal services firm, built to reflect their blend of legal expertise and modern technology.",
    category: "Company Profile",
    period: "Aug 2023 – Nov 2023",
    techStack: ["React.js"],
    featured: false,
    order: 8,
  },
  {
    title: "Akhensi Company Profile",
    slug: "akhensi-company-profile",
    description:
      "Company profile website built through Codenito ID for Akhensi.",
    category: "Company Profile",
    techStack: [],
    featured: false,
    order: 9,
  },
  {
    title: "MAA Group Company Profile & Careers",
    slug: "maa-group-company-profile-careers",
    description:
      "Company profile and careers site for PT Mineral Alam Abadi, showcasing the company's heritage, values, and mining portfolio alongside an open careers page.",
    category: "Company Profile",
    period: "Jun 2023 – Sep 2023",
    techStack: ["PHP", "Bootstrap"],
    featured: false,
    order: 10,
  },
  {
    title: "MAA Group Employee Information Portal",
    slug: "maa-group-employee-portal",
    description:
      "Internal portal for PT Mineral Alam Abadi employees to access company resources, updates, and information in one centralized platform.",
    category: "Internal System",
    period: "Jun 2023 – Sep 2023",
    techStack: ["Laravel", "MySQL"],
    featured: false,
    order: 11,
  },
  {
    title: "Travemate",
    slug: "travemate-airbnb-ui-ux",
    description:
      "UI/UX case study for Travemate, an Airbnb-inspired travel booking concept covering hotels, flights, and recreation, designed and prototyped in Figma.",
    category: "UI/UX Design",
    period: "Apr 2022",
    techStack: ["Figma", "UI/UX Design"],
    featured: false,
    order: 12,
  },
]

async function main() {
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
    console.log("Upserted:", p.title)
  }

  console.log("✓ Projects updated")
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
