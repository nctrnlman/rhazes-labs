import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer"

const ACCENT = "#2563EB"
const INK = "#18181B"
const MUTED = "#71717A"
const BORDER = "#E4E4E7"

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, color: INK, fontFamily: "Helvetica" },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  tagline: { fontSize: 12, color: ACCENT, marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  contactItem: { fontSize: 9, color: MUTED },
  summary: { fontSize: 10, color: MUTED, marginBottom: 18, lineHeight: 1.5 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    marginTop: 4,
    paddingBottom: 4,
    borderBottom: `1px solid ${BORDER}`,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  entry: { marginBottom: 10 },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  entryTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold" },
  entrySub: { fontSize: 9.5, color: ACCENT, marginTop: 1 },
  entryMeta: { fontSize: 8.5, color: MUTED, marginTop: 1 },
  entryPeriod: { fontSize: 8.5, color: MUTED },
  bullet: { fontSize: 9, color: MUTED, marginTop: 4, flexDirection: "row" },
  bulletDot: { marginRight: 5 },
  techRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 6 },
  techTag: { fontSize: 7.5, color: MUTED, backgroundColor: "#F4F4F5", padding: "2 6", borderRadius: 3 },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  skillCategory: { width: "31%", marginBottom: 10 },
  skillCategoryTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  skillItem: { fontSize: 8.5, color: MUTED, marginBottom: 2 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, fontSize: 7.5, color: MUTED, textAlign: "center" },
})

type Experience = { id: string; role: string; company: string; period: string; type: string; highlights: string[]; techStack: string[] }
type Education = { id: string; school: string; degree: string; period: string; location: string; note: string | null }
type Skill = { id: string; category: string; name: string; level: string }
type Project = { id: string; title: string; description: string; techStack: string[]; liveUrl: string | null }

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

        <Text style={styles.summary}>{summary}</Text>

        {experiences.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
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
                    <Text style={{ flex: 1 }}>{h}</Text>
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
        )}

        {skillCategories.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {skillCategories.map((cat) => (
                <View key={cat.name} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{cat.name}</Text>
                  {cat.skills.map((sk) => (
                    <Text key={sk.id} style={styles.skillItem}>{sk.name} — {sk.level}</Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

        {education.length > 0 && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((e) => (
              <View key={e.id} style={styles.entry}>
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
                    <Text style={{ flex: 1 }}>{e.note}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Featured Projects</Text>
            {projects.map((p) => (
              <View key={p.id} style={styles.entry} wrap={false}>
                <Text style={styles.entryTitle}>{p.title}{p.liveUrl ? `  —  ${p.liveUrl.replace("https://", "").replace("http://", "")}` : ""}</Text>
                <Text style={{ fontSize: 9, color: MUTED, marginTop: 2 }}>{p.description}</Text>
                {p.techStack.length > 0 && (
                  <View style={styles.techRow}>
                    {p.techStack.map((t) => (
                      <Text key={t} style={styles.techTag}>{t}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footer} fixed>
          Generated from {name}&apos;s live portfolio at {siteUrl.replace("https://", "").replace("http://", "")}
        </Text>
      </Page>
    </Document>
  )
}
