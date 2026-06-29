/**
 * Centralized content for the public hospital website (Phase 1).
 * Placeholder copy derived from sphiloilo.com — safe to edit; this is the single
 * place to update marketing content for the Home / About / Services pages.
 */
import {
  FlaskConical,
  ScanLine,
  HeartPulse,
  Brain,
  Stethoscope,
  UserRound,
  Baby,
  Bone,
  Eye,
  Activity,
  Syringe,
  Pill,
  Ambulance,
  Microscope,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "St. Paul's Hospital of Iloilo",
  shortName: "SPHI",
  tagline: "Behind every headline is a commitment to care.",
  motto: "Serving in Excellence, Moving Forward",
  description:
    "A tertiary-level training general hospital managed by the Sisters of Saint Paul of Chartres, delivering integrated, holistic and dynamic care for the physical, emotional, mental and spiritual well-being of every patient.",
  contact: {
    address: "General Luna Street, Iloilo City, Philippines 5000",
    phone: "(033) 337 2741",
    email: "info@sphiloilo.com",
    hours: "Open 24 hours · Emergency care 24/7",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
];

export const STATS = [
  { value: "180", label: "Licensed beds" },
  { value: "ISO", label: "IMS Certified" },
  { value: "24/7", label: "Emergency care" },
  { value: "60+", label: "Specialties" },
];

/** Online Result Viewer portals — each routes a visitor into the patient app. */
export const RESULT_VIEWER: { label: string; icon: LucideIcon }[] = [
  { label: "Laboratory", icon: FlaskConical },
  { label: "Imaging", icon: ScanLine },
  { label: "Cardiology", icon: HeartPulse },
  { label: "Neuroscience", icon: Brain },
  { label: "e-Doctor", icon: Stethoscope },
  { label: "e-Patient", icon: UserRound },
];

export const CENTERS_OF_EXCELLENCE = [
  {
    code: "SPARC",
    name: "St. Paul Advanced Robotic Center",
    desc: "Minimally invasive robotic surgery for greater precision and faster recovery.",
    icon: Activity,
  },
  {
    code: "Cathlab",
    name: "Cardiac Catheterization Laboratory",
    desc: "Interventional cardiology, angiography and life-saving cardiac procedures.",
    icon: HeartPulse,
  },
  {
    code: "HBOT",
    name: "Hyperbaric Oxygen Therapy Center",
    desc: "Accelerated healing through medically supervised pressurized oxygen treatment.",
    icon: Syringe,
  },
  {
    code: "Cancer",
    name: "Cancer Center",
    desc: "Comprehensive oncology — diagnosis, chemotherapy and survivorship care.",
    icon: Microscope,
  },
];

export const DEPARTMENTS: { name: string; desc: string; icon: LucideIcon }[] = [
  { name: "Internal Medicine", desc: "Adult diagnosis and long-term disease management.", icon: Stethoscope },
  { name: "Surgery", desc: "General and specialized surgical services.", icon: Activity },
  { name: "Pediatrics", desc: "Newborn, child and adolescent care.", icon: Baby },
  { name: "Obstetrics & Gynecology", desc: "Maternal, prenatal and women's health.", icon: HeartPulse },
  { name: "Cardiology", desc: "Heart health, diagnostics and interventional care.", icon: HeartPulse },
  { name: "Neuroscience", desc: "Brain, spine and nervous-system conditions.", icon: Brain },
  { name: "Orthopedics", desc: "Bone, joint and musculoskeletal treatment.", icon: Bone },
  { name: "Ophthalmology", desc: "Comprehensive eye and vision care.", icon: Eye },
  { name: "Laboratory & Pathology", desc: "Accurate, accredited diagnostic testing.", icon: FlaskConical },
  { name: "Radiology & Imaging", desc: "X-ray, CT, MRI and ultrasound services.", icon: ScanLine },
  { name: "Pharmacy", desc: "In-hospital and outpatient medication services.", icon: Pill },
  { name: "Emergency & Trauma", desc: "Round-the-clock emergency response.", icon: Ambulance },
];

export const ACCREDITATIONS = [
  { name: "ISO Integrated Management System", detail: "IMS Certified" },
  { name: "Department of Health", detail: "Licensed & Accredited" },
  { name: "PhilHealth", detail: "Accredited Partner Hospital" },
  { name: "Center of Safety", detail: "Patient Safety Recognized" },
];

export const VALUES = [
  { title: "Physical", desc: "Skilled, evidence-based medical and surgical care." },
  { title: "Emotional", desc: "Compassion and dignity at every point of contact." },
  { title: "Mental", desc: "Clear guidance and support for patients and families." },
  { title: "Spiritual", desc: "Holistic care rooted in our Pauline mission." },
];
