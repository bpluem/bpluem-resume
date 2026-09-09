#!/usr/bin/env bash
# ===================================================================
# ใส่รูปโปรไฟล์ลงเว็บ — รับไฟล์อะไรก็ได้ (jpg/png/heic) ขนาดเท่าไหร่ก็ได้
#
#   ./scripts/set-photo.sh ~/Desktop/IMG_1234.HEIC
#
# สิ่งที่มันทำ:
#   1. แปลงเป็น JPEG (รองรับ .heic จาก iPhone)
#   2. ครอบให้เป็นสี่เหลี่ยมจัตุรัสจากกึ่งกลาง แล้วย่อเหลือ 600x600
#   3. วางเป็น assets/profile.jpg ให้พร้อมใช้
# ใช้ sips ซึ่งติดมากับ macOS อยู่แล้ว ไม่ต้องลงโปรแกรมเพิ่ม
# ===================================================================
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${1:-}"
OUT="$REPO_DIR/assets/profile.jpg"

if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
  echo "ใช้แบบนี้: ./scripts/set-photo.sh <path ของไฟล์รูป>"
  echo "ตัวอย่าง: ./scripts/set-photo.sh ~/Desktop/IMG_1234.jpg"
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "▶ อ่านรูปต้นฉบับ: $SRC"
sips -s format jpeg "$SRC" --out "$TMP/step1.jpg" >/dev/null

W=$(sips -g pixelWidth  "$TMP/step1.jpg" | awk '/pixelWidth/{print $2}')
H=$(sips -g pixelHeight "$TMP/step1.jpg" | awk '/pixelHeight/{print $2}')
echo "   ขนาดเดิม ${W}x${H}"

# ครอบเป็นจัตุรัสด้วยด้านที่สั้นกว่า (sips ครอบจากกึ่งกลางให้เอง)
SIDE=$(( W < H ? W : H ))
sips -c "$SIDE" "$SIDE" "$TMP/step1.jpg" --out "$TMP/step2.jpg" >/dev/null
echo "   ครอบเป็นจัตุรัส ${SIDE}x${SIDE}"

# ย่อเหลือ 600px — ใหญ่พอสำหรับจอ Retina แต่ไฟล์ไม่หนัก
sips -Z 600 "$TMP/step2.jpg" --out "$OUT" >/dev/null
echo "   ย่อเหลือ 600x600"

echo ""
echo "✅ วางไว้ที่ assets/profile.jpg แล้ว ($(du -h "$OUT" | cut -f1))"
echo ""
echo "ขั้นต่อไป — ดูผลแล้วค่อยส่งขึ้นเว็บ:"
echo "   open $REPO_DIR/index.html"
echo "   git add assets/profile.jpg && git commit -m \"Add profile photo\" && git push"
