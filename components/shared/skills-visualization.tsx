"use client"
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-wrapper"

const cats = [
  { name: "Frontend", color: "bg-blue-500", skills: [{ n: "Next.js", l: "Expert" }, { n: "React.js", l: "Expert" }, { n: "TypeScript", l: "Expert" }, { n: "Tailwind CSS", l: "Expert" }, { n: "AngularJS", l: "Proficient" }] },
  { name: "Backend", color: "bg-green-500", skills: [{ n: "NestJS", l: "Expert" }, { n: "Node.js", l: "Expert" }, { n: "Spring Boot", l: "Proficient" }, { n: "Laravel", l: "Proficient" }, { n: "FastAPI", l: "Proficient" }] },
  { name: "Database", color: "bg-purple-500", skills: [{ n: "PostgreSQL", l: "Expert" }, { n: "MySQL", l: "Expert" }, { n: "MongoDB", l: "Proficient" }, { n: "OracleDB", l: "Proficient" }, { n: "Firebase", l: "Proficient" }] },
  { name: "DevOps", color: "bg-orange-500", skills: [{ n: "Docker", l: "Expert" }, { n: "Kubernetes", l: "Proficient" }, { n: "AWS", l: "Proficient" }, { n: "CI/CD", l: "Expert" }, { n: "Kafka", l: "Proficient" }] },
  { name: "AI / ML", color: "bg-pink-500", skills: [{ n: "LLMs / RAG", l: "Learning" }, { n: "HuggingFace", l: "Learning" }, { n: "LangChain", l: "Learning" }, { n: "NLP", l: "Learning" }, { n: "PyTorch", l: "Learning" }] },
]

const w: Record<string, string> = { Expert: "100%", Proficient: "70%", Learning: "40%" }
const c: Record<string, string> = { Expert: "bg-accent", Proficient: "bg-accent/60", Learning: "bg-accent/30" }

export function SkillsVisualization() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {cats.map((cat) => (
        <div key={cat.name} className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
            <h3 className="font-semibold text-sm">{cat.name}</h3>
          </div>
          <StaggerContainer className="space-y-3">
            {cat.skills.map((sk) => (
              <StaggerItem key={sk.n}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{sk.n}</span>
                  <span className="text-xs text-muted-foreground">{sk.l}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c[sk.l]} transition-all duration-700`} style={{ width: w[sk.l] }} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      ))}
    </div>
  )
}
