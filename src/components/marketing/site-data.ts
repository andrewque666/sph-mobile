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
  description:
    "A tertiary level training general hospital with a capacity of 180 beds, ISO Integrated Management System certified, owned and managed by the Sisters of Saint Paul of Chartres in the heart of Iloilo City.",
  intro:
    "St. Paul's Hospital of Iloilo, Inc. is located in the heart of the city. It is managed and owned by the Sisters of Saint Paul of Chartres, a tertiary level training general hospital with a capacity of 180 beds and ISO Integrated Management System Certified. We take pride in delivering integrated, holistic, and dynamic care to our patients, ensuring comprehensive support for their physical, emotional, mental and spiritual well-being.",
  contact: {
    address:
      "General Luna Street, Brgy. Danao, Iloilo City Proper, Iloilo City, Iloilo, Philippines",
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
    { label: "YouTube", href: "https://www.youtube.com/channel/UCImrx6W8Cuar6kW_7UEjiNA" },
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
  { value: "180", label: "Bed capacity" },
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
  { label: "Laboratory results", description: "Blood, chemistry, microbiology and more", href: "https://laboratory.sphiloilo.com", icon: FlaskConical, external: true },
  { label: "Imaging results", description: "X-ray, CT scan, ultrasound, mammography", href: "https://imaging.sphiloilo.com", icon: ScanLine, external: true },
  { label: "Cardio results", description: "2D echo, stress test, Holter, Doppler", href: "https://cardio.sphiloilo.com", icon: HeartPulse, external: true },
  { label: "Neuroscience results", description: "Neurodiagnostic study results", href: "https://neuroscience.sphiloilo.com", icon: Brain, external: true },
  { label: "e-Doctor", description: "Physician log-in", href: "https://doctor.sphiloilo.com", icon: Stethoscope, external: true },
  { label: "e-Patient", description: "Your SPHI patient account", href: "/login", icon: UserRound, external: false },
];

export const HISTORY = [
  "The solicitude for the sick of the late Msgr. Dennis J. Dougherty of Philadelphia, who was then Bishop of Jaro, was the original motivating force that brought about the foundation of St. Paul's Hospital of Iloilo. As early as 1909 he asked the Sisters of St. Paul of Chartres, who were just starting their work in the Philippines, to establish a hospital in Iloilo.",
  "It was not until February 15, 1911 when four sisters — Mother Marie Donatien, Sister Antoine du Sacre Coeur, Sister Augustine De Marie and Sister Felix de Marie — came and answered the clergy. Their first convent was a former warehouse of the Ynchausti Y Compania on Calle Rosario. Two adjacent residential homes were made the seats of the hospital. Three more nuns, Sister Marie Scholastique, Sister Marie Estelle and Sister Adrien, joined them some months later; the latter was formally installed as the first superior. On May 20 of the same year, their doors opened to the sick. Dr. Samuel Carson of the Philippine Railway brought in the first patient.",
  "Dr. Carson became the first medical director and was succeeded by Dr. Arroyo, who held the position up to the outbreak of World War II. The French religious pioneers endeared themselves to the Ilonggos, who fondly called them “Madres de San Pablo”. In 1913 Msgr. Dougherty went back to the States to secure funds for a hospital building, which was completed and formally occupied in 1916. Recognizing the dedicated services of the Sisters, he turned over to them full ownership and administration in a written statement executed in 1941.",
  "The site — a former salty mudfield overgrown with weeds and swamp vegetation — became a haven for the sick in the heart of the city. For more than a century the building and its grounds have been kept clean and orderly, earning local and national awards for cleanliness and quality service.",
];

export const MILESTONES = [
  { year: "1909", text: "Bishop Dougherty asks the Sisters of St. Paul of Chartres to open a hospital in Iloilo." },
  { year: "1911", text: "Four sisters arrive on February 15; the hospital opens its doors on May 20." },
  { year: "1916", text: "The new hospital building is completed and formally occupied." },
  { year: "1941", text: "Full ownership and administration are turned over to the Sisters." },
  { year: "2023", text: "ISO 9001:2015 Quality Management System certification (June 2)." },
  { year: "2024", text: "ISO 14001:2015 and ISO 45001:2018 certification — Triple ISO IMS (September 27)." },
  { year: "2025", text: "The Interventional Catheterization Laboratory opens (April 21)." },
];

export const VISION =
  "We envision St. Paul's Hospital of Iloilo, Inc. as a Christ centered, excellent, innovative, global healthcare and training hospital.";

export const MISSION = [
  "Offer Christ-centered excellent healthcare upholding the bioethical principles and the teaching of the Catholic church;",
  "Innovate & develop competencies of health care professionals through continuing relevant training and research programs; and",
  "Continually implement and sustain operational and financial sustainability through Christian stewardship & good governance.",
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
];

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
    "In 1996, the St. Paul's Hospital Iloilo Ethics Committee was constituted — the beginning of the Bioethics Committee. On June 27, 2006 the committee revised its policies and guidelines for the comprehensive review of research involving human participants.",
    "On November 1, 2007 it was renamed the St. Paul's Hospital Ethics Review Board, and in 2014 the Institutional Review Board Committee. On April 30, 2015 SPHI applied for Level 3 Accreditation with the Philippine Health Research Ethics Board, affirming its commitment to national and international standards for all types of research.",
  ],
  members: [
    { name: "Jaime Manila, MD, FPOGS", role: "Chairman", field: "OB-Gynecology" },
    { name: "Rowena Cosca, MD, FPPA", role: "Co-Chairman", field: "Clinical Psychiatrist" },
    { name: "Ma. Cecilia Florete, MD, FPCP, FPSG, FPSDE", role: "Member-Secretary", field: "Internist-Gastroenterologist" },
    { name: "Venerio Gasataya Jr., MD, FPCS, FPSG, MHA", role: "Member", field: "General Surgeon" },
    { name: "Ronald Latap, MD, FPOGS, FSGOP, FPSCPC", role: "Member", field: "OB-Gynecology, Gynecologic Oncologist, Colposcopist" },
    { name: "Atty. Jose Mari Benjamin Tirol", role: "Member", field: "Lawyer" },
    { name: "Maria Thelma Servidad, RN, MAN", role: "Member", field: "Businesswoman" },
    { name: "Christopher Tabsing, LPT", role: "Member", field: "School Principal II" },
    { name: "Ma. Romy Alexis Consulta, MEd", role: "Member", field: "Professor" },
    { name: "Sr. Gertrude Caryls Kuebler, SPC", role: "Member", field: "Religious" },
    { name: "Dr. Princi Demaisip", role: "Member", field: "Neurologist" },
    { name: "Mrs. Ana Liza Sevillon", role: "Member", field: "Housewife" },
    { name: "Mrs. Ma. Clarissa Columna", role: "Member", field: "Freelance Embroiderer" },
  ],
  membersAsOf: "May 15, 2026",
  forms: [
    "SPHI-IRB SOP 14th Edition",
    "Flowchart for Protocol Submission",
    "Form 2.1 — Application for Ethics Review of a New Protocol",
    "Form 3.3 — Protocol Resubmission Form",
    "Form 4.0 — Protocol Amendment Form",
    "Form 4.1 — Progress Report Form",
    "Form 4.2 — SAE & SUSAR",
    "Form 4.3 — RNE Reports Form",
    "Form 4.4 — Protocol Deviation & Violation Form",
    "Form 4.5 — Early Termination Report",
    "Form 4.6 — Final Report Form",
    "Form 4.7 — Application for Continuing Review",
  ],
  guidelines: [
    "Data Privacy Act of 2012",
    "CIOMS 2016",
    "DOH Department Order 2017-0265",
    "Administrative Order 2020-0010",
    "ICH-GCP 2016 and ICH-GCP E6(R3)",
    "WMA Declaration of Helsinki (2024)",
    "PNHRS Act of 2013",
    "2022 National Ethical Guidelines for Research Involving Human Participants",
    "2020 PHREB SOP Workbook",
    "WHO 2023 Tool for Benchmarking Ethics",
  ],
  meetingDates: [
    "January 8, 2026", "February 19, 2026", "March 24, 2026", "April 19, 2026",
    "May 14, 2026", "June 11, 2026", "July 9, 2026", "August 13, 2026",
    "September 10, 2026", "October 8, 2026", "November 12, 2026", "December 10, 2026",
  ],
  faqs: [
    { q: "What are the requirements for initial submission?", a: "Letter of application and complete protocol, protocol summary, data collection forms, informed consent forms (English, Tagalog and Hiligaynon), CVs and GCP certificates of the investigators, valid PRC license, COI declaration and confidentiality agreement, technical review approval of the department, budget, and a letter of approval from the Hospital Administrator and Data Protection Officer. Clinical trials also require the investigator's brochure, case report forms, insurance certificate and draft clinical trial agreement." },
    { q: "How many copies of the protocol should I submit?", a: "An electronic copy of the protocol package plus three (3) hard copies." },
    { q: "How long is the ethical clearance valid?", a: "One (1) year. The Principal Investigator should apply for a Continuing Review." },
    { q: "When is the submission deadline?", a: "Every 21st of the month, until 4:00 PM." },
    { q: "Can the IRB review protocols conducted in other institutions?", a: "No. The IRB only reviews protocols where SPHI is part of the study setting." },
    { q: "When does the IRB meet?", a: "Every 2nd Thursday of the month." },
  ],
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
