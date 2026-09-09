# Resume Site

เว็บ resume แบบ static (HTML/CSS/JS ล้วน) ไม่มี build step ไม่มี dependency
เปิดไฟล์ `index.html` ด้วยเบราว์เซอร์ก็ใช้งานได้เลย

## แก้ข้อมูลของตัวเอง

แก้ไฟล์เดียว: [`data/resume.js`](data/resume.js)
ทุกหัวข้อ (ชื่อ, ติดต่อ, ทักษะ, ประสบการณ์, ผลงาน, การศึกษา) อยู่ในไฟล์นั้นทั้งหมด
แก้เสร็จกด refresh ในเบราว์เซอร์ก็เห็นผลทันที

หัวข้อไหนไม่อยากแสดง — ลบ array นั้นทิ้ง หรือทำให้เป็น `[]` ได้เลย ระบบจะข้ามให้เอง

## ดูหน้าเว็บบนเครื่อง

```bash
# วิธีที่ 1: เปิดไฟล์ตรงๆ
open index.html

# วิธีที่ 2: รันเซิร์ฟเวอร์เล็กๆ (เหมือนตอนอยู่บนเว็บจริงมากกว่า)
npx serve .
```

## บันทึกเป็น PDF

กดปุ่ม **PDF** มุมขวาบน (หรือ `Cmd + P`) แล้วเลือกปลายทางเป็น "Save as PDF"
หน้าเว็บมี print stylesheet อยู่แล้ว — ตอนพิมพ์จะบังคับเป็นโหมดสว่าง ขนาด A4 และซ่อนปุ่มต่างๆ ให้อัตโนมัติ

## ขึ้น GitHub Pages

1. สร้าง repo ว่างบน GitHub (public)
2. ในโฟลเดอร์นี้:
   ```bash
   git add .
   git commit -m "Add resume site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. บน GitHub: **Settings → Pages → Source = Deploy from a branch → Branch = main / (root) → Save**
4. รอ 1-2 นาที เว็บจะขึ้นที่ `https://<username>.github.io/<repo>/`

## โครงสร้างไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| `data/resume.js` | ข้อมูล resume ทั้งหมด — **แก้ที่นี่** |
| `index.html` | โครงหน้าเว็บ + โหลดฟอนต์ |
| `assets/style.css` | สไตล์ทั้งหมด รวมโหมดมืดและโหมดพิมพ์ (เปลี่ยนสีธีมที่ตัวแปร `--accent`) |
| `assets/main.js` | โค้ดที่แปลงข้อมูลเป็น HTML + ปุ่มโหมดมืด/PDF |
| `.nojekyll` | บอก GitHub Pages ว่าไม่ต้องประมวลผลด้วย Jekyll |
