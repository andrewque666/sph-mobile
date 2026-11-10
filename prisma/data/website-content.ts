/**
 * Initial CMS content for the public website, taken from sphiloilo.com.
 * Seeded once (upsert by slug) — afterwards it is managed from /admin/website.
 */
type ServiceGroup = "SPECIALTY_HUB" | "SPICE" | "CANCER_CARE" | "ANCILLARY";
type PostCategory = "NEWS" | "EVENT" | "AWARD";

const TRUNK = "(033) 337-27-42 to 49";

export const SERVICES: {
  slug: string;
  name: string;
  shortName?: string;
  group: ServiceGroup;
  tagline?: string;
  summary: string;
  body: string;
  offerings: string[];
  schedule?: string;
  phone?: string;
  location?: string;
}[] = [
  {
    slug: "sparc",
    name: "St. Paul's Airway and Respiration Center",
    shortName: "SPARC",
    group: "SPECIALTY_HUB",
    tagline: "The first and only dedicated respiratory care facility in Iloilo.",
    summary:
      "Comprehensive diagnosis, treatment and rehabilitation for respiratory conditions — home of the first Sleep Laboratory and the most comprehensive Pulmonary Function Testing in Western Visayas.",
    body: `Respiratory illnesses remain one of the leading causes of hospital admissions. Recognizing that the ability to breathe freely and comfortably is one of life's most essential needs, St. Paul's Hospital of Iloilo, Inc. established the Center for Respiratory Care to provide comprehensive, effective, and high-quality healthcare services for patients with respiratory conditions.

The Center for Respiratory Care was the first and remains the only facility in Iloilo dedicated to the treatment and rehabilitation of patients with respiratory-related illnesses. It houses the first Sleep Laboratory and offers the most comprehensive Pulmonary Function Testing services in Western Visayas.

In October 2025 it was officially renamed the St. Paul's Airway and Respiration Center (SPARC) by Dr. Malbar Ferrer, Chief of Medical Staff, and began operations under its new name and location on the second floor of the Main Building on December 15, 2025.

Team: Dr. Malbar Galfo Ferrer (Chairman), Dr. Rosauro Cajayon Cabana (Polysomnography Specialist), Dr. Rodrose Guzman-Trivilegio, Dr. Lorelei Pedrnio-Sirilan, Dr. Amee Lourdes Ravena-Ponje, Dr. Mark Leonard Carandang Flores, Dr. Shiela Checa-Jalandra.`,
    offerings: [
      "Arterial blood gas (ABG) extraction and test",
      "Bronchoscopy and direct laryngoscopy",
      "Flexible nasolaryngoscopy and stroboscopy",
      "Flexible Endoscopic Evaluation of Swallowing (FEES)",
      "Foreign body removal",
      "Pulmonary function tests — spirometry, DLCO, FeNO, oscillometry",
      "Polysomnography — diagnostic, therapeutic and split-night sleep studies",
      "Life support — BiPAP, CPAP, bubble CPAP, HFNC, mechanical ventilator hooking and weaning",
      "Incentive spirometry and inhalation therapy / nebulization",
      "TB laboratory tests — TB LAMP, Bactec MGIT 960 (TB culture)",
    ],
    phone: `${TRUNK} local 8301 · 0907 446 5020`,
    location: "2nd Floor Main Building, beside CSSU",
  },
  {
    slug: "cathlab",
    name: "Interventional Catheterization Laboratory",
    shortName: "Cath Lab",
    group: "SPECIALTY_HUB",
    tagline: "Timely, minimally invasive cardiovascular care since April 21, 2025.",
    summary:
      "Diagnostic and interventional procedures for heart and vascular disease — coronary angiography, angioplasty with stenting, pacemakers, and neuro and radiology interventions.",
    body: `The SPHI Catheterization Laboratory officially commenced operations on April 21, 2025, marking a significant milestone in the hospital's commitment to advanced cardiovascular care for Iloilo and Western Visayas.

On its first day, the Cath Lab performed its first Coronary Angiogram, made possible through the generosity of the CADSSI Best of Broadway Fundraising Show 2024, which fully funded the patient's procedure.

Equipped with advanced medical technology and supported by highly skilled interventional cardiologists, nurses, and allied health professionals, the Cath Lab performs its procedures in accordance with internationally recognized standards of patient safety and clinical excellence.`,
    offerings: [
      "Coronary angiogram (radial and femoral)",
      "Percutaneous coronary intervention (radial and femoral)",
      "Temporary and permanent pacemaker insertion; battery replacement",
      "Intra-aortic balloon pump insertion",
      "Plain old balloon angioplasty, carotid angioplasty, CTO angioplasty",
      "Central line, IJ, femoral, permanent and arterial line catheter insertion",
      "Inferior vena cava filter",
      "Neuro: four-vessel DSA, cerebral coiling, thrombectomy, endovascular stenting of aneurysm",
      "Radiology: bronchial and trans-arterial chemoembolization, PTBD, visceral angiogram with embolization",
    ],
    phone: `${TRUNK} local 6301 · 0912 955 1998`,
    location: "2nd Floor Main Building, in front of the Neonatal ICU",
  },
  {
    slug: "hbot-center",
    name: "Hyperbaric Oxygen Treatment Center",
    shortName: "HBOT",
    group: "SPECIALTY_HUB",
    tagline: "The first hyperbaric oxygen treatment center in Iloilo.",
    summary:
      "Breathing 100% oxygen in a multiplace pressurized chamber to accelerate healing of damaged tissue, reduce swelling and fight infection.",
    body: `Hyperbaric oxygen treatment enhances the body's natural healing processes by providing an increased amount of oxygen to the tissues. The patient breathes 100% oxygen in a chamber where atmospheric pressure is raised above normal.

Our multiplace hyperbaric chamber accommodates more than one person. Oxygen under pressure diffuses into the blood plasma and travels up to three times further into the tissues, providing the body with 10–15 times its normal supply of oxygen to repair damaged tissue and support the growth of new capillary networks.

Benefits include increased stem cell growth, reduced pain and swelling, scar tissue rehabilitation, improved range of motion, and an antimicrobial effect.`,
    offerings: [
      "Aerobic and/or anaerobic flora infections of tissues",
      "Compromised skin flaps or grafts",
      "Refractory mycosis (zygomycosis and actinomycosis)",
      "Acute cerebral edema",
      "Burns",
    ],
    schedule: "Monday – Friday, 8:00 AM – 5:00 PM",
    phone: `${TRUNK} local 2071`,
    location: "Main Building",
  },
  {
    slug: "cancer-center",
    name: "Cancer Center",
    group: "CANCER_CARE",
    tagline: "Compassionate, quality care for oncologic patients.",
    summary:
      "A complete cancer regimen — tomotherapy, brachytherapy, chemotherapy, palliative care and oncology nursing — to control disease, prolong survival and improve quality of life.",
    body: `St. Paul's Hospital Cancer Center was constructed to give compassionate and quality healthcare services to oncologic patients, especially to the Ilonggos. The unit is manned by a highly qualified and competent team of doctors and staff.

Medical Oncology focuses on treatment with chemotherapy, immunotherapy and hormonal therapy. Radiation Therapy uses the Tomotherapy machine, which combines intensity-modulated radiation therapy (IMRT) with the accuracy of CT scanning, treating tumors one layer at a time. Brachytherapy places a sealed radiation source inside or next to the treatment area and is commonly used for cervical, prostate, breast and skin cancer.

Palliative and Hospice Care focuses on symptom relief and quality of life for terminally ill patients, including pain management, nutrition, and psycho-emotional and spiritual support.

Radiation Oncology: Tuesday – Saturday (except holidays), 7:00 AM – 4:00 PM. Medical Oncology: Monday – Friday (except holidays), 7:00 AM – 4:00 PM.`,
    offerings: [
      "CT scan simulation",
      "Tomotherapy",
      "Brachytherapy",
      "Chemotherapy (adult and pediatric)",
      "Radiation oncology",
      "Medical oncology",
      "Blood transfusion",
      "Bone marrow aspiration",
      "Palliative and hospice care",
    ],
    schedule: "Radiation Oncology Tue–Sat · Medical Oncology Mon–Fri · 7:00 AM – 4:00 PM",
    phone: `${TRUNK} local 2310 · 0993 063 5035 · 0966 485 4764`,
    location: "Ground Floor, Cancer Center Building",
  },
  {
    slug: "kidney-center",
    name: "Kidney Center",
    group: "SPICE",
    tagline: "The first facility outside Metro Manila accredited to perform kidney transplants.",
    summary:
      "Renal care from general nephrology and renal biopsy to hemodialysis, peritoneal dialysis and kidney transplantation — the widest hospital-based kidney unit in Iloilo.",
    body: `The Kidney Center provides services to patients in need of renal care — general nephrology, renal biopsy, dialysis and transplantation — complemented by Urology for stone work-up and other urologic conditions.

SPHI's Kidney Center is the first and only facility outside Metro Manila accredited to perform kidney transplant and the widest hospital-based kidney unit in Iloilo. It is the first private hospital contracted with PhilHealth's Z Benefit Package for peritoneal dialysis and kidney transplant since 2016.

The center uses the Automated Peritoneal Dialysis machine and a reprocessing machine to disinfect dialyzers used in hemodialysis.`,
    offerings: ["Hemodialysis", "Peritoneal dialysis", "Kidney transplantation", "General nephrology and renal biopsy"],
    schedule: "Monday – Sunday, 24 hours",
    phone: `${TRUNK} local 2206 · 0985 346 8932`,
    location: "3rd Floor, SPICE Building",
  },
  {
    slug: "physical-medicine-rehabilitation",
    name: "Physical Medicine & Rehabilitation",
    group: "SPICE",
    tagline: "The widest rehabilitation facility in the region.",
    summary:
      "Evaluation and management of disabilities from neurological, musculoskeletal and cardiopulmonary disorders, with in-house physiatrists and therapists.",
    body: `SPHI's Physical Medicine is the widest facility in the region, providing thorough evaluation and management of patients with disabilities arising from acute and chronic neurological, musculoskeletal, and cardiopulmonary disorders.

Patients receive systematic and comprehensive services, including patient education as part of the rehabilitation program — delivered in a warm and caring environment by expert in-house physiatrists and therapists.`,
    offerings: [
      "Neck and back rehabilitation",
      "Neurologic rehabilitation",
      "Arthritis and joint replacement rehabilitation",
      "Cardiac, pediatric, geriatric and sports rehabilitation",
      "Scoliosis assessment and treatment",
      "Occupational therapy, ADL evaluation, pre-speech training, splinting, dysphagia",
      "EMG-NCV-RNS",
      "Shockwave therapy and super inductive therapy",
      "Tilt table test",
    ],
    schedule: "Monday – Saturday, 8:00 AM – 4:00 PM",
    phone: `${TRUNK} local 8306 · 0930 060 0193`,
    location: "3rd Floor, SPICE Building",
  },
  {
    slug: "cardiology",
    name: "Cardiology Unit",
    group: "SPICE",
    tagline: "Providing care straight from the heart.",
    summary:
      "Non-invasive diagnosis and treatment of heart and vascular conditions for in- and out-patients — echocardiography, Doppler studies, stress tests and monitoring.",
    body: `Cardiovascular disease is among the top killers in the Philippines. True to its mission, SPHI created a Cardiology Unit that provides high-quality services for the diagnosis and treatment of cardiac and vascular disease in both outpatient and inpatient settings, with a holistic, patient-centered and evidence-based approach.

Team: Dexter Briones, MD (Chairman), with Francis Cyril S. Ganzon, Mary Jane Villanueva-Rodriguez, Joefil P. Acosta, Yul P. Balleza, Cornelio B. Borreros II, Ma. Sylvia Theresa De Pili, Marcelino B. Felisarta, Rea L. Franco, Eugene C. Lim, Lucita D. Jalbuena, Patricio P. Palmes, Ma. Shelah Salaya-Ruffert, Louie S. Tirador, Felibert O. Dianco, Rhodelyn B. Almeñana, Rosmar P. Fama, Glenn P. Mana-ay, Roberto A. Estepar, Geoffrey V. Adelanar, Janice Joan H. Santiago and Rosemarie P. Castronuevo.`,
    offerings: [
      "2D echo, 2D echo with contrast, stress echo, dobutamine stress echo, fetal echo",
      "Carotid and transcranial Doppler studies",
      "Arterial and venous Doppler studies of the extremities",
      "Stress test",
      "Holter monitoring",
      "Ambulatory BP monitoring",
    ],
    schedule: "Monday – Saturday, 8:00 AM – 4:00 PM",
    phone: `${TRUNK} local 6343 · 0912 995 5436`,
    location: "3rd Floor, SPICE Building",
  },
  {
    slug: "digestive-disease-center",
    name: "Digestive Disease Center",
    group: "SPICE",
    tagline: "Expert care for gastrointestinal, hepatobiliary and pancreatic disorders.",
    summary:
      "Endoscopic diagnosis and treatment of abdominal diseases for in- and out-patients and referrals from other hospitals.",
    body: `The Digestive Disease Center provides holistic and quality service in the management of gastrointestinal, hepatobiliary and pancreatic disorders, catering to in- and out-patients as well as referrals from other hospitals. Its team of expert gastroenterologists performs complex procedures, giving patients more and better options for treatment.

Team: Dr. Danilo Encarnacion (Chairman), with Dr. Cecilia Florete, Dr. Ramel Balbastro, Dr. Miguel Sotomil, Dr. Danilo Valencia, Dr. Josie Grace Causing-Castillo, Dr. Theresa Rubi Nadala, Dr. Shiela May Sonza, Dr. Rogelio Engada and Dr. Ike Minerva.`,
    offerings: [
      "Upper GI endoscopy (EGD) with biopsy, sclerotherapy, histoacryl injection, clip application, polypectomy, balloon dilation, foreign body removal",
      "Rubber band ligation / esophageal variceal ligation",
      "PEG tube insertion and replacement",
      "Colonoscopy and flexible sigmoidoscopy",
      "ERCP with sphincterotomy, stone sweeping, stent insertion and balloon dilation",
    ],
    schedule: "Monday – Saturday (except holidays), 7:00 AM – 3:00 PM",
    phone: `${TRUNK} local 8305 · 0956 350 7767`,
    location: "3rd Floor, SPICE Building",
  },
  {
    slug: "neuroscience-center",
    name: "Neuroscience Center",
    group: "SPICE",
    summary:
      "Part of the St. Paul Integrated Center of Expertise. Neuroscience results are available through the Online Result Viewer.",
    body: `The Neuroscience Center is part of SPHI's S.P.I.C.E. program. Neuroscience results can be viewed online through the Online Result Viewer.

For services and schedules, please contact the hospital trunk line.`,
    offerings: [],
    phone: TRUNK,
    location: "SPICE Building",
  },
  {
    slug: "st-lucy-eye-center",
    name: "St. Lucy Eye Diagnostic & Treatment Center",
    group: "SPICE",
    summary: "Eye diagnostic and treatment services under the St. Paul Integrated Center of Expertise.",
    body: `The St. Lucy Eye Diagnostic & Treatment Center is part of SPHI's S.P.I.C.E. program. Fundus imaging and the Eye Imaging Clinic are provided with the Diagnostic Imaging Department.

For services and schedules, please contact the hospital trunk line.`,
    offerings: [],
    phone: TRUNK,
    location: "SPICE Building",
  },
  {
    slug: "industrial-clinic",
    name: "Primary Health Care & Industrial Clinic",
    group: "SPICE",
    tagline: "Hassle-free medical services for companies, schools and HMO members.",
    summary:
      "Pre-employment, annual and pre-enrollment medical examinations, plus liver elastography (FibroScan) and Emsella pelvic floor treatment.",
    body: `The SPHI Industrial Clinic provides compassionate quality healthcare in the most convenient and efficient way, with a wide array of medical services for companies and institutions — pre-employment, annual physical examination, pre-enrollment and in-patient needs. Clients include private companies, schools and health insurance holders.

Our team facilitates all necessary laboratory and diagnostic tests and consultations, and caters to regular walk-in clients from accredited partners.`,
    offerings: [
      "Pre-employment medical examination",
      "Annual physical examination",
      "Pre-enrollment medical examination",
      "Liver elastography (FibroScan) — fibrosis assessment, spleen stiffness, fatty liver evaluation",
      "Emsella — pelvic floor strengthening, urinary incontinence treatment, postpartum recovery",
    ],
    schedule: "Monday – Friday (except holidays), 8:00 AM – 4:00 PM (3:00 PM cut-off)",
    phone: `${TRUNK} local 6359 · 0910 248 3640`,
    location: "4th Floor, SPICE Building",
  },
  {
    slug: "emergency-room",
    name: "Emergency Room",
    group: "ANCILLARY",
    tagline: "We respond to emergencies with loving care.",
    summary:
      "24-hour emergency care with urgent and non-urgent rooms — and the only hospital in the city with an operating room within the emergency room.",
    body: `The Emergency Room and Out-Patient Department is divided into an Urgent Room and a Non-Urgent Room, providing 24-hour emergency facilities.

The ER is equipped with a standby cardiac monitor, an ECG machine and a digital-metered blood glucose monitor. We are the only hospital in the city that has an operating room within the emergency room.`,
    offerings: ["24/7 emergency care", "Urgent and non-urgent rooms", "Operating room within the ER", "Cardiac monitoring and ECG"],
    schedule: "Open 24 hours",
    phone: TRUNK,
    location: "Main Building",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy Department",
    group: "ANCILLARY",
    tagline: "It's not just about dispensing drugs — we care.",
    summary:
      "24-hour pharmacy for out-patients and admitted patients, dispensing only genuine medicines, with licensed pharmacists for counselling.",
    body: `The pharmacy offers 24-hour service to out-patients, ambulatory clients, and unit-dose dispensing and compounding of prescriptions for admitted patients. Its therapeutic research committee assures the rational use of drugs.

The department offers a wide range of medicines and medical supplies at reasonable prices and guarantees that it dispenses only genuine and new drugs. It is located at the ground floor of the Main Building.

A satellite pharmacy on the second floor of the S.P.I.C.E. Building serves out-patients from the doctors' clinics, Monday to Saturday, 9:00 AM – 5:00 PM (closed Sundays and holidays).`,
    offerings: ["24/7 main pharmacy", "Unit-dose dispensing and compounding", "Pharmacist counselling", "Satellite pharmacy at the SPICE Building"],
    schedule: "Open 24 hours · Satellite: Mon–Sat 9:00 AM – 5:00 PM",
    phone: TRUNK,
    location: "Ground Floor, Main Building",
  },
  {
    slug: "diagnostic-imaging",
    name: "Diagnostic Imaging Department",
    group: "ANCILLARY",
    tagline: "Linking technology and quality for your safety.",
    summary:
      "24/7 radiologic, ultrasonographic and CT services using state-of-the-art equipment and an expert team.",
    body: `The Diagnostic Imaging Department uses the latest technology and the expertise of its doctors and personnel to provide personalized radiologic, ultrasonographic and computed tomography services.

The department aims for the highest possible quality, functionality and reliability through state-of-the-art equipment such as the Multimobile 5C, a C-arm X-ray machine, the Sonoline Antares 4D ultrasound, and the Somatom Emotion Duo dual-slice CT scanner. It is open 24/7.`,
    offerings: ["CT scan", "Ultrasonography and bedside portable ultrasound", "X-ray", "Mammography", "Bone densitometry", "Fundus imaging and Eye Imaging Clinic"],
    schedule: "Open 24 hours",
    phone: TRUNK,
    location: "Main Building",
  },
  {
    slug: "laboratory",
    name: "Fully Automated Laboratory",
    group: "ANCILLARY",
    tagline: "Less time, accurate results — that's our commitment.",
    summary:
      "24/7 laboratory with no cut-offs or holidays, a Laboratory Information System, and an ARSP-accredited bacteriology section.",
    body: `St. Paul's Hospital Laboratory is equipped with highly sophisticated, modern technology for fast, accurate and reliable results, operating 24 hours for clients in the hospital or at home.

It runs a Laboratory Information System (LIS) for faster turnaround with 24/7 operations — no cut-off and no holidays — and conforms to PHIC, DOH, NEQAS and CHED standards. The department earned Excellent ratings in the External Quality Assessment Scheme for Microbiology, Clinical Microscopy, Parasitology, TB Microscopy, Serology and Immunology, and holds Antimicrobial Resistance Surveillance Program (ARSP) accreditation from RITM.`,
    offerings: ["Chemistry", "Histopathology", "Blood banking", "Microbiology", "Bacteriology"],
    schedule: "Open 24 hours, including holidays",
    phone: TRUNK,
    location: "Main Building",
  },
  {
    slug: "mobile-icu-ambulance",
    name: "Mobile Intensive Care & Ambulance Services",
    group: "ANCILLARY",
    tagline: "We bring complete intensive care services closer to you.",
    summary: "A complete intensive care unit on wheels, equipped with the apparatus needed for emergency cases.",
    body: `Our mobile intensive care unit is a complete intensive care unit on wheels, equipped with the apparatus needed for emergency cases.`,
    offerings: ["Mobile ICU transport", "Emergency ambulance service"],
    phone: TRUNK,
  },
  {
    slug: "matko-center",
    name: "Mary Anne De Tilly Koch Center (MATKO)",
    shortName: "MATKO",
    group: "ANCILLARY",
    summary:
      "A special unit for the diagnosis, prevention and treatment of tuberculosis, and TB information and education.",
    body: `The Mother Marie Anne de Tilly Koch Center is a special unit designed to facilitate medical assistance in the diagnosis of M. tuberculosis, its prevention and treatment, and to provide information and education on TB as a disease.

SPHI is recognized as the first private Private-Public Mixed DOTS (PPMD) unit in Western Visayas.`,
    offerings: ["TB diagnosis", "TB treatment (DOTS)", "TB prevention and education"],
    phone: TRUNK,
  },
  {
    slug: "pastoral-services",
    name: "Pastoral Services",
    group: "ANCILLARY",
    tagline: "We bring God's compassionate love closer to you.",
    summary:
      "Spiritual guidance and compassionate support for patients and families — caring for the body, mind and spirit.",
    body: `At SPHI, healing extends beyond physical treatment. As a Catholic healthcare ministry of the Sisters of St. Paul of Chartres, we believe every person deserves compassionate, holistic care that nurtures the body, mind and spirit. Since the hospital opened its doors in 1911, pastoral care has remained an essential part of our healing ministry.

"If one member suffers, all suffer together." — 1 Corinthians 12:26

The Sisters, together with our chaplain, trained pastoral caregivers, volunteers and healthcare professionals, accompany patients from all walks of life — regardless of age, social status or religious background.`,
    offerings: [
      "Spiritual counseling and emotional support",
      "Bedside visits and prayer",
      "Sacraments with the hospital chaplain — Holy Communion, Anointing of the Sick, Reconciliation",
      "Spiritual support for critically ill and dying patients",
      "Guidance for families during illness, grief and loss",
    ],
    schedule: "Monday – Friday, 8:00 AM – 4:00 PM",
    phone: `${TRUNK} local 2002`,
    location: "2nd Floor, Main Building",
  },
];

export const DEPARTMENTS: {
  slug: string;
  name: string;
  description: string;
  chairman?: string;
  hasResidency?: boolean;
  facebookUrl?: string;
}[] = [
  { slug: "internal-medicine", name: "Internal Medicine", description: "Diagnosis and non-surgical management of adult diseases, including cardiology, nephrology, gastroenterology and pulmonology.", chairman: "Dr. Ma. Sylvia Theresa C. De Pili", hasResidency: true, facebookUrl: "https://www.facebook.com/SPHIloiloIM" },
  { slug: "surgery", name: "Surgery", description: "General and specialized surgical care, from elective operations to trauma.", chairman: "Dr. Juliene Latriz-Certeza", hasResidency: true, facebookUrl: "https://www.facebook.com/profile.php?id=61572047995883" },
  { slug: "pediatrics", name: "Pediatrics", description: "Care for newborns, infants, children and adolescents.", chairman: "Dr. Josie Grace C. Castillo", hasResidency: true, facebookUrl: "https://www.facebook.com/pediasph" },
  { slug: "obstetrics-gynecology", name: "Obstetrics & Gynecology", description: "Maternal, prenatal and women's health care in a Mother-Baby Friendly Hospital.", chairman: "Dr. Ma. Maureen F. Fortuna", hasResidency: true, facebookUrl: "https://www.facebook.com/profile.php?id=100011469344787" },
  { slug: "family-medicine", name: "Family & Community Medicine", description: "Primary, continuing and preventive care for individuals and families.", chairman: "Dr. Remo G. Benliro Jr.", hasResidency: true, facebookUrl: "https://www.facebook.com/profile.php?id=100078124012837" },
  { slug: "radiology", name: "Radiology", description: "Diagnostic imaging and image-guided procedures.", chairman: "Dr. Glenn A.M. Cathedral Sr.", hasResidency: true, facebookUrl: "https://www.facebook.com/profile.php?id=100071517702845" },
  { slug: "ent-hns", name: "ENT – Head & Neck Surgery", description: "Ear, nose, throat, head and neck conditions.", chairman: "Dr. Florence Yul Saquian", hasResidency: true, facebookUrl: "https://www.facebook.com/profile.php?id=100091947967948" },
  { slug: "anesthesia", name: "Anesthesia", description: "Anesthesia and perioperative care for surgical and procedural patients.", chairman: "Dr. Maria Socorro Felisarta" },
  { slug: "ophthalmology", name: "Ophthalmology", description: "Comprehensive eye and vision care.", chairman: "Dr. Jeremy Saquian" },
  { slug: "dentistry", name: "Dentistry", description: "Oral and dental care.", chairman: "Dr. Teresa Enojo" },
  { slug: "pathology", name: "Pathology", description: "Laboratory medicine, histopathology and blood banking.", chairman: "Dr. Ma. Teresa S. Araneta" },
  { slug: "radiation-oncology", name: "Radiation Oncology", description: "Radiation therapy for cancer, including tomotherapy and brachytherapy.", chairman: "Dr. Dennis V. Doromal" },
  { slug: "psychiatry", name: "Psychiatry", description: "Mental health assessment and treatment." },
  { slug: "rehabilitation-medicine", name: "Rehabilitation Medicine", description: "Physical medicine and rehabilitation for neurological, musculoskeletal and cardiopulmonary disorders." },
];

export const POSTS: {
  slug: string;
  title: string;
  category: PostCategory;
  excerpt: string;
  body: string;
  publishedAt: string;
  eventDate?: string;
  location?: string;
}[] = [
  {
    slug: "sphi-run-2026",
    title: "SPHI Run 2026: Run for a Cause",
    category: "EVENT",
    excerpt: "Run with purpose as SPHI celebrates 115 years of FAME.",
    body: `St. Paul's Hospital of Iloilo, Inc. remains steadfast in its mission of service, compassion, and community outreach. Through hospital activities and outreach programs, SPHI continues to nurture faith, inspire hope, and protect health and the environment.

Join the SPHI Run 2026 as we celebrate 115 years of serving Iloilo.

Date: February 7, 2026 · 4:00 AM – 8:00 AM
Venue: Iloilo Provincial Capitol Grounds`,
    publishedAt: "2026-01-10",
    eventDate: "2026-02-07T04:00:00+08:00",
    location: "Iloilo Provincial Capitol Grounds",
  },
  {
    slug: "sparc-opens",
    title: "Respiratory care center renamed St. Paul's Airway and Respiration Center (SPARC)",
    category: "NEWS",
    excerpt: "The Center for Respiratory Care begins operations under its new name and new location on December 15, 2025.",
    body: `In October 2025 the Center for Respiratory Care — the first and only facility in Iloilo dedicated to the treatment and rehabilitation of respiratory illnesses — was officially renamed the St. Paul's Airway and Respiration Center (SPARC) by Dr. Malbar Ferrer, Chief of Medical Staff.

The center relocated from the 3rd floor of the SPICE Building to the second floor of the Main Building, beside the Central Sterile Supply Unit, and began operations under its new name on December 15, 2025.`,
    publishedAt: "2025-12-15",
  },
  {
    slug: "cath-lab-opens",
    title: "SPHI Catheterization Laboratory performs its first coronary angiogram",
    category: "NEWS",
    excerpt: "The Cath Lab officially commenced operations on April 21, 2025 — a milestone in advanced cardiovascular care for Western Visayas.",
    body: `The SPHI Catheterization Laboratory officially commenced operations on April 21, 2025.

On its first day of operation, the Cath Lab successfully performed its first Coronary Angiogram, made possible through the generosity of the CADSSI Best of Broadway Fundraising Show 2024, which fully funded the patient's procedure.`,
    publishedAt: "2025-04-21",
  },
  {
    slug: "triple-iso-certification",
    title: "SPHI becomes the first private hospital in Iloilo with Triple ISO certification",
    category: "AWARD",
    excerpt: "ISO 14001:2015 and ISO 45001:2018 join ISO 9001:2015 to form a fully certified Integrated Management System.",
    body: `On September 27, 2024, St. Paul's Hospital of Iloilo was awarded ISO 14001:2015 (Environmental Management) and ISO 45001:2018 (Occupational Health and Safety) certifications by Certification Partner Global, building on its ISO 9001:2015 Quality Management System certification received on June 2, 2023.

SPHI is the first private hospital in Iloilo City to attain Triple ISO Certification — an Integrated Management System accredited by JAS-ANZ.`,
    publishedAt: "2024-09-27",
  },
  {
    slug: "global-green-healthy-hospitals-2024",
    title: "Global connectedness: SPHI honored at the Asia-Pacific Green Healthcare System Conference",
    category: "AWARD",
    excerpt: "Health Care Without Harm Climate Resilience – Gold and the 2024 Climate Champion Award.",
    body: `SPHI joined the International Scientific Conference on Climate Change and Health and the 6th Asia-Pacific Green Healthcare System Conference — "Transforming Asian Health Systems: A Vision for Equitable, Low-Carbon, Sustainable, and Climate-Excellent Healthcare" — on October 30 – November 1, 2024 in Haiphong, Vietnam.

Attendees: Sr. Arcelita Sarnillo, SPC, Sr. Ma. Perlita Marasigan, SPC, Sr. Rechie Makil, SPC, Mr. Antonio Alla, and Mrs. Josephine Amen.

Awards received: Health Care Without Harm Award — Climate Resilience (Gold); 2024 Climate Champion Award; Global Green and Healthy Hospitals Award 2024 for environmental footprint reduction from hospital energy consumption and from waste management.`,
    publishedAt: "2024-11-01",
    eventDate: "2024-10-30T09:00:00+07:00",
    location: "Haiphong, Vietnam",
  },
  {
    slug: "cancer-center-8th-anniversary",
    title: "SPHI Cancer Center celebrates its 8th anniversary",
    category: "NEWS",
    excerpt: "\"Closing the Gap: Cancer Prevention through Proper Lifestyle\" highlights early detection and lifestyle change.",
    body: `In celebration of the 8th Anniversary of the SPHI Cancer Center, the theme "Closing the Gap: Cancer Prevention through Proper Lifestyle" highlighted the importance of early detection and lifestyle modification in fighting cancer.

Dr. Yvette Jesena-Divinagracia shared insights on breast cancer screening, timely for Breast Cancer Awareness Month, and Dr. Elaine Veñegas discussed lifestyle interventions for cancer prevention.

Two cancer survivors shared their stories of strength, resilience and hope — reminding us that no one fights alone. Together, we are stronger than cancer.`,
    publishedAt: "2024-10-15",
  },
];
