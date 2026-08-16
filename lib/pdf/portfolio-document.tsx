import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer"

const ACCENT = "#2563EB"
const ACCENT_SOFT = "#EFF4FF"
const INK = "#18181B"
const MUTED = "#71717A"
const BORDER = "#E4E4E7"
const CARD = "#FAFAFA"

const styles = StyleSheet.create({
  page: { padding: 44, fontSize: 10, color: INK, fontFamily: "Helvetica" },

  // Header
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", letterSpacing: -0.5, marginBottom: 4 },
  tagline: { fontSize: 12.5, color: ACCENT, fontFamily: "Helvetica-Bold", marginBottom: 10 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 12, rowGap: 3 },
  contactItem: { fontSize: 8.5, color: MUTED },
  headerRule: { height: 2, backgroundColor: ACCENT, width: 48, marginTop: 14, marginBottom: 16 },
  summary: { fontSize: 10, color: MUTED, marginBottom: 22, lineHeight: 1.6, maxWidth: "85%" },

  // Section headings
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12, marginTop: 6 },
  sectionDot: { width: 6, height: 6, backgroundColor: ACCENT, marginRight: 7, borderRadius: 3 },
  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", letterSpacing: 1 },
  sectionSub: { fontSize: 8.5, color: MUTED, marginLeft: "auto" },

  // Project cards (portfolio-forward)
  projectGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 22 },
  projectCard: {
    width: "48.5%",
    backgroundColor: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    padding: 12,
  },
  projectTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  projectDesc: { fontSize: 8.5, color: MUTED, lineHeight: 1.45, marginBottom: 8 },
  metricsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  metricChip: { backgroundColor: ACCENT_SOFT, borderRadius: 4, paddingVertical: 3, paddingHorizontal: 6 },
  metricValue: { fontSize: 9, fontFamily: "Helvetica-Bold", color: ACCENT },
  metricLabel: { fontSize: 6.5, color: MUTED, letterSpacing: 0.3 },
  projectTechRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  projectTech: { fontSize: 7, color: MUTED },
  projectLink: { fontSize: 7.5, color: ACCENT, marginTop: 6 },

  // Experience
  entry: { marginBottom: 12 },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold" },
  entrySub: { fontSize: 9.5, color: ACCENT, fontFamily: "Helvetica-Bold", marginTop: 1 },
  entryMeta: { fontSize: 8.5, color: MUTED, marginTop: 1 },
  entryPeriod: { fontSize: 8.5, color: MUTED },
  bullet: { fontSize: 9, color: MUTED, marginTop: 4, flexDirection: "row" },
  bulletDot: { color: ACCENT, marginRight: 5 },
  techRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 7 },
  techTag: { fontSize: 7.5, color: MUTED, backgroundColor: "#F4F4F5", paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3 },

  // Skills with proficiency bars (mirrors the site's own visualization)
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 18 },
  skillCategory: { width: "30%", marginBottom: 12 },
  skillCategoryTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", marginBottom: 7, color: INK },
  skillRow: { marginBottom: 6 },
  skillNameRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  skillName: { fontSize: 8, color: INK },
  skillLevel: { fontSize: 6.5, color: MUTED },
  skillBarTrack: { height: 3, backgroundColor: "#F0F0F1", borderRadius: 2 },
  skillBarFill: { height: 3, backgroundColor: ACCENT, borderRadius: 2 },

  // Education
  eduEntry: { marginBottom: 9, paddingBottom: 9, borderBottom: `1px solid ${BORDER}` },

  footer: { position: "absolute", bottom: 24, left: 44, right: 44, fontSize: 7, color: MUTED, textAlign: "center" },
  pageNum: { position: "absolute", bottom: 24, right: 44, fontSize: 7, color: MUTED },
})

const LEVEL_WIDTH: Record<string, string> = { Expert: "100%", Proficient: "70%", Learning: "40%" }

type Experience = { id: string; role: string; company: string; period: string; type: string; highlights: string[]; techStack: string[] }
type Education = { id: string; school: string; degree: string; period: string; location: string; note: string | null }
type Skill = { id: string; category: string; name: string; level: string }
type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  liveUrl: string | null
  impactMetrics: Record<string, string> | null
}

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionDot} />
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      {sub && <Text style={styles.sectionSub}>{sub}</Text>}
    </View>
  )
}

// Helvetica (PDF base font) only supports WinAnsi/Latin-1 — the Unicode
// arrow "→" renders as a garbage glyph, so strip it from any DB text we show.
function clean(text: string) {
  return text.replace(/→/g, "->")
}

export function PortfolioDocument({
  name,
  tagline,
  summary,
  email,
  location,
  linkedin,
  github,
  siteUrl,
  experiences,
  education,
  skills,
  projects,
}: {
  name: string
  tagline: string
  summary: string
  email: string
  location: string
  linkedin: string
  github: string
  siteUrl: string
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
}) {
  const skillCategories = Object.values(
    skills.reduce<Record<string, { name: string; skills: Skill[] }>>((acc, sk) => {
      acc[sk.category] ??= { name: sk.category, skills: [] }
      acc[sk.category].skills.push(sk)
      return acc
    }, {})
  )

  return (
    <Document title={`${name} — Portfolio`} author={name}>
      {/* Page 1 — Portfolio: intro + selected work */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.tagline}>{tagline}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{email}</Text>
          <Text style={styles.contactItem}>{location}</Text>
          <Link src={linkedin} style={styles.contactItem}>{linkedin.replace("https://", "")}</Link>
          <Link src={github} style={styles.contactItem}>{github.replace("https://", "")}</Link>
          <Link src={siteUrl} style={styles.contactItem}>{siteUrl.replace("https://", "").replace("http://", "")}</Link>
        </View>
        <View style={styles.headerRule} />
        <Text style={styles.summary}>{summary}</Text>

        {projects.length > 0 && (
          <View>
            <SectionHeader title="Selected Work" sub={`${projects.length} featured projects`} />
            <View style={styles.projectGrid}>
              {projects.map((p) => {
                const metrics = p.impactMetrics ? Object.entries(p.impactMetrics).slice(0, 3) : []
                return (
                  <View key={p.id} style={styles.projectCard} wrap={false}>
                    <Text style={styles.projectTitle}>{p.title}</Text>
                    <Text style={styles.projectDesc}>{p.description}</Text>
                    {metrics.length > 0 && (
                      <View style={styles.metricsRow}>
                        {metrics.map(([k, v]) => (
                          <View key={k} style={styles.metricChip}>
                            <Text style={styles.metricValue}>{v}</Text>
                            <Text style={styles.metricLabel}>{k.replace(/_/g, " ").toUpperCase()}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    <View style={styles.projectTechRow}>
                      {p.techStack.slice(0, 5).map((t, i) => (
                        <Text key={t} style={styles.projectTech}>{t}{i < Math.min(p.techStack.length, 5) - 1 ? " · " : ""}</Text>
                      ))}
                    </View>
                    {p.liveUrl && (
                      <Link src={p.liveUrl} style={styles.projectLink}>{p.liveUrl.replace("https://", "").replace("http://", "")}</Link>
                    )}
                  </View>
                )
              })}
            </View>
          </View>
        )}

        {skillCategories.length > 0 && (
          <View>
            <SectionHeader title="Skills" />
            <View style={styles.skillsGrid}>
              {skillCategories.map((cat) => (
                <View key={cat.name} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{cat.name}</Text>
                  {cat.skills.map((sk) => (
                    <View key={sk.id} style={styles.skillRow}>
                      <View style={styles.skillNameRow}>
                        <Text style={styles.skillName}>{sk.name}</Text>
                        <Text style={styles.skillLevel}>{sk.level}</Text>
                      </View>
                      <View style={styles.skillBarTrack}>
                        <View style={[styles.skillBarFill, { width: LEVEL_WIDTH[sk.level] ?? "70%" }]} />
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <SectionHeader title="Experience" />
          {experiences.map((e) => (
            <View key={e.id} style={styles.entry} wrap={false}>
              <View style={styles.entryHeaderRow}>
                <View>
                  <Text style={styles.entryTitle}>{e.role}</Text>
                  <Text style={styles.entrySub}>{e.company}</Text>
                  <Text style={styles.entryMeta}>{e.type}</Text>
                </View>
                <Text style={styles.entryPeriod}>{e.period}</Text>
              </View>
              {e.highlights.map((h) => (
                <View key={h} style={styles.bullet}>
                  <Text style={styles.bulletDot}>›</Text>
                  <Text style={{ flex: 1 }}>{clean(h)}</Text>
                </View>
              ))}
              {e.techStack.length > 0 && (
                <View style={styles.techRow}>
                  {e.techStack.map((t) => (
                    <Text key={t} style={styles.techTag}>{t}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {education.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <SectionHeader title="Education" />
            {education.map((e) => (
              <View key={e.id} style={styles.eduEntry} wrap={false}>
                <View style={styles.entryHeaderRow}>
                  <View>
                    <Text style={styles.entryTitle}>{e.school}</Text>
                    <Text style={styles.entrySub}>{e.degree}</Text>
                    <Text style={styles.entryMeta}>{e.location}</Text>
                  </View>
                  <Text style={styles.entryPeriod}>{e.period}</Text>
                </View>
                {e.note && (
                  <View style={styles.bullet}>
                    <Text style={styles.bulletDot}>›</Text>
                    <Text style={{ flex: 1 }}>{clean(e.note)}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footer} fixed>
          {name} — {siteUrl.replace("https://", "").replace("http://", "")}
        </Text>
        <Text style={styles.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  )
}
