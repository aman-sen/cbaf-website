#!/bin/bash
set -e
echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  CBAF Website Setup                          ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Rename folders ────────────────────────────────────────────────────────
echo "📁  Renaming route folders..."

do_rename() {
  if [ -d "$1" ] && [ ! -d "$2" ]; then
    mv "$1" "$2"
    echo "    ✓ $(basename "$2")"
  fi
}

do_rename "app/public_routes"                    "app/(public)"
do_rename "app/(public)/campaigns/slug"          "app/(public)/campaigns/[slug]"
do_rename "app/(public)/projects/slug"           "app/(public)/projects/[slug]"
do_rename "app/api/campaigns/id"                 "app/api/campaigns/[id]"
do_rename "app/api/donations/id"                 "app/api/donations/[id]"
do_rename "app/api/projects/id"                  "app/api/projects/[id]"
do_rename "app/api/auth/nextauth"                "app/api/auth/[...nextauth]"

echo ""

# ── Install dependencies ──────────────────────────────────────────────────
echo "📦  Installing dependencies..."
npm install --legacy-peer-deps --silent
echo "    ✓ Done"
echo ""

# ── Prisma ────────────────────────────────────────────────────────────────
echo "🔧  Generating Prisma client..."
npx prisma generate --silent
echo "    ✓ Done"
echo ""

# ── Database ──────────────────────────────────────────────────────────────
echo "🗄️   Checking database connection..."

if grep -q "postgresql://username:password" .env.local 2>/dev/null; then
  echo ""
  echo "  ⚠️  DATABASE_URL not set in .env.local"
  echo ""
  echo "  Steps:"
  echo "  1. Get a free PostgreSQL URL from https://neon.tech"
  echo "  2. Paste it in .env.local as DATABASE_URL=..."
  echo "  3. Run: npm run db:push && npm run db:seed"
  echo "  4. Run: npm run dev"
  echo ""
else
  echo "    Pushing schema..."
  npx prisma db push 2>&1 | tail -5
  echo "    ✓ Schema pushed"
  echo ""
  echo "    Seeding data..."
  npx tsx prisma/seed.ts
  echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  npm run dev"
echo ""
echo "  Website:  http://localhost:3000"
echo "  Admin:    http://localhost:3000/admin"
echo "  Email:    admin@communityfoundation.in"
echo "  Password: admin@cbaf2025"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
