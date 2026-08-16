import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer"

const INK = "#000000"
const PAPER = "#FFFFFF"
const MUTED = "#52525B"
const FAINT = "#A1A1AA"
const BORDER = "#E4E4E4"
const CARD = "#FAFAFA"

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 9.5, color: INK, fontFamily: "Helvetica", backgroundColor: PAPER },

  // Cover page
  cover: { padding: 56, backgroundColor: INK, color: PAPER, height: "100%", justifyContent: "space-between" },
  coverEyebrow: { fontSize: 11, color: FAINT, letterSpacing: 2, marginBottom: 18 },
  coverName: { fontSize: 46, fontFamily: "Helvetica-Bold", lineHeight: 1.05, letterSpacing: -1 },
  coverTagline: { fontSize: 16, color: FAINT, marginTop: 16, maxWidth: 420 },
  coverRule: { height: 1, backgroundColor: "#3F3F46", marginBottom: 20 },
  coverContactRow: { flexDirection: "row", gap: 28 },
  coverContactLabel: { fontSize: 7.5, color: "#71717A", letterSpacing: 1, marginBottom: 3 },
  coverContactValue: { fontSize: 10, color: PAPER },

  // Header (content pages)
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", letterSpacing: -0.5, marginBottom: 3 },
  tagline: { fontSize: 11, color: MUTED, marginBottom: 10 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 14, rowGap: 3, marginBottom: 14 },
  contactItem: { fontSize: 8, color: MUTED },
  summary: { fontSize: 9.5, color: MUTED, marginBottom: 20, lineHeight: 1.6, maxWidth: "70%" },

  // Section headings
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12, marginTop: 4 },
  sectionMark: { width: 14, height: 3, backgroundColor: INK, marginRight: 8 },
  sectionTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  sectionSub: { fontSize: 8, color: FAINT, marginLeft: "auto" },

  // Project cards
  projectGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  projectCard: { width: "31.5%", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 12 },
  projectTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  projectDesc: { fontSize: 8, color: MUTED, lineHeight: 1.45, marginBottom: 8 },
  metricsRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginBottom: 8 },
  metricChip: { border: `1px solid ${INK}`, borderRadius: 3, paddingVertical: 3, paddingHorizontal: 6 },
  metricValue: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: INK },
  metricLabel: { fontSize: 6, color: MUTED, letterSpacing: 0.3 },
  projectTechRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  projectTech: { fontSize: 6.5, color: FAINT },
  projectLink: { fontSize: 7, color: INK, marginTop: 6, textDecoration: "underline" },

  // Experience
  entry: { marginBottom: 11 },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  entrySub: { fontSize: 9, fontFamily: "Helvetica-Bold", color: INK, marginTop: 1 },
  entryMeta: { fontSize: 7.5, color: FAINT, marginTop: 1 },
  entryPeriod: { fontSize: 7.5, color: MUTED },
  bullet: { fontSize: 8.5, color: MUTED, marginTop: 3, flexDirection: "row" },
  bulletDot: { color: INK, marginRight: 5 },
  techRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 6 },
  techTag: { fontSize: 6.5, color: MUTED, backgroundColor: CARD, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 3 },

  // Skills
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  skillCategory: { width: "22%", marginBottom: 12 },
  skillCategoryTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 6, color: INK },
  skillRow: { marginBottom: 6 },
  skillNameRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  skillName: { fontSize: 7.5, color: INK },
  skillLevel: { fontSize: 6, color: FAINT },
  skillBarTrack: { height: 2.5, backgroundColor: BORDER },
  skillBarFill: { height: 2.5, backgroundColor: INK },

  // Education
  eduEntry: { marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${BORDER}` },

  footer: { position: "absolute", bottom: 26, left: 48, right: 48, fontSize: 6.5, color: FAINT, textAlign: "center" },
  pageNum: { position: "absolute", bottom: 26, right: 48, fontSize: 6.5, color: FAINT },
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
      <View style={styles.sectionMark} />
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
  const bareUrl = (u: string) => u.replace("https://", "").replace("http://", "")

  return (
    <Document title={`${name} — Portfolio`} author={name}>
      {/* Cover */}
      <Page size="A4" orientation="landscape" style={styles.cover}>
        <View>
          <Text style={styles.coverEyebrow}>PORTFOLIO</Text>
          <Text style={styles.coverName}>{name}</Text>
          <Text style={styles.coverTagline}>{tagline}</Text>
        </View>
        <View>
          <View style={styles.coverRule} />
          <View style={styles.coverContactRow}>
            <View>
              <Text style={styles.coverContactLabel}>EMAIL</Text>
              <Text style={styles.coverContactValue}>{email}</Text>
            </View>
            <View>
              <Text style={styles.coverContactLabel}>LOCATION</Text>
              <Text style={styles.coverContactValue}>{location}</Text>
            </View>
            <View>
              <Text style={styles.coverContactLabel}>LINKEDIN</Text>
              <Text style={styles.coverContactValue}>{bareUrl(linkedin)}</Text>
            </View>
            <View>
              <Text style={styles.coverContactLabel}>GITHUB</Text>
              <Text style={styles.coverContactValue}>{bareUrl(github)}</Text>
            </View>
            <View>
              <Text style={styles.coverContactLabel}>WEB</Text>
              <Text style={styles.coverContactValue}>{bareUrl(siteUrl)}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Content */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.tagline}>{tagline}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{email}</Text>
          <Text style={styles.contactItem}>{location}</Text>
          <Link src={linkedin} style={styles.contactItem}>{bareUrl(linkedin)}</Link>
          <Link src={github} style={styles.contactItem}>{bareUrl(github)}</Link>
          <Link src={siteUrl} style={styles.contactItem}>{bareUrl(siteUrl)}</Link>
        </View>
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
                      <Link src={p.liveUrl} style={styles.projectLink}>{bareUrl(p.liveUrl)}</Link>
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

        <View style={{ marginTop: 18 }}>
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
          <View style={{ marginTop: 8 }}>
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
          {name} — {bareUrl(siteUrl)}
        </Text>
        <Text style={styles.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  )
}
