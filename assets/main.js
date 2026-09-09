/* =============================================================
   อ่านข้อมูลจาก window.RESUME (data/resume.js) แล้วสร้างหน้าเว็บ
   รองรับ 2 ภาษา — กดปุ่ม TH/EN มุมขวาบนเพื่อสลับ

   ปกติไม่ต้องแก้ไฟล์นี้ นอกจากอยากเพิ่ม "หัวข้อใหม่" ที่ยังไม่มี
   ============================================================= */

(function () {
  "use strict";

  var R = window.RESUME;
  var root = document.getElementById("resume");

  if (!R) {
    root.innerHTML = '<p style="padding:2rem">ไม่พบข้อมูล — ตรวจว่าไฟล์ data/resume.js โหลดสำเร็จหรือไม่</p>';
    return;
  }

  /* ---------- ภาษา ---------- */
  var LANGS = ["en", "th"];
  var lang = R.defaultLang === "th" ? "th" : "en";
  try {
    var saved = localStorage.getItem("resume-lang");
    if (LANGS.indexOf(saved) !== -1) lang = saved;
  } catch (e) { /* โหมดส่วนตัวอาจอ่าน localStorage ไม่ได้ */ }

  /* t() = หัวใจของระบบ 2 ภาษา
     - ถ้าค่าเป็น { en, th } → คืนภาษาที่กำลังเลือกอยู่
     - ถ้าเป็นข้อความธรรมดา → คืนตามเดิม (ใช้ร่วมกันทั้งสองภาษา) */
  function t(v) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      return v[lang] != null ? v[lang] : (v.en != null ? v.en : "");
    }
    return v == null ? "" : v;
  }

  /* กันข้อความที่มีอักขระพิเศษ (<, >, &) ทำ HTML พัง */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  /* ใช้คู่กันบ่อยมาก: แปลภาษาแล้ว escape */
  function te(v) { return esc(t(v)); }

  /* ---------- ไอคอน SVG ฝังในไฟล์ ไม่ต้องโหลดจากภายนอก ---------- */
  var ICONS = {
    mail:   '<path d="M2 4h12v8H2z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 4l6 4.5L14 4" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    phone:  '<path d="M3 3h3l1.2 3-1.6 1.2a8 8 0 004.2 4.2L11 9.8 14 11v3a11 11 0 01-11-11z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    pin:    '<path d="M8 14s5-4.4 5-8A5 5 0 003 6c0 3.6 5 8 5 8z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="6" r="1.8" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    github: '<path d="M8 1a7 7 0 00-2.2 13.6c.35.06.48-.15.48-.34v-1.2C4.3 13.4 4 12.3 4 12.3c-.25-.65-.6-.82-.6-.82-.5-.34.04-.33.04-.33.55.04.84.57.84.57.49.84 1.28.6 1.6.46.05-.36.19-.6.35-.74-1.2-.14-2.47-.6-2.47-2.7 0-.6.21-1.08.56-1.46-.06-.14-.24-.7.05-1.45 0 0 .46-.15 1.5.56a5.2 5.2 0 012.74 0c1.04-.71 1.5-.56 1.5-.56.3.75.11 1.31.05 1.45.35.38.56.86.56 1.45 0 2.1-1.27 2.56-2.48 2.7.2.17.37.5.37 1v1.5c0 .2.13.4.48.34A7 7 0 008 1z" fill="currentColor"/>',
    link:   '<path d="M6.5 9.5a3 3 0 004.2 0l2-2a3 3 0 10-4.2-4.2l-.8.8M9.5 6.5a3 3 0 00-4.2 0l-2 2a3 3 0 104.2 4.2l.8-.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  };
  function icon(name) {
    return '<svg class="ico" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">' +
           (ICONS[name] || ICONS.link) + "</svg>";
  }

  function tagsHtml(items) {
    if (!items || !items.length) return "";
    return '<div class="tags">' +
      items.map(function (s) { return '<span class="tag">' + te(s) + "</span>"; }).join("") +
      "</div>";
  }
  function bulletsHtml(items) {
    if (!items || !items.length) return "";
    return "<ul>" + items.map(function (b) { return "<li>" + te(b) + "</li>"; }).join("") + "</ul>";
  }

  /* ---------- แถบซ้าย ---------- */
  function renderSide() {
    var L = R.labels, h = "";

    h += '<p class="name">' + te(R.name) + "</p>";
    if (R.nameEn)  h += '<p class="name-en">' + te(R.nameEn) + "</p>";
    if (R.title)   h += '<p class="role">' + te(R.title) + "</p>";
    if (R.tagline) h += '<p class="tagline">' + te(R.tagline) + "</p>";

    if (R.contacts && R.contacts.length) {
      h += '<div class="side-block"><h2>' + te(L.contact) + "</h2>";
      h += '<ul class="contact-list">';
      R.contacts.forEach(function (c) {
        var val = c.href ? '<a href="' + esc(c.href) + '">' + te(c.value) + "</a>" : te(c.value);
        h += "<li>" + icon(c.icon) + '<span class="val">' + val + "</span></li>";
      });
      h += "</ul></div>";
    }

    if (R.skillGroups && R.skillGroups.length) {
      h += '<div class="side-block"><h2>' + te(L.skills) + "</h2>";
      R.skillGroups.forEach(function (g) {
        h += '<div class="skill-group"><h3>' + te(g.group) +
             (g.note ? ' <span class="skill-note">' + te(g.note) + "</span>" : "") +
             "</h3>" + tagsHtml(g.items) + "</div>";
      });
      h += "</div>";
    }

    if (R.languages && R.languages.length) {
      h += '<div class="side-block"><h2>' + te(L.languages) + '</h2><ul class="lang-list">';
      R.languages.forEach(function (l) {
        h += "<li><strong>" + te(l.name) + "</strong><span>" + te(l.level) + "</span></li>";
      });
      h += "</ul></div>";
    }

    return '<aside class="side">' + h + "</aside>";
  }

  /* ---------- เนื้อหาฝั่งขวา ---------- */
  function renderMain() {
    var L = R.labels, h = "";

    if (R.summary && R.summary.length) {
      h += '<section class="section"><h2>' + te(L.summary) + "</h2>";
      R.summary.forEach(function (p) { h += '<p class="summary">' + te(p) + "</p>"; });
      h += "</section>";
    }

    if (R.experience && R.experience.length) {
      h += '<section class="section"><h2>' + te(L.experience) + "</h2>";
      R.experience.forEach(function (e) {
        h += '<div class="item"><div class="item-head">' +
             '<h3 class="item-title">' + te(e.role) + "</h3>" +
             (e.period ? '<span class="item-period">' + te(e.period) + "</span>" : "") +
             "</div>";
        var sub = [t(e.company), t(e.location)].filter(Boolean).map(esc).join(" · ");
        if (sub) h += '<p class="item-sub">' + sub + "</p>";
        if (e.intro) h += "<p>" + te(e.intro) + "</p>";
        h += bulletsHtml(e.bullets) + "</div>";
      });
      h += "</section>";
    }

    if (R.projects && R.projects.length) {
      h += '<section class="section"><h2>' + te(L.projects) + "</h2>";

      /* โปรเจคเด่น = แสดงเต็มพร้อมหัวข้อย่อย */
      R.projects.filter(function (p) { return p.featured; }).forEach(function (p) {
        h += '<div class="item"><div class="item-head">' +
             '<h3 class="item-title">' +
             (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + te(p.name) + "</a>" : te(p.name)) +
             "</h3>" +
             (p.period ? '<span class="item-period">' + te(p.period) + "</span>" : "") +
             "</div>";
        if (p.role) h += '<p class="item-sub">' + te(p.role) + "</p>";
        if (p.description) h += "<p>" + te(p.description) + "</p>";
        h += tagsHtml(p.tags);
        (p.groups || []).forEach(function (g) {
          if (g.title) h += '<h4 class="group-title">' + te(g.title) + "</h4>";
          h += bulletsHtml(g.bullets);
        });
        h += "</div>";
      });

      /* โปรเจคที่เหลือ = การ์ดสั้น */
      var rest = R.projects.filter(function (p) { return !p.featured; });
      if (rest.length) {
        h += '<div class="project-grid">';
        rest.forEach(function (p) {
          h += '<article class="project"><h3>' +
               (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + te(p.name) + "</a>" : te(p.name)) +
               "</h3>";
          if (p.role) h += '<p class="prole">' + te(p.role) + "</p>";
          if (p.description) h += "<p>" + te(p.description) + "</p>";
          h += tagsHtml(p.tags) + "</article>";
        });
        h += "</div>";
      }
      h += "</section>";
    }

    if (R.aiWorkflow) {
      var a = R.aiWorkflow;
      h += '<section class="section"><h2>' + te(L.aiWorkflow) + "</h2>";
      if (a.intro) h += '<p class="summary">' + te(a.intro) + "</p>";
      h += tagsHtml(a.tools);
      (a.blocks || []).forEach(function (b) {
        h += '<div class="ai-block">';
        if (b.title) h += '<h4 class="group-title">' + te(b.title) + "</h4>";
        h += bulletsHtml(b.bullets) + "</div>";
      });
      h += "</section>";
    }

    if (R.education && R.education.length) {
      h += '<section class="section"><h2>' + te(L.education) + "</h2>";
      R.education.forEach(function (e) {
        h += '<div class="item"><div class="item-head">' +
             '<h3 class="item-title">' + te(e.degree) + "</h3>" +
             (e.period ? '<span class="item-period">' + te(e.period) + "</span>" : "") +
             "</div>" +
             (e.school ? '<p class="item-sub">' + te(e.school) + "</p>" : "") +
             (e.detail ? "<p>" + te(e.detail) + "</p>" : "") +
             "</div>";
      });
      h += "</section>";
    }

    return '<div class="main">' + h + "</div>";
  }

  /* ---------- วาดหน้าใหม่ทั้งหมด (เรียกซ้ำได้ตอนสลับภาษา) ---------- */
  function render() {
    root.innerHTML = renderSide() + renderMain();
    document.documentElement.lang = lang;
    /* ชื่อแท็บ = ชื่อไฟล์ตั้งต้นตอนสั่งพิมพ์เป็น PDF ด้วย */
    document.title = "Resume — " + t(R.name) + (R.title ? " | " + t(R.title) : "");
    var btn = document.getElementById("lang-toggle");
    /* ปุ่มบอก "ภาษาที่จะสลับไป" ไม่ใช่ภาษาปัจจุบัน จะได้ไม่สับสน */
    btn.textContent = lang === "en" ? "ไทย" : "EN";
    btn.setAttribute("aria-label", lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English");
  }

  render();

  document.getElementById("lang-toggle").addEventListener("click", function () {
    lang = lang === "en" ? "th" : "en";
    try { localStorage.setItem("resume-lang", lang); } catch (e) {}
    render();
  });

  /* ---------- ปุ่มสลับโหมดมืด (จำค่าไว้ใน localStorage) ---------- */
  var themeIcon = document.getElementById("theme-icon");

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function applyTheme(theme) {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
    themeIcon.textContent = (theme ? theme === "dark" : systemPrefersDark()) ? "☀︎" : "🌙";
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem("resume-theme"); } catch (e) {}
  applyTheme(savedTheme);

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var isDark = current ? current === "dark" : systemPrefersDark();
    var next = isDark ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("resume-theme", next); } catch (e) {}
  });

  /* ---------- ปุ่ม PDF = สั่งพิมพ์ แล้วเลือก "Save as PDF" ----------
     พิมพ์ออกมาเป็นภาษาที่กำลังดูอยู่บนจอ */
  document.getElementById("print-btn").addEventListener("click", function () {
    window.print();
  });
})();
