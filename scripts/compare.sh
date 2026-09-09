#!/usr/bin/env bash
# ===================================================================
# เปิดเว็บ 2 เวอร์ชันคู่กันในเบราว์เซอร์ เพื่อเทียบว่าอะไรเปลี่ยนไปบ้าง
#
#   ./scripts/compare.sh v1 main      # เทียบ v1 กับของที่กำลังทำอยู่
#   ./scripts/compare.sh v1 v2        # เทียบ 2 เวอร์ชันเก่า
#
# กด Ctrl+C เพื่อปิดเซิร์ฟเวอร์ทั้งสองตัว
# ===================================================================
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSIONS_DIR="$(dirname "$REPO_DIR")/resume-versions"

A="${1:-}"; B="${2:-main}"

if [ -z "$A" ]; then
  echo "ใช้แบบนี้: ./scripts/compare.sh <เวอร์ชัน A> [เวอร์ชัน B]"
  echo "เวอร์ชันที่เปิดดูได้ตอนนี้:"
  git -C "$REPO_DIR" worktree list | sed 's/^/  /'
  exit 1
fi

# แปลงชื่อเวอร์ชัน -> โฟลเดอร์จริง ("main" หมายถึงโฟลเดอร์งานหลักที่กำลังแก้อยู่)
path_of() {
  if [ "$1" = "main" ]; then echo "$REPO_DIR"
  elif [ -d "$VERSIONS_DIR/$1" ]; then echo "$VERSIONS_DIR/$1"
  else
    echo "❌ ไม่พบเวอร์ชัน '$1' — สร้างโฟลเดอร์ของมันก่อนด้วย:" >&2
    echo "   git worktree add $VERSIONS_DIR/$1 $1" >&2
    exit 1
  fi
}

DIR_A="$(path_of "$A")"
DIR_B="$(path_of "$B")"

# สรุปความต่างเป็นตัวหนังสือก่อน จะได้รู้ว่าควรมองตรงไหน
echo "════════ ไฟล์ที่ต่างกันระหว่าง $A กับ $B ════════"
git -C "$REPO_DIR" diff --stat "$A" "$B" -- . || true
echo "═══════════════════════════════════════════════"
echo ""

cleanup() { kill %1 %2 2>/dev/null || true; echo ""; echo "ปิดเซิร์ฟเวอร์แล้ว"; }
trap cleanup EXIT

(cd "$DIR_A" && python3 -m http.server 8801 >/dev/null 2>&1) &
(cd "$DIR_B" && python3 -m http.server 8802 >/dev/null 2>&1) &
sleep 1

echo "$A  → http://localhost:8801"
echo "$B  → http://localhost:8802"
open "http://localhost:8801" "http://localhost:8802" 2>/dev/null || true
echo ""
echo "กด Ctrl+C เพื่อปิด"
wait
