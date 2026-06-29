# CLAUDE.md

Guidance for Claude Code (and developers) working in this repository.

## Project

**St. Paul's Hospital of Iloilo (SPHI)** — a hospital portal (patient / doctor / staff / admin)
plus a public website, with a companion mobile-app experience.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn (`base-nova` style) on `@base-ui/react` · Lucide icons · Sonner toasts · `next-themes` ·
Prisma 7 + PostgreSQL (`@prisma/adapter-pg`) · NextAuth v5 (credentials) · `react-hook-form` + `zod`.

## Design system — read this before building any UI

**All UI work MUST follow [`docs/design-system.md`](docs/design-system.md)** — the authoritative
reference for tokens, components, and patterns.

- **Reuse existing components** from `src/components/ui/` (primitives) and
  `src/components/shared/` (StatusBadge, SearchInput). Do not re-implement them.
- **Never hardcode colors / fonts / radii.** Use the semantic Tailwind tokens
  (`bg-primary`, `text-muted-foreground`, `rounded-xl`, …) defined in `src/app/globals.css`.
  This is what makes light/dark themes work automatically.
- **Rendered reference:** the [`/kitchen-sink`](src/app/kitchen-sink/page.tsx) page shows every
  token, component, and pattern live (light/dark toggle). When you add a token/component/pattern,
  update `docs/design-system.md` **and** the `/kitchen-sink` showcase.

## Commands

```bash
npm run dev        # start dev server (http://localhost:3000)
npm run build      # prisma generate + next build
npm run start      # prisma migrate deploy + next start (production)
npm run lint       # eslint
npm run db:migrate # prisma migrate dev
npm run db:seed    # seed the database
npm run db:studio  # prisma studio
```

> Note: `prisma generate` / `build` require network access to fetch Prisma binaries. The
> `/kitchen-sink` page and other client UI have no DB dependency.

## Architecture

- **Routing:** App Router with route groups `src/app/(auth)/*` (login, register) and
  `src/app/(dashboard)/*` (authenticated app). API routes under `src/app/api/*`.
- **Auth:** NextAuth v5 — config split across `src/auth.ts` (full, with DB) and
  `src/auth.config.ts` (edge-safe). Route protection in `src/middleware.ts`
  (note: `/kitchen-sink` is intentionally public).
- **Theming:** `next-themes` provider in `src/app/layout.tsx` via `@/components/theme-provider`
  (`attribute="class"`, default light). Toggle by swapping the `.dark` class — components use
  semantic tokens and adapt automatically.
- **Data:** Prisma schema in `prisma/schema.prisma`; client generated to `src/generated/prisma`
  and re-exported from `@/lib/db`. Shared enums/types in `@/lib/types`.
- **Validation:** zod schemas in `src/lib/validations/*`, used with `react-hook-form`.
- **Utilities:** `cn()` for class merging from `@/lib/utils`. Path aliases (`@/components`,
  `@/components/ui`, `@/lib`, …) are defined in `components.json` / `tsconfig.json`.

## Conventions

- Add `"use client"` only when a component needs state, effects, or browser APIs; prefer Server
  Components for pages/data.
- Compose new domain components from `ui/` primitives under `src/components/<domain>/`.
- The SPH logo uses a plain `<img src="/sphlogo.png" />` (established convention; the lint
  `no-img-element` warnings on it are expected).
- Run `npm run lint` before committing.
