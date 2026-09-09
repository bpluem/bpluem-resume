/* =============================================================
   อ่านข้อมูลจาก window.RESUME (data/resume.js) แล้วสร้าง HTML
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

  /* กันข้อความที่มีอักขระพิเศษ (<, >, &) ทำ HTML พัง */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ไอคอน SVG เล็กๆ ฝังในไฟล์ ไม่ต้องโหลดจากภายนอก = เปิดออฟไลน์ก็ยังเห็น */
  var ICONS = {
    mail:   '<path d="M2 4h12v8H2z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 4l6 4.5L14 4" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    phone:  '<path d="M3 3h3l1.2 3-1.6 1.2a8 8 0 004.2 4.2L11 9.8 14 11v3a11 11 0 01-11-11z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    pin:    '<path d="M8 14s5-4.4 5-8A5 5 0 003 6c0 3.6 5 8 5 8z" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="6" r="1.8" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    github: '<path d="M8 1a7 7 0 00-2.2 13.6c.35.06.48-.15.48-.34v-1.2C4.3 13.4 4 12.3 4 12.3c-.25-.65-.6-.82-.6-.82-.5-.34.04-.33.04-.33.55.04.84.57.84.57.49.84 1.28.6 1.6.46.05-.36.19-.6.35-.74-1.2-.14-2.47-.6-2.47-2.7 0-.6.21-1.08.56-1.46-.06-.14-.24-.7.05-1.45 0 0 .46-.15 1.5.56a5.2 5.2 0 012.74 0c1.04-.71 1.5-.56 1.5-.56.3.75.11 1.31.05 1.45.35.38.56.86.56 1.45 0 2.1-1.27 2.56-2.48 2.7.2.17.37.5.37 1v1.5c0 .2.13.4.48.34A7 7 0 008 1z" fill="currentColor"/>',
    link:   '<path d="M6.5 9.5a3 3 0 004.2 0l2-2a3 3 0 10-4.2-4.2l-.8.8M9.5 6.5a3 3 0 00-4.2 0l-2 2a3 3 0 104.2 4.2l.8-.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  };
  function icon(name) {
    var p = ICONS[name] || ICONS.link;
    return '<svg class="ico" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">' + p + "</svg>";
  }

  /* ---------- แถบซ้าย ---------- */
  function renderSide() {
    var h = "";

    h += '<p class="name">' + esc(R.name) + "</p>";
    if (R.nameEn)  h += '<p class="name-en">' + esc(R.nameEn) + "</p>";
    if (R.title)   h += '<p class="role">' + esc(R.title) + "</p>";
    if (R.tagline) h += '<p class="tagline">' + esc(R.tagline) + "</p>";

    if (R.contacts && R.contacts.length) {
      h += '<div class="side-block"><h2>ติดต่อ</h2><ul class="contact-list">';
      R.contacts.forEach(function (c) {
        var val = c.href
          ? '<a href="' + esc(c.href) + '">' + esc(c.value) + "</a>"
          : esc(c.value);
        h += "<li>" + icon(c.icon) + '<span class="val">' + val + "</span></li>";
      });
      h += "</ul></div>";
    }

    if (R.skillGroups && R.skillGroups.length) {
      h += '<div class="side-block"><h2>ทักษะ</h2>';
      R.skillGroups.forEach(function (g) {
        h += '<div class="skill-group"><h3>' + esc(g.group) + '</h3><div class="tags">';
        (g.items || []).forEach(function (s) { h += '<span class="tag">' + esc(s) + "</span>"; });
        h += "</div></div>";
      });
      h += "</div>";
    }

    if (R.languages && R.languages.length) {
      h += '<div class="side-block"><h2>ภาษา</h2><ul class="lang-list">';
      R.languages.forEach(function (l) {
        h += "<li><strong>" + esc(l.name) + "</strong><span>" + esc(l.level) + "</span></li>";
      });
      h += "</ul></div>";
    }

    return '<aside class="side">' + h + "</aside>";
  }

  /* ---------- เนื้อหาฝั่งขวา ---------- */
  function renderMain() {
    var h = "";

    if (R.summary) {
      h += '<section class="section"><h2>เกี่ยวกับฉัน</h2>' +
           '<p class="summary">' + esc(R.summary) + "</p></section>";
    }

    if (R.experience && R.experience.length) {
      h += '<section class="section"><h2>ประสบการณ์ทำงาน</h2>';
      R.experience.forEach(function (e) {
        h += '<div class="item"><div class="item-head">' +
             '<h3 class="item-title">' + esc(e.role) + "</h3>" +
             (e.period ? '<span class="item-period">' + esc(e.period) + "</span>" : "") +
             "</div>";
        var sub = [e.company, e.location].filter(Boolean).map(esc).join(" · ");
        if (sub) h += '<p class="item-sub">' + sub + "</p>";
        if (e.bullets && e.bullets.length) {
          h += "<ul>";
          e.bullets.forEach(function (b) { h += "<li>" + esc(b) + "</li>"; });
          h += "</ul>";
        }
        h += "</div>";
      });
      h += "</section>";
    }

    if (R.projects && R.projects.length) {
      h += '<section class="section"><h2>ผลงาน</h2><div class="project-grid">';
      R.projects.forEach(function (p) {
        h += '<article class="project"><h3>' +
             (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.name) + "</a>"
                     : esc(p.name)) + "</h3>";
        if (p.role) h += '<p class="prole">' + esc(p.role) + "</p>";
        if (p.description) h += "<p>" + esc(p.description) + "</p>";
        if (p.tags && p.tags.length) {
          h += '<div class="tags">';
          p.tags.forEach(function (t) { h += '<span class="tag">' + esc(t) + "</span>"; });
          h += "</div>";
        }
        h += "</article>";
      });
      h += "</div></section>";
    }

    if (R.education && R.education.length) {
      h += '<section class="section"><h2>การศึกษา</h2>';
      R.education.forEach(function (e) {
        h += '<div class="item"><div class="item-head">' +
             '<h3 class="item-title">' + esc(e.degree) + "</h3>" +
             (e.period ? '<span class="item-period">' + esc(e.period) + "</span>" : "") +
             "</div>";
        if (e.school) h += '<p class="item-sub">' + esc(e.school) + "</p>";
        if (e.detail) h += "<p>" + esc(e.detail) + "</p>";
        h += "</div>";
      });
      h += "</section>";
    }

    if (R.certificates && R.certificates.length) {
      h += '<section class="section"><h2>ใบรับรอง / คอร์สอบรม</h2>';
      R.certificates.forEach(function (c) {
        h += '<div class="item"><div class="item-head">' +
             '<h3 class="item-title">' + esc(c.name) + "</h3>" +
             (c.year ? '<span class="item-period">' + esc(c.year) + "</span>" : "") +
             "</div>" +
             (c.issuer ? '<p class="item-sub">' + esc(c.issuer) + "</p>" : "") +
             "</div>";
      });
      h += "</section>";
    }

    return '<div class="main">' + h + "</div>";
  }

  root.innerHTML = renderSide() + renderMain();

  /* ชื่อบนแท็บเบราว์เซอร์ให้ตรงกับข้อมูลจริง (มีผลกับชื่อไฟล์ PDF ตอนสั่งพิมพ์ด้วย) */
  document.title = "Resume — " + R.name + (R.title ? " | " + R.title : "");

  /* ---------- ปุ่มสลับโหมดมืด (จำค่าไว้ใน localStorage) ---------- */
  var toggle = document.getElementById("theme-toggle");
  var themeIcon = document.getElementById("theme-icon");

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function applyTheme(theme) {
    if (theme) document.documentElement.setAttribute("data-theme", theme);
    else document.documentElement.removeAttribute("data-theme");
    var isDark = theme ? theme === "dark" : systemPrefersDark();
    themeIcon.textContent = isDark ? "☀︎" : "🌙";
  }

  var saved = null;
  try { saved = localStorage.getItem("resume-theme"); } catch (e) { /* โหมดส่วนตัวอาจอ่านไม่ได้ */ }
  applyTheme(saved);

  toggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var isDark = current ? current === "dark" : systemPrefersDark();
    var next = isDark ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("resume-theme", next); } catch (e) {}
  });

  /* ---------- ปุ่ม PDF = สั่งพิมพ์ แล้วเลือก "Save as PDF" ---------- */
  document.getElementById("print-btn").addEventListener("click", function () {
    window.print();
  });
})();
