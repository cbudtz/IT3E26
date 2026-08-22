# E26 Update Plan — 62580 Digitale Systemer & Anvendelse

Working plan for transforming the E22 material (62581 IT og kommunikation)
into the E26 course (62580 Digitale Systemer & Anvendelse).

Sources: [background docs](background/README.md) — official 62580/62581
course descriptions, E22 lesson plan, E22 Drive materials.

---

## Base truth

### Original course material (E22, 62581)

- Two parallel weekly tracks: **Web** (Wed E5B) and **Netværk** (Fri E4B), 26
  lessons + 3 project milestones, 13 weeks, 10 ECTS.
- **Web track**: HTML/CSS/client-side JavaScript; Java backend (HttpServlets
  on Apache Tomcat); socket programming; REST APIs; application state,
  serialization, data protocols; Postman; Linux/Bash server administration;
  access control (authentication/authorization); IT attacks; fullstack
  walkthrough.
- **Netværk track** (Kurose & Ross, _Computer Networking — A Top-Down
  Approach_): Internet intro (delays, loss, protocols, attacks), application
  layer, transport layer (×3 lessons), network layer — data plane (×2) and
  control plane, link layer (×2), wireless networks, security/cryptography,
  e-mail encryption, SSL/TLS, guest lecture from K-net.
- **Method content**: milestone/Gantt planning, sequence diagrams, state
  diagrams, robustness diagrams, protocol meetings, project management intro.
- **Project**: a _journalsystem_ (EHR-style system) built in groups over
  three milestone deliverables:
  1. pre-study + prototype/mockup,
  2. minimal working system,
  3. system with minimal security.
- Deliverables: forelæsning slides + øvelser docs per lesson (in Google Drive).
- Exam: individual oral exam based on the project, 7-step scale, external
  censor; approval of project work required to attend.

### Changes in the course description (62581 → 62580)

- **New identity**: "IT og kommunikation" → "Digitale Systemer & Anvendelse"
  (Digital Systems and Applications); course responsible changes from Henrik
  Tange to Rolf Nordahl (Lars Sommer & Birger Andersen continue).
- **Shift from protocol-stack depth to applied systems understanding**:
  - Kept, but at overview level: client-server architecture, Internet, DNS,
    central protocols, basic networking, security topics.
  - Dropped as dedicated multi-lesson tracks: transport/network/link layers,
    routing/NAT, cryptography, wireless networks.
  - New topics: development from idea to implemented system (need, concept,
    design, implementation); **user-centered design** (needs analysis,
    personas, scenarios, usability, accessibility); **data management and
    databases**; **privacy** alongside security; **deployment** of simple
    digital systems; systems analysis & description; digital tools/platforms.
- **Project reformulated**: digital artifact (e.g. web-based system or
  application) **plus a project portfolio**; group work allowed but each
  student must own a clearly delimited part incl. implementation; exercises
  explicitly support project development.
- **Exam form tightened**: portfolio + website must be approved by the course
  responsible _before_ the exam (new hard prerequisite); aids: all aids incl.
  internet, student brings portfolio + the developed website.
- Still: 10 ECTS, Danish, 3rd semester Health Technology BEng, Ballerup,
  E5B + E4B, 13 weeks, individual oral exam, 7-step scale, external censor,
  builds on 62420 + 62450.
- New learning goals emphasize: correct terminology, explaining system
  components and their interplay (UI, backend, databases), UML at overview
  level, planning/coordinating development work, relating concepts to a
  concrete digital solution, professional discussion.

### Changes in students' proficiencies (incoming 3rd semester)

- Prerequisites verified from the course database — see
  [course-prerequisites-62420-62450.md](background/course-prerequisites-62420-62450.md).
  Both are now taught in English (Daniel Zielasko course responsible):
  - **62420 IT1** (1st sem): programming fundamentals (types, control flow,
    classes/objects, lists, files, serial-port sensors), Unified Process,
    UML class/activity/sequence diagrams, hardware, digital representation.
  - **62450 IT2** (2nd sem): OOP (encapsulation/inheritance/polymorphism,
    exceptions), **relational DBs + SQL CRUD/joins + DB integration**,
    **threads & synchronization**, **event-driven GUIs with UI/app-logic
    separation**, **UCD process + evaluation methods, usability/UX**.
- **Java is out**: students have encountered some Python and C#, but no
  single backend language appears to be a strong shared foundation. Since
  JavaScript is already required for the frontend, E26 will use JavaScript on
  the backend as well.
- Consequence: 62580's "new" topics (UCD, databases, UML) are **web-context
  reinforcement**, not first exposure. Genuinely new web-track material:
  HTML/CSS/JS, HTTP/client-server, JSON, web auth, deployment.
- Students are now accustomed to using AI assistants (ChatGPT, Copilot) for
  writing, coding and explaining since ~upper secondary school; expect
  instant answers and need explicit training in _verification, prompting and
  academic integrity_ rather than introductions to the tools themselves.
- Expectations shaped by polished consumer apps: higher demands on UI/UX
  quality, less tolerance for crude interfaces; good entry point for
  usability/accessibility teaching.
- Git/GitHub familiarity is broader than in 2022 (used in gymnasium
  projects and prior DTU courses) — but working knowledge is often shallow
  (commit/push only).
- Programming foundation from 62420/62450 (OOP, event-driven GUIs, threads);
  E22 experience showed Java/Tomcat setup cost was high — choose a
  stack that minimizes environment friction.
- Health Technology students: strong motivation when examples are clinical
  (journalsystem, patient data) — keep health-tech framing.

### Changes in ecosystem (AI, tech) since E22

- **AI assistants are mainstream**: ChatGPT launched Nov 2022 (right after
  E22); Copilot/agents now standard in professional development. Course must
  define an explicit AI policy (allowed with disclosure? portfolio must
  document own understanding given oral exam).
- **Web stack moved on**: Java/Tomcat + JSP-style servlets are no longer the
  common teaching default; typical modern stacks: JavaScript/TypeScript
  fullstack (Node/Express or Next.js), Python (FastAPI/Flask), lightweight
  hosting.
- **Deployment is trivially cheap**: Vercel/Netlify/Render/GitHub Pages give
  free HTTPS hosting with git push — deployment is now a 1-lesson topic, not
  a server-administration track (Linux/Bash lesson can be condensed).
- **Databases-as-a-service & serverless SQLite/Turso/Supabase** make real
  backends with persistence accessible without DBA skills — matches the new
  "datahåndtering og databaser" course goal.
- **HTTPS/SSL everywhere** (Let's Encrypt, HSTS default) — TLS is now
  background knowledge rather than a dedicated lesson.
- **Accessibility is regulated**: EU Web Accessibility Directive and (from 2025) the European Accessibility Act apply to digital services —
  strengthens the new accessibility learning goal; WCAG as natural reference.
- **Privacy/GDPR maturity**: health data processing (Danish context:
  Sundhedsdatastyrelsen, FHIR as health-data exchange standard) gives
  concrete, portfolio-worthy material for the privacy goal.
- **Version control & collaboration**: GitHub (PRs, Actions, Issues) is the
  de facto standard — natural vehicle for the new "project structure and
  planning" goal.
- Kurose & Ross remains the networking reference if overview networking
  lessons need a reading anchor — but only a few chapters are relevant now.

---

## Planned upgrades

> **Scope**: Christian teaches the **web track only** (~13 lessons, Wed E5B).
> Network-track content, the overall 26-lesson structure and exam logistics
> are shared with co-teachers (Rolf Nordahl, Lars Sommer, Birger Andersen) —
> decisions marked ⤴ need their buy-in.

### Decision log

Legend: ⤴ = needs co-teacher/course-responsible alignment · 🔒 = blocks other
decisions (lock first).

| # | Decision | Options | Notes | Status |
|---|---|---|---|---|
| D1 🔒 | Backend language & runtime | JavaScript on Node.js | Decided to use one language across frontend and backend. Framework: see D15. | decided |
| D2 | Frontend approach | Vanilla JS · optional small helpers or Svelte/SvelteKit later | **Vanilla HTML/CSS/JavaScript is the standard.** Any alternative must remain optional and preserve the same learning goals and deliverables. | decided |
| D3 | TypeScript vs JavaScript | JavaScript | Vanilla JavaScript is the standard. TypeScript is not part of the initial plan; reconsider only if the teaching team later sees a concrete need. | decided |
| D4 | Database | PostgreSQL | Students already know SQL CRUD + joins (62450). Focus on dataflow through the web application rather than re-teaching relational basics. | decided |
| D5 🔒 | Deployment target | Vercel or similar managed hosting | Exact platform is parked until the meeting. It must support the chosen backend and PostgreSQL with low setup friction. | parked |
| D6 | Dev environment | Local VS Code | VS Code is the standard development environment for the course. Setup documentation and a shared starter repository should minimize environment friction. | decided |
| D7 | Auth for milestone 3 | Authentication only | D3 requires login/authentication, but **not authorization** or role-based access. Implementation approach remains open. | decided |
| D8 | Project data & GDPR | Synthetic data · real-ish data under GDPR · non-health case | Hosting patient-like data on free tiers = GDPR exposure; synthetic data is the safe default. With D10 (optional health-tech cases, no EHR) all cases run on synthetic data. | open |
| D9 | Prereq language inventory | Document the Python/C# experience from 62420/62450 | Useful for calibrating the starting point, but no longer a gate for the backend decision. | informational |
| D10 ⤴ | Project case | Keep journalsystem · new health-tech case · **menu of optional cases** | **EHR/journalsystem dropped as the common project.** Groups choose among smaller, well-delimited health-tech cases (examples): medication tracker, appointment system, blood-pressure diary, headache diary, patient questionnaire, lab-result viewer. Each must fit the D1→D3 arc (one central user action at D2). Needs co-teacher confirmation. | direction decided |
| D11 ⤴ 🔒 | Portfolio format | Markdown-in-repo published as GitHub Pages site · PDF report · DTU Learn | Exam prerequisite "portfolio + website approved" means this shapes every milestone — lock earliest of all. Doubles as documentation exercise. | open |
| D12 ⤴ | AI assistant policy (web track) | Banned · allowed with disclosure · encouraged + portfolio reflection | Oral exam is the individual-understanding backstop: pair policy with code-walkthrough style questions. Also: Copilot access in labs/web IDE (D6)? | open |
| D13 ⤴ | Exam & grading split | Which learning goals, exam questions and milestone approvals the web teacher owns | Needed to scope material depth; coordinate with network-track teacher. | open |
| D14 | Material distribution | This repo · DTU Learn · both (repo source of truth, Learn for announcements) | Replaces Google Drive; see Tooling section. | open |
| D15 | Backend framework | Express · Hono · plain `http` | **Express.** Largest body of learning material and the most reliable output from AI assistants, which students will use. Teach "JavaScript can run on the server, receive HTTP requests and talk to a database" — not Node internals (V8, event loop). | decided |
| D16 | Teacher-provided patient API | Teacher-hosted Express API with synthetic patients · local JSON files | **Teacher-hosted API** used from L7 onward for `fetch()` before students have their own backend. Must send `Access-Control-Allow-Origin: *` (the `cors` middleware) since students call it from `file://`/localhost; CORS is covered as an aside in L7 when they hit it. Endpoints mirror what students build themselves in L15 (`GET/POST/PUT/DELETE /api/patients[/:id]`). | decided |

### Decisions from current planning

- Keep the 26-lesson structure: **13 Web lessons and 13 Net lessons**.
- Leave the Net track unchanged for now; this plan focuses on the 13 Web
  lessons.
- Keep L1 as a pure HTML introduction.
- Make L2's method focus a **Project Scope Statement**: problem, target
  users, goal, boundaries, stakeholders and the first prototype question.
- Introduce project planning in L2 and develop it into a concrete work
  breakdown, milestones and responsibility plan in L4.
- Use L2, L4, L6, L8 and L12 as the **project-lecture sequence**: scope,
  project planning, user experience, prototyping, and monitoring/status.
- Reserve L10, L18 and L25 for supervised **project work** leading to D1, D2
  and D3.
- Keep Net lectures on L14, L16, L20 and L22; L24 is currently empty and L26
  remains the Net wrap-up.
- Assume students know UML from 62420/62450. Do not spend dedicated Web
  lessons reteaching UML diagrams; use them only when needed by the project.
- **D1:** clickable frontend mockup with JavaScript, no backend.
- **D2:** MVP with frontend, backend/API, PostgreSQL and one central user
  action.
- **D3:** functioning system with additional user flows, authentication,
  deployment and completed portfolio. Authorization is not required.
- **L7 fetch target:** the teacher-provided patient API (D16); CORS is
  handled as an aside there, not as a dedicated topic.
- **Sessions stay in L13** (application state), not moved to L21 auth.
- **Repository layer is taught explicitly in L17** (`Express → repository →
  PostgreSQL`) — makes "lagdelte applikationer" (L11, course goal) concrete
  and connects to 62450's UI/app-logic separation.
- **Git collaboration** (branches, pull requests, merge conflicts) is not a
  scheduled lesson. Level is gauged in L1 (survey); **if weak, introduce it
  in L3.**

### E22 traceability for the lesson plan

Which E22 (62581) material each lesson in the [README lesson plan](../README.md)
builds on, and what was removed. Kept here so the student-facing README stays
free of old-course references.

| Lektion | E22-grundlag |
|---|---|
| 1 | L1 |
| 2 | nyt + F25 scope |
| 3 | L3 (omarbejdet) |
| 4 | F25 projektplan |
| 5 | L9 |
| 6 | nyt (bygger på 62450) |
| 7 | L13 (omarbejdet) |
| 8 | F25 prototype-materiale |
| 9 | L7 (omarbejdet) |
| 10 | F25 aflevering 1 |
| D1 | D1 |
| 11 | L9 |
| 12 | F25 statusrapporter |
| 13 | L11 (omarbejdet) |
| 14 | L2 (forkortet) |
| 15 | nyt |
| 16 | L6 + L18 |
| 17 | nyt |
| 18 | projektarbejde |
| D2 | D2 |
| 19 | L5 + L23 (omarbejdet) |
| 20 | L20 + L22 |
| 21 | L19 |
| 22 | L4 + L20 (omarbejdet) |
| 23 | L25 |
| 24 | — |
| 25 | projektarbejde |
| 26 | L26 |
| D3 | D3 |

**Fjernet ift. E22** (ikke i den nye kursusbeskrivelse):

- **Forsinkelser og tab** samt transport-/netværkslagsdybde (gammelt
  Kurose-spor)
- **Kryptering som selvstændig lektion** — HTTPS indgår nu i L20 som en del af
  protokol-overblikket
- **Netværkssikkerhed som separat lektion** — samlet i L22 (sikkerhed og
  privatliv)
- **Pakkeanalyse/netværksanalyse-værktøjer** (Wireshark, ping/traceroute) —
  var et 62581-læringsmål, ikke 62580
- **Protokol-møde** og serialiserings-begrebet — var knyttet til det gamle
  datamarshalling-mål
- **Linux/Bash og serveradministration** — allerede fjernet; deployment er
  nu hosting-orienteret (L19)

_(working section — to be refined)_

### Structure

- [ ] Map new course goals → 26-lesson skeleton (which lessons keep E22 web
      track material, which are new, which networking lessons get condensed
      into overview modules).
- [ ] Decide lesson rhythm: keep two-track Wed/Fri split or move to
      integrated "systems + lab" format matching the project phases.
- [ ] Design the project: write up the menu of optional health-tech cases
      (D10) with per-case D1/D2/D3 expectations; define the portfolio format
      and per-student delimitation.
- [ ] Milestone plan aligned to new exam prerequisite (portfolio + website
      approved before exam).

### Content tracks to build

- [ ] **Idea → system**: needs analysis, concept, design, implementation —
      new lesson material (little E22 reuse).
- [ ] **User-centered design**: personas, scenarios, usability testing,
      accessibility (WCAG) — new material, concrete health-tech cases.
- [ ] **Databases & data management**: relational basics, SQL/ORM, dataflow
      in a web app — new material replacing serialization/protocol lessons.
- [ ] **Networking condensed**: Internet/DNS/HTTP overview + client-server
      communication (2–4 lessons from the old 12+ network lessons).
- [ ] **Security & privacy**: authentication/authorization (reuse E22 L19),
      threat-model intro, GDPR/health-data specifics.
- [ ] **Deployment**: hosting, domains, CI basics (condensed from E22 L5
      Linux/Bash + new material).
- [ ] **Modelling**: keep sequence/state diagrams (E22), drop protocol-stack
      abstraction depth; add overview UML for system description.
- [ ] **Project work**: planning, task split, coordination — modernize Gantt
      material with GitHub Projects/Issues.

### Tooling & platform decisions

- [ ] Execute D1–D6 from the decision log (stack, DB, hosting, environment).
- [ ] Replace Google Drive distribution with this Git repo (or DTU Learn)
      as single source of truth for slides/exercises.
- [ ] Per-group Git repositories with template/starter repos for project
      milestones.

### Course policies

- [ ] AI usage policy: what is allowed, how disclosed, how the oral exam
      verifies individual understanding (portfolio reflection? code
      walkthrough?).
- [ ] Assessment rubric for portfolio approval (prerequisite check) and oral
      exam questions mapped to the 12 learning goals.

### Open questions

- [ ] **Validation & error handling need a home** — server-side validation of
      request bodies and consistent error responses appear only implicitly in
      L17; likely L15 (REST APIs), as the bridge to security in L21.
- [ ] Git collaboration: depends on the L1 survey — if needed, it goes into L3
      (which then has to make room next to HTML II/CSS).
- [ ] Document the actual Python/C# level from 62420/62450 (D9) so the
      JavaScript/Node.js introduction is calibrated correctly.
- [ ] Are E22 slides/exercise docs reusable under a format migration (Drive
      → repo), and do co-teachers (lasom, birad) have the source files?
- [ ] Danish vs. English material language (62580 is taught in Danish, but
      prerequisites are now taught in English).
- [ ] Budget for tools (free tiers sufficient? database/hosting for ~20
      groups).
