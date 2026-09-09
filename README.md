# Bongkarn Jongmee — Front-End Developer (Web & Mobile) · QA Tester

🔗 **[View the full resume →](https://bpluem.github.io/bpluem-resume/)**  ·  Available in English and ไทย

Front-end mobile developer with 3+ years of professional experience building production
Flutter applications for enterprise, e-commerce, and government clients. Owns features
end to end — UI and shared design systems, REST API integration, authentication and token
refresh, role-based access control, localization, and testing on physical devices.

Also serves as a QA tester for the team, writing test plans and test cases and tracking
defects across the SDLC. Currently extending into backend work on a multi-tenant
construction-management platform (Go, PostgreSQL), owning requirements, schema and API
design, review, and verification with an AI-assisted development workflow.

📍 Nonthaburi, Thailand · ✉️ [mister.bongkarn@gmail.com](mailto:mister.bongkarn@gmail.com)

---

## Skills

**Core** — used in production daily
`Dart` `Flutter` `Flutter Web` `GetX` `Dio` `REST API integration` `JWT & token refresh`
`Auth & RBAC` `Design systems` `Responsive UI` `Localization (i18n)` `Widget & unit testing`
`Manual QA / test plans` `Git / GitHub` `Figma hand-off`

**Working** — shipped real work with
`Go (chi, pgx, sqlc)` `PostgreSQL` `MySQL` `TypeScript` `React` `HTML / CSS` `Tailwind`
`Docker` `Keycloak` `Insomnia / Postman` `GitHub Actions` `Database migrations`
`API contract design` `Swagger / OpenAPI`

**Familiar** — can work with, still growing
`Python` `Next.js` `Security review basics` `Android tooling (adb)` `Clean Architecture` `Idempotency`

---

## Experience

| Role | Company | Period |
|---|---|---|
| Front-End Developer (Web & Mobile) | Techwave International Co., Ltd. | May 2023 – Present |
| QA Tester *(concurrent role)* | Techwave International Co., Ltd. | Apr 2024 – Present |
| Full Stack Web Developer *(internship)* | Khunying Long Athakravisunthorn Learning Resources Center | Apr – Jun 2021 |

---

## Selected Projects

### ConstructQ — Construction Quality Management Platform · 2026 – Present
Multi-tenant B2B platform for construction quality inspection: Flutter mobile app, web
console, and a Go backend, with 6+ user roles each having their own permissions, menus,
and dashboards.

`Flutter` `GetX` `Dio` `Go (chi, pgx, sqlc)` `PostgreSQL` `Keycloak` `Docker`

- Rebuilt the role-based dashboard across 5 roles through a planned 7-phase migration — 3 shared widgets and 15 cards, with the suite at 302 passing tests.
- Found a risk-level mapping bug (`h/m/l` vs the API's `high/medium/low`) that silently rendered every project as "low risk" on the executive dashboard.
- Closed 18 tracker-reported defects across two cycles, each verified on a physical Android device.
- Designed and delivered a menu-management module: a self-referencing `menu_groups` table, 7 admin endpoints, and a migration that backfilled 31 modules into 11 groups.
- Closed two self-lockout paths and replaced a per-item cycle check with whole-resulting-tree validation.

### Keyper — Condo Management System · personal project
Web system for condominium administration: units, leases, meter readings, billing, and
payment collection. Requirements and architecture complete; implementation starting.

`Go` `PostgreSQL` `Next.js (TypeScript)` `Oracle Cloud (ARM)`

- Wrote the requirement specification independently and revised it after finding four domain flaws in the first draft — including billing that had to be tied to the unit rather than the lease, and per-day utility proration across tenancy changes.

### Also
Smart City / Municipal Services App · Boonplook (agricultural e-commerce) · Booking System ·
Tarnas One Solution · LUXQ App · Smart Government App · Appraisal & Portfolio systems

---

## Education

**Bachelor of Engineering, Computer Engineering** — Prince of Songkla University, Hat Yai Campus (2016 – 2022)

---

<sub>เว็บนี้เป็น static site ไม่มี build step — วิธีแก้ข้อมูลและวิธีเก็บเวอร์ชันอยู่ใน [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)</sub>
