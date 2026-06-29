# SPH Design System

**The authoritative reference for building UI in this project.**
St. Paul's Hospital of Iloilo (SPHI) app & website — a calm, clinical "medical-luxe" design
language built on a teal OKLCH palette.

> **Rendered companion:** run `npm run dev` and open [`/kitchen-sink`](http://localhost:3000/kitchen-sink)
> to see every token, component, and pattern in this document live (with a light/dark toggle).

---

## 1. How to use this document

- **This is the single source of truth for UI.** Before building any screen, read the relevant
  sections here and reuse what already exists.
- **Reuse, don't re-implement.** All primitives live in `src/components/ui/`; shared building
  blocks in `src/components/shared/`. Do not hand-roll a button, card, input, etc.
- **Tokens, not literals.** Never hardcode a hex/oklch color, font, or radius in a component.
  Use the semantic Tailwind classes that map to the tokens (`bg-primary`,
  `text-muted-foreground`, `rounded-xl`, …). This is what makes light/dark work for free.
- **Source of truth for tokens:** `src/app/globals.css`. If a value here ever disagrees with
  `globals.css`, `globals.css` wins — update this doc.
- **Living examples:** `src/components/kitchen-sink/*` (showcase), and the real feature code in
  `src/app/(dashboard)/*` and `src/components/{patients,doctors,auth,layout}/*`.

---

## 2. Design principles

1. **Calm clinical teal.** One dominant brand hue (teal/green, hue ≈165 in OKLCH) carries the
   identity. Color is used purposefully, not decoratively.
2. **Soft elevation.** Cards and surfaces use a hairline ring (`ring-1 ring-foreground/10`)
   and gentle shadows rather than heavy borders.
3. **Generous radius.** Rounded, friendly geometry from a single `--radius` token.
4. **Restrained motion.** Short, purposeful entrance animations only (fade / slide-up).
5. **Icon-led IA.** Lucide icons accompany labels for fast scanning in a data-dense product.
6. **Accessible by default.** Interactive components are built on Base UI primitives
   (`@base-ui/react`) — keyboard nav, focus rings, ARIA come for free. Preserve them.
7. **Light default, full dark support.** Default theme is light; every token has a dark value.
8. **Mobile-first & responsive.** The same components serve a phone-width app and a desktop
   website. Design at ~390px first, enhance upward.

---

## 3. Color tokens

All colors are **OKLCH** semantic tokens defined in `src/app/globals.css` and exposed to
Tailwind via the `@theme inline` block (so `--primary` is usable as `bg-primary`,
`text-primary`, `border-primary`, etc.). **Always use the semantic class — never the raw value.**

### Light (`:root`)

| Token | Class examples | OKLCH | Use |
|---|---|---|---|
| `background` | `bg-background` | `0.975 0.003 160` | App background |
| `foreground` | `text-foreground` | `0.18 0.03 165` | Primary text |
| `card` | `bg-card` | `1 0 0` | Card/surface background |
| `card-foreground` | `text-card-foreground` | `0.18 0.03 165` | Text on cards |
| `popover` | `bg-popover` | `1 0 0` | Menus, dropdowns, dialogs |
| `popover-foreground` | `text-popover-foreground` | `0.18 0.03 165` | Text in popovers |
| `primary` | `bg-primary` | `0.38 0.09 165` | Brand actions, emphasis |
| `primary-foreground` | `text-primary-foreground` | `0.985 0 0` | Text/icons on primary |
| `secondary` | `bg-secondary` | `0.96 0.015 165` | Subtle tinted surfaces |
| `secondary-foreground` | `text-secondary-foreground` | `0.30 0.06 165` | Text on secondary |
| `muted` | `bg-muted` | `0.96 0.01 165` | Quiet backgrounds |
| `muted-foreground` | `text-muted-foreground` | `0.50 0.03 165` | Secondary/helper text |
| `accent` | `bg-accent` | `0.94 0.025 165` | Hover/active surfaces |
| `accent-foreground` | `text-accent-foreground` | `0.30 0.06 165` | Text on accent |
| `destructive` | `text-destructive`, `bg-destructive` | `0.577 0.245 27.325` | Errors, destructive actions |
| `border` | `border-border` | `0.92 0.01 165` | Hairline borders |
| `input` | `border-input` | `0.92 0.01 165` | Form control borders |
| `ring` | `ring-ring` | `0.38 0.09 165` | Focus rings |
| `chart-1…5` | `bg-chart-1` … | `0.55→0.32 · 0.12→0.07 · 165` | Data viz (teal ramp) |
| `sidebar` | `bg-sidebar` | `0.22 0.05 165` | Dark sidebar surface |
| `sidebar-foreground` | `text-sidebar-foreground` | `0.92 0.01 165` | Sidebar text |
| `sidebar-primary` | `bg-sidebar-primary` | `0.55 0.12 165` | Active nav item |
| `sidebar-accent` | `bg-sidebar-accent` | `0.28 0.06 165` | Sidebar hover |
| `sidebar-border` | `border-sidebar-border` | `0.30 0.05 165` | Sidebar dividers |

### Dark (`.dark`)

| Token | OKLCH | Notes |
|---|---|---|
| `background` | `0.16 0.02 165` | Very dark teal |
| `foreground` | `0.95 0.01 165` | Near-white |
| `card` / `popover` | `0.20 0.03 165` | Raised surfaces |
| `primary` | `0.55 0.12 165` | **Brighter** teal in dark |
| `secondary` / `muted` / `accent` | `0.25 0.04 165` | Dark tinted surfaces |
| `muted-foreground` | `0.65 0.05 165` | |
| `destructive` | `0.704 0.191 22.216` | Brighter red |
| `border` | `1 0 0 / 10%` | Translucent white |
| `input` | `1 0 0 / 15%` | Translucent white |
| `ring` | `0.55 0.12 165` | |
| `chart-1…5` | `0.60→0.32 · 0.13→0.07 · 165` | |
| `sidebar` | `0.18 0.03 165` | |

> **Do:** `className="bg-primary text-primary-foreground"`.
> **Don't:** `style={{ background: "#0c5b46" }}` or `className="bg-[oklch(0.38_0.09_165)]"`.

---

## 4. Typography

Fonts are loaded in `src/app/layout.tsx` and exposed as `--font-sans` / `--font-mono`.

- **Sans (UI):** Geist — `font-sans` (default on `body`). Chain: `Geist, ui-sans-serif, system-ui, sans-serif`.
- **Mono (data/IDs):** Geist Mono — `font-mono`.

Recommended scale (Tailwind classes):

| Role | Classes |
|---|---|
| Page title (h1) | `text-3xl font-bold tracking-tight sm:text-4xl` |
| Section (h2) | `text-2xl font-semibold tracking-tight` |
| Subsection (h3) | `text-xl font-semibold` |
| Card title | `text-base font-medium` (via `CardTitle`) |
| Body | `text-sm` (component default) / `text-base` (marketing) |
| Helper / secondary | `text-sm text-muted-foreground` |
| Mono / IDs | `font-mono text-sm` |

Weights: `font-normal` · `font-medium` · `font-semibold` · `font-bold`.

---

## 5. Radius & elevation

Single source token: `--radius: 0.625rem` (10px). Scale (from `@theme`):

| Class | Value |
|---|---|
| `rounded-sm` | `--radius × 0.6` |
| `rounded-md` | `--radius × 0.8` |
| `rounded-lg` | `--radius` (10px) |
| `rounded-xl` | `--radius × 1.4` |
| `rounded-2xl` | `--radius × 1.8` |
| `rounded-3xl` | `--radius × 2.2` |
| `rounded-4xl` | `--radius × 2.6` |

**Elevation recipe:** surfaces use a hairline ring rather than borders —
`rounded-xl bg-card ring-1 ring-foreground/10`, with `shadow-md`/`shadow-lg` for popovers and
hover states. Buttons/inputs are `rounded-lg`; pills/badges are `rounded-4xl`.

---

## 6. Spacing & responsive layout

- **Mobile-first.** Author for ~390px, then layer `sm:` / `md:` / `lg:` enhancements.
- **Breakpoints:** the dashboard sidebar appears at `md` (256px / `w-64`); below that, a
  hamburger/mobile nav is used.
- **Page width:** content sections use a centered container, typically `mx-auto max-w-6xl px-4 sm:px-6`
  (marketing/showcase) or full-width within the dashboard shell.
- **Card grids:** `grid gap-4` with `sm:grid-cols-2` / `md:grid-cols-3` etc.

---

## 7. Motion

Defined in `globals.css` as `@keyframes` + `--animate-*` utilities. Apply sparingly for entrance.

| Class | Effect | Use |
|---|---|---|
| `animate-fade-in` | opacity 0→1 (0.5s) | Page/section reveal |
| `animate-slide-up` | fade + translateY(12px→0) (0.5s) | Cards, stat tiles (stagger with `style={{ animationDelay }}`) |
| `animate-slide-in-left` | fade + translateX(-12px→0) (0.4s) | Side panels, nav |

Keep transitions short (`transition-all`/`transition-colors`); avoid continuous/looping motion.

---

## 8. Component library (`src/components/ui/`)

Import via the `@/components/ui/*` alias. Class merging uses `cn()` from `@/lib/utils`.
All components accept `className` to extend styles. Interactive ones wrap `@base-ui/react`.

### Button — `@/components/ui/button`
- **Variants:** `default` · `outline` · `secondary` · `ghost` · `destructive` · `link`
- **Sizes:** `default` (h-8) · `xs` · `sm` · `lg` · `icon` · `icon-xs` · `icon-sm` · `icon-lg`
- Icons go inline as children (`<Plus />`); default icon size is `size-4`.

```tsx
<Button>Save patient</Button>
<Button variant="outline" size="sm"><Plus /> Add</Button>
<Button variant="destructive">Reject</Button>
<Button size="icon" aria-label="Settings"><Settings /></Button>
```
**Do** give icon-only buttons an `aria-label`. **Don't** nest a native `<button>` — it already renders one.

### Badge — `@/components/ui/badge`
- **Variants:** `default` · `secondary` · `destructive` · `outline` · `ghost` · `link`
- Pill shape (`rounded-4xl`, `h-5`); supports a leading icon.

```tsx
<Badge>Verified</Badge>
<Badge variant="secondary">Cardiology</Badge>
```

### Card — `@/components/ui/card`
Slots: `Card` (prop `size?: "default" | "sm"`), `CardHeader`, `CardTitle`, `CardDescription`,
`CardAction` (top-right slot), `CardContent`, `CardFooter`. `rounded-xl`, `ring-1 ring-foreground/10`.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Total patients</CardTitle>
    <CardAction><Users className="size-5 text-primary" /></CardAction>
  </CardHeader>
  <CardContent><p className="text-3xl font-bold">1,284</p></CardContent>
  <CardFooter><Button variant="link" className="px-0">View all</Button></CardFooter>
</Card>
```

### Input — `@/components/ui/input`
`h-8`, `rounded-lg`, `border-input`. Invalid state via `aria-invalid`; disabled supported.

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@email.com" />
</div>
```

### Label — `@/components/ui/label`
Pair with controls via `htmlFor`. `text-sm font-medium`.

### Select — `@/components/ui/select` (Base UI Select)
Parts: `Select` (root), `SelectTrigger` (prop `size?: "sm" | "default"`), `SelectValue`,
`SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`.

```tsx
<Select defaultValue="O+" onValueChange={(v) => setValue("bloodType", v)}>
  <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="O+">O+</SelectItem>
    <SelectItem value="A+">A+</SelectItem>
  </SelectContent>
</Select>
```

### DropdownMenu — `@/components/ui/dropdown-menu` (Base UI Menu)
Parts: `DropdownMenu`, `DropdownMenuTrigger` (use `render={<Button .../>}`), `DropdownMenuContent`
(`align`/`side`/`sideOffset`), `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`
(`variant?: "default" | "destructive"`, `inset`), `DropdownMenuCheckboxItem`,
`DropdownMenuRadioGroup`/`DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`,
`DropdownMenuSub*`.

```tsx
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>Menu</DropdownMenuTrigger>
  <DropdownMenuContent className="w-52">
    <DropdownMenuItem><User /> Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dialog — `@/components/ui/dialog` (Base UI Dialog)
Parts: `Dialog`, `DialogTrigger` (use `render={<Button .../>}`), `DialogContent`
(`showCloseButton` default true), `DialogHeader`, `DialogTitle`, `DialogDescription`,
`DialogFooter` (`showCloseButton` opt-in), `DialogClose` (use `render` to style as a Button).

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm appointment</DialogTitle>
      <DialogDescription>Book with Dr. Villanueva?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      <DialogClose render={<Button />}>Confirm</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Avatar — `@/components/ui/avatar`
Parts: `Avatar` (`size?: "default" | "sm" | "lg"`), `AvatarImage`, `AvatarFallback`,
`AvatarBadge` (presence dot), `AvatarGroup`, `AvatarGroupCount`.

```tsx
<Avatar><AvatarImage src={url} alt="Dr. Tan" /><AvatarFallback>CT</AvatarFallback></Avatar>
```

### Table — `@/components/ui/table`
Parts: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`,
`TableCaption`. Use for admin/staff roster views; on small screens prefer a card list (see
`patient-list-table.tsx`).

### Separator — `@/components/ui/separator`
`orientation?: "horizontal" | "vertical"` (default horizontal). For vertical, the parent needs a height.

### Skeleton — `@/components/ui/skeleton`
`animate-pulse rounded-md bg-muted`. Use to reserve layout while loading.

```tsx
<Skeleton className="h-4 w-1/3" />
```

### Toaster / `toast` — `@/components/ui/sonner` (Sonner)
`<Toaster />` is already mounted globally in `src/app/layout.tsx` and is theme-aware. Trigger
toasts from any client component by importing `toast` from `sonner`:

```tsx
import { toast } from "sonner";
toast.success("Patient approved");
toast.error("Failed to save record");
toast.promise(saveRecord(), { loading: "Saving…", success: "Saved", error: "Failed" });
```
Variants `success | info | warning | error | loading` have preset icons. Don't add another `<Toaster/>`.

---

## 9. Shared components (`src/components/shared/`)

- **`StatusBadge`** — `@/components/shared/status-badge`. Prop `status: "PENDING" | "APPROVED" | "REJECTED"`
  (from `@/lib/types`). Renders a colored outline badge (amber/green/red). Use everywhere account
  status is shown.
- **`SearchInput`** — `@/components/shared/search-input`. Props `value`, `onChange(value)`,
  `placeholder?`. Controlled search field used in directories/lists.

---

## 10. Iconography

- Library: **Lucide** (`lucide-react`). Default size `size-4` (16px); `size-5` for emphasis.
- Color follows context: `text-primary` for accents, `text-muted-foreground` for quiet icons,
  inherit on colored surfaces.
- Common medical/product set: `Stethoscope, Heart, HeartPulse, Activity, Thermometer, Weight,
  Syringe, QrCode, Calendar, Bell, User, Users, Shield, FileText, Mail, Phone, MapPin, Settings,
  Search, FlaskConical, ScanLine, Brain`.

---

## 11. Page & screen patterns

Reuse these established layouts rather than inventing new ones.

**Dashboard / app (`src/app/(dashboard)/*`, `src/components/patients/*`)**
- **Stat cards:** `Card` with `CardTitle` + `CardAction` icon + large `text-3xl font-bold` value.
- **Vitals grid:** 2-col grid of `bg-primary text-primary-foreground rounded-2xl` tiles, each with
  a decorative `bg-white/10` circle, icon, label, and value+unit. Stagger with `animate-slide-up`.
  See `src/components/patients/vitals-grid.tsx`.
- **QR card:** gradient accent bar + centered `QRCodeSVG` (`qrcode.react`). See `patient-qr-card.tsx`.
- **List table:** responsive — `Table` on desktop, stacked cards on mobile (`patient-list-table.tsx`).
- **Directory grid:** `SearchInput` + filter `Select`, responsive `DoctorCard` grid.

**Auth (`src/app/(auth)/*`)**
- Split-screen: branded teal panel (logo, tagline, decorative circles) + centered form `Card`
  with `animate-slide-up`.

**Website (marketing) — see `src/components/kitchen-sink/website-preview.tsx`**
- Sticky nav (logo on `bg-white/90` chip) → hero (`bg-primary`, tagline, CTAs) → **Online Result
  Viewer** 6-card grid → stats band (`bg-secondary`) → Specialty Hub cards → News cards → footer
  (`bg-sidebar text-sidebar-foreground`).

**Mobile app frame — see `src/components/kitchen-sink/{phone-frame,app-preview}.tsx`**
- `PhoneFrame` (bezel, notch, status bar, home indicator) + bottom tab bar. Screens reuse the
  dashboard/vitals/directory/profile patterns above at phone width.

---

## 12. Theming

- Provider: `next-themes` via `@/components/theme-provider`, mounted in `src/app/layout.tsx`
  with `attribute="class"`, `defaultTheme="light"`, `enableSystem`. `<html>` has
  `suppressHydrationWarning`.
- Strategy: the `.dark` class on `<html>` swaps the token values; **components don't branch on
  theme** — they use semantic classes and adapt automatically.
- Toggle pattern (no hydration mismatch): render both icons and swap with CSS —
  `<Moon className="dark:hidden" /><Sun className="hidden dark:block" />` — see
  `src/app/kitchen-sink/page.tsx`.
- **Rule:** if a new color is needed, add a semantic token (light + dark) in `globals.css` and
  reference it by name; never inline a theme-specific literal.

---

## 13. Build conventions

- **Reuse `ui/` primitives**; compose new domain components from them under
  `src/components/<domain>/`.
- **`cn()`** from `@/lib/utils` for conditional/merged class names.
- **`"use client"`** only when a component needs state, effects, or browser APIs; keep pages as
  Server Components where possible.
- **Forms:** `react-hook-form` + `zod` resolvers; schemas live in `src/lib/validations/*`.
- **Routing:** App Router with route groups `(auth)` and `(dashboard)`; protect routes in
  `src/middleware.ts`; auth in `src/auth.ts` / `src/auth.config.ts`.
- **Data:** Prisma client via `@/lib/db`; types/enums in `@/lib/types`.
- **Images:** the SPH logo uses a plain `<img>` (established project convention) — `<img src="/sphlogo.png" />`.
- **Path aliases:** `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils` (see `components.json`).

---

## 14. Living references

| What | Where |
|---|---|
| Rendered showcase (all of the above, interactive) | `/kitchen-sink` → `src/app/kitchen-sink/page.tsx` |
| Token definitions | `src/app/globals.css` |
| UI primitives | `src/components/ui/` |
| Shared components | `src/components/shared/` |
| Showcase / framing components | `src/components/kitchen-sink/` |
| Real feature patterns | `src/components/{patients,doctors,auth,layout}/`, `src/app/(dashboard)/` |

> Keep this document in sync with `globals.css` and `src/components/ui/*`. When you add a token,
> component, or pattern, document it here **and** add it to the `/kitchen-sink` showcase.
