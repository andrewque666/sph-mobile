"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  Bell,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Heart,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Plus,
  QrCode,
  Search,
  Settings,
  Shield,
  Stethoscope,
  Syringe,
  Thermometer,
  TriangleAlert,
  User,
  Users,
  Weight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/shared/status-badge";
import { SearchInput } from "@/components/shared/search-input";
import { Section, Specimen } from "@/components/kitchen-sink/section";
import type { AccountStatus } from "@/lib/types";

/* ---------------------------------- data --------------------------------- */

const COLOR_TOKENS: { name: string; varName: string; fg?: string }[] = [
  { name: "background", varName: "--background", fg: "--foreground" },
  { name: "foreground", varName: "--foreground", fg: "--background" },
  { name: "card", varName: "--card", fg: "--card-foreground" },
  { name: "primary", varName: "--primary", fg: "--primary-foreground" },
  { name: "secondary", varName: "--secondary", fg: "--secondary-foreground" },
  { name: "muted", varName: "--muted", fg: "--muted-foreground" },
  { name: "accent", varName: "--accent", fg: "--accent-foreground" },
  { name: "destructive", varName: "--destructive", fg: "--primary-foreground" },
  { name: "border", varName: "--border", fg: "--foreground" },
  { name: "sidebar", varName: "--sidebar", fg: "--sidebar-foreground" },
  { name: "chart-1", varName: "--chart-1", fg: "--primary-foreground" },
  { name: "chart-2", varName: "--chart-2", fg: "--primary-foreground" },
  { name: "chart-3", varName: "--chart-3", fg: "--primary-foreground" },
  { name: "chart-4", varName: "--chart-4", fg: "--primary-foreground" },
  { name: "chart-5", varName: "--chart-5", fg: "--primary-foreground" },
];

const BUTTON_VARIANTS = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;

const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
] as const;

const STATUSES: AccountStatus[] = ["PENDING", "APPROVED", "REJECTED"];

const RADII = [
  { name: "sm", cls: "rounded-sm" },
  { name: "md", cls: "rounded-md" },
  { name: "lg", cls: "rounded-lg" },
  { name: "xl", cls: "rounded-xl" },
  { name: "2xl", cls: "rounded-2xl" },
  { name: "3xl", cls: "rounded-3xl" },
];

const ICONS: { icon: LucideIcon; label: string }[] = [
  { icon: Stethoscope, label: "Stethoscope" },
  { icon: Heart, label: "Heart" },
  { icon: HeartPulse, label: "HeartPulse" },
  { icon: Activity, label: "Activity" },
  { icon: Thermometer, label: "Thermometer" },
  { icon: Weight, label: "Weight" },
  { icon: Syringe, label: "Syringe" },
  { icon: QrCode, label: "QrCode" },
  { icon: Calendar, label: "Calendar" },
  { icon: Bell, label: "Bell" },
  { icon: User, label: "User" },
  { icon: Users, label: "Users" },
  { icon: Shield, label: "Shield" },
  { icon: FileText, label: "FileText" },
  { icon: Mail, label: "Mail" },
  { icon: Phone, label: "Phone" },
  { icon: MapPin, label: "MapPin" },
  { icon: Settings, label: "Settings" },
];

const PATIENTS: { name: string; email: string; status: AccountStatus }[] = [
  { name: "Maria Clara Santos", email: "maria.santos@email.com", status: "APPROVED" },
  { name: "Juan Dela Cruz", email: "juan.delacruz@email.com", status: "PENDING" },
  { name: "Andrea Villanueva", email: "andrea.v@email.com", status: "APPROVED" },
  { name: "Pedro Reyes", email: "pedro.reyes@email.com", status: "REJECTED" },
];

/* ------------------------------- component ------------------------------- */

export function UiKit() {
  const [search, setSearch] = useState("");
  const [notify, setNotify] = useState(true);
  const [view, setView] = useState("grid");

  return (
    <div className="space-y-16">
      {/* Brand --------------------------------------------------------- */}
      <Section
        id="brand"
        eyebrow="Brand"
        title="Logo & Identity"
        description="St. Paul's Hospital of Iloilo — a tertiary training hospital, 180 beds, ISO IMS certified, managed by the Sisters of Saint Paul of Chartres."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="flex items-center justify-center py-10">
              <img src="/sphlogo.png" alt="SPH Hospital" className="h-12 w-auto" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-center bg-primary py-10">
              <div className="rounded bg-white/90 px-2 py-1">
                <img src="/sphlogo.png" alt="SPH Hospital" className="h-12 w-auto" />
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="mt-4 text-center text-lg font-medium italic text-muted-foreground">
          “Behind every headline is a commitment to care.”
        </p>
      </Section>

      {/* Colors -------------------------------------------------------- */}
      <Section
        id="colors"
        eyebrow="Foundations"
        title="Color Tokens"
        description="Semantic OKLCH tokens drive the whole system. Toggle the theme to preview light and dark values."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COLOR_TOKENS.map((token) => (
            <div
              key={token.name}
              className="overflow-hidden rounded-lg border border-border"
            >
              <div
                className="flex h-20 items-end p-2"
                style={{
                  background: `var(${token.varName})`,
                  color: token.fg ? `var(${token.fg})` : undefined,
                }}
              >
                <span className="text-xs font-medium">Aa</span>
              </div>
              <div className="bg-card px-2 py-1.5">
                <p className="truncate text-xs font-medium">{token.name}</p>
                <p className="truncate font-mono text-[10px] text-muted-foreground">
                  {token.varName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography ---------------------------------------------------- */}
      <Section
        id="typography"
        eyebrow="Foundations"
        title="Typography & Radius"
        description="Geist Sans for UI, Geist Mono for data. Radius scale derived from a single --radius token."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
            <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <h4 className="text-xl font-medium">Heading 4</h4>
            <p className="text-base">
              Body — Integrated, holistic and dynamic care for the physical,
              emotional, mental and spiritual well-being of every patient.
            </p>
            <p className="text-sm text-muted-foreground">
              Muted small text — supporting detail and helper copy.
            </p>
            <p className="font-mono text-sm">font-mono · Patient ID 0xA1B2C3</p>
            <div className="flex gap-4 text-sm">
              <span className="font-normal">Normal</span>
              <span className="font-medium">Medium</span>
              <span className="font-semibold">Semibold</span>
              <span className="font-bold">Bold</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Radius scale</p>
            <div className="flex flex-wrap gap-3">
              {RADII.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`size-16 border-2 border-primary bg-primary/10 ${r.cls}`}
                  />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Buttons ------------------------------------------------------- */}
      <Section
        id="buttons"
        eyebrow="Components"
        title="Buttons"
        description="Six variants across four sizes, plus icon buttons, with-icon, and disabled states."
      >
        <div className="space-y-6">
          {BUTTON_VARIANTS.map((variant) => (
            <Specimen key={variant} label={variant}>
              {BUTTON_SIZES.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  Button
                </Button>
              ))}
              <Button variant={variant}>
                <Plus /> With icon
              </Button>
              <Button variant={variant} disabled>
                Disabled
              </Button>
            </Specimen>
          ))}
          <Specimen label="icon sizes">
            <Button size="icon-xs" aria-label="Add">
              <Plus />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Settings">
              <Settings />
            </Button>
            <Button size="icon" variant="secondary" aria-label="Bell">
              <Bell />
            </Button>
            <Button size="icon-lg" variant="ghost" aria-label="Search">
              <Search />
            </Button>
          </Specimen>
        </div>
      </Section>

      {/* Badges -------------------------------------------------------- */}
      <Section
        id="badges"
        eyebrow="Components"
        title="Badges & Status"
        description="Tag variants plus the account StatusBadge used across the patient workflow."
      >
        <div className="space-y-4">
          <Specimen label="variants">
            {BADGE_VARIANTS.map((variant) => (
              <Badge key={variant} variant={variant}>
                {variant}
              </Badge>
            ))}
            <Badge>
              <CheckCircle2 /> Verified
            </Badge>
          </Specimen>
          <Specimen label="account status">
            {STATUSES.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </Specimen>
        </div>
      </Section>

      {/* Forms --------------------------------------------------------- */}
      <Section
        id="forms"
        eyebrow="Components"
        title="Form Controls"
        description="Inputs, labels, selects and search — the building blocks of registration and admin forms."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>New patient</CardTitle>
              <CardDescription>Inputs, select and validation states.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ks-name">Full name</Label>
                <Input id="ks-name" placeholder="Maria Clara Santos" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ks-email">Email</Label>
                <Input id="ks-email" type="email" placeholder="you@email.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Blood type</Label>
                  <Select defaultValue="O+">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                        <SelectItem key={bt} value={bt}>
                          {bt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ks-invalid">Invalid field</Label>
                  <Input id="ks-invalid" aria-invalid defaultValue="bad value" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ks-disabled">Disabled</Label>
                <Input id="ks-disabled" disabled placeholder="Not editable" />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="ghost">Cancel</Button>
              <Button>Save patient</Button>
            </CardFooter>
          </Card>

          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">SearchInput</p>
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search doctors by name or specialty…"
            />
            <p className="text-sm text-muted-foreground">
              {search ? `Filtering by “${search}”` : "Start typing to filter."}
            </p>
          </div>
        </div>
      </Section>

      {/* Cards --------------------------------------------------------- */}
      <Section
        id="cards"
        eyebrow="Components"
        title="Cards"
        description="Header, action, content and footer slots — plus stat and metric patterns from the dashboard."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Specialty Hub</CardTitle>
              <CardDescription>SPARC · Cathlab · HBOT Center</CardDescription>
              <CardAction>
                <Button size="icon-sm" variant="ghost" aria-label="More">
                  <Settings />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Advanced diagnostic and treatment centers under one roof.
            </CardContent>
            <CardFooter>
              <Button variant="link" className="px-0">
                Learn more
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total patients</CardTitle>
              <CardAction>
                <Users className="size-5 text-primary" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tight">1,284</p>
              <p className="text-sm text-muted-foreground">+8% this month</p>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Compact card</CardTitle>
              <CardDescription>size=&quot;sm&quot;</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Tighter spacing for dense layouts.
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Avatars ------------------------------------------------------- */}
      <Section
        id="avatars"
        eyebrow="Components"
        title="Avatars"
        description="Image, fallback, presence badge and stacked groups."
      >
        <div className="flex flex-wrap items-center gap-8">
          <Specimen label="sizes & fallback">
            <Avatar size="sm">
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="Doctor" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>PR</AvatarFallback>
              <AvatarBadge className="bg-green-500" />
            </Avatar>
          </Specimen>
          <Specimen label="group">
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+5</AvatarGroupCount>
            </AvatarGroup>
          </Specimen>
        </div>
      </Section>

      {/* Table --------------------------------------------------------- */}
      <Section
        id="table"
        eyebrow="Components"
        title="Table"
        description="The patient roster pattern used in admin and staff views."
      >
        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PATIENTS.map((p) => (
                <TableRow key={p.email}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.email}</TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="xs" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Section>

      {/* Overlays ------------------------------------------------------ */}
      <Section
        id="overlays"
        eyebrow="Components"
        title="Dialog & Menu"
        description="Modal dialogs and dropdown menus built on accessible Base UI primitives."
      >
        <Specimen label="interactive">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Open dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm appointment</DialogTitle>
                <DialogDescription>
                  Book a consultation with Dr. Andrea Villanueva on Jul 2, 10:30 AM?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
                <DialogClose
                  render={<Button />}
                  onClick={() => toast.success("Appointment confirmed")}
                >
                  Confirm
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Open menu
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User /> Profile
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={notify}
                onCheckedChange={setNotify}
              >
                Email notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Default view</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={view} onValueChange={setView}>
                <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Specimen>
      </Section>

      {/* Feedback ------------------------------------------------------ */}
      <Section
        id="feedback"
        eyebrow="Components"
        title="Toasts, Skeletons & Separators"
        description="Notification toasts (Sonner), loading skeletons and dividers."
      >
        <div className="space-y-6">
          <Specimen label="toasts">
            <Button
              variant="outline"
              onClick={() => toast.success("Patient approved")}
            >
              <CheckCircle2 /> Success
            </Button>
            <Button variant="outline" onClick={() => toast.info("New lab result available")}>
              <Bell /> Info
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning("Vitals overdue for review")}
            >
              <TriangleAlert /> Warning
            </Button>
            <Button variant="outline" onClick={() => toast.error("Failed to save record")}>
              Error
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 1800)),
                  {
                    loading: "Syncing records…",
                    success: "Records synced",
                    error: "Sync failed",
                  }
                )
              }
            >
              <Download /> Promise
            </Button>
          </Specimen>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Skeleton</p>
            <Card>
              <CardContent className="flex items-center gap-4 py-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Separator</p>
            <div className="flex h-6 items-center gap-3 text-sm text-muted-foreground">
              <span>Lab</span>
              <Separator orientation="vertical" />
              <span>Imaging</span>
              <Separator orientation="vertical" />
              <span>Cardio</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Motion -------------------------------------------------------- */}
      <Section
        id="motion"
        eyebrow="Foundations"
        title="Motion"
        description="Reusable entrance animations applied across dashboards and forms."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { name: "fade-in", cls: "animate-fade-in" },
            { name: "slide-up", cls: "animate-slide-up" },
            { name: "slide-in-left", cls: "animate-slide-in-left" },
          ].map((a) => (
            <div
              key={a.name}
              className={`rounded-xl bg-primary p-6 text-primary-foreground ${a.cls}`}
            >
              <p className="text-sm font-medium">{a.name}</p>
              <p className="font-mono text-xs text-primary-foreground/70">
                .{a.cls}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Icons --------------------------------------------------------- */}
      <Section
        id="icons"
        eyebrow="Foundations"
        title="Iconography"
        description="Lucide icon set — a consistent, medical-leaning selection used throughout the product."
      >
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-9">
          {ICONS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-3"
            >
              <Icon className="size-5 text-primary" />
              <span className="truncate text-[10px] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
