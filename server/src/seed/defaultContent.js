export const defaultSettings = {
  aboutHeadline:
    "Premium eye care, shaped to feel clear, calm, and confidently modern.",
  aboutSummary:
    "EyeCon is designed as an advanced vision clinic where precision diagnostics, specialist guidance, and patient comfort all belong to the same experience.",
  brandName: "EyeCon",
  email: "hello@eyeconclinic.com",
  hours: "Mon - Sat | 9:00 AM - 8:00 PM",
  key: "main",
  location: "Gulberg, Lahore, Pakistan",
  phone: "+92 3477552842",
  signature: "Advanced Vision Clinic",
  tagline: "A flagship digital experience for precision-led eye care.",
  whatsapp: "+92 3477552842",
};

export const defaultDoctors = [
  {
    bio: "Specializes in LASIK, SMILE, and lens-based correction planning with a premium consult-first approach.",
    displayOrder: 1,
    education: "FCPS Ophthalmology",
    experience:
      "12 years in refractive and premium vision correction pathways.",
    featured: true,
    focus: ["LASIK", "SMILE", "Premium IOL Planning"],
    initials: "AM",
    name: "Dr. Zain",
    role: "Lead Refractive Specialist",
    schedule: "Mon, Tue, Thu | 10:00 AM - 6:00 PM",
    slug: "dr-zain",
  },
  {
    bio: "Known for calm patient education, advanced lens counselling, and recovery plans built around comfort and confidence.",
    displayOrder: 2,
    education: "MS Ophthalmology",
    experience: "15 years in cataract surgery, lens selection, and aftercare.",
    featured: true,
    focus: ["Micro-incision Cataract", "Lens Counselling", "Post-op Recovery"],
    initials: "HR",
    name: "Dr. Hassan Raza",
    role: "Consultant Cataract Surgeon",
    schedule: "Wed - Sat | 11:00 AM - 7:00 PM",
    slug: "dr-hassan-raza",
  },
  {
    bio: "Blends retinal monitoring, diabetic eye screening, and family-centered consultations across long-term care journeys.",
    displayOrder: 3,
    education: "FCPS Ophthalmology",
    experience: "11 years in retina, glaucoma, and pediatric eye care.",
    featured: false,
    focus: ["Retina Care", "Glaucoma Reviews", "Pediatric Eye Care"],
    initials: "SQ",
    name: "Dr. Sana Qureshi",
    role: "Retina & Family Eye Care",
    schedule: "Mon - Sat | 9:30 AM - 5:30 PM",
    slug: "dr-sana-qureshi",
  },
  {
    bio: "Leads dry eye treatment, corneal surface restoration, and complex contact lens assessments with lifestyle-based planning.",
    displayOrder: 4,
    education: "DOMS, Cornea Fellowship",
    experience: "9 years in cornea, dry eye, and contact lens care.",
    featured: false,
    focus: ["Dry Eye Clinic", "Cornea", "Advanced Contact Lenses"],
    initials: "MK",
    name: "Dr. Muneeb Khan",
    role: "Cornea & Ocular Surface Specialist",
    schedule: "Tue, Thu, Sat | 12:00 PM - 8:00 PM",
    slug: "dr-muneeb-khan",
  },
];

export const defaultServices = [
  {
    accent: "#88ece5",
    description:
      "The gateway service for families, professionals, and repeat patients who need structured vision care.",
    displayOrder: 1,
    featured: true,
    slug: "general-eye-health",
    subtitle: "Screening and yearly preventive care",
    title: "General Eye Health",
    treatments: [
      "Comprehensive Exams",
      "Vision Profiling",
      "Risk Detection",
      "Lifestyle Advice",
    ],
  },
  {
    accent: "#ffcd93",
    description:
      "A high-intent pathway designed to help patients understand candidacy, outcomes, and lifestyle tradeoffs.",
    displayOrder: 2,
    featured: true,
    slug: "refractive-vision-correction",
    subtitle: "Premium LASIK, SMILE, and lens planning",
    title: "Refractive Vision Correction",
    treatments: [
      "LASIK Consult",
      "SMILE Planning",
      "Lens Candidacy",
      "Wavefront Review",
    ],
  },
  {
    accent: "#9bb4ff",
    description:
      "A calmer, more elegant presentation for one of the highest-trust decision journeys on the site.",
    displayOrder: 3,
    featured: true,
    slug: "cataract-surgery-pathway",
    subtitle: "Assessment, lens choice, surgery prep, and recovery",
    title: "Cataract Surgery Pathway",
    treatments: [
      "Lens Comparison",
      "Pre-op Review",
      "Microsurgery Counselling",
      "Aftercare Checks",
    ],
  },
  {
    accent: "#a6f0c1",
    description:
      "Structured for patients who need continuity, clarity, and reassurance over time.",
    displayOrder: 4,
    featured: true,
    slug: "retina-glaucoma-care",
    subtitle: "Monitoring for chronic and high-risk conditions",
    title: "Retina & Glaucoma Care",
    treatments: [
      "Retinal Imaging",
      "Pressure Review",
      "Diabetic Eye Screening",
      "Specialist Follow-up",
    ],
  },
  {
    accent: "#ffb9c9",
    description:
      "Built to feel warm, calm, and understandable for parents without losing clinical strength.",
    displayOrder: 5,
    featured: false,
    slug: "pediatric-eye-care",
    subtitle: "Family-first screening and developmental support",
    title: "Pediatric Eye Care",
    treatments: [
      "Child Exams",
      "Squint Review",
      "Growth Tracking",
      "Family Guidance",
    ],
  },
  {
    accent: "#8dcfff",
    description:
      "A lifestyle-aware care line connecting medical comfort to everyday visual performance.",
    displayOrder: 6,
    featured: false,
    slug: "cornea-dry-eye-contact-lenses",
    subtitle: "Comfort, surface health, and advanced fitting",
    title: "Cornea, Dry Eye & Contact Lenses",
    treatments: [
      "Dry Eye Plans",
      "Corneal Review",
      "Lens Fitting",
      "Digital Eye Fatigue",
    ],
  },
];

export const defaultInsights = [
  {
    category: "LASIK",
    content:
      "Premium refractive consultations work best when clinics explain candidacy, expectations, and lifestyle outcomes with clarity.",
    displayOrder: 1,
    excerpt:
      "It is usually not the technology list. It is how clearly the clinic translates findings into patient confidence.",
    featured: true,
    publishedAt: new Date("2026-04-20T00:00:00.000Z"),
    slug: "premium-refractive-consultation-trust",
    status: "published",
    title:
      "What makes a premium refractive consultation actually feel trustworthy?",
  },
  {
    category: "Cataract",
    content:
      "Lens choice conversations improve when clinics connect options to lifestyle, visual goals, and practical confidence after surgery.",
    displayOrder: 2,
    excerpt:
      "Patients understand premium IOL decisions more easily when the conversation starts with daily visual goals.",
    featured: true,
    publishedAt: new Date("2026-04-18T00:00:00.000Z"),
    slug: "lens-choice-lifestyle-framing",
    status: "published",
    title:
      "Lens choice conversations work better when they are framed around lifestyle.",
  },
  {
    category: "Screening",
    content:
      "Modern diabetic eye checks benefit from clearer digital intake, stronger explanation, and simpler follow-up pathways.",
    displayOrder: 3,
    excerpt:
      "Reducing friction and improving explanation often matters as much as the scan itself.",
    featured: false,
    publishedAt: new Date("2026-04-16T00:00:00.000Z"),
    slug: "modern-diabetic-eye-checks",
    status: "published",
    title:
      "How clinics can make diabetic eye checks feel more modern and less stressful.",
  },
];
