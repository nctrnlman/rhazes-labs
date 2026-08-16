import { config } from "dotenv"
config({ path: ".env" })
config({ path: ".env.local", override: true })

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const certifications = [
  { name: "Docker & Kubernetes: The Practical Guide", issuer: "Udemy", issueDate: "Aug 2025", credentialId: "UC-4551a4e2-6cf6-4304-8bcc-a8dd4ff2a798", skills: ["Docker", "Kubernetes"] },
  { name: "Apache Kafka Series - Kafka Streams for Data Processing", issuer: "Udemy", issueDate: "Jun 2025", credentialId: "UC-f1645060-25f3-47c8-9252-8c65b2bb1ed0", skills: ["Kafka Streams", "Avro"] },
  { name: "Apache Kafka Series - Confluent Schema Registry & REST Proxy", issuer: "Udemy", issueDate: "Mar 2025", credentialId: "UC-76c5df30-794e-48b4-a919-b48954c1288c", skills: ["Avro", "kafka-tools"] },
  { name: "Full Stack Developer", issuer: "Purwadhika Digital Technology School", issueDate: "Aug 2023", skills: ["Project Management", "React.js"] },
  { name: "Certificate of Professional Program (Software Engineering)", issuer: "NIIT", issueDate: "Feb 2023", skills: ["Software Development", "Internet of Things (IoT)"] },
  { name: "Programming Services", issuer: "Badan Nasional Sertifikasi Profesi (BNSP)", issueDate: "Jun 2023", expiry: "Expired Jun 2026", skills: ["Programming", "Full-Stack Development"] },
  { name: "Apache Kafka Series - Learn Apache Kafka for Beginners v3", issuer: "Udemy", issueDate: "Feb 2025", expiry: "Expires Feb 2028", credentialId: "UC-72088e00-b609-40d5-9280-c98f2fb5a51e", skills: ["Apache Kafka", "Kafka Streams"] },
  { name: "Memulai Pemrograman dengan Haskell", issuer: "Dicoding Indonesia", issueDate: "Sep 2023", expiry: "Expires Sep 2026", credentialId: "07Z68NWQYXQR", skills: [] },
  { name: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software", issuer: "Dicoding Indonesia", issueDate: "Aug 2023", expiry: "Expires Aug 2026", credentialId: "0LZ0QOKMRZ65", skills: [] },
  { name: "Belajar Dasar Git dengan GitHub", issuer: "Dicoding Indonesia", issueDate: "Aug 2023", expiry: "Expires Aug 2026", credentialId: "JLX1DNW66Z72", skills: [] },
  { name: "Belajar Dasar Structured Query Language (SQL)", issuer: "Dicoding Indonesia", issueDate: "Aug 2023", expiry: "Expires Aug 2026", credentialId: "98XWG3KVWPM3", skills: [] },
  { name: "Pemrograman HTML5", issuer: "Udemy", issueDate: "Jul 2023", skills: ["JavaScript", "HTML5"] },
  { name: "Belajar Dasar Pemrograman Web", issuer: "Dicoding Indonesia", issueDate: "Jul 2023", expiry: "Expired Jul 2026", credentialId: "0LZ09N9QRZ65", skills: ["Cascading Style Sheets (CSS)", "JavaScript"] },
  { name: "Introduction to Front-End", issuer: "MySkill", issueDate: "Mar 2023", skills: ["Cascading Style Sheets (CSS)", "JavaScript"] },
  { name: "Javascript (Basic)", issuer: "HackerRank", issueDate: "Feb 2023", skills: ["Debugging", "Problem Solving"] },
  { name: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)", issuer: "Dicoding Indonesia", issueDate: "Feb 2023", expiry: "Expired Feb 2026", credentialId: "L4PQ697E4PO1", skills: ["Debugging", "Problem Solving"] },
  { name: "Belajar Membuat Aplikasi Back-End untuk Pemula", issuer: "Dicoding Indonesia", issueDate: "Jan 2023", expiry: "Expired Jan 2026", credentialId: "EYX49KEGWPDL", skills: ["Debugging", "Back-End Web Development"] },
  { name: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding Indonesia", issueDate: "Jan 2023", expiry: "Expired Jan 2026", credentialId: "1RXYOE97QPVM", skills: ["Debugging", "Problem Solving"] },
  { name: "IoT Fundamentals: Big Data & Analytics", issuer: "Cisco Networking Academy", issueDate: "Jan 2023", skills: ["Debugging", "Problem Solving"] },
  { name: "IoT Fundamentals: IoT Security", issuer: "Cisco Networking Academy", issueDate: "Jan 2023", skills: ["Debugging", "Problem Solving"] },
  { name: "IoT Fundamentals: Connecting Things", issuer: "Cisco Networking Academy", issueDate: "Jan 2023", skills: ["Debugging", "Internet of Things (IoT)"] },
]

async function main() {
  for (let i = 0; i < certifications.length; i++) {
    const c = certifications[i]
    const existing = await prisma.certification.findFirst({ where: { name: c.name, issuer: c.issuer } })
    const data = { ...c, order: i + 1 }
    if (existing) {
      await prisma.certification.update({ where: { id: existing.id }, data })
    } else {
      await prisma.certification.create({ data })
    }
  }
  console.log(`✓ Seeded ${certifications.length} certifications`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
