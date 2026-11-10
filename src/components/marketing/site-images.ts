/** Static hospital photography and logos (converted .webp under /public/images). */

export type SiteImage = { src: string; width: number; height: number; alt: string };

export const HERO_IMAGES = {
  facade: {
    src: "/images/about/facade.webp",
    width: 1600,
    height: 895,
    alt: "Facade of St. Paul's Hospital of Iloilo",
  },
  facadeSacredHeart: {
    src: "/images/about/facade-sacred-heart.webp",
    width: 1600,
    height: 1200,
    alt: "St. Paul's Hospital of Iloilo facade with the Sacred Heart of Jesus statue",
  },
  cover: {
    src: "/images/headers/cover.webp",
    width: 1600,
    height: 464,
    alt: "St. Paul's Hospital of Iloilo cover banner with the C-A-R-E-S tagline",
  },
  anniversary115: {
    src: "/images/headers/anniversary-115.webp",
    width: 1333,
    height: 507,
    alt: "St. Paul's Hospital of Iloilo 115th anniversary banner",
  },
} satisfies Record<string, SiteImage>;

export const ABOUT_IMAGES = {
  history: {
    src: "/images/about/history.webp",
    width: 1484,
    height: 741,
    alt: "Illustrated history of St. Paul's Hospital of Iloilo since 1911",
  },
  missionVision: {
    src: "/images/about/mission-vision.webp",
    width: 1484,
    height: 741,
    alt: "St. Paul's Hospital of Iloilo mission and vision",
  },
  team: {
    src: "/images/about/team.webp",
    width: 1484,
    height: 741,
    alt: "The St. Paul's Hospital of Iloilo healthcare team",
  },
  chapel: {
    src: "/images/about/chapel.webp",
    width: 1377,
    height: 630,
    alt: "The chapel of St. Paul's Hospital of Iloilo",
  },
} satisfies Record<string, SiteImage>;

function frame(dir: string, slug: string, width: number, height: number, alt: string): SiteImage {
  return { src: `/images/${dir}/${slug}.webp`, width, height, alt };
}

/** Keyed by CMS service slug. Services without an entry keep the icon fallback. */
export const SERVICE_IMAGES: Record<string, SiteImage> = {
  "cancer-center": frame("services", "cancer-center", 1460, 728, "SPHI Cancer Center"),
  cardiology: frame("services", "cardiology", 1600, 798, "SPHI Cardiology services"),
  cathlab: frame("services", "cathlab", 1460, 728, "SPHI Interventional Catheterization Laboratory"),
  "diagnostic-imaging": frame("services", "diagnostic-imaging", 1460, 728, "SPHI Diagnostic Imaging unit"),
  "digestive-disease-center": frame("services", "digestive-disease-center", 1460, 728, "SPHI Digestive Disease Center"),
  "emergency-room": frame("services", "emergency-room", 1460, 728, "SPHI 24/7 Emergency Room"),
  "hbot-center": frame("services", "hbot-center", 1460, 728, "SPHI Hyperbaric Oxygen Therapy (HBOT) Center"),
  "industrial-clinic": frame("services", "industrial-clinic", 1600, 798, "SPHI Industrial Clinic"),
  "kidney-center": frame("services", "kidney-center", 1600, 798, "SPHI Kidney Center"),
  laboratory: frame("services", "laboratory", 1600, 798, "SPHI Laboratory"),
  "mobile-icu-ambulance": frame("services", "mobile-icu-ambulance", 1600, 798, "SPHI Mobile ICU ambulance"),
  "neuroscience-center": frame("services", "neuroscience-center", 1460, 728, "SPHI Neuroscience Center"),
  "pastoral-services": frame("services", "pastoral-services", 1460, 728, "SPHI Pastoral Services"),
  pharmacy: frame("services", "pharmacy", 1460, 728, "SPHI Pharmacy"),
  "physical-medicine-rehabilitation": frame("services", "physical-medicine-rehabilitation", 1460, 728, "SPHI Physical Medicine and Rehabilitation"),
  sparc: frame("services", "sparc", 1460, 728, "SPHI SPARC respiratory care center"),
};

/** Keyed by clinical department slug. */
export const DEPARTMENT_IMAGES: Record<string, SiteImage> = {
  "ent-hns": frame("departments", "ent-hns", 1460, 728, "SPHI Department of Otorhinolaryngology - Head and Neck Surgery"),
  "family-medicine": frame("departments", "family-medicine", 1460, 728, "SPHI Department of Family Medicine"),
  "radiation-oncology": frame("departments", "radiation-oncology", 1460, 728, "SPHI Department of Radiation Oncology"),
  radiology: frame("departments", "radiology", 1600, 798, "SPHI Department of Radiology"),
  surgery: frame("departments", "surgery", 1460, 728, "SPHI Department of Surgery"),
};

/** Keyed by the RESULT_VIEWER link href. */
export const RESULT_VIEWER_IMAGES: Record<string, SiteImage> = {
  "https://laboratory.sphiloilo.com": frame("results", "laboratory", 1531, 788, "Online laboratory results portal"),
  "https://imaging.sphiloilo.com": frame("results", "imaging", 490, 252, "Online imaging results portal"),
  "https://cardio.sphiloilo.com": frame("results", "cardio", 1531, 788, "Online cardio results portal"),
  "https://neuroscience.sphiloilo.com": frame("results", "neuroscience", 490, 252, "Online neuroscience results portal"),
  "https://doctor.sphiloilo.com": frame("results", "e-doctor", 1531, 787, "E-Doctor physician portal"),
  "/login": frame("results", "e-patient", 1531, 788, "E-Patient account portal"),
};

export type LogoImage = { name: string; src: string; width: number; height: number };

export const ACCREDITATION_LOGOS = {
  iso9001: { name: "ISO 9001:2015 Quality Management System", src: "/images/accreditation/iso-9001.webp", width: 600, height: 464 },
  iso14001: { name: "ISO 14001:2015 Environmental Management System", src: "/images/accreditation/iso-14001.webp", width: 600, height: 464 },
  iso45001: { name: "ISO 45001:2018 Occupational Health and Safety", src: "/images/accreditation/iso-45001.webp", width: 600, height: 464 },
  jasAnz: { name: "JAS-ANZ", src: "/images/accreditation/jas-anz.webp", width: 600, height: 600 },
  doh: { name: "Department of Health (DOH)", src: "/images/accreditation/doh.webp", width: 600, height: 600 },
  philhealth: { name: "PhilHealth", src: "/images/accreditation/philhealth.webp", width: 600, height: 220 },
  prcCpd: { name: "Professional Regulation Commission - Continuing Professional Development", src: "/images/accreditation/prc-cpd.webp", width: 600, height: 600 },
  arsp: { name: "ARSP-Accredited Bacteriology Laboratory", src: "/images/accreditation/arsp.webp", width: 240, height: 180 },
  ritm: { name: "Research Institute for Tropical Medicine (RITM)", src: "/images/accreditation/ritm.webp", width: 600, height: 753 },
  phreb: { name: "Philippine Health Research Ethics Board (PHREB)", src: "/images/accreditation/phreb.webp", width: 250, height: 250 },
  pha: { name: "Philippine Hospital Association (PHA)", src: "/images/accreditation/pha.webp", width: 600, height: 603 },
} satisfies Record<string, LogoImage>;

/** Logos shown in the home page certifications strip. */
export const HOME_CERTIFICATION_LOGOS: LogoImage[] = [
  ACCREDITATION_LOGOS.iso9001,
  ACCREDITATION_LOGOS.iso14001,
  ACCREDITATION_LOGOS.iso45001,
  ACCREDITATION_LOGOS.jasAnz,
  ACCREDITATION_LOGOS.doh,
  ACCREDITATION_LOGOS.philhealth,
  ACCREDITATION_LOGOS.prcCpd,
  ACCREDITATION_LOGOS.pha,
];

/** Logos for an accreditation group, matched by the group title. */
export function logosForAccreditationGroup(group: string): LogoImage[] {
  const g = group.toLowerCase();
  if (g.includes("iso")) {
    return [ACCREDITATION_LOGOS.iso9001, ACCREDITATION_LOGOS.iso14001, ACCREDITATION_LOGOS.iso45001, ACCREDITATION_LOGOS.jasAnz];
  }
  if (g.includes("department of health")) return [ACCREDITATION_LOGOS.doh];
  if (g.includes("philhealth")) return [ACCREDITATION_LOGOS.philhealth];
  if (g.includes("prc")) return [ACCREDITATION_LOGOS.prcCpd];
  return [];
}

/** Logo for an individual accreditation item, matched by the item name. */
export function logoForAccreditationItem(name: string): LogoImage | undefined {
  const n = name.toLowerCase();
  if (n.includes("arsp")) return ACCREDITATION_LOGOS.arsp;
  if (n.includes("phreb")) return ACCREDITATION_LOGOS.phreb;
  if (n.includes("philippine hospital association")) return ACCREDITATION_LOGOS.pha;
  return undefined;
}

export const PARTNER_LOGOS: LogoImage[] = [
  { name: "Health Care Without Harm (HCWH)", src: "/images/partners/hcwh.webp", width: 320, height: 325 },
];
