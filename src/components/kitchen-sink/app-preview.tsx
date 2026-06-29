"use client";

import { QRCodeSVG } from "qrcode.react";
import {
  Home,
  HeartPulse,
  Stethoscope,
  UserRound,
  Weight,
  Thermometer,
  Activity,
  QrCode,
  CalendarDays,
  FlaskConical,
  Bell,
  Search,
  Mail,
  Phone,
  ChevronRight,
  LogIn,
  MapPin,
  Droplet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { PhoneFrame, type PhoneTab } from "@/components/kitchen-sink/phone-frame";
import { Section } from "@/components/kitchen-sink/section";

const TABS: PhoneTab[] = [
  { label: "Home", icon: Home },
  { label: "Vitals", icon: HeartPulse },
  { label: "Doctors", icon: Stethoscope },
  { label: "Profile", icon: UserRound },
];

function tabsWithActive(active: string): PhoneTab[] {
  return TABS.map((t) => ({ ...t, active: t.label === active }));
}

const PATIENT_ID = "sph-2026-000482-mcs";

/* ------------------------------- screens --------------------------------- */

function LoginScreen() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 px-6 py-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="rounded-lg bg-white px-3 py-2 ring-1 ring-border">
          <img src="/sphlogo.png" alt="SPH" className="h-9 w-auto" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Welcome back</h2>
          <p className="text-xs text-muted-foreground">
            Sign in to your patient account
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="app-email" className="text-xs">
            Email
          </Label>
          <Input id="app-email" placeholder="you@email.com" defaultValue="maria.santos@email.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="app-pass" className="text-xs">
            Password
          </Label>
          <Input id="app-pass" type="password" defaultValue="password" />
        </div>
        <Button className="w-full">
          <LogIn /> Sign in
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          New patient?{" "}
          <span className="font-medium text-primary">Create an account</span>
        </p>
      </div>
    </div>
  );
}

const QUICK_ACTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Book visit", icon: CalendarDays },
  { label: "Lab results", icon: FlaskConical },
  { label: "My QR", icon: QrCode },
  { label: "Doctors", icon: Stethoscope },
];

const VITALS = [
  { label: "Weight", icon: Weight, value: "62", unit: "kg" },
  { label: "Blood Pressure", icon: HeartPulse, value: "118/76", unit: "mmHg" },
  { label: "Temperature", icon: Thermometer, value: "36.6", unit: "°C" },
  { label: "Pulse", icon: Activity, value: "72", unit: "bpm" },
];

function DashboardScreen() {
  return (
    <div className="space-y-5 p-4">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Good morning,</p>
          <h2 className="text-lg font-semibold">Maria Clara</h2>
        </div>
        <span className="relative flex size-9 items-center justify-center rounded-full bg-muted">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
        </span>
      </div>

      {/* QR card */}
      <div className="overflow-hidden rounded-2xl border border-primary/20">
        <div className="h-1.5 bg-gradient-to-r from-primary to-primary/60" />
        <div className="flex items-center gap-4 bg-card p-4">
          <div className="rounded-xl bg-white p-2 ring-1 ring-border">
            <QRCodeSVG value={PATIENT_ID} size={72} level="M" />
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <QrCode className="size-4" /> Hospital QR
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Show at the front desk for quick check-in.
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-2">
        {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <span className="text-center text-[10px] leading-tight text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Vitals */}
      <div>
        <p className="mb-2 text-sm font-medium">Latest vitals</p>
        <div className="grid grid-cols-2 gap-2.5">
          {VITALS.map(({ label, icon: Icon, value, unit }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-2xl bg-primary p-3 text-primary-foreground"
            >
              <div className="absolute -right-3 -top-3 size-12 rounded-full bg-white/10" />
              <div className="flex items-center gap-1.5">
                <Icon className="size-3.5 text-primary-foreground/70" />
                <span className="text-[11px] font-medium text-primary-foreground/80">
                  {label}
                </span>
              </div>
              <p className="mt-2 text-lg font-bold tracking-tight">
                {value}{" "}
                <span className="text-[11px] font-normal text-primary-foreground/70">
                  {unit}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VITAL_HISTORY = [
  { label: "Weight", icon: Weight, value: "62 kg", trend: "−0.5 kg", date: "Today, 9:12 AM" },
  { label: "Blood Pressure", icon: HeartPulse, value: "118/76 mmHg", trend: "Normal", date: "Today, 9:12 AM" },
  { label: "Temperature", icon: Thermometer, value: "36.6 °C", trend: "Normal", date: "Today, 9:12 AM" },
  { label: "Pulse", icon: Activity, value: "72 bpm", trend: "Resting", date: "Today, 9:12 AM" },
  { label: "Weight", icon: Weight, value: "62.5 kg", trend: "", date: "Jun 22, 8:40 AM" },
];

function VitalsScreen() {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-semibold">My Vitals</h2>
        <p className="text-xs text-muted-foreground">Recorded by hospital staff</p>
      </div>
      <div className="space-y-2.5">
        {VITAL_HISTORY.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{v.label}</p>
                <p className="text-[11px] text-muted-foreground">{v.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{v.value}</p>
                {v.trend && (
                  <p className="text-[11px] text-primary">{v.trend}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const DOCTORS = [
  { name: "Andrea Villanueva", specialty: "Cardiology", initials: "AV" },
  { name: "Ramon Geronimo", specialty: "Neurology", initials: "RG" },
  { name: "Liza Mendoza", specialty: "Pediatrics", initials: "LM" },
  { name: "Carlos Tan", specialty: "Oncology", initials: "CT" },
];

function DoctorsScreen() {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h2 className="text-lg font-semibold">Find a Doctor</h2>
        <p className="text-xs text-muted-foreground">60+ specialists available</p>
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search name or specialty" className="pl-8" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["All", "Cardiology", "Neurology", "Pediatrics"].map((s, i) => (
          <Badge key={s} variant={i === 0 ? "default" : "outline"}>
            {s}
          </Badge>
        ))}
      </div>
      <div className="space-y-2.5">
        {DOCTORS.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
          >
            <Avatar>
              <AvatarFallback>{d.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Dr. {d.name}</p>
              <p className="text-[11px] text-muted-foreground">{d.specialty}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="space-y-4 p-4">
      {/* Header card */}
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-primary p-5 text-center text-primary-foreground">
        <Avatar size="lg" className="ring-2 ring-white/40">
          <AvatarFallback className="bg-white/20 text-primary-foreground">
            MS
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-base font-semibold">Maria Clara Santos</p>
          <p className="text-xs text-primary-foreground/70">
            maria.santos@email.com
          </p>
        </div>
        <StatusBadge status="APPROVED" />
      </div>

      {/* Details */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {[
          { icon: Phone, label: "Phone", value: "+63 917 555 0142" },
          { icon: Droplet, label: "Blood type", value: "O+" },
          { icon: CalendarDays, label: "Date of birth", value: "Mar 14, 1992" },
          { icon: MapPin, label: "Address", value: "Jaro, Iloilo City" },
          { icon: Mail, label: "Patient ID", value: "SPH-000482" },
        ].map((row, i, arr) => {
          const Icon = row.icon;
          return (
            <div
              key={row.label}
              className={`flex items-center gap-3 px-4 py-3 ${
                i < arr.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <Icon className="size-4 text-primary" />
              <span className="flex-1 text-xs text-muted-foreground">
                {row.label}
              </span>
              <span className="text-sm font-medium">{row.value}</span>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full">
        Edit profile
      </Button>
    </div>
  );
}

/* ------------------------------ component -------------------------------- */

export function AppPreview() {
  return (
    <Section
      id="app"
      eyebrow="Mobile app"
      title="Patient App Screens"
      description="The same teal design language, delivered as a native-feeling mobile experience with bottom-tab navigation."
    >
      <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
        <PhoneFrame caption="Sign in">
          <LoginScreen />
        </PhoneFrame>
        <PhoneFrame caption="Dashboard" tabs={tabsWithActive("Home")}>
          <DashboardScreen />
        </PhoneFrame>
        <PhoneFrame caption="Vitals" tabs={tabsWithActive("Vitals")}>
          <VitalsScreen />
        </PhoneFrame>
        <PhoneFrame caption="Doctor directory" tabs={tabsWithActive("Doctors")}>
          <DoctorsScreen />
        </PhoneFrame>
        <PhoneFrame caption="Profile" tabs={tabsWithActive("Profile")}>
          <ProfileScreen />
        </PhoneFrame>
      </div>
    </Section>
  );
}
