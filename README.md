# Peca Journal

A production-ready fullstack newsroom and travel publishing platform built with Next.js App Router, Prisma, and PostgreSQL. It includes authentication, role-based access control, analytics, SEO tooling, and a polished editorial UI.

## Features
- Next.js App Router + TypeScript + Tailwind + shadcn/ui
- Auth with NextAuth + RBAC roles (ADMIN, EDITOR, READER)
- Prisma ORM + PostgreSQL (Neon/Supabase compatible)
- Editorial publishing workflow with categories, tags, and post status
- Post views analytics with daily aggregation
- Newsletter subscriptions with unsubscribe tokens
- Contact submissions moderation pipeline
- SEO: dynamic metadata, RSS, sitemap, robots
- Dark mode with persisted preference
- Search with debounced queries and highlighting
- Rate limiting on public write endpoints
- Docker Compose for local Postgres

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Prisma ORM
- PostgreSQL
- NextAuth
- UploadThing (image uploads)
- Vitest + Testing Library
- NewsAPI (external travel/culture feed)

## Local Setup

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment
Create a `.env` file from the template:
```bash
cp .env.example .env
```

Set `NEWS_API_KEY` to pull external headlines (optional). If omitted, the UI falls back to seeded posts.

### 3) Start PostgreSQL (Docker)
```bash
docker compose up -d
```

### 4) Apply migrations + seed
```bash
npx prisma migrate dev
npx prisma db seed
```

### 5) Run the app
```bash
npm run dev
```

## Database
- Local development uses Docker Postgres with `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/peca`.
- Production should point `DATABASE_URL` to Neon or Supabase.

## Docker (DB only)
```bash
docker compose up -d
npx prisma migrate dev
npx prisma db seed
```

## Prisma Commands
```bash
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

## Demo Credentials
- Admin: `admin@peca.dev` / `password123`
- Editor: `editor@peca.dev` / `password123`
- Reader: `reader@peca.dev` / `password123`

## Deployment (Vercel + Neon/Supabase)
1. Create a Postgres database on Neon or Supabase.
2. Set `DATABASE_URL` and `NEXTAUTH_SECRET` in Vercel.
3. Set UploadThing env vars (`UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`).
4. Deploy via Vercel.
5. Run `npx prisma migrate deploy` during build or via Vercel build command.

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
```

## Notes
- Security headers are configured in `next.config.mjs`.
- Rate limiting is implemented for newsletter and contact routes.
