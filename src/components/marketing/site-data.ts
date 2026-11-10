/**
 * Static content for the public hospital website, taken from sphiloilo.com.
 *
 * Content that changes often (news, services, clinical departments, the doctor
 * directory) lives in the database and is managed from /admin/website. This
 * file holds the slower-moving institutional content.
 */
import {
  FlaskConical,
  ScanLine,
  HeartPulse,
  Brain,
  Stethoscope,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "St. Paul's Hospital of Iloilo",
  legalName: "St. Paul's Hospital of Iloilo, Inc.",
  shortName: "SPHI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sphiloilo.com",
  tagline: "Behind every headline is a commitment to care",
  motto: "Caritas Christi Urget Nos!",
  values: "Serving with Compassion, Accountability, Respect, Excellence, and Spirituality",
  description:
    "A Level 3 tertiary level training general hospital with a capacity of 265 beds, ISO Integrated Management System certified, owned and managed by the Sisters of Saint Paul of Chartres in the heart of Iloilo City.",
  intro:
    "St. Paul's Hospital of Iloilo, Inc. is located in the heart of the city. It is managed and owned by the Sisters of Saint Paul of Chartres, a tertiary level training general hospital with a capacity of 265 beds and ISO Integrated Management System Certified. We take pride in delivering integrated, holistic, and dynamic care to our patients, ensuring comprehensive support for their physical, emotional, mental and spiritual well-being.",
  contact: {
    address: "Gen. Luna St., Brgy. Danao, Iloilo City, Philippines 5000",
    phone: "(033) 337-27-42 to 49",
    phoneHref: "tel:+63333372742",
    email: "sphiloilo@gmail.com",
    hours: "Emergency Room, Laboratory, Pharmacy and Diagnostic Imaging open 24/7",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=St.+Paul%27s+Hospital+of+Iloilo+General+Luna+Street+Iloilo+City",
    mapEmbed:
      "https://www.google.com/maps?q=St.+Paul%27s+Hospital+of+Iloilo,+General+Luna+Street,+Iloilo+City&output=embed",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/SphiloiloOfficial" },
    { label: "Messenger", href: "https://m.me/SphiloiloOfficial" },
    { label: "Instagram", href: "https://www.instagram.com/sphiloilo/" },
    { label: "YouTube", href: "https://www.youtube.com/@SphiloiloOfficial" },
    { label: "TikTok", href: "https://www.tiktok.com/@sphiloilo" },
  ],
};

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; items?: NavItem[] };

/** Primary site navigation (header + footer + sitemap). */
export const NAV: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About SPHI", href: "/about", description: "History, mission, vision and core values" },
      { label: "Leadership", href: "/about/leadership", description: "Sisters, medical staff and department heads" },
      { label: "Accreditation", href: "/about/accreditation", description: "ISO IMS, DOH, PhilHealth, PRC and more" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    items: [
      { label: "All services", href: "/services", description: "Specialty hub, S.P.I.C.E., cancer care, ancillaries" },
      { label: "Clinical departments", href: "/departments", description: "Departments and residency training programs" },
      { label: "Online result viewer", href: "/results", description: "Laboratory, imaging, cardio and neuro results" },
      { label: "Institutional Review Board", href: "/irb", description: "Research ethics review, forms and schedules" },
    ],
  },
  { label: "Find a Doctor", href: "/find-a-doctor" },
  { label: "Patients & Visitors", href: "/patients-and-visitors" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "Request an appointment", href: "/appointments" },
  { label: "Careers", href: "/careers" },
  { label: "News & updates", href: "/news" },
  { label: "Search the site", href: "/search" },
  { label: "e-Patient portal", href: "/login" },
];

export const STATS = [
  { value: "1911", label: "Serving Iloilo since" },
  { value: "265", label: "Bed capacity" },
  { value: "Triple ISO", label: "IMS certified" },
  { value: "24/7", label: "ER, lab & pharmacy" },
];

/** Online Result Viewer portals (hosted on sphiloilo.com subdomains). */
export const RESULT_VIEWER: {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
}[] = [
  { label: "View Laboratory Results", description: "Blood, chemistry, microbiology and more", href: "https://laboratory.sphiloilo.com", icon: FlaskConical, external: true },
  { label: "View Imaging Results", description: "X-ray, CT scan, ultrasound, mammography", href: "https://imaging.sphiloilo.com", icon: ScanLine, external: true },
  { label: "View Cardio Results", description: "2D echo, stress test, Holter, Doppler", href: "https://cardio.sphiloilo.com", icon: HeartPulse, external: true },
  { label: "View Neuroscience Results", description: "Neurodiagnostic study results", href: "https://neuroscience.sphiloilo.com", icon: Brain, external: true },
  { label: "View E-Doctor", description: "Physician log-in", href: "https://doctor.sphiloilo.com", icon: Stethoscope, external: true },
  { label: "View E-Patient", description: "Your SPHI patient account", href: "/login", icon: UserRound, external: false },
];

export const HISTORY = [
  "The solicitude for the sick of the late Msgr. Dennis J. Dougherty of Philadelphia, who was then Bishop of Jaro, was the original motivating force that brought about the foundation of St. Paul's Hospital of Iloilo. As early as 1909 he asked the Sisters of St. Paul of Chartres, who were just starting their work in the Philippines, to establish a hospital in Iloilo.",
  "It was not until February 15, 1911 when four pioneer sisters — Mother Marie Donatien, Sister Antoine du Sacre Coeur, Sister Augustine De Marie and Sister Felix de Marie — came and answered the clergy. Their first convent was a former warehouse of the Ynchausti Y Compania on Calle Rosario. Two adjacent residential homes were made the seats of the hospital they were to establish. Three more nuns, Sister Marie Scholastique, Sister Marie Estelle and Sister Adrien, joined them some months later; the latter was formally installed as the first superior of the establishment. On May 20 of the same year, their doors opened to the sick. Dr. Samuel Carson of the Philippine Railway brought in the first patient.",
  "This was followed by Drs. Gilchrist, Kilayko and Arroyo. Dr. Carson became the first Medical Director and was succeeded by Dr. Arroyo, who held the position up to the outbreak of World War II. These generous French religious pioneers made rapid adjustment to their new environment. They endeared themselves to the Ilonggos, who fondly called them “Madres de San Pablo”.",
  "After two years of hard work, they found it necessary to expand their accommodations for the sick who sought their care. Msgr. Dougherty followed closely the progress of the hospital with enthusiasm. In 1913 he went back to his native States to secure funds for putting up the hospital. The project was placed under the patronage of the little flower whose beatification was under study. In less than a year's time, the bishop came back with the needed funds.",
  "Bishops Foley and McCloskey carried on the work because the founder was recalled to become Bishop of Buffalo and later Cardinal of Philadelphia. The hospital building was completed and formally occupied in 1916. Msgr. Dougherty never lost his interest, however, in the growing institution up to his death in 1951. Recognizing the dedicated services of the Sisters, he turned over to them full ownership and administration in a written statement executed in 1941.",
  "Today, St. Paul's Hospital Iloilo is a tertiary level training general hospital with a capacity of 265 beds. It caters to the health needs of the inhabitants of Iloilo City, its neighboring towns and provinces like Aklan, Antique, Capiz, Palawan and Negros Occidental. The Hospital has been counted as one of the best hospitals and received both local and national awards for its cleanliness and quality services.",
  "The site — a former salty mudfield overgrown with weeds and swamp vegetation — became a haven for the sick in the heart of the city. For more than a century the building and its grounds have been kept clean and orderly, earning local and national awards for cleanliness and quality service.",
];

export const MILESTONES = [
  { year: "1909", text: "Bishop Dougherty asks the Sisters of St. Paul of Chartres to open a hospital in Iloilo." },
  { year: "1911", text: "Four sisters arrive on February 15; the hospital opens its doors on May 20." },
  { year: "1913", text: "Bishop Dougherty returns to the United States to raise funds for the hospital building." },
  { year: "1916", text: "The new hospital building is completed and formally occupied." },
  { year: "1941", text: "Full ownership and administration are turned over to the Sisters." },
  { year: "2023", text: "ISO 9001:2015 Quality Management System certification (June 2)." },
  { year: "2024", text: "ISO 14001:2015 and ISO 45001:2018 certification — Triple ISO IMS (September 27)." },
  { year: "2025", text: "The Interventional Catheterization Laboratory opens (April 21)." },
];

export const VISION =
  "We envision St. Paul's Hospital of Iloilo, Inc. as a Christ-centered, excellent, innovative, global healthcare and training hospital.";

export const MISSION = [
  "Offer Christ-centered excellent healthcare upholding the bioethical principles and the teaching of the Catholic Church;",
  "Innovate & develop competencies of health care professionals through continuing relevant training and research programs; and",
  "Continually implement and sustain operational and financial excellence through Christian stewardship & good governance.",
];

export const CORE_VALUES = [
  { title: "Compassion", desc: "Capacity and readiness to suffer with those who suffer; to feel one with the suffering and those in pain, to be moved with one's deepest interiority — “may pagmamalasakit”." },
  { title: "Accountability", desc: "The capacity and readiness to accept consequences of one's decision or action and the responsibility of stewardship in caring and serving." },
  { title: "Respect", desc: "Showing appreciation towards the value of another person; a differential regard for the values, principles and beliefs of others." },
  { title: "Excellence", desc: "Doing the right thing all the time; an error-free state; quality of doing things efficiently." },
  { title: "Spirituality", desc: "Making reference to Christ in our thoughts, words and actions; sickness and death are two equalizers in life." },
];

export type Leader = { name: string; roles: string[] };

export const LEADERSHIP: { sisters: Leader[]; medical: Leader[]; chairmen: Leader[]; heads: Leader[] } = {
  sisters: [
    { name: "Sr. Arcelita S. Sarnillo, SPC", roles: ["Hospital Administrator"] },
    { name: "Sr. Mary Reginald M. Pastrana, SPC", roles: ["Superior", "Sister-in-charge: Dietary Department"] },
    { name: "Sr. Wilsonia S. Laxina, SPC", roles: ["Chief Nursing Officer: Nursing Service Office"] },
    { name: "Sr. Elvira Theodore Ibardolasa, SPC", roles: ["Sister-in-charge: Diagnostic Imaging Department, Pharmacy, Security Guards"] },
    { name: "Sr. Riza Mae A. Inoc, SPC", roles: ["Coordinator: Human Resource Department"] },
    { name: "Sr. Gertrude Caryls N. Kuebler, SPC", roles: ["Sister-in-charge: Ancillary Services, IRB, Medical Records"] },
    { name: "Sr. Lauren Risma, SPC", roles: ["Finance Officer: Finance Department"] },
    { name: "Sr. Ma. Perlita Marasigan, SPC", roles: ["Sister-in-charge: Central Sterile Supply Unit", "Pastoral Care: Cancer Center"] },
    { name: "Sr. Clemence Marie M. Mira, SPC", roles: ["Sister-in-charge: Information/Admitting"] },
    { name: "Sr. Amparo A. Portuguez, SPC", roles: ["Sister-in-charge: Linen and Laundry Department"] },
    { name: "Sr. Rowena Rodil, SPC", roles: ["Sister-in-charge: Pastoral Care"] },
  ],
  medical: [
    { name: "Dr. Henry D. Gonzales, FPAFP", roles: ["Medical Director"] },
    { name: "Dr. Malbar G. Ferrer, FPCP, FPCCP", roles: ["Chief of Medical Staff"] },
    { name: "Dr. Luis Sefarin D. Thomas Dabao III", roles: ["Chairman — Department of Medical Education"] },
  ],
  chairmen: [
    { name: "Dr. Maria Socorro Felisarta", roles: ["Anesthesia"] },
    { name: "Dr. Teresa Enojo", roles: ["Dentistry"] },
    { name: "Dr. Florence Yul Saquian", roles: ["ENT – HNS"] },
    { name: "Dr. Remo G. Benliro Jr.", roles: ["Family Medicine"] },
    { name: "Dr. Ma. Sylvia Theresa C. De Pili", roles: ["Internal Medicine"] },
    { name: "Dr. Ma. Maureen F. Fortuna", roles: ["Ob-Gyne"] },
    { name: "Dr. Jeremy Saquian", roles: ["Ophthalmology"] },
    { name: "Dr. Ma. Teresa S. Araneta", roles: ["Pathology"] },
    { name: "Dr. Josie Grace C. Castillo", roles: ["Pediatrics"] },
    { name: "Dr. Glenn A.M. Cathedral Sr.", roles: ["Radiology"] },
    { name: "Dr. Dennis V. Doromal", roles: ["Radiology Oncology"] },
    { name: "Dr. Juliene Latriz-Certeza", roles: ["Surgery"] },
  ],
  heads: [
    { name: "Princess Alyanna Bianca A. Carato", roles: ["Administrator's Office"] },
    { name: "Sonia G. Amazon", roles: ["Quality Assurance Department"] },
    { name: "Jogie Allaga", roles: ["Admitting & Information"] },
    { name: "Leonil Fuentes", roles: ["Canteen Department"] },
    { name: "Jocelyn May M. Millan", roles: ["Client Relations Office"] },
    { name: "Mary Grace Cabero", roles: ["Diagnostic Imaging Department"] },
    { name: "Jean Soriano", roles: ["Finance Department"] },
    { name: "John Keith Castor", roles: ["Information Management System"] },
    { name: "Arlyn T. Ocera", roles: ["Digestive Disease Center"] },
    { name: "Jonnah D. Paragat", roles: ["Engineering and Maintenance Department"] },
    { name: "Analou Barranco", roles: ["Laboratory Department"] },
    { name: "Vergie Espuerta", roles: ["Medical Social Service Unit"] },
    { name: "Rey Markenne E. Domingo", roles: ["Mother Candide Center"] },
    { name: "Gladys Mijares", roles: ["Nuclear Medicine Department"] },
    { name: "Lorely D. Chavez", roles: ["Pharmacy Department"] },
    { name: "Ma. Aura V. Tia", roles: ["Primary Health Care and Industrial Clinic"] },
    { name: "Janette M. Rosal", roles: ["TB-DOTS"] },
    { name: "Joseph Atas", roles: ["Rehabilitation Medicine Department"] },
  ],
};

export const ACCREDITATION_INTRO =
  "Guided by our mission, Caritas Christi Urget Nos!, St. Paul's Hospital of Iloilo, Inc. (SPHI) delivers compassionate, patient-centered, and world-class healthcare. Our commitment to clinical quality, patient safety, and operational integrity is reflected in our local and international accreditations.";

export const ISO_STANDARDS = [
  { code: "ISO 9001:2015", name: "Quality Management System (QMS)" },
  { code: "ISO 14001:2015", name: "Environmental Management System (EMS)" },
  { code: "ISO 45001:2018", name: "Occupational Health & Safety (OHS)" },
];

export const ACCREDITATIONS: { group: string; summary: string; items: { name: string; detail: string }[] }[] = [
  {
    group: "Integrated Management System — ISO Certified",
    summary:
      "SPHI is the first private hospital in Iloilo to achieve Triple ISO Certification. It earned ISO 9001:2015 certification from Certification Partner Global (CPG) on June 2, 2023, and ISO 14001:2015 and ISO 45001:2018 on September 27, 2024 — a fully functional Integrated Management System certified by CPG and accredited by JAS-ANZ.",
    items: [],
  },
  {
    group: "Department of Health (DOH)",
    summary:
      "A DOH-accredited APEX Hospital and Level III Tertiary General Hospital in Western Visayas, bringing over a century of healthcare excellence, advanced specialty centers, and innovative care to the region.",
    items: [
      { name: "Kidney Transplant Unit", detail: "Accredited as a specialized Kidney Transplant facility by the DOH Bureau of Health Facilities and Services since 2006." },
      { name: "Mother-Baby Friendly Hospital Initiative (MBFHI)", detail: "Officially recognized as a Mother-Baby Friendly Hospital since 2013 for promoting maternal and infant healthcare." },
      { name: "Private-Public Mixed DOTS (PPMD) Center", detail: "The first private PPMD Unit in Western Visayas (certified March 24, 2003) by the DOH and PhilCAT, delivering standardized tuberculosis diagnosis, treatment and monitoring." },
      { name: "Designated HIV Treatment Hub (Mother Candide Center)", detail: "Established June 8, 2022 under the DOH National HIV, AIDS, and STI Prevention and Control Program; full DOH compliance recognition on October 3, 2025." },
    ],
  },
  {
    group: "PhilHealth",
    summary:
      "As an accredited PhilHealth provider, SPHI ensures eligible members seamlessly receive their national health insurance benefits. SPHI was a PhilHealth Center of Excellence from 2011 to 2014.",
    items: [
      { name: "Special Citation for Z Benefit Package Providers", detail: "2025" },
      { name: "Outstanding Clerk Award", detail: "2025" },
    ],
  },
  {
    group: "PRC — Continuing Professional Development (CPD) Provider",
    summary: "Accredited CPD Provider in accordance with the IRR of Republic Act No. 10912 (CPD Act of 2016).",
    items: [
      { name: "Council of Medicine", detail: "Accreditation No. MED-2025-328 · Issued May 13, 2025" },
      { name: "Council of Nursing", detail: "Accreditation No. NRS-2025-370 · Issued May 9, 2025" },
    ],
  },
  {
    group: "Specialized laboratory & research accreditations",
    summary: "Independent recognition of our laboratory and research ethics standards.",
    items: [
      { name: "ARSP-Accredited Bacteriology Laboratory", detail: "Accredited by the Research Institute for Tropical Medicine (RITM) under the Antimicrobial Resistance Surveillance Program, in partnership with DOH and PhilHealth." },
      { name: "Philippine Health Research Ethics Board (PHREB)", detail: "The SPHI Institutional Review Board is PHREB-accredited, ensuring research involving human participants meets strict ethical and safety standards." },
    ],
  },
  {
    group: "Registrations & partner organizations",
    summary: "Other registrations and accreditation partners shown on SPHI's official materials.",
    items: [
      { name: "National Privacy Commission (NPC)", detail: "DPO/DPS Registered — “Datos ng Pilipino, Protektado Ko!”" },
      { name: "Philippine Hospital Association (PHA)", detail: "Listed among SPHI's accreditation partners." },
    ],
  },
];

export const PARTNERS = [{ name: "Health Care Without Harm", short: "HCWH" }];

export const IMS_POLICY = [
  "St. Paul's Hospital of Iloilo, Inc. (SPHI) is dedicated to providing quality services through its highly competent staff, continuing training and research programs, and advanced technology to consistently meet the customers' medical needs. The hospital's quality management system is designed to ensure that all processes are carried out with accuracy, adherence to standards, and customer satisfaction.",
  "SPHI recognizes the importance of environmental conservation and sustainability through minimizing its environmental footprint by reducing, reusing, and recycling wastes, conserving resources, and preventing pollution in all areas of its operations.",
  "The health and safety of all SPHI employees, contractors, and visitors are of paramount importance; hence, our occupational health and safety management system is designed to provide a safe and healthy work environment by preventing accidents and injuries and complying with relevant health and safety regulations.",
  "SPHI complies with all regulatory, environmental, and occupational health and safety requirements of government and other accrediting agencies. Its management system ensures that it remains updated on relevant laws and regulations and that processes are in full compliance at all times.",
  "SPHI strives for continual improvement in all aspects of its Integrated Management System by identifying opportunities for enhancement and taking proactive measures to implement necessary improvements through regular reviews, audits, and feedback mechanisms.",
];

export const ISO_JOURNEY = [
  { date: "2020", text: "SPHI begins its ISO journey; preparatory activities are interrupted by the COVID-19 pandemic." },
  { date: "Sep 2022", text: "ISO preparations resume with renewed dedication." },
  { date: "Jan 20, 2023", text: "ISO 9001:2015 QMS Stage 1 Audit." },
  { date: "Jun 2, 2023", text: "ISO 9001:2015 certification awarded by Certification Partner Global." },
  { date: "Mar 1, 2024", text: "1st QMS Surveillance Audit — recommended for continued certification." },
  { date: "May–Jun 2024", text: "Stage 1 and Stage 2 audits for ISO 14001:2015 and ISO 45001:2018." },
  { date: "Sep 27, 2024", text: "ISO 14001:2015 and ISO 45001:2018 awarded — SPHI becomes Triple ISO IMS certified." },
  { date: "Feb 7, 2025", text: "2nd QMS Surveillance Audit — recommended for continued certification." },
  { date: "Jul 24–25, 2025", text: "1st EMS/OHS Surveillance Audit — recommended for continued certification." },
  { date: "Jun 19–20, 2026", text: "QMS Recertification Audit and 2nd EMS/OHS Surveillance Audit." },
];

export const PATIENT_GUIDE = {
  admission: [
    { title: "Triage & registration", text: "The patient proceeds to the Triage Area for evaluation and registration. For emergency cases, the patient proceeds directly to treatment. Patients with a “Direct-To-Room Order” should make prior arrangement with the Admitting section." },
    { title: "Assessment", text: "The Resident Doctor assesses the patient and refers to the Attending Physician. If for admission, the Attending Physician orders admission through the Resident Doctor. When admission is not necessary, the Resident Doctor prescribes appropriate management and the Nurse gives discharge instructions." },
    { title: "Admission", text: "The patient's companion completes the admission process and accompanies the patient to the assigned room. The patient is now officially admitted." },
  ],
  visitingHours: [
    { area: "Private rooms", hours: ["9:00 AM – 12:00 NN", "3:00 PM – 8:00 PM"] },
    { area: "Ward", hours: ["9:00 AM – 12:00 NN", "3:00 PM – 6:00 PM"] },
    { area: "ICU", hours: ["11:00 AM – 12:00 NN", "5:00 PM – 6:00 PM"] },
  ],
  hmos: [
    "Avega/Intellicare Health Care",
    "Advanced Medical Access Philippines (Amaphil)",
    "Beneficial Life Insurance Company, Inc.",
    "Coco Life Health Care",
    "Cooperative Health Management Federation",
    "Etiqa Life and General Assurance",
    "Flexicare",
    "Generali Life Assurance, Inc.",
    "Health Maintenance, Inc.",
    "Inlife / I-Care",
    "Kaiser",
    "Life and Health HMP Inc.",
    "Med Asia Phils.",
    "Medicard Phils.",
    "Medifix",
    "Medilink Network",
    "Medocare Health Care",
    "Pacific Cross Health Care, Inc.",
    "PhilCare",
    "Value Care Health Care",
  ],
  philhealth: [
    { q: "Where can a PhilHealth member get the form?", a: "Upon admission, the patient is given the CF1 form to be accomplished by the PhilHealth member and employer, with a list of documents to submit upon discharge." },
    { q: "What should I do during my stay?", a: "Have the documents checked by PhilHealth staff ahead of time to avoid delay and non-deduction of benefits. The PhilHealth section is at the Business Office — Window 1." },
    { q: "What are the important requirements?", a: "CF1 (Claim Form 1) accomplished and originally signed by the member and employer, and proof of premium contributions at least 6 months paid prior to confinement." },
    { q: "Government or private members", a: "Claim Form 1 duly signed by the authorized person in the office/company. Private members also submit itemized proof of premium payment." },
    { q: "Indigent / sponsored members", a: "Original Certificate of Eligibility with validity period." },
    { q: "Self-employed / individually paying members", a: "Proof of premium contributions 6 months prior to confinement, with official receipt." },
    { q: "Overseas workers", a: "Copy of MDR with payment information." },
    { q: "Senior citizens / lifetime members / non-paying pensioners", a: "No requirements needed as long as the member category is updated." },
    { q: "What should I do upon discharge?", a: "Submit all complete PhilHealth documents approved by PhilHealth staff at the billing section." },
  ],
  philhealthContact: "SPHI PhilHealth Office — (033) 337-2741 to 49 local 6315, Ground Floor Main Building",
  rights: [
    "To receive considerate, respectful and compassionate health care in a safe setting regardless of your age, sex, gender, religion, ethnicity, political affiliation, disability or capacity to pay, free from all forms of abuse, neglect, or ill treatment.",
    "To be assigned to a competent doctor/resident physician and be told the names of all health care team members qualified to provide diagnosis, treatment and medical advice; to know your hospital and physician fees, and receive information about possible financial assistance.",
    "To notify a family member or person of your choice and your chosen doctor of your admission to the hospital.",
    "To have someone remain with you during your hospital stay unless it compromises your or others' rights, safety or health.",
    "To exercise your spiritual and cultural beliefs within the capacity and rules of the hospital.",
    "To be informed and give consent before any non-emergency procedure or research/experiment, or to refuse such.",
    "To privacy and confidentiality of your medical records according to law, as well as in care discussions, examinations and treatments, and to see or get a copy of your medical records except those restricted by law.",
    "To request an escort during physical examinations.",
    "To be represented by someone (assignee) to decide on your behalf when circumstances warrant.",
    "To ask about and be informed of the complaint process and express grievances without fear of recrimination or reprisal.",
  ],
  grievance:
    "If issues are not resolved to your satisfaction, talk to the Client Relations Staff, the Chief of Hospital or the Hospital Administrator. You may also file a formal grievance with the DOH Western Visayas Center for Health Development — records@dohwv.com, (033) 332-2329.",
  amenities: [
    { name: "SPHI Canteen", text: "Freshly prepared meals and refreshments for patients, visitors and staff.", location: "Ground Floor, SPICE Building", hours: "6:30 AM – 7:00 PM daily", phone: "(033) 337-27-42 to 49 local 6305" },
    { name: "Sisters' Delight Bakeshop", text: "Freshly baked goods, nutritious snacks and diet-approved options from the Dietary Department.", location: "Ground Floor, SPICE Building", hours: "6:30 AM – 7:00 PM daily", phone: "(033) 337-27-42 to 49 local 2026" },
    { name: "Parking", text: "Paid parking at the main façade and the back parking building with helipad — more than 265 vehicles.", location: "Main façade and rear parking building", hours: "", phone: "" },
  ],
};

export const CAREERS = {
  addressee: "Sr. Arcelita S. Sarnillo, SPC (Hospital Administrator)",
  requirements: [
    "Letter of application",
    "Biodata / résumé with 2x2 ID picture",
    "Transcript of Records (authenticated copy)",
    "Board rating and PRC ID card (photocopy)",
    "Certificate of previous employment",
    "Certificate of good moral character",
    "Authenticated copy of college diploma (professional) or high school diploma (non-professional)",
    "SSS E-1 (3 photocopies)",
    "Birth certificate (3 photocopies)",
    "Police / NBI clearance (original)",
    "Two (2) letters of recommendation",
    "Photocopy of current Community Tax Receipt (cedula)",
    "Pre-employment physical examination — 20% discount (request issued by the Human Resource Department)",
  ],
  openings: [
    {
      title: "Staff Nurse",
      type: "Full-time · Permanent · Fresh graduates welcome",
      summary: "Registered nurses with or without hospital experience — no age limit. Hiring 10+ candidates.",
      qualifications: ["Active PH Registered Nurse license", "Graduate of Bachelor of Science in Nursing", "Able to reliably commute to or relocate to Iloilo City"],
      benefits: ["13th month salary", "Overtime pay", "Flexible shift", "Employee discount", "Promotion to permanent employee", "Company events and Christmas gift"],
    },
  ],
};

export const IRB = {
  email: "sphirbresearch@gmail.com",
  phone: "(033) 337-27-42 to 49 local 7306",
  location: "4th Floor, Cancer Center Building",
  vision: "A Christ-centered accredited board for ethical review and monitoring of researches.",
  mission: [
    "Receive and evaluate research proposals as to adherence to accepted ethical principles.",
    "Assure that evaluation is based on local, national and international guidelines.",
    "Update members on latest national and international guidelines.",
  ],
  history: [
    "In 1996, St. Paul's Hospital of Iloilo, Inc. (SPHI) established its Ethics Committee, marking the beginning of its Bioethics Committee. On June 27, 2006, the Ethics Committee revised its policies for the comprehensive and efficient review of research involving human participants, ensuring that clinical research conformed to ethical and scientific standards, with informed consent and the freedom for participants to withdraw at any stage.",
    "On November 1, 2007, the committee was renamed the St. Paul's Hospital Ethics Review Board (IERB). In July 2014 it was renamed the Institutional Review Board Committee. On February 27, 2015, the Philippine Health Research Ethics Board (PHREB) requested accreditation applications, and SPHI applied for Level 3 Accreditation on April 30. By August 18, a new standard operating procedure (SOP) was approved and a new Chair was appointed.",
    "From February 17–19, 2016, PHREB conducted an accreditation visit, and on August 9, 2016 the SPHI IRB received provisional Level III Accreditation. On August 9, 2017 it received a two-year Level III Accreditation. In October 2018 SPHI IRB applied for Level III Re-accreditation, and PHREB conducted a re-accreditation visit from March 12–15, 2019. In September 2019 PHREB granted a one-year Level 3 Accreditation, and on January 13, 2021 the SPHI IRB received a two-year Level 3 Accreditation.",
    "In January 2023 the accreditation expired, but extensions were granted. From September 18–22, PHREB conducted an online accreditation. In September 2024 SPHI-IRB was granted Level 2 accreditation status, and PHREB conducted another online accreditation on March 23–27, 2026. In April and May 2026 new regular members were appointed to the board.",
  ],
  members: [
    { name: "Jaime Manil, MD, FPOGS", role: "Chairman", field: "OB-Gynecology", image: "/images/irb/members/01-manil.webp" },
    { name: "Rowena Cosca, MD, FPPA", role: "Co-Chairman", field: "Clinical Psychiatrist", image: "/images/irb/members/02-cosca.webp" },
    { name: "Ma. Cecilia Florete, MD, FPCP, FPSG, FPSDE", role: "Member-Secretary", field: "Internist-Gastroenterologist", image: "/images/irb/members/03-florete.webp" },
    { name: "Venerio Gasataya Jr., MD, FPCS, FPSG, MHA", role: "Member", field: "General Surgeon", image: "/images/irb/members/04-gasataya.webp" },
    { name: "Ronald Latap, MD, FPOGS, FSGOP, FPSCPC", role: "Member", field: "OB-Gynecology, Gynecologic Oncologist, Colposcopist", image: "/images/irb/members/05-latap.webp" },
    { name: "Atty. Jose Mari Benjamin Tirol", role: "Member", field: "Lawyer", image: "/images/irb/members/06-tirol.webp" },
    { name: "Maria Thelma Servidad, RN, MAN", role: "Member", field: "Businesswoman", image: "/images/irb/members/07-servidad.webp" },
    { name: "Christopher Tabsing, LPT", role: "Member", field: "School Principal II", image: "/images/irb/members/08-tabsing.webp" },
    { name: "Ma. Romy Alexis Consulta, MEd", role: "Member", field: "Professor", image: "/images/irb/members/09-consulta.webp" },
    { name: "Sr. Gertrude Caryls Kuebler, SPC", role: "Member", field: "Religious", image: "/images/irb/members/10-kuebler.webp" },
    { name: "Dr. Princi Demaisip", role: "Member", field: "Neurologist", image: "/images/irb/members/11-demaisip.webp" },
    { name: "Mrs. Ana Liza Sevillon", role: "Member", field: "Housewife", image: "/images/irb/members/12-sevillon.webp" },
    { name: "Mrs. Ma. Clarissa Columna", role: "Member", field: "Freelance Embroiderer", image: "/images/irb/members/13-columna.webp" },
  ],
  membersAsOf: "May 15, 2026",
  forms: [
    { title: "SPHI-IRB SOP 14th Edition", href: "/irb/forms/sphi-irb-sop-14th-edition.pdf" },
    { title: "Flowchart for Protocol Submission", href: "/irb/forms/flowchart-protocol-submission.pdf" },
    { title: "Form 2.1 — Application for Ethics Review of a New Protocol", href: "/irb/forms/form-2-1-application-for-ethics-review.docx" },
    { title: "Form 3.3 — Protocol Resubmission Form", href: "/irb/forms/form-3-3-protocol-resubmission.docx" },
    { title: "Form 4.0 — Protocol Amendment Form", href: "/irb/forms/form-4-0-protocol-amendment.docx" },
    { title: "Form 4.1 — Progress Report Form", href: "/irb/forms/form-4-1-progress-report.docx" },
    { title: "Form 4.2 — SAE & SUSAR Report Form", href: "/irb/forms/form-4-2-sae-susar.docx" },
    { title: "Form 4.3 — RNE (Reportable Negative Events) Report Form", href: "/irb/forms/form-4-3-rne-report.docx" },
    { title: "Form 4.4 — Protocol Deviation & Violation Form", href: "/irb/forms/form-4-4-protocol-deviation-violation.docx" },
    { title: "Form 4.5 — Early Termination Report", href: "/irb/forms/form-4-5-early-termination-report.docx" },
    { title: "Form 4.6 — Final Report Form", href: "/irb/forms/form-4-6-final-report.docx" },
    { title: "Form 4.7 — Application for Continuing Review", href: "/irb/forms/form-4-7-application-for-continuing-review.docx" },
  ],
  guidelines: [
    { title: "Data Privacy Act of 2012 (RA 10173)", href: "/irb/guidelines/data-privacy-act-2012.pdf" },
    { title: "CIOMS International Ethical Guidelines for Health-related Research Involving Humans (2016)", href: "/irb/guidelines/cioms-2016.pdf" },
    { title: "DOH Department Order No. 2017-0265", href: "/irb/guidelines/doh-department-order-2017-0265.pdf" },
    { title: "DOH Administrative Order No. 2020-0010", href: "/irb/guidelines/doh-administrative-order-2020-0010.pdf" },
    { title: "ICH Good Clinical Practice E6(R2) (2016)", href: "/irb/guidelines/ich-gcp-e6-r2-2016.pdf" },
    { title: "ICH Good Clinical Practice E6(R3)", href: "/irb/guidelines/ich-gcp-e6-r3.pdf" },
    { title: "PHREB Resolution on COVID-19 Research Proposals", href: "/irb/guidelines/phreb-resolution-covid-19.pdf" },
    { title: "WMA Declaration of Helsinki (2024)", href: "/irb/guidelines/wma-declaration-of-helsinki-2024.pdf" },
    { title: "Philippine National Health Research System (PNHRS) Act of 2013", href: "/irb/guidelines/pnhrs-act-2013.pdf" },
    { title: "National Ethical Guidelines for Research Involving Human Participants 2022 (NEGRIHP) – Advance Copy", href: "/irb/guidelines/negrihp-2022-advance-copy.pdf" },
    { title: "PHREB SOP Workbook 2020", href: "/irb/guidelines/phreb-sop-workbook-2020.pdf" },
    { title: "WHO Tool for Benchmarking Ethics Oversight of Health-related Research (2023)", href: "/irb/guidelines/who-2023-benchmarking-ethics.pdf" },
    { title: "PHREB Bill of Rights in Health Research, Studies and Clinical Trials", href: "/irb/guidelines/phreb-bill-of-rights.webp" },
  ],
  activeProtocolsPdf: "/irb/active-protocols.pdf",
  meetingDates: [
    "January 8, 2026", "February 19, 2026", "March 24, 2026", "April 19, 2026",
    "May 14, 2026", "June 11, 2026", "July 9, 2026", "August 13, 2026",
    "September 10, 2026", "October 8, 2026", "November 12, 2026", "December 10, 2026",
  ],
  faqs: [
    {
      q: "What are the requirements for initial submission?",
      a: "The initial submission package should include:",
      items: [
        "Letter of Application & Complete Protocol",
        "Protocol Summary",
        "Investigator's Brochure (for Clinical Trials)",
        "Data collection form/s",
        "Informed Consent Forms (English, Tagalog, and local dialect (Hiligaynon))",
        "CV (for clinical trials – Principal Investigator and his/her co-investigators; for Researcher Initiated Protocol – Researcher and Adviser)",
        "GCP Certificate of the Principal Investigator (PI) and his/her co-investigators (Form 2.1)",
        "Declaration of No Conflict of Interest for Principal Investigators/Researchers (Form 2.2)",
        "Valid PRC License",
        "COI Declaration and Confidentiality Agreement",
        "GANTT Chart (as necessary)",
        "Advertisement, Diary card and other related documents (for Clinical Trials)",
        "Case report form/s, trial Materials (for Clinical Trials)",
        "Certificate of Technical Review (for Researcher Initiated protocol)",
        "Insurance Certificate (for Clinical Trials)",
        "Technical review approval/endorsement of the Department",
        "Decision of Ethics Review if reviewed by other Research Ethics Committee/s",
        "Material Transfer Agreement (for Clinical Trials if applicable)",
        "Budget",
        "Clinical Trial Agreement – Draft is acceptable (for Clinical Trials)",
        "Letter of Approval from Hospital Administrator and Data Protection Officer",
        "Waiver of Informed Consent Form (if applicable)",
      ],
    },
    { q: "How many copies of the protocol should I submit?", a: "The SPHI-IRB requires an electronic copy of the protocol package for review and approval, and three (3) hard copies should be submitted." },
    { q: "How long is the ethical clearance valid?", a: "The validity of the ethical approval is for one (1) year only. The Principal Investigator/Researcher should apply for a Continuing Review." },
    { q: "When is the submission deadline?", a: "The IRB cut-off is every 21st of the month (until 4:00 PM only)." },
    { q: "Can the IRB review protocols conducted in other institutions?", a: "No. The IRB will only review protocols whose study setting includes SPHI." },
    { q: "When does the IRB meet?", a: "The IRB meeting is every 2nd Thursday of the month." },
  ],
  submissionFlow: {
    intro: [
      { day: "Day 1", text: "IRB Staff receives the complete protocol and other documents, assigns the IRB Protocol Code, and forwards it to the Chair or Member-Secretary for assessment." },
      { day: "Day 1", text: "The Chair or Member-Secretary determines the type of review: Full Board, Expedited, SJREB, or Exempt from Review." },
    ],
    tracks: [
      {
        name: "Full Board Review",
        steps: [
          { day: "Day 1", text: "Chair/Member-Secretary assigns two (2) Primary Reviewers." },
          { day: "Day 2", text: "IRB Staff notifies and sends the electronic copy to the primary reviewers ten (10) days before the full board meeting." },
          { day: "Day 3–12", text: "Primary Reviewers review and evaluate the protocol and other documents (10 working days)." },
          { text: "IRB Regular Meeting (2nd Thursday of the month): primary reviewers present the evaluation using the evaluation forms; all members discuss technical and ethical issues." },
          { day: "Day 19", text: "The Chair summarizes the issues; the board decides the result by consensus voting." },
          { text: "IRB Staff prepares the communication letter of the IRB Decision (Approval, Notification Letter) within 3–7 days after the full board meeting." },
          { day: "Day 27", text: "IRB Staff communicates and releases the review result to the PI/Researcher within 3–7 days after the meeting." },
        ],
      },
      {
        name: "Expedited Review",
        steps: [
          { day: "Day 1", text: "Chair/Member-Secretary assigns two (2) Primary Reviewers." },
          { day: "Day 2", text: "IRB Staff notifies and sends the electronic copy to the Primary Reviewers." },
          { day: "Day 3–7", text: "Primary Reviewers review and evaluate (5 working days)." },
          { day: "Day 8", text: "Primary Reviewers return the evaluation forms." },
          { day: "Day 9–10", text: "The Chair consolidates results and finalizes the decision; the result is reported by the Chair in the IRB Meeting (Day 19)." },
          { day: "Day 11", text: "IRB Staff prepares the communication letter of the IRB Decision." },
          { day: "Day 12", text: "IRB Staff communicates and releases the review result to the PI/Researcher." },
        ],
      },
      {
        name: "SJREB Review (Single Joint Research Ethics Board)",
        steps: [
          { day: "Day 1", text: "Chair/Member-Secretary assigns two (2) Primary Reviewers who will attend the SJREB Meeting." },
          { text: "IRB sends a letter of notification signed by the IRB Chair to SJREB that the Primary Reviewers/proxy member will participate in the joint review." },
          { text: "Primary Reviewers attend the SJREB Meeting every 2nd Wednesday of the month." },
          { text: "Chair and Member-Secretary consolidate site-specific issues and comments and make a preliminary decision for reporting to SJREB during the SJREB full board meeting." },
          { text: "Primary Reviewers attend the SJREB full board meeting." },
          { text: "IRB Staff obtains the SJREB meeting minutes and decision notification from the SJREB secretariat seven days after the SJREB full board meeting; the Chair and Member-Secretary conduct an expedited site-specific review within 7 days of receipt and make a local site decision based on SJREB outcomes." },
        ],
      },
      {
        name: "Exempt from Review",
        steps: [
          { day: "Day 1", text: "Chair/Member-Secretary assesses the protocol based on the Exempt from Review checklist." },
          { day: "Day 2", text: "Staff prepares the Certificate of Exemption." },
          { day: "Day 3", text: "Issuance of the Certificate of Exemption to the PI/Researcher." },
        ],
      },
    ],
    outro: [
      { title: "Approval", text: "The PI/Researcher may commence the study upon receipt of the Approval Form signed by the IRB Chair, then submits post-approval reports up to the final report." },
      { title: "Minor/Major Revisions", text: "The PI/Researcher revises the protocol or related documents and resubmits the revised protocol, ICF and/or other study materials: Major Revision – twenty (20) working days; Minor Revision – ten (10) working days after receipt of the Decision letter." },
      { title: "Disapproval", text: "The PI/Researcher receives the Notification of IRB Decision Form (signed by the IRB Chair) and is not allowed to do the study. The PI/Researcher may appeal by writing a letter to the IRB Chair requesting re-review and providing supporting information/material (within 20 days)." },
    ],
  },
  postApprovalFlow: {
    intro: [
      { day: "Day 1", text: "IRB Staff receives the complete post-approval documents." },
      { day: "Day 1", text: "IRB Staff notifies the Chair or Member-Secretary of the post-approval reports and other documents." },
    ],
    tracks: [
      {
        name: "Full Board Review",
        steps: [
          { day: "Day 1", text: "Staff sends the protocol file to the previously assigned two (2) Primary Reviewers." },
          { text: "Primary Reviewers review (10 working days)." },
          { text: "Review of the post-approval submission at the IRB meeting (2nd Thursday of the month); reviewers present using the evaluation forms." },
          { text: "The Chair summarizes; the board decides by voting." },
        ],
      },
      {
        name: "Expedited Review",
        steps: [
          { day: "Day 1", text: "Staff sends the protocol file to the previously assigned two (2) Primary Reviewers." },
          { text: "Primary Reviewers review (5 working days)." },
          { day: "Day 12", text: "The Chair consolidates and finalizes the decision." },
          { text: "Approved post-approval reports are included in the next IRB meeting agenda." },
        ],
      },
      {
        name: "SJREB Review",
        steps: [
          { text: "IRB Staff notifies the Chair once a protocol needs SJREB review." },
          { text: "Staff notifies the primary reviewers and sends the post-approval reports from the SJREB secretariat." },
          { text: "Primary Reviewers attend the SJREB meeting." },
          { text: "The Chair consolidates the IRB review and SJREB meeting results and finalizes the decision." },
        ],
      },
    ],
    outro: [
      { text: "IRB Staff communicates the review result to the PI/Researcher." },
      { text: "Issuance of a Notice of IRB Action (Protocol Amendment, Application for Continuing Review, Final Report, Protocol Deviations, Early Termination Report, Queries & Concern, Serious Adverse Event, RNE, Site Visit) or a Certificate of Approval (Protocol Amendment & Application for Continuing Review)." },
      { text: "Possible actions: Minor/Major modification; request for further information/action; no further action needed; or disapproval (Protocol Amendment only)." },
    ],
  },
  activeProtocols: {
    clinicalTrials: [
      { title: "A Phase III, Randomized, Placebo-controlled, Double-blind, Multi-center, International study of Durvalumab given concurrently with platinum-based Chemoradiation Therapy in Patients with locally advanced, unresectable non-small Cell Lung Cancer (Stage III) (Pacific2)", investigator: "Dr. Villa", status: "10 May 2018" },
      { title: "A Phase III Double-blind Randomised Study Assessing the Efficacy and Safety of Capivasertib + Paclitaxel Versus Placebo + Paclitaxel as First-line Treatment for Patients with Histologically Confirmed, Locally Advanced (Inoperable) or Metastatic Triple-Negative Breast Cancer (TNBC)", investigator: "Dr. Villa", status: "16 May 2019" },
      { title: "A Randomized, Double-blind, Parallel Group, Equivalence, Multicenter Phase III Trial to Compare the Efficacy, Safety, Pharmacokinetics and Immunogenicity of HD204 to Avastin® in patients with Metastatic or Recurrent Non-squamous Non-small Cell Lung Cancer", investigator: "Dr. Villa", status: "12 July 2019" },
      { title: "A multicentre, Randomized, Double-Blind, Placebo-Controlled, Parallel-Group Study to Evaluate the Efficacy and Safety of Dapirolizumab Pegol in Study Participants with Moderately to Severely Active Systemic Lupus Erythematosus", investigator: "Dr. Dulos", status: "23 July 2020" },
      { title: "Phase III Study of Trastuzumab Deruxtecan (T-DXd) with or without Pertuzumab versus Taxane, Trastuzumab and Pertuzumab in HER2-positive, First-line Metastatic Breast Cancer (Destiny-Breast09)", investigator: "Dr. Villa", status: "8 April 2021" },
      { title: "A Phase III, Randomized, Open-label, Multicenter Study Evaluating the Efficacy and Safety of Adjuvant Giredestrant Compared with Physician's Choice of Adjuvant Endocrine Monotherapy in Patients with Estrogen Receptor-Positive, HER2-Negative Early Breast Cancer", investigator: "Dr. Villa", status: "10 June 2021" },
      { title: "A Multicentre, Randomised, Double-blind, Placebo-controlled, Phase III Study Evaluating the Efficacy and Safety of Anifrolumab in Asian Participants with Active Systemic Lupus Erythematosus (AZALEA)", investigator: "Dr. Dulos", status: "10 June 2021" },
      { title: "A Randomized, Double-blind, Parallel-group, Placebo-controlled, Fixed-dose, Multicenter Study to Evaluate the Efficacy and Safety of SEP-363856 in Acutely Psychotic Patients with Schizophrenia, Followed by an Open-label Extension Phase", investigator: "Dr. Cosca", status: "19 August 2021" },
      { title: "A Global, Multi-center, Randomized, Double-Blind, Placebo-controlled, Phase III Clinical Study to Evaluate the Protective Efficacy, Safety and Immunogenicity of SARS-CoV-2 Messenger Ribonucleic Acid (mRNA) Vaccine in Population Aged 18 Years and Older", investigator: "Dr. Ygpuara", status: "19 August 2021" },
      { title: "A randomized, double-blind, placebo-controlled, multicentre trial, assessing the impact of inclisiran on major adverse cardiovascular events in participants with established cardiovascular disease", investigator: "Dr. Tirador", status: "16 December 2021" },
      { title: "A multi-center, randomized, double-blind, placebo-controlled Phase 2/3 clinical trial to evaluate the safety and efficacy of pyronaridine-artesunate (Artecom) in COVID-19 patients", investigator: "Dr. Ferrer", status: "13 January 2022" },
      { title: "A Phase 3, randomized, stratified, observer-blind, active-controlled study to evaluate the immunogenicity and safety of mRNA-1010 seasonal influenza vaccine in adults 18 years and older", investigator: "Dr. Ygpuara", status: "17 March 2022" },
      { title: "A Phase III randomized, double-blind, placebo-controlled parallel group to examine the efficacy and safety of BI 425809 once daily over 26 week treatment period in patients with schizophrenia (CONNEX-1)", investigator: "Dr. Cosca", status: "13 October 2022" },
      { title: "A Phase 3, Open-label, Randomised Study of Datopotamab Deruxtecan (Dato-DXd) Versus Investigator's Choice of Chemotherapy in Patients who are not Candidates for PD-1/PD-L1 Inhibitor Therapy in First-line Locally Recurrent Inoperable or Metastatic Triple-negative Breast Cancer (TROPION-Breast02)", investigator: "Dr. Villa", status: "13 October 2022" },
      { title: "A Randomized, Double-blind, Placebo-controlled Clinical Study to Evaluate the Efficacy, Safety, and Immunogenicity of SARS-CoV-2 Variant (BA.4/5) mRNA Vaccine (ABO1020) in Healthy Subjects Aged 18 Years and Older Who Have Completed the Full Vaccination", investigator: "Dr. Ygpuara", status: "18 November 2022" },
      { title: "A Randomized, Multi-regional, Double-Blind, Double-dummy Parallel-group, Placebo and Allopurinol-controlled Phase 3 Study to Assess the Efficacy and Safety of Tigulixostat in Gout Patients with Hyperuricemia", investigator: "Dr. Dulos", status: "16 March 2023" },
      { title: "A Phase 3, Randomized, Observer-Blinded Study to Evaluate the Efficacy, Safety, Tolerability, and Immunogenicity of a Modified RNA Vaccine against Influenza Compared to Licensed Inactivated Influenza Vaccine in Healthy Adults 18 Years of Age or Older", investigator: "Dr. Ponje", status: "16 March 2023" },
      { title: "A Randomized, Placebo-controlled, Double-blind, Multi-center, Phase III to Assess the Efficacy and Safety of Trimodulin (BT588) in Adult Hospitalized Subjects with Severe Community-acquired Pneumonia (sCAP)", investigator: "Dr. Ferrer", status: "16 March 2023" },
      { title: "A Phase 3, International, Randomised, Double-blind, Placebo-controlled Study to Evaluate the Effect of Sodium Zirconium Cyclosilicate on Chronic Kidney Disease (CKD) Progression in Participants with CKD and Hyperkalaemia or at Risk of Hyperkalaemia", investigator: "Dr. Tirador", status: "11 April 2023" },
      { title: "A randomized, double-blind, placebo-controlled multicenter study to evaluate the effect of inclisiran on preventing major adverse cardiovascular events in high-risk primary prevention patients (VICTORION-1 PREVENT)", investigator: "Dr. Tirador", status: "11 April 2023" },
      { title: "A Phase 3, Randomized, Double-blind, Placebo-controlled, Event-driven Study to Demonstrate the Efficacy and Safety of Milvexian, an Oral Factor XIa Inhibitor, After a Recent Acute Coronary Syndrome (Librexia-ACS)", investigator: "Dr. Tirador", status: "11 April 2023" },
      { title: "An open label, single arm, extension trial to examine long-term safety of BI 425809 once daily in patients with schizophrenia who have completed previous BI 425809 Phase III trials (CONNEX-X)", investigator: "Dr. Cosca", status: "6 July 2023" },
      { title: "A Phase 3, Randomized, Double-Blind, Double-Dummy, Parallel Group, Active-Controlled Study to Evaluate the Efficacy and Safety of Milvexian, an Oral Factor XIa Inhibitor, Versus Apixaban in Participants with Atrial Fibrillation", investigator: "Dr. Tirador", status: "6 July 2023" },
      { title: "A Phase 2, Open-label Study to Assess the Safety and Efficacy of Bemnifosbuvir (BEM) and Ruzasvir (RZR) in Subjects with Chronic Hepatitis C Virus (HCV) Infection", investigator: "Dr. Sonza", status: "6 July 2023" },
      { title: "A Phase 3, Randomized, Double-Blind, Parallel Group, Placebo-Controlled Study to Demonstrate the Efficacy and Safety of Milvexian, an Oral Factor XIa Inhibitor, for Stroke Prevention after an Acute Ischemic Stroke or High-Risk Transient Ischemic Attack", investigator: "Dr. Tirador", status: "6 July 2023" },
      { title: "A Phase 2 randomized, active-controlled, observer-blind study to assess the safety, reactogenicity and immunogenicity of a booster dose of investigational COVID-19 mRNA vaccines in healthy adults who previously received a complete primary vaccination series with or without booster dose(s)", investigator: "Dr. Tirador", status: "6 July 2023" },
      { title: "A Phase 3/3b, Randomized, Observer-blind, Multicenter Clinical Study to Evaluate the Efficacy, Safety and Immunogenicity of an MF59-Adjuvanted Quadrivalent Subunit Inactivated Influenza Vaccine Compared to a Quadrivalent Influenza Vaccine in Adults ≥65 Years of Age", investigator: "Dr. Ygpuara", status: "6 July 2023" },
      { title: "A Phase 3/3b, Randomized, Observer-blind, Multicenter Clinical Study to Evaluate the Efficacy, Safety and Immunogenicity of an MF59-Adjuvanted Quadrivalent Subunit Inactivated Influenza Vaccine Compared to a Quadrivalent Influenza Vaccine in Adults ≥65 Years of Age", investigator: "Dr. Ponje", status: "6 July 2023" },
    ],
    researcherInitiated: [
      { title: "Awareness, Attitudes and Practices towards Telemedicine among residents of Brgy. San Rafael, Mandurriao, Iloilo City: A Cross-sectional Study", investigator: "Dr. Amiscua", status: "10 March 2024" },
      { title: "A Review of Incidental Choledocholithiasis using the American Society of Gastrointestinal Endoscopy (A.S.G.E) Criteria at St. Paul's Hospital of Iloilo: A 5-Year Retrospective Study", investigator: "Dr. Lagon", status: "15 April 2024" },
      { title: "Exploring Trends and Factors Influencing Adolescent Pregnancy in Iloilo City from 2018 to 2023", investigator: "Dr. Altamia", status: "10 April 2024" },
      { title: "Correlation between Breast Cancer and Ultrasound BI-RADS 4 or 5 Lesions: A Single Institution Experience", investigator: "Dr. Mallorca", status: "15 April 2024" },
      { title: "Assessing the Diagnostic Significance of Urine Bilirubin Levels in Gallstone Diseases", investigator: "Dr. Pimentel", status: "5 May 2024" },
      { title: "Correlation of Cardiac Systolic and Diastolic Functions in 2D Echocardiography Among Patients with Metabolic Dysfunction-Associated Steatotic Liver Disease at St. Paul's Hospital of Iloilo: A Cross-sectional Study", investigator: "Dr. Jiro", status: "On-going review" },
      { title: "Preoperative Axillary Ultrasound in Detection of Axillary Breast Cancer Metastases in Adult Patients of St. Paul's Hospital Iloilo", investigator: "Dr. Alfabeto", status: "27 June 2024" },
      { title: "Dengue Severity Prognostic Factors in a Tertiary Hospital in Iloilo City: A Pilot Study", investigator: "Dr. Abordo / Dr. Alforte", status: "On-going review" },
      { title: "Navigating Surgical Education through a Pandemic: A Comparative Evaluation of Surgical Education through the Residency In-Training Examinations (RITE) and Comprehensive External Residency Evaluation System (CERES) Scores among General Surgery Residents in Iloilo City", investigator: "Dr. Diestro", status: "On-going review" },
      { title: "Perceived Workload and Performance of Emergency Department Nurses in Iloilo City", investigator: "Jennifer Villegas, et al.", status: "5 February 2024" },
      { title: "Physical Therapists' Perceptions on Spirituality in Patient Care in Iloilo City", investigator: "Frances Therese Lapating, et al.", status: "25 March 2024" },
      { title: "The Effectiveness of Progressive Binder Clip Pinch Resistance Exercise vs. Progressive Resistance Band Exercises in Improving Pincer Grasp in the Elderly Population", investigator: "Therese Rae Divinagracia, et al.", status: "3 April 2024" },
      { title: "Navigating Loss: Patient Death Experiences of Nurses in the Clinical Setting", investigator: "Jamaine A. Savari, et al.", status: "30 April 2024" },
    ],
  },
};

export const SERVICE_GROUP_LABELS = {
  SPECIALTY_HUB: { label: "Specialty Hub", description: "Advanced centers for airway, cardiac and hyperbaric care." },
  SPICE: { label: "S.P.I.C.E.", description: "St. Paul Integrated Center of Expertise — specialized outpatient centers." },
  CANCER_CARE: { label: "Cancer Care", description: "Comprehensive oncology, radiation therapy and palliative care." },
  ANCILLARY: { label: "Ancillary Services", description: "24/7 emergency, diagnostics, pharmacy and support services." },
} as const;

export const POST_CATEGORY_LABELS = {
  NEWS: "News & Press Releases",
  EVENT: "Events & Conferences",
  AWARD: "Awards & Certificates",
} as const;
