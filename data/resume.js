/* =============================================================
   ไฟล์นี้คือ "ข้อมูล resume" ทั้งหมด
   แก้เฉพาะไฟล์นี้ไฟล์เดียวก็พอ ไม่ต้องไปแตะ index.html
   ตอนนี้เป็นข้อมูลตัวอย่าง (placeholder) — แทนที่ด้วยข้อมูลจริงของคุณได้เลย
   ============================================================= */

window.RESUME = {
  // ---------- ส่วนหัว: ชื่อและตำแหน่งที่อยากสมัคร ----------
  name: "ชื่อ นามสกุล",
  nameEn: "Firstname Lastname",
  title: "Mobile & Backend Developer",
  tagline:
    "Flutter developer ที่ขยับมาทำ Go backend — ส่งงานได้ทั้งฝั่งแอปและฝั่ง API",

  // ---------- ข้อมูลติดต่อ ----------
  // ลบบรรทัดไหนออกก็ได้ ถ้าไม่อยากแสดง (เช่น เบอร์โทร)
  contacts: [
    { label: "อีเมล",    value: "you@example.com",              href: "mailto:you@example.com", icon: "mail" },
    { label: "โทรศัพท์",  value: "08x-xxx-xxxx",                  href: "tel:+66800000000",       icon: "phone" },
    { label: "ที่อยู่",    value: "กรุงเทพมหานคร, ประเทศไทย",       href: null,                     icon: "pin" },
    { label: "GitHub",   value: "github.com/your-username",     href: "https://github.com/your-username", icon: "github" },
    { label: "LinkedIn", value: "linkedin.com/in/your-profile", href: "https://linkedin.com/in/your-profile", icon: "link" },
  ],

  // ---------- แนะนำตัวสั้นๆ 2-4 บรรทัด ----------
  // ส่วนนี้สำคัญที่สุด HR อ่านย่อหน้านี้ก่อนเสมอ
  summary:
    "นักพัฒนาแอปมือถือด้วย Flutter ประสบการณ์ X ปี เคยส่งแอปขึ้น App Store และ Play Store " +
    "ช่วงหลังรับผิดชอบงาน backend ด้วย Go (REST API, PostgreSQL, Docker) ควบคู่ไปด้วย " +
    "ถนัดทำงานกับทีมเล็กที่ต้องดูแลงานตั้งแต่ออกแบบ API จนถึงหน้าจอผู้ใช้",

  // ---------- สกิล แบ่งเป็นกลุ่ม ----------
  skillGroups: [
    { group: "ภาษาโปรแกรม", items: ["Dart", "Go", "TypeScript", "SQL"] },
    { group: "Mobile",      items: ["Flutter", "Riverpod / Bloc", "REST API integration", "Firebase"] },
    { group: "Backend",     items: ["Go (Gin / Echo)", "PostgreSQL", "REST API design", "JWT / Keycloak"] },
    { group: "เครื่องมือ",   items: ["Git / GitHub", "Docker", "Postman / Insomnia", "Figma"] },
  ],

  // ---------- ประสบการณ์ทำงาน (ใหม่สุดอยู่บนสุด) ----------
  experience: [
    {
      role: "Mobile & Backend Developer",
      company: "ชื่อบริษัทปัจจุบัน",
      location: "กรุงเทพฯ",
      period: "2567 – ปัจจุบัน",
      // เขียนเป็น "ทำอะไร → ผลลัพธ์เป็นตัวเลข" จะดูน่าเชื่อถือกว่าเขียนแค่หน้าที่
      bullets: [
        "พัฒนาแอป Flutter สำหรับงานก่อสร้าง รองรับผู้ใช้ 6 บทบาท ใช้งานจริงกว่า X คน/วัน",
        "ออกแบบและพัฒนา REST API ด้วย Go ร่วมกับทีม backend รวมกว่า X endpoint",
        "ลดเวลาโหลดหน้า dashboard จาก X วินาที เหลือ Y วินาที ด้วยการรวม API และทำ cache ฝั่งแอป",
        "ดูแลระบบ 2 ภาษา (ไทย/อังกฤษ) ทั้งฝั่งแอปและฝั่งเว็บ",
      ],
    },
    {
      role: "Flutter Developer",
      company: "ชื่อบริษัทก่อนหน้า",
      location: "กรุงเทพฯ",
      period: "2565 – 2567",
      bullets: [
        "พัฒนาแอปมือถือจากศูนย์จนขึ้น store ทั้ง iOS และ Android",
        "ทำงานร่วมกับทีม design ในการแปลง Figma เป็นหน้าจอจริง",
        "เขียน unit test และ widget test ครอบคลุมส่วนสำคัญของแอป",
      ],
    },
  ],

  // ---------- ผลงาน / โปรเจคเด่น ----------
  projects: [
    {
      name: "ชื่อโปรเจค A",
      role: "Full-stack (Flutter + Go)",
      description:
        "ระบบบริหารงานก่อสร้าง มีทั้งแอปมือถือและ backend — ดูแลตั้งแต่ออกแบบ API จนถึง UI",
      tags: ["Flutter", "Go", "PostgreSQL", "Docker"],
      link: null, // ใส่ URL ถ้ามีให้ดู เช่น "https://github.com/you/project"
    },
    {
      name: "ชื่อโปรเจค B",
      role: "Mobile Developer",
      description: "แอปจัดการงานส่วนตัว ทำ offline-first และ sync ข้อมูลเมื่อกลับมาออนไลน์",
      tags: ["Flutter", "SQLite", "Riverpod"],
      link: null,
    },
  ],

  // ---------- การศึกษา ----------
  education: [
    {
      degree: "ปริญญาตรี สาขาที่จบ",
      school: "ชื่อมหาวิทยาลัย",
      period: "2561 – 2565",
      detail: "เกรดเฉลี่ย X.XX (ลบบรรทัดนี้ออกได้ถ้าไม่อยากใส่)",
    },
  ],

  // ---------- ภาษา ----------
  languages: [
    { name: "ไทย",     level: "ภาษาแม่" },
    { name: "อังกฤษ",  level: "อ่านเอกสารเทคนิคได้ สื่อสารพื้นฐาน" },
  ],

  // ---------- อื่นๆ (ใบรับรอง/คอร์ส) — ลบทั้ง array ได้ถ้าไม่มี ----------
  certificates: [
    { name: "ชื่อคอร์ส/ใบรับรอง", issuer: "ผู้ออกใบรับรอง", year: "2567" },
  ],
};
