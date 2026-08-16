import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer"

const INK = "#000000"
const PAPER = "#FFFFFF"
const MUTED = "#52525B"
const FAINT = "#A1A1AA"
const BORDER = "#E4E4E4"

const styles = StyleSheet.create({
  page: { paddingTop: 54, paddingBottom: 54, paddingHorizontal: 56, fontSize: 9.5, color: INK, fontFamily: "Helvetica", backgroundColor: PAPER },

  // Cover page
  cover: { padding: 64, backgroundColor: INK, color: PAPER, height: "100%", justifyContent: "space-between" },
  coverEyebrow: { fontSize: 10, color: FAINT, letterSpacing: 3, marginBottom: 22 },
  coverName: { fontSize: 48, fontFamily: "Helvetica-Bold", lineHeight: 1.05 },
  coverTagline: { fontSize: 15, color: FAINT, marginTop: 18, maxWidth: 440, lineHeight: 1.4 },
  coverRule: { height: 0.75, backgroundColor: "#333333", marginBottom: 26 },
  coverContactRow: { flexDirection: "row" },
  coverContactCell: { paddingRight: 26, marginRight: 26, borderRight: "0.75px solid #2A2A2A" },
  coverContactCellLast: { paddingRight: 0, marginRight: 0, borderRight: "none" },
  coverContactLabel: { fontSize: 7, color: "#71717A", letterSpacing: 1.5, marginBottom: 4 },
  coverContactValue: { fontSize: 9.5, color: PAPER },

  // Header (content pages)
  name: { fontSize: 19, fontFamily: "Helvetica-Bold", marginBottom: 3 },
  tagline: { fontSize: 10.5, color: MUTED, marginBottom: 11 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 16, rowGap: 3, marginBottom: 16, paddingBottom: 16, borderBottom: `0.75px solid ${BORDER}` },
  contactItem: { fontSize: 8, color: MUTED },
  summary: { fontSize: 9.5, color: MUTED, marginBottom: 22, lineHeight: 1.65, maxWidth: "68%" },

  // Section headings — restrained label + hairline rule, Apple spec-sheet style
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 14, marginTop: 6 },
  sectionTitle: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: INK, marginRight: 10 },
  sectionRule: { flex: 1, height: 0.75, backgroundColor: BORDER },
  sectionSub: { fontSize: 7.5, color: FAINT, marginLeft: 10 },

  // Project cards — borderless, top hairline only
  projectGrid: { flexDirection: "row", flexWrap: "wrap", columnGap: "3%", rowGap: 16, marginBottom: 26 },
  projectCard: { width: "31.33%", borderTop: `1.25px solid ${INK}`, paddingTop: 10 },
  projectTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  projectDesc: { fontSize: 8, color: MUTED, lineHeight: 1.5, marginBottom: 9 },
  metricsRow: { flexDirection: "row", flexWrap: "wrap", columnGap: 16, rowGap: 6, marginBottom: 9 },
  metricValue: { fontSize: 13, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 1 },
  metricLabel: { fontSize: 6, color: MUTED },
  projectTechRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 5 },
  projectTech: { fontSize: 6.5, color: FAINT },
  projectLink: { fontSize: 7, color: INK, textDecoration: "underline" },

  // Experience / Education entries
  entry: { paddingBottom: 11, marginBottom: 11, borderBottom: `0.75px solid ${BORDER}` },
  entryLast: { borderBottom: "none", marginBottom: 0, paddingBottom: 0 },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  entryTitle: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  currentPill: { fontSize: 6, color: PAPER, backgroundColor: INK, paddingVertical: 2, paddingHorizontal: 5, borderRadius: 3 },
  entrySub: { fontSize: 9, fontFamily: "Helvetica-Bold", color: INK, marginTop: 1 },
  entryMeta: { fontSize: 7.5, color: FAINT, marginTop: 1 },
  entryPeriod: { fontSize: 7.5, color: MUTED },
  entryDescription: { fontSize: 8, color: MUTED, lineHeight: 1.55, marginTop: 6, maxWidth: "92%" },
  bullet: { fontSize: 8.5, color: MUTED, marginTop: 4, flexDirection: "row" },
  bulletDot: { color: INK, marginRight: 6 },
  techRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 7 },
  techTag: { fontSize: 6.5, color: MUTED },

  // Skills
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", columnGap: "4%", rowGap: 14, marginBottom: 26 },
  skillCategory: { width: "22%" },
  skillCategoryTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", marginBottom: 8, color: INK },
  skillRow: { marginBottom: 7 },
  skillNameRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  skillName: { fontSize: 7.5, color: INK },
  skillLevel: { fontSize: 6, color: FAINT },
  skillBarTrack: { height: 2, backgroundColor: BORDER },
  skillBarFill: { height: 2, backgroundColor: INK },

  // Certifications — dense minimal grid
  certGrid: { flexDirection: "row", flexWrap: "wrap", columnGap: "3%", rowGap: 12 },
  certItem: { width: "31.33%" },
  certName: { fontSize: 8, fontFamily: "Helvetica-Bold", lineHeight: 1.35, marginBottom: 3 },
  certMeta: { fontSize: 7, color: MUTED },

  footer: { position: "absolute", bottom: 28, left: 56, right: 56, fontSize: 6.5, color: FAINT, textAlign: "center" },
  pageNum: { position: "absolute", bottom: 28, right: 56, fontSize: 6.5, color: FAINT },
})

const LEVEL_WIDTH: Record<string, string> = { Expert: "100%", Proficient: "70%", Learning: "40%" }

type Experience = { id: string; role: string; company: string; period: string; type: string; description?: string | null; highlights: string[]; techStack: string[] }
type Education = { id: string; school: string; degree: string; period: string; location: string; note: string | null }
type Certification = { id: string; name: string; issuer: string; issueDate: string; expiry: string | null }
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
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      <View style={styles.sectionRule} />
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
  certifications,
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
  certifications: Certification[]
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
    <Document title={`${name} - Portfolio`} author={name}>
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
            <View style={styles.coverContactCell}>
              <Text style={styles.coverContactLabel}>EMAIL</Text>
              <Text style={styles.coverContactValue}>{email}</Text>
            </View>
            <View style={styles.coverContactCell}>
              <Text style={styles.coverContactLabel}>LOCATION</Text>
              <Text style={styles.coverContactValue}>{location}</Text>
            </View>
            <View style={styles.coverContactCell}>
              <Text style={styles.coverContactLabel}>LINKEDIN</Text>
              <Text style={styles.coverContactValue}>{bareUrl(linkedin)}</Text>
            </View>
            <View style={styles.coverContactCell}>
              <Text style={styles.coverContactLabel}>GITHUB</Text>
              <Text style={styles.coverContactValue}>{bareUrl(github)}</Text>
            </View>
            <View style={[styles.coverContactCell, styles.coverContactCellLast]}>
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
                          <View key={k}>
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

        <View>
          <SectionHeader title="Experience" />
          {experiences.map((e, i) => (
            <View key={e.id} style={[styles.entry, i === experiences.length - 1 ? styles.entryLast : undefined]}>
              <View style={styles.entryHeaderRow}>
                <View>
                  <View style={styles.entryTitleRow}>
                    <Text style={styles.entryTitle}>{e.role}</Text>
                    {e.period.toLowerCase().includes("present") && <Text style={styles.currentPill}>CURRENT</Text>}
                  </View>
                  <Text style={styles.entrySub}>{e.company}</Text>
                  <Text style={styles.entryMeta}>{e.type}</Text>
                </View>
                <Text style={styles.entryPeriod}>{e.period}</Text>
              </View>
              {e.description && <Text style={styles.entryDescription}>{clean(e.description)}</Text>}
              {e.highlights.map((h) => (
                <View key={h} style={styles.bullet}>
                  <Text style={styles.bulletDot}>›</Text>
                  <Text style={{ flex: 1 }}>{clean(h)}</Text>
                </View>
              ))}
              {e.techStack.length > 0 && (
                <View style={styles.techRow}>
                  {e.techStack.map((t, i) => (
                    <Text key={t} style={styles.techTag}>{t}{i < e.techStack.length - 1 ? " ·" : ""}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {education.length > 0 && (
          <View style={{ marginTop: 18 }}>
            <SectionHeader title="Education" />
            {education.map((e, i) => (
              <View key={e.id} style={[styles.entry, i === education.length - 1 ? styles.entryLast : undefined]} wrap={false}>
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

        {certifications.length > 0 && (
          <View style={{ marginTop: 18 }}>
            <SectionHeader title="Certifications" sub={`${certifications.length} credentials`} />
            <View style={styles.certGrid}>
              {certifications.map((c) => (
                <View key={c.id} style={styles.certItem} wrap={false}>
                  <Text style={styles.certName}>{c.name}</Text>
                  <Text style={styles.certMeta}>{c.issuer} · {c.issueDate}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.footer} fixed>
          {name} · {bareUrl(siteUrl)}
        </Text>
        <Text style={styles.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  )
}
