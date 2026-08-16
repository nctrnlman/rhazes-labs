import { FadeIn } from "@/components/shared/motion-wrapper"

const exps = [
  { role: "Full Stack Engineer", company: "Home Credit Indonesia", period: "Sep 2024 – Present", type: "Full-time · Hybrid · Jakarta", highlights: ["Custom Genesys WDE plugins — agent productivity +30%, errors -40%", "Samsung Finance+ Voicebot — 10K+ monthly contract validations", "Wallboard & RSL platform — used by 300+ staff, reporting efficiency +60%", "PIC Affinity middleware — 12+ apps, 99.99% uptime, zero-downtime migration"], tech: ["Java Spring Boot", "AngularJS", "OracleDB", "Docker", "K8s", "Genesys"] },
  { role: "Founder & Full Stack Engineer", company: "Codenito ID", period: "Sep 2022 – Present", type: "Self-employed · Remote", highlights: ["Founded remote-first studio, 8-member cross-functional team", "15+ production-grade systems, 10+ clients, 100% on-time delivery", "Revenue 3× growth in 2025, 3+ strategic partners", "Roles: Solution Architect · Project Manager · Full Stack Engineer"], tech: ["Next.js", "NestJS", "PostgreSQL", "React", "Docker", "AWS"] },
  { role: "Full Stack Engineer", company: "Jobseeker Company", period: "Jan 2024 – Sep 2024", type: "Contract · On-site · Bali", highlights: ["6 custom HRMS modules — time-to-hire -40%", "HRIS: payroll, attendance, employee self-service modules", "Led v1→v2 migration — downtime -30%, performance +35%", "Clients: Paramount Land, Superindo, Lawson Indonesia, CBN"], tech: ["React.js", "Node.js", "Laravel", "MySQL", "MongoDB", "AWS"] },
  { role: "IT Programmer", company: "Mineral Alam Abadi Group", period: "Jun 2023 – Sep 2023", type: "Internship · On-site · Jakarta", highlights: ["Migrated Enterprise Internal Portal: PHP → Laravel", "Company profile + career portal — 500+ applicants in 3 months", "WhatsApp API integration for real-time notifications"], tech: ["Laravel", "MySQL", "Bootstrap", "JavaScript"] },
]

export function ExperienceTimeline() {
  return (
    <div className="space-y-0">
      {exps.map((e, i) => (
        <FadeIn key={e.company + e.period} delay={i * 0.1}>
          <div className="relative flex gap-5">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="mt-2 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20" />
              {i < exps.length - 1 && <div className="w-px flex-1 bg-border/50 mt-2 mb-0" style={{ minHeight: "3rem" }} />}
            </div>
            <div className="pb-10 w-full">
              <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/20 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{e.role}</h3>
                    <p className="gradient-accent font-semibold text-sm">{e.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5 flex-shrink-0 whitespace-nowrap">{e.period}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {e.highlights.map((h) => <li key={h} className="text-sm text-muted-foreground flex gap-2"><span className="text-accent mt-0.5 flex-shrink-0">›</span>{h}</li>)}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {e.tech.map((t) => <span key={t} className="text-xs bg-muted/80 rounded-full px-2.5 py-1">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
