#!/usr/bin/env bash
# ===================================================================
# บันทึก "เวอร์ชัน" ของ resume ณ ตอนนี้ แล้วเปิดเป็นโฟลเดอร์แยกไว้เทียบ
#
#   ./scripts/snapshot.sh v2 "เพิ่มข้อมูลจริง ตัดเบอร์โทรออก"
#
# สิ่งที่มันทำ 3 อย่าง:
#   1. ปัก tag ที่ commit ล่าสุด  = หมุดเวอร์ชันถาวร
#   2. สร้าง worktree            = โฟลเดอร์ของเวอร์ชันนั้นไว้เปิดดู
#   3. push tag ขึ้น GitHub      = เห็นในหน้า Tags/Releases ของ repo
# ===================================================================
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSIONS_DIR="$(dirname "$REPO_DIR")/resume-versions"

VERSION="${1:-}"
MESSAGE="${2:-snapshot $VERSION}"

if [ -z "$VERSION" ]; then
  echo "ใช้แบบนี้: ./scripts/snapshot.sh <ชื่อเวอร์ชัน> [\"คำอธิบาย\"]"
  echo "ตัวอย่าง: ./scripts/snapshot.sh v2 \"ใส่ข้อมูลจริงแล้ว\""
  echo ""
  echo "เวอร์ชันที่มีอยู่แล้ว:"
  git -C "$REPO_DIR" tag -n1 | sed 's/^/  /'
  exit 1
fi

cd "$REPO_DIR"

# กันพลาด 1: ชื่อเวอร์ชันซ้ำของเดิม (tag ที่ push แล้วแก้ยาก จึงไม่ยอมให้ทับ)
if git rev-parse -q --verify "refs/tags/$VERSION" >/dev/null; then
  echo "❌ มี tag '$VERSION' อยู่แล้ว — ตั้งชื่อใหม่ หรือลบของเดิมด้วย:"
  echo "   git tag -d $VERSION && git push origin :refs/tags/$VERSION"
  exit 1
fi

# กันพลาด 2: ยังมีไฟล์ที่แก้แล้วไม่ได้ commit — tag จะไม่รวมงานพวกนั้นไปด้วย
if [ -n "$(git status --porcelain)" ]; then
  echo "⚠️  ยังมีไฟล์ที่แก้แล้วยังไม่ commit:"
  git status --short | sed 's/^/   /'
  echo ""
  echo "   tag จะบันทึกเฉพาะที่ commit แล้วเท่านั้น — commit ก่อนแล้วค่อยรันใหม่:"
  echo "   git add . && git commit -m \"$MESSAGE\""
  exit 1
fi

echo "▶ ปัก tag $VERSION ที่ commit $(git rev-parse --short HEAD)"
git tag -a "$VERSION" -m "$MESSAGE"

echo "▶ สร้างโฟลเดอร์เวอร์ชันที่ $VERSIONS_DIR/$VERSION"
mkdir -p "$VERSIONS_DIR"
git worktree add "$VERSIONS_DIR/$VERSION" "$VERSION"

echo "▶ push tag ขึ้น GitHub"
git push -q origin "$VERSION" && echo "   ขึ้นแล้ว: https://github.com/bpluem/bpluem-resume/releases/tag/$VERSION"

echo ""
echo "✅ เสร็จ — เวอร์ชันทั้งหมดตอนนี้:"
git tag -n1 | sed 's/^/   /'
echo ""
echo "เปิดเทียบ 2 เวอร์ชัน:  ./scripts/compare.sh $VERSION main"
