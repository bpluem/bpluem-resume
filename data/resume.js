/* =============================================================
   ข้อมูล resume ทั้งหมด — รองรับ 2 ภาษา (ไทย / อังกฤษ)

   กติกาง่ายๆ ข้อเดียว:
     • ข้อความที่ 2 ภาษาต่างกัน  → เขียนเป็น { en: "...", th: "..." }
     • ข้อความที่ใช้ร่วมกันได้     → เขียนเป็นข้อความธรรมดาตัวเดียว
       (เช่น ชื่อบริษัท ชื่อเทคโนโลยี ปี พ.ศ./ค.ศ.)

   ปุ่ม PDF จะพิมพ์ "ฉบับ 1 หน้า" ซึ่งแสดงเฉพาะรายการที่ทำเครื่องหมาย key: true
   (อยากให้ข้อไหนอยู่ใน PDF ก็เติม key: true ในข้อนั้น / เอาออกก็ลบทิ้ง)
   ส่วนที่ตั้ง compact: false จะถูกตัดออกจาก PDF แต่ยังอยู่บนเว็บ

   ที่มา: ~/Downloads/resume_master.md (อัปเดต 2026-09-09)
   ⚠️ ไฟล์นี้อยู่บน GitHub แบบ public — ห้ามใส่ที่อยู่บ้าน วันเกิด เบอร์โทร
   ============================================================= */

window.RESUME = {
  /* ---------- ภาษาเริ่มต้นตอนเปิดเว็บครั้งแรก: "en" หรือ "th" ---------- */
  defaultLang: "en",

  /* ---------- หัวข้อบนเว็บ ---------- */
  labels: {
    contact:    { en: "Contact",                  th: "ติดต่อ" },
    skills:     { en: "Skills",                   th: "ทักษะ" },
    languages:  { en: "Languages",                th: "ภาษา" },
    summary:    { en: "Profile",                  th: "เกี่ยวกับผม" },
    experience: { en: "Experience",               th: "ประสบการณ์ทำงาน" },
    projects:   { en: "Selected Projects",        th: "ผลงานที่เลือกมา" },
    aiWorkflow: { en: "AI-Assisted Development",  th: "การทำงานร่วมกับ AI" },
    education:  { en: "Education",                th: "การศึกษา" },
  },

  /* ---------- รูปโปรไฟล์ ----------
     วางไฟล์ไว้ที่ assets/profile.jpg (แนะนำรูปสี่เหลี่ยมจัตุรัส 600x600 px ขึ้นไป)
     ถ้าไม่มีไฟล์ เว็บจะซ่อนช่องรูปให้เอง ไม่ขึ้นไอคอนรูปแตก
     ตั้งเป็น null ถ้าไม่อยากแสดงรูปเลย                              */
  photo: "assets/profile.jpg",

  name:   { en: "Bongkarn Jongmee", th: "บงการ จงมี" },
  nameEn: { en: "บงการ จงมี",        th: "Bongkarn Jongmee" },
  title: {
    en: "Front-End Developer (Web & Mobile) · QA Tester",
    th: "Front-End Developer (เว็บ & มือถือ) · QA Tester",
  },
  tagline: {
    en: "Front-End Mobile Developer (Flutter) with QA and backend integration experience",
    th: "นักพัฒนา Flutter สายมือถือ ที่ทำ QA และงานเชื่อมต่อ backend ควบคู่ไปด้วย",
  },

  /* ---------- ติดต่อ ----------
     เบอร์โทรตั้งใจไม่ใส่บนเว็บสาธารณะ → ใส่เฉพาะใน PDF ที่ส่งบริษัทโดยตรง */
  contacts: [
    { value: "mister.bongkarn@gmail.com", href: "mailto:mister.bongkarn@gmail.com", icon: "mail" },
    { value: { en: "Nonthaburi, Thailand", th: "นนทบุรี, ประเทศไทย" }, href: null, icon: "pin" },
    { value: "github.com/bpluem", href: "https://github.com/bpluem", icon: "github" },
    /* LinkedIn — ปิดไว้ชั่วคราว เอาเครื่องหมาย // ออกเพื่อเปิดใช้อีกครั้ง
       (URL จริงมีอักษรไทยที่ถูกเข้ารหัสไว้ %E0%B8... ต้องใช้แบบเข้ารหัสใน href
        ส่วนข้อความที่แสดงใช้ภาษาไทยปกติเพื่อให้อ่านออก) */
    // {
    //   value: "linkedin.com/in/บงการ-จงมี",
    //   href: "https://www.linkedin.com/in/%E0%B8%9A%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3-%E0%B8%88%E0%B8%87%E0%B8%A1%E0%B8%B5-500221414/",
    //   icon: "link",
    // },
  ],

  /* ---------- แนะนำตัว (1 รายการ = 1 ย่อหน้า) ---------- */
  summary: [
    {
      en: "Front-end mobile developer with 3+ years of professional experience building production Flutter applications for enterprise, e-commerce, and government clients. Owns features end to end — UI and shared design systems, REST API integration, authentication and token refresh, role-based access control, localization, and testing on physical devices.",
      th: "นักพัฒนา front-end สายมือถือ ประสบการณ์ทำงานจริงกว่า 3 ปี พัฒนาแอป Flutter ที่ใช้งานจริงให้ลูกค้าองค์กร อีคอมเมิร์ซ และหน่วยงานราชการ ดูแลฟีเจอร์ตั้งแต่ต้นจนจบ ทั้งงาน UI และ design system ที่ใช้ร่วมกัน การเชื่อมต่อ REST API ระบบยืนยันตัวตนและต่ออายุ token การคุมสิทธิ์ตามบทบาท ระบบหลายภาษา ไปจนถึงการทดสอบบนเครื่องจริง",
    },
    {
      en: "Also serves as a QA tester for the team, writing test plans and test cases and tracking defects across the SDLC — which shows up in the development work as a habit of verifying behavior against the running app and the real API contract rather than against documentation.",
      th: "ทำหน้าที่ QA tester ให้ทีมควบคู่ไปด้วย เขียนแผนทดสอบและ test case พร้อมติดตามบั๊กตลอดวงจรการพัฒนา นิสัยจากงาน QA ติดมาถึงงานพัฒนาด้วย คือตรวจสอบพฤติกรรมจากแอปที่รันอยู่จริงและ API จริงเสมอ ไม่เชื่อเอกสารเพียงอย่างเดียว",
    },
    {
      en: "Currently extending into backend work on a multi-tenant construction-management platform (Go, PostgreSQL), owning requirements, schema and API design, review, and verification with an AI-assisted development workflow.",
      th: "ปัจจุบันกำลังขยายไปทางฝั่ง backend ในระบบบริหารงานก่อสร้างแบบ multi-tenant (Go, PostgreSQL) รับผิดชอบตั้งแต่การเก็บ requirement ออกแบบ schema และ API ไปจนถึงการรีวิวและตรวจสอบผลลัพธ์ โดยใช้กระบวนการพัฒนาที่มี AI ช่วย",
    },
  ],

  /* ---------- สกิล 3 ระดับตามความจริง ----------
     เรียงแบบนี้ตั้งใจ: ของที่ใช้ส่งงานจริงทุกวันอยู่บนสุด
     กันโดนถามลึกในสิ่งที่ยังไม่แม่น                             */
  skillGroups: [
    {
      group: { en: "Core", th: "ใช้ประจำ" },
      note:  { en: "used in production daily", th: "ใช้ส่งงานจริงทุกวัน" },
      items: [
        "Dart", "Flutter", "Flutter Web", "GetX", "Dio",
        "REST API integration", "JWT & token refresh",
        "Auth & RBAC", "Design systems", "Responsive UI",
        "Localization (i18n)", "Widget & unit testing",
        "Manual QA / test plans", "Git / GitHub", "Figma hand-off",
      ],
    },
    {
      group: { en: "Working", th: "ใช้งานได้" },
      note:  { en: "shipped real work with", th: "เคยส่งงานจริงมาแล้ว" },
      items: [
        "Go (chi, pgx, sqlc)", "PostgreSQL", "MySQL",
        "TypeScript", "React", "HTML / CSS", "Tailwind",
        "Docker", "Keycloak", "Insomnia / Postman",
        "GitHub Actions", "Database migrations",
        "API contract design", "Swagger / OpenAPI",
      ],
    },
    {
      compact: false,   /* ตัดออกในฉบับ PDF 1 หน้า */
      group: { en: "Familiar", th: "พอใช้ได้" },
      note:  { en: "can work with, still growing", th: "ใช้ประกอบงานได้ กำลังพัฒนาต่อ" },
      items: [
        "Python", "Next.js", "Security review basics",
        "Android tooling (adb)", "Clean Architecture", "Idempotency",
      ],
    },
  ],

  /* ---------- ประสบการณ์ทำงาน (ใหม่สุดอยู่บนสุด) ---------- */
  experience: [
    {
      role: {
        en: "Front-End Developer (Web & Mobile)",
        th: "Front-End Developer (เว็บ & มือถือ)",
      },
      company: "Techwave International Co., Ltd.",
      location: { en: "Thailand", th: "ประเทศไทย" },
      period: { en: "May 2023 – Present", th: "พ.ค. 2566 – ปัจจุบัน" },
      intro: {
        en: "Part of a product development team; primarily responsible for Flutter mobile development, working alongside web and backend developers on end-to-end features.",
        th: "อยู่ในทีมพัฒนาผลิตภัณฑ์ รับผิดชอบงาน Flutter ฝั่งมือถือเป็นหลัก ทำงานร่วมกับนักพัฒนาเว็บและ backend เพื่อส่งฟีเจอร์ตั้งแต่ต้นจนจบ",
      },
      bullets: [
        {
          key: true,
          en: "Design and develop mobile applications with Flutter and Dart, from UI implementation to release-candidate testing.",
          th: "ออกแบบและพัฒนาแอปมือถือด้วย Flutter และ Dart ตั้งแต่ลงมือทำ UI จนถึงทดสอบเวอร์ชันก่อนปล่อยจริง",
        },
        {
          en: "Build and maintain reusable UI components and a shared design system used across the app.",
          th: "สร้างและดูแล UI component ที่ใช้ซ้ำได้ และ design system กลางที่ใช้ทั้งแอป",
        },
        {
          key: true,
          en: "Integrate REST APIs, including response mapping, error handling, loading/empty states, and retry.",
          th: "เชื่อมต่อ REST API ครอบคลุมการ map ข้อมูล จัดการ error สถานะกำลังโหลด/ไม่มีข้อมูล และการลองใหม่",
        },
        {
          key: true,
          en: "Implement authentication, authorization, token management, and token refresh flows.",
          th: "ทำระบบยืนยันตัวตน การให้สิทธิ์ การจัดการ token และการต่ออายุ token",
        },
        {
          key: true,
          en: "Implement role-based access control (RBAC) and permission-driven navigation on the client.",
          th: "ทำระบบคุมสิทธิ์ตามบทบาท (RBAC) และเมนู/เส้นทางในแอปที่เปลี่ยนตามสิทธิ์ผู้ใช้",
        },
        {
          en: "Manage application state with GetX; apply modular and layered architecture to keep features isolated.",
          th: "จัดการ state ด้วย GetX และวางโครงสร้างแบบแยกโมดูลเป็นชั้น เพื่อไม่ให้แต่ละฟีเจอร์กระทบกัน",
        },
        {
          en: "Deliver multi-language (TH/EN) support, including locale-aware formatting.",
          th: "ทำระบบ 2 ภาษา (ไทย/อังกฤษ) รวมถึงการจัดรูปแบบวันที่และตัวเลขตามภาษา",
        },
        {
          en: "Collaborate with backend and web developers to define and verify API contracts.",
          th: "ทำงานร่วมกับทีม backend และเว็บ เพื่อกำหนดและตรวจสอบ API contract ให้ตรงกัน",
        },
      ],
    },
    {
      role: { en: "QA Tester (concurrent role)", th: "QA Tester (ทำควบคู่กัน)" },
      company: "Techwave International Co., Ltd.",
      location: { en: "Thailand", th: "ประเทศไทย" },
      period: { en: "Apr 2024 – Present", th: "เม.ย. 2567 – ปัจจุบัน" },
      bullets: [
        {
          en: "Collaborate with development and DevOps teams to maintain quality across the SDLC.",
          th: "ทำงานร่วมกับทีมพัฒนาและ DevOps เพื่อคุมคุณภาพตลอดวงจรการพัฒนา",
        },
        {
          key: true,
          en: "Write and execute test plans and test cases covering functional flows, permissions, and error paths.",
          th: "เขียนและรันแผนทดสอบ/test case ครอบคลุมทั้ง flow การใช้งาน สิทธิ์ผู้ใช้ และกรณีที่เกิดข้อผิดพลาด",
        },
        {
          en: "Track, document, and reproduce defects in an issue-tracking system, and work with developers to close them.",
          th: "ติดตาม บันทึก และจำลองบั๊กในระบบ issue tracking แล้วประสานกับนักพัฒนาจนปิดงานได้",
        },
        {
          key: true,
          en: "Verify releases on physical devices across every user role rather than on simulators alone.",
          th: "ทดสอบเวอร์ชันที่จะปล่อยบนเครื่องจริงครบทุกบทบาทผู้ใช้ ไม่ใช่แค่บน simulator",
        },
      ],
    },
    {
      role: { en: "Full Stack Web Developer (Internship)", th: "Full Stack Web Developer (ฝึกงาน)" },
      company: "Khunying Long Athakravisunthorn Learning Resources Center",
      location: { en: "Songkhla, Thailand", th: "สงขลา, ประเทศไทย" },
      period: { en: "Apr 2021 – Jun 2021", th: "เม.ย. – มิ.ย. 2564" },
      bullets: [
        {
          en: "Designed and developed a web application with LINE Notify integration.",
          th: "ออกแบบและพัฒนาเว็บแอปพลิเคชันที่เชื่อมต่อกับ LINE Notify",
        },
      ],
    },
  ],

  /* ---------- โปรเจค ----------
     featured: true = แสดงรายละเอียดเต็มพร้อม bullet
     ที่เหลือ      = การ์ดสั้น
     TODO: โปรเจคเก่าหลายตัวยังไม่มีปี/บทบาท/ตัวเลข — เติมได้จะน่าเชื่อถือขึ้นมาก */
  projects: [
    {
      name: "ConstructQ — Construction Quality Management Platform",
      role: {
        en: "Flutter mobile (owned) · backend design & verification",
        th: "ดูแลแอป Flutter ทั้งหมด · ออกแบบและตรวจสอบฝั่ง backend",
      },
      period: { en: "2026 – Present", th: "2569 – ปัจจุบัน" },
      featured: true,
      description: {
        en: "Multi-tenant B2B platform for construction quality inspection: Flutter mobile app, web console, and a Go backend. 6+ user roles (inspector, QC manager, PM, subcontractor, CEO, org admin) with per-role permissions, menus, and dashboards.",
        th: "แพลตฟอร์ม B2B แบบ multi-tenant สำหรับตรวจสอบคุณภาพงานก่อสร้าง ประกอบด้วยแอป Flutter เว็บคอนโซล และ backend ภาษา Go รองรับผู้ใช้ 6 บทบาทขึ้นไป (ผู้ตรวจ, QC manager, PM, ผู้รับเหมาช่วง, ผู้บริหาร, แอดมินองค์กร) โดยแต่ละบทบาทมีสิทธิ์ เมนู และแดชบอร์ดของตัวเอง",
      },
      /* ฉบับกระชับสำหรับ PDF 1 หน้า */
      descriptionShort: {
        en: "Multi-tenant B2B platform for construction quality inspection: Flutter app, web console, and Go backend, with 6+ roles each having their own permissions and dashboards.",
        th: "แพลตฟอร์ม B2B แบบ multi-tenant สำหรับตรวจสอบคุณภาพงานก่อสร้าง มีแอป Flutter เว็บคอนโซล และ backend ภาษา Go รองรับ 6 บทบาทขึ้นไป แต่ละบทบาทมีสิทธิ์และแดชบอร์ดของตัวเอง",
      },
      tags: ["Flutter", "GetX", "Dio", "Go (chi, pgx, sqlc)", "PostgreSQL", "Keycloak", "Docker"],
      groups: [
        {
          title: { en: "Mobile", th: "ฝั่งมือถือ" },
          bullets: [
            {
              key: true,
              en: "Rebuilt the role-based dashboard to a new spec across 5 roles via a planned 7-phase migration — 3 shared widgets and 15 cards, with the suite at 302 passing tests.",
              th: "รื้อแดชบอร์ดตามบทบาทใหม่ทั้งหมด 5 บทบาท ตามแผนย้าย 7 เฟส ได้ widget กลาง 3 ตัวและการ์ด 15 ใบ โดยชุดทดสอบผ่านครบ 302 เคส",
            },
            {
              en: "Audited every dashboard card against the live API for all roles and produced the gap list handed to the backend team.",
              th: "ตรวจการ์ดบนแดชบอร์ดทุกใบเทียบกับ API จริงครบทุกบทบาท แล้วสรุปรายการช่องว่างส่งให้ทีม backend",
            },
            {
              key: true,
              en: 'Found a risk-level mapping bug (h/m/l vs the API’s high/medium/low) that silently rendered every project as "low risk" on the executive dashboard.',
              th: "เจอบั๊กการ map ระดับความเสี่ยง (h/m/l กับ high/medium/low ที่ API ส่งมาจริง) ซึ่งทำให้แดชบอร์ดผู้บริหารแสดงทุกโครงการเป็นความเสี่ยงต่ำโดยไม่มีใครรู้",
            },
            {
              /* ฉบับกระชับสำหรับ PDF 1 หน้า (เว็บยังใช้ข้อความเต็มด้านล่าง) */
              short: {
                en: "Closed 18 tracker-reported defects across two cycles, each verified on a physical Android device.",
                th: "ปิดบั๊กที่ถูกแจ้ง 18 ข้อใน 2 รอบ ตรวจผลบนเครื่อง Android จริงทุกข้อ",
              },
              key: true,
              en: "Closed 18 tracker-reported defects across two cycles — OTP entry, resend countdown, leave-confirmation guard, EXIF image rotation, stale image cache — each verified on a physical Android device.",
              th: "ปิดบั๊กที่ถูกแจ้งในระบบติดตาม 18 ข้อ ภายใน 2 รอบ ทั้งช่องกรอก OTP, ตัวนับเวลาขอรหัสใหม่, กันผู้ใช้ออกจากหน้าโดยไม่ตั้งใจ, รูปเอียงจาก EXIF และแคชรูปเก่าค้าง โดยตรวจผลบนเครื่อง Android จริงทุกข้อ",
            },
            {
              en: "Rebuilt the OTP field from four separate boxes into a single overlaid input, restoring oneTimeCode autofill and continuous backspace that the split-field pattern breaks on mobile keyboards.",
              th: "เปลี่ยนช่อง OTP จาก 4 ช่องแยกเป็นช่องเดียวที่วางทับด้านบน ทำให้ autofill รหัสจาก SMS และการกดลบย้อนต่อเนื่องกลับมาใช้ได้ ซึ่งรูปแบบช่องแยกทำให้คีย์บอร์ดมือถือใช้ไม่ได้",
            },
            {
              en: "Diagnosed a keyboard-dismiss bug caused by swapping widget types on state change (Flutter disposes the element subtree, taking the TextField with it) and added a regression test asserting element identity across state changes.",
              th: "หาสาเหตุอาการคีย์บอร์ดหลุดเวลาพิมพ์ ซึ่งเกิดจากการสลับชนิด widget ตอน state เปลี่ยน (Flutter ทิ้ง element ทั้งกิ่ง พา TextField หายไปด้วย) แล้วเพิ่มเทสกันปัญหาซ้ำที่ตรวจว่า element ยังเป็นตัวเดิม",
            },
            {
              en: "Delivered full TH/EN localization including locale-aware trend and duration formatting.",
              th: "ทำระบบ 2 ภาษาครบทั้งแอป รวมถึงการแสดงแนวโน้มและระยะเวลาให้ถูกตามรูปแบบของแต่ละภาษา",
            },
          ],
        },
        {
          title: {
            en: "Backend — owned design & verification, AI-assisted implementation",
            th: "ฝั่ง backend — ออกแบบและตรวจสอบเอง ใช้ AI ช่วยเขียนโค้ด",
          },
          bullets: [
            {
              /* ฉบับกระชับสำหรับ PDF 1 หน้า (เว็บยังใช้ข้อความเต็มด้านล่าง) */
              short: {
                en: "Designed and delivered a menu-management module: a self-referencing menu_groups table, 7 admin endpoints, and a migration that backfilled 31 modules into 11 groups.",
                th: "ออกแบบและส่งมอบโมดูลจัดการเมนู: ตาราง menu_groups, endpoint แอดมิน 7 ตัว และ migration ย้ายโมดูลเดิม 31 รายการเข้า 11 กลุ่ม",
              },
              key: true,
              en: "Designed and delivered a menu-management module: a new self-referencing menu_groups table, 7 admin endpoints, and a migration that backfilled 31 existing modules into 11 groups — deliberately leaving the permission table untouched so the menu/RBAC boundary is enforced by the schema rather than by convention.",
              th: "ออกแบบและส่งมอบโมดูลจัดการเมนู ประกอบด้วยตาราง menu_groups ที่อ้างถึงตัวเอง, endpoint ฝั่งแอดมิน 7 ตัว และ migration ที่ย้ายโมดูลเดิม 31 รายการเข้า 11 กลุ่ม โดยตั้งใจไม่แตะตารางสิทธิ์ เพื่อให้เส้นแบ่งระหว่างเมนูกับ RBAC ถูกบังคับด้วยโครงสร้างฐานข้อมูล ไม่ใช่แค่ข้อตกลงกันเอง",
            },
            {
              en: "Defined the API contract and wrote the integration document handed to the web team; caught 3 mismatches between the UI mockup and the real API before hand-off.",
              th: "กำหนด API contract และเขียนเอกสารเชื่อมต่อส่งให้ทีมเว็บ พร้อมจับจุดที่แบบ UI กับ API จริงไม่ตรงกันได้ 3 จุดก่อนส่งมอบ",
            },
            {
              en: "Closed two self-lockout paths and replaced a per-item cycle check with whole-resulting-tree validation, which the per-item version let through on paired swaps.",
              th: "ปิดช่องที่แอดมินอาจล็อกตัวเองออกจากระบบได้ 2 ทาง และเปลี่ยนการตรวจวงวนแบบทีละรายการเป็นตรวจทั้งผังที่จะเกิดขึ้นจริง ซึ่งแบบเดิมปล่อยผ่านเมื่อมีการสลับกันเป็นคู่",
            },
            {
              en: "Implemented a package-downgrade guard in the billing flow, ordering tiers by sort_order after establishing that price-based ordering inverts for contact-sales tiers priced at 0.",
              th: "ทำกฎกันดาวน์เกรดแพ็กเกจในระบบคิดเงิน โดยเรียงระดับแพ็กเกจด้วย sort_order หลังพบว่าการเรียงตามราคาจะกลับหัวเมื่อเจอแพ็กเกจแบบติดต่อฝ่ายขายที่ตั้งราคาเป็น 0",
            },
            {
              en: "Ran a security review of the service and delivered a prioritized report of critical findings with a remediation plan and effort estimate.",
              th: "ตรวจสอบความปลอดภัยของระบบ แล้วส่งรายงานจัดลำดับความสำคัญของประเด็นที่ต้องแก้ พร้อมแผนแก้ไขและประมาณการเวลา",
            },
            {
              en: "Passed a fixed delivery gate on every change: build, vet, unit tests, linter, and static/security analysis.",
              th: "ทุกการเปลี่ยนแปลงต้องผ่านด่านตรวจก่อนส่งงานเสมอ ทั้ง build, vet, unit test, linter และการวิเคราะห์เชิงสถิต/ความปลอดภัย",
            },
          ],
        },
      ],
    },
    {
      name: "Keyper — Condo Management System",
      role: { en: "Personal project · full-stack", th: "โปรเจคส่วนตัว · full-stack" },
      period: { en: "2026", th: "2569" },
      featured: true,
      description: {
        en: "Self-directed web system for condominium administration: units, leases, meter readings, billing, and payment collection. Requirements and architecture complete; implementation starting.",
        th: "ระบบเว็บสำหรับบริหารคอนโดที่ทำเอง ครอบคลุมห้องชุด สัญญาเช่า การจดมิเตอร์ การออกบิล และการเก็บเงิน ตอนนี้ requirement และสถาปัตยกรรมเสร็จแล้ว กำลังเริ่มลงมือเขียน",
      },
      descriptionShort: {
        en: "Web system for condominium administration: units, leases, meter readings, billing, and payment collection.",
        th: "ระบบเว็บบริหารคอนโด ครอบคลุมห้องชุด สัญญาเช่า การจดมิเตอร์ การออกบิล และการเก็บเงิน",
      },
      tags: ["Go", "PostgreSQL", "Next.js (TypeScript)", "Oracle Cloud (ARM)"],
      groups: [
        {
          title: null,
          bullets: [
            {
              /* ฉบับกระชับสำหรับ PDF 1 หน้า (เว็บยังใช้ข้อความเต็มด้านล่าง) */
              short: {
                en: "Wrote the requirement specification independently and revised it after finding four domain flaws in the first draft, including billing that had to be tied to the unit rather than the lease.",
                th: "เขียนสเปก requirement เองทั้งหมด แล้วรื้อใหม่หลังพบข้อผิดพลาดเชิงธุรกิจ 4 จุดในร่างแรก เช่น บิลต้องผูกกับห้องไม่ใช่สัญญาเช่า",
              },
              key: true,
              en: "Wrote the requirement specification independently and revised it after finding four domain flaws in the first draft — billing had to be tied to the unit rather than the lease, utilities needed per-day proration across tenancy changes, water and electricity both needed per-unit meters, and resident data belonged at building scope.",
              th: "เขียนสเปก requirement เองทั้งหมด แล้วรื้อใหม่หลังพบข้อผิดพลาดเชิงธุรกิจ 4 จุดในร่างแรก คือ บิลต้องผูกกับห้องไม่ใช่สัญญาเช่า, ค่าน้ำค่าไฟต้องคิดตามจำนวนวันเมื่อผู้เช่าเปลี่ยนกลางเดือน, ทั้งน้ำและไฟต้องมีมิเตอร์แยกรายห้อง และข้อมูลผู้พักอาศัยต้องอยู่ในระดับอาคาร",
            },
            {
              en: "Drafted a production deployment plan targeting a free-tier ARM instance.",
              th: "ร่างแผนขึ้นระบบจริงบนเครื่อง ARM ของ cloud ระดับฟรี",
            },
          ],
        },
      ],
    },
    {
      name: "Smart City / Municipal Services App",
      role: { en: "Flutter developer", th: "นักพัฒนา Flutter" },
      description: {
        en: "Municipal services app — citizen complaints, local tourism, announcements, and IoT services for smart poles.",
        th: "แอปบริการเทศบาล ทั้งรับเรื่องร้องเรียน ข้อมูลท่องเที่ยวท้องถิ่น ประกาศจากเทศบาล และงาน IoT สำหรับเสาอัจฉริยะ",
      },
      tags: ["Flutter"],
    },
    {
      name: "Boonplook — Agricultural E-Commerce",
      role: { en: "Flutter developer", th: "นักพัฒนา Flutter" },
      description: {
        en: "Mobile e-commerce application built for farmers.",
        th: "แอปอีคอมเมิร์ซบนมือถือสำหรับเกษตรกร",
      },
      tags: ["Flutter"],
    },
    {
      name: "Booking System",
      role: { en: "Developer", th: "นักพัฒนา" },
      description: {
        en: "Real-time schedule availability and booking confirmation, with a management dashboard for reservations and reporting.",
        th: "ระบบจองที่เช็คคิวว่างและยืนยันการจองแบบเรียลไทม์ พร้อมแดชบอร์ดจัดการการจองและออกรายงาน",
      },
      tags: [],
    },
    {
      name: "Tarnas One Solution",
      role: { en: "Web developer", th: "นักพัฒนาเว็บ" },
      description: {
        en: "Web application development for the Tarnas One Solution product.",
        th: "พัฒนาเว็บแอปพลิเคชันให้ผลิตภัณฑ์ Tarnas One Solution",
      },
      tags: [],
    },
    {
      name: "LUXQ App · Smart Government App",
      role: { en: "Flutter developer", th: "นักพัฒนา Flutter" },
      description: {
        en: "Two Flutter applications currently in development.",
        th: "แอป Flutter 2 ตัวที่กำลังพัฒนาอยู่",
      },
      tags: ["Flutter"],
    },
    {
      name: "Appraisal System · Portfolio System · Internal Solutions",
      role: { en: "Developer", th: "นักพัฒนา" },
      description: {
        en: "Employee performance appraisal, portfolio management, and internal company systems.",
        th: "ระบบประเมินผลพนักงาน ระบบจัดการผลงาน และระบบภายในองค์กร",
      },
      tags: [],
    },
  ],

  /* ---------- จุดต่างที่คนอื่นไม่ค่อยมี ---------- */
  aiWorkflow: {
    intro: {
      en: "Uses AI coding tools as a structured engineering workflow rather than ad-hoc prompting.",
      th: "ใช้เครื่องมือ AI เขียนโค้ดเป็นกระบวนการทำงานที่มีขั้นตอนชัดเจน ไม่ใช่การสั่งไปเรื่อยๆ",
    },
    tools: ["Claude", "Claude Code", "Codex", "Hermes Agent", "Ollama"],
    blocks: [
      {
        title: { en: "Workflow", th: "ขั้นตอนการทำงาน" },
        bullets: [
          {
            en: "Analyze the existing code and conventions before proposing anything, so new work matches the codebase instead of introducing a second pattern.",
            th: "อ่านโค้ดและแนวทางที่ทีมใช้อยู่ก่อนเสนอทางแก้ เพื่อให้งานใหม่เข้ากับของเดิม ไม่ใช่สร้างรูปแบบที่สองขึ้นมา",
          },
          {
            en: "Agree on a written plan before implementation on any non-trivial feature.",
            th: "ฟีเจอร์ที่ไม่ใช่งานเล็ก ต้องตกลงแผนเป็นลายลักษณ์อักษรก่อนลงมือเขียน",
          },
          {
            en: "Run a fixed pre-delivery gate — lint, tests, static analysis, security scan, and a review pass — before calling work done.",
            th: "ก่อนบอกว่างานเสร็จ ต้องผ่านด่านตรวจชุดเดิมทุกครั้ง ทั้ง lint, เทส, การวิเคราะห์เชิงสถิต, สแกนความปลอดภัย และการรีวิว",
          },
          {
            en: "Maintain project-specific agent definitions and reusable checklists for recurring risks, such as never editing a migration that has already been pushed.",
            th: "ทำชุดคำสั่งเฉพาะของแต่ละโปรเจคและ checklist ที่ใช้ซ้ำได้สำหรับความเสี่ยงที่เจอบ่อย เช่น ห้ามแก้ไฟล์ migration ที่ push ไปแล้ว",
          },
        ],
      },
      {
        title: {
          en: "Operating rules developed from real incidents",
          th: "กฎที่ตั้งขึ้นจากเหตุการณ์จริง",
        },
        bullets: [
          {
            en: "Verify against the running code and API, never against comments or documentation — stale comments had left the app guessing values the backend had been returning for months.",
            th: "ตรวจกับโค้ดและ API ที่รันอยู่จริงเสมอ ไม่เชื่อคอมเมนต์หรือเอกสาร เพราะเคยเจอคอมเมนต์เก่าค้างที่ทำให้แอปเดาค่าเอง ทั้งที่ backend ส่งค่านั้นมาหลายเดือนแล้ว",
          },
          {
            en: "No UI work is complete until it has been seen on a physical device — a change that passed the analyzer and the full test suite still produced three visible bugs in the first twenty minutes on a real phone.",
            th: "งาน UI ยังไม่ถือว่าเสร็จจนกว่าจะเห็นบนเครื่องจริง เพราะงานที่ผ่าน analyzer และเทสครบทุกตัว ยังเจอบั๊กที่มองเห็นด้วยตา 3 จุดภายใน 20 นาทีแรกบนมือถือจริง",
          },
          {
            en: "Never read or expose environment files and secrets during debugging.",
            th: "ห้ามเปิดอ่านหรือทำให้ไฟล์ env และ secret หลุดระหว่างไล่บั๊ก",
          },
        ],
      },
    ],
  },

  education: [
    {
      degree: {
        en: "Bachelor of Engineering, Computer Engineering",
        th: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์",
      },
      school: {
        en: "Prince of Songkla University, Hat Yai Campus",
        th: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
      },
      period: { en: "2016 – 2022", th: "2559 – 2565" },
    },
    {
      compact: false,   /* ตัดออกในฉบับ PDF 1 หน้า */
      degree: { en: "Kantangpittayakorn School", th: "โรงเรียนกันตังพิทยากร" },
      school: null,
      period: { en: "2010 – 2015", th: "2553 – 2558" },
    },
  ],

  languages: [
    { name: { en: "Thai", th: "ไทย" }, level: { en: "Native", th: "ภาษาแม่" } },
    {
      name:  { en: "English", th: "อังกฤษ" },
      level: { en: "Professional reading, basic communication", th: "อ่านเอกสารงานได้ สื่อสารพื้นฐาน" },
    },
  ],
};
