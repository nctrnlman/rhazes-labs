import { config } from "dotenv"
config({ path: ".env" })
config({ path: ".env.local", override: true })

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function readingTimeFrom(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const posts = [
  {
    slug: "from-bootcamp-to-founder",
    title: "From Bootcamp to Founder: Lessons from Building Codenito ID",
    tags: ["Career", "Founder", "Codenito"],
    content: `
<p>I didn't start out planning to found a studio. Like a lot of engineers, I started by learning to build things — a full stack bootcamp at Purwadhika, a Bachelor's in Information Communication Technology at Asia e University, and a lot of late nights turning tutorials into actual working software.</p>
<h2>Why I started Codenito</h2>
<p>In 2022 I founded Codenito ID as a remote-first software studio. The honest reason wasn't some grand vision — it was that I kept getting asked to build things for people outside my day job, and I wanted to do it properly: with a team, a process, and accountability, instead of one-off freelance gigs.</p>
<p>Since then we've grown to an 8-person cross-functional team and delivered 15+ production-grade systems across e-commerce, healthcare, logistics, and FMCG, with a 100% on-time delivery record. None of that happened by accident — it happened because we treated every engagement like a real product team would, not like a freelancer trying to close the next invoice.</p>
<h2>What running a studio actually taught me</h2>
<ul>
<li><strong>Architecture decisions outlive the project.</strong> Client work has a way of exposing bad shortcuts fast — there's no time to hide behind "we'll refactor it later."</li>
<li><strong>Remote-first only works with real communication discipline.</strong> Async updates, clear ownership, and written decisions matter more than any tool you use.</li>
<li><strong>Being both the engineer and the founder changes how you write code.</strong> You start thinking about maintainability and handoff, not just "does it work."</li>
</ul>
<p>I still write code every day — at Codenito and in my full-time engineering work. Founding a studio didn't pull me away from engineering; it forced me to get better at it.</p>
`,
  },
  {
    slug: "why-nestjs-for-production-apis",
    title: "Why I Reach for NestJS When an API Needs to Last",
    tags: ["NestJS", "Backend", "Architecture"],
    content: `
<p>I've shipped production APIs in plain Express, NestJS, Spring Boot, and Laravel. Each has its place, but when a project is going to be maintained by a team for years — not just launched and forgotten — NestJS is usually my default for Node.js backends.</p>
<h2>It's not about features, it's about structure</h2>
<p>Express gives you total freedom, which is exactly the problem on a team project. Without enforced structure, every developer ends up organizing routes, validation, and business logic differently. Six months in, the codebase becomes a set of local dialects instead of one language.</p>
<p>NestJS borrows from Angular's module/dependency-injection model, and while some engineers find that ceremony annoying for a small script, it pays off the moment more than one person touches the codebase. Modules, providers, and controllers give every new hire a map they can follow on day one.</p>
<h2>Where it actually helps in practice</h2>
<ul>
<li><strong>Dependency injection</strong> makes services trivially testable — you're not fighting to mock a module-level import.</li>
<li><strong>Guards and interceptors</strong> keep cross-cutting concerns (auth, logging, rate limiting) out of your business logic.</li>
<li><strong>Built-in validation pipes</strong> mean malformed requests get rejected before they touch a controller, not three layers deep in a service.</li>
</ul>
<h2>When I don't use it</h2>
<p>For a small internal tool, a single serverless function, or a quick prototype, NestJS is overkill — the ceremony costs more than it saves. I still reach for lighter frameworks there. The decision isn't "NestJS is better," it's "how long does this codebase need to survive, and how many people will touch it."</p>
`,
  },
  {
    slug: "migrating-legacy-php-to-laravel-without-downtime",
    title: "Migrating a Legacy PHP System to Laravel Without Downtime",
    tags: ["Laravel", "Migration", "Legacy Systems"],
    content: `
<p>One of my earliest real-world lessons in engineering discipline came from migrating an enterprise internal portal from raw PHP to Laravel — while it was actively being used by staff every day. There was no maintenance window to hide behind.</p>
<h2>The rule that made it possible: strangle, don't rewrite</h2>
<p>The instinct with legacy code is to rewrite it in one clean sweep. That's also how migrations turn into six-month death marches that never ship. Instead, I moved feature by feature, routing new Laravel endpoints alongside the old PHP ones behind the same reverse proxy, and cutting traffic over incrementally as each piece was verified.</p>
<h2>What actually mattered</h2>
<ul>
<li><strong>Data compatibility first.</strong> Before touching a single route, I made sure Laravel's Eloquent models could read the existing schema without a destructive migration.</li>
<li><strong>Feature parity checklists, not vibes.</strong> Every legacy page got a written checklist of exact behavior — including the weird edge cases nobody documented — before its replacement was considered done.</li>
<li><strong>Rollback had to be a switch, not a project.</strong> If the new route misbehaved, flipping back to the old PHP handler had to take seconds, not a deploy.</li>
</ul>
<p>The result was a company profile and career portal that went on to attract 500+ applicants within three months of the full cutover — with zero downtime incidents along the way. The lesson generalizes well beyond PHP and Laravel: legacy migrations are a change-management problem wearing an engineering costume.</p>
`,
  },
  {
    slug: "serving-7000-users-20-countries-competition-platform",
    title: "Serving 7,000+ Users Across 20+ Countries: Architecting a High-Traffic Competition Platform",
    tags: ["Scalability", "Next.js", "DevOps"],
    content: `
<p>As Architect and Lead Backend on the Dulux Design Competition 2025 platform for Dulux Indonesia, I had a very concrete constraint: this wasn't an internal tool where a bad week means a Slack apology. It was a public competition site — judging system, admin dashboard, and analytics — that needed to hold up under real, unpredictable traffic from entrants across 20+ countries.</p>
<h2>The numbers that shaped the architecture</h2>
<p>The platform ended up serving 7K+ users and sustaining 2K+ concurrent users with zero downtime. None of that happened by accident — it came from designing for the traffic pattern we actually expected: long quiet stretches punctuated by sharp spikes around submission deadlines and judging announcements.</p>
<h2>What actually made it hold up</h2>
<ul>
<li><strong>Static-first where possible.</strong> Built on Next.js, we pushed as much of the public-facing site to static/ISR rendering as the judging system allowed, so spikes hit a CDN, not a database.</li>
<li><strong>Object storage for anything heavy.</strong> Entry assets went straight to AWS S3, never through the application server — a detail that matters enormously once thousands of people are uploading at once.</li>
<li><strong>Nginx in front, doing real work.</strong> Rate limiting and connection handling at the reverse-proxy layer meant the Node.js backend never had to defend itself from traffic spikes directly.</li>
<li><strong>Observability from day one, not bolted on after.</strong> We ran Grafana dashboards against the MySQL and application metrics from the start, so a "the site feels slow" report could be diagnosed in minutes, not hours.</li>
</ul>
<h2>The lesson that generalizes</h2>
<p>Zero downtime under a real traffic spike isn't a single clever trick — it's the compounding effect of pushing load off the parts of the system that can't easily scale (a single app server, a single database) and onto the parts that were built to (a CDN, object storage, a reverse proxy). Design for where the load will actually land, not just where it enters.</p>
`,
  },
  {
    slug: "first-six-months-learning-llms-and-rag",
    title: "My First 6 Months Learning LLMs and RAG Pipelines",
    tags: ["AI/ML", "LLMs", "RAG", "Learning"],
    content: `
<p>After years of full stack and backend engineering, I made a deliberate decision to go deep on AI/ML — specifically LLMs, NLP, and retrieval-augmented generation. Here's an honest account of what the first six months actually looked like, not the highlight reel.</p>
<h2>Week 1-4: unlearning "just call the API"</h2>
<p>It's easy to treat an LLM as a black box you send a prompt to. That's fine for a demo, useless for production. The first real shift was learning to think about context windows, token budgets, and failure modes — what happens when the model hallucinates, and how you design systems that catch that instead of trusting the output blindly.</p>
<h2>Building my first real RAG pipeline</h2>
<p>The gap between "I understand embeddings conceptually" and "I have a RAG pipeline that returns relevant, accurate context" is bigger than it looks. The things that actually moved the needle for retrieval quality:</p>
<ul>
<li><strong>Chunking strategy matters more than model choice.</strong> Bad chunking sends the model contradictory or fragmented context no matter how good the embeddings are.</li>
<li><strong>Hybrid search (keyword + vector) consistently beat pure vector search</strong> for domain-specific technical content.</li>
<li><strong>Evaluation has to be systematic.</strong> Eyeballing a few outputs feels productive and tells you almost nothing about real quality.</li>
</ul>
<h2>What surprised me most</h2>
<p>As a full stack engineer, I expected the hard part to be the ML. It wasn't — the hard part was the same thing it always is: designing a system that fails gracefully, is observable, and doesn't quietly degrade in ways nobody notices until a user complains. AI/ML engineering is still engineering.</p>
`,
  },
  {
    slug: "multi-tenant-saas-architecture-nextjs-prisma",
    title: "Building a Multi-Tenant SaaS Architecture with Next.js and Prisma",
    tags: ["Next.js", "Prisma", "SaaS", "Architecture"],
    content: `
<p>Multi-tenancy is one of those problems that looks simple in a whiteboard sketch and gets genuinely hard the moment real data, real billing, and real security boundaries enter the picture. Here's how I think about it when architecting a SaaS product on Next.js and Prisma.</p>
<h2>Pick your isolation model deliberately</h2>
<p>There are three common approaches: separate databases per tenant, separate schemas per tenant, or a shared schema with a <code>tenantId</code> column on every table. Most teams reach for shared-schema by default because it's the least work upfront — and that's usually the right call until you have a specific reason (compliance, noisy-neighbor performance, enterprise contract requirements) to pay for stronger isolation.</p>
<h2>Making shared-schema safe by default</h2>
<ul>
<li><strong>Never trust the client for tenant scoping.</strong> Every query should derive <code>tenantId</code> from the authenticated session, never from a request parameter.</li>
<li><strong>Wrap Prisma with a scoped client</strong> or middleware that injects the tenant filter automatically, so a forgotten <code>where</code> clause can't leak data across tenants.</li>
<li><strong>Test tenant isolation like a security boundary</strong>, not a feature — because that's exactly what it is.</li>
</ul>
<h2>Where Next.js fits in</h2>
<p>App Router's server components make it natural to resolve the current tenant once (from a subdomain, custom domain, or session) at the layout level, and pass it down instead of re-deriving it in every route. Combined with middleware for subdomain routing, this keeps tenant resolution in one place instead of scattered across the app.</p>
`,
  },
  {
    slug: "solution-architecture-101-startups",
    title: "Solution Architecture 101: How I Approach System Design for Startups",
    tags: ["Solution Architecture", "Startups", "System Design"],
    content: `
<p>Startups don't need enterprise architecture — they need architecture that won't collapse the moment they get traction, without wasting months building for a scale they may never reach. Here's the framework I actually use when advising early-stage teams.</p>
<h2>Start with the constraint that's actually true</h2>
<p>Most startups aren't constrained by "will this scale to a million users." They're constrained by runway and speed to learn if anyone wants the product at all. Good early architecture optimizes for change, not scale — because the biggest risk isn't traffic, it's building the wrong thing efficiently.</p>
<h2>The questions I ask before drawing any diagram</h2>
<ul>
<li>What's the one thing this system absolutely cannot get wrong (data loss, payment accuracy, security)? Everything else can be simple.</li>
<li>What's the realistic team size in 12 months? Architecture for a 2-person team and a 20-person team look very different.</li>
<li>Which parts are genuinely core IP, and which are commodity? Commodity problems (auth, payments, email) should almost never be built in-house early on.</li>
</ul>
<h2>A bias toward boring technology</h2>
<p>Novel technology is a tax you pay in hiring difficulty, debugging time, and community support — a tax early-stage startups usually can't afford. I default to boring, well-understood tools (PostgreSQL, a mainstream framework, managed infrastructure) and save the innovation budget for the actual product, not the plumbing.</p>
`,
  },
  {
    slug: "docker-kubernetes-for-small-teams",
    title: "Docker and Kubernetes for Small Teams: What Actually Matters",
    tags: ["Docker", "Kubernetes", "DevOps"],
    content: `
<p>Kubernetes has a reputation problem: teams adopt it because it's what "serious" companies use, then spend more time managing the cluster than building the product. Here's what I've found actually matters for small teams considering it.</p>
<h2>Docker first, always</h2>
<p>Containerizing your application with Docker is close to a free win regardless of team size — consistent environments across dev/staging/production, reproducible builds, and a clean deployment artifact. There's rarely a good reason to skip this step, even for a two-person team.</p>
<h2>Kubernetes is a different decision</h2>
<p>Kubernetes solves problems most small teams don't have yet: multi-region failover, complex autoscaling policies, and orchestrating dozens of interdependent services. If you're running a handful of services, a simpler platform (a managed container service, or even a well-configured Docker Compose setup on a couple of VMs) will get you to production faster with far less operational overhead.</p>
<h2>Signs you actually need it</h2>
<ul>
<li>You're running enough distinct services that manual orchestration has become genuinely error-prone.</li>
<li>You need workload-level autoscaling that simpler platforms can't express.</li>
<li>You already have — or are about to hire — someone whose job includes owning cluster operations.</li>
</ul>
<p>If none of those are true yet, the honest answer is: adopt Docker, defer Kubernetes, and revisit the decision when the constraint becomes real instead of anticipated.</p>
<p>The maritime ERP system I architected for Armada Hasil Sagara is a case where Kubernetes earned its place — 10+ interdependent modules (dashboard, sales, inventory, contracts, accounting, voyage tracking) built as NestJS microservices, where independent scaling and deployment of each module was a real, present requirement, not a hypothetical one.</p>
`,
  },
  {
    slug: "running-a-remote-first-studio-in-indonesia",
    title: "Running a Remote-First Software Studio in Indonesia: What I've Learned",
    tags: ["Remote Work", "Codenito", "Team Building"],
    content: `
<p>Codenito ID has been remote-first since day one. Running a distributed team out of Indonesia — where the tech talent pool spans wildly different infrastructure, timezones-adjacent-but-not-identical schedules, and varying levels of remote-work experience — taught me things no playbook written for Silicon Valley teams quite covers.</p>
<h2>Async-first isn't a tool, it's a habit</h2>
<p>Slack and Notion don't make a team async-first. What does: writing decisions down by default, not calling a meeting when a message would do, and treating "I'll just ask them real quick" as the expensive option, not the cheap one. It took real discipline to build that habit across an 8-person team.</p>
<h2>Client trust has to be earned differently</h2>
<p>Remote-first studios face a specific skepticism: clients want to know the work is actually happening, not just promised. What worked for us:</p>
<ul>
<li><strong>Visible progress over status meetings.</strong> A staging environment that updates daily builds more trust than any status call.</li>
<li><strong>Over-communicating blockers early</strong>, before they threaten a deadline — silence reads as risk to a client, even when nothing's actually wrong.</li>
</ul>
<h2>The result</h2>
<p>Three years in, that discipline is a big part of how we've kept a 100% on-time delivery record across 15+ projects with 10+ clients, and grown revenue 3x in 2025. None of it came from working more hours — it came from being predictable.</p>
`,
  },
  {
    slug: "postgresql-vs-mongodb-choosing-the-right-database",
    title: "PostgreSQL vs MongoDB: Choosing the Right Database for Your Next Project",
    tags: ["PostgreSQL", "MongoDB", "Databases"],
    content: `
<p>I've shipped production systems on both PostgreSQL and MongoDB, sometimes in the same project. The "SQL vs NoSQL" framing is mostly unhelpful — the real question is what your data actually looks like and how it changes over time.</p>
<h2>Default to PostgreSQL</h2>
<p>For most applications — especially anything involving relationships between entities, financial data, or reporting — PostgreSQL is my default. Modern Postgres handles JSON columns well enough that you get a lot of the schema flexibility people reach for MongoDB for, without giving up transactional guarantees and joins when you need them.</p>
<h2>Where MongoDB genuinely earns its place</h2>
<ul>
<li><strong>Deeply nested, document-shaped data</strong> that rarely needs to be queried by its internal structure — think activity logs or flexible content models.</li>
<li><strong>Write-heavy workloads with a schema that's still evolving fast</strong>, where migrations on a relational schema would slow the team down every sprint.</li>
<li><strong>Horizontal write scaling</strong> is a first-class concern from day one, not a someday problem.</li>
</ul>
<h2>The mistake I see most often</h2>
<p>Teams pick MongoDB early because "it's flexible," then spend a year re-implementing relational integrity in application code — manually checking foreign keys exist, manually keeping duplicated data in sync. If your data is fundamentally relational, a document database doesn't remove that complexity, it just moves it from the database into your codebase, where it's harder to enforce and easier to get wrong.</p>
`,
  },
]

async function main() {
  for (const post of posts) {
    const html = post.content.trim()
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        content: html,
        tags: post.tags,
        status: "draft",
        readingTime: readingTimeFrom(html),
      },
    })
    console.log(`✓ ${post.title}`)
  }
  console.log(`\n✅ ${posts.length} draft posts created/verified.`)
}

main().finally(() => prisma.$disconnect())
