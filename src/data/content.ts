import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Award,
  BarChart3,
  Braces,
  BrainCircuit,
  Briefcase,
  Calculator,
  CandlestickChart,
  Code2,
  Database,
  Facebook,
  FileSpreadsheet,
  FileText,
  FileType,
  Gamepad2,
  GraduationCap,
  Instagram,
  LayoutDashboard,
  Leaf,
  LineChart,
  Megaphone,
  Package,
  PenTool,
  Sheet,
  Sigma,
  Store,
  Terminal,
  Trophy,
  Truck,
  Wallet,
  Workflow,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const identity = {
  name: "Zyad Husseini",
  firstName: "Zyad",
  lastName: "Husseini",
  monogram: "ZH",
  title: "Data Analyst & Economist",
  location: "France / Egypt",
  email: "zyadmhrhusseini@aucegypt.edu",
  /** Company-domain address published on the Linktree. */
  businessEmail: "zmr@pnmico.com",
  phones: ["+33 07 68 87 98 41", "+20 100 222 4134"],
  linkedin: "https://linkedin.com/in/zyadmhr",
  github: "https://github.com/ZyadHusseini",
  linktree: "https://linktr.ee/zyadmhrhusseini",
  instagram: "https://www.instagram.com/Electro_zyad",
  /** The Linktree publishes this as phone=1044438885, i.e. the Egyptian
   *  mobile 010 4443 8885 without its +20 country code. wa.me requires
   *  full international format, so the country code is restored here. */
  whatsapp: "https://wa.me/201044438885",
  whatsappDisplay: "+20 104 443 8885",
  /** Swap this file for a square headshot >=1200x1200, then re-run
   *  `python3 scripts/make-og-image.py` to rebuild the social card. */
  photo: "/assets/zyad-husseini.jpg",
  openTo: "Full-time, Internships & Consulting",
  heroSub:
    "Transforming complex data into actionable insights. MSc Data Analytics student at Kedge Business School with a passion for economics and business intelligence.",
  cvEnglish: "/assets/Zyad_Husseini_CV_English.pdf",
  cvFrench: "/assets/Zyad_Husseini_CV_French.pdf",
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export type Accent = "indigo" | "cyan" | "purple" | "emerald";

export interface TextSegment {
  text: string;
  accent?: Accent;
}

/** Paragraphs as segments so components can highlight key phrases. */
export const aboutParagraphs: TextSegment[][] = [
  [
    { text: "I'm Zyad Husseini, an aspiring " },
    { text: "data analyst and economist", accent: "indigo" },
    { text: " currently pursuing my " },
    { text: "Master of Science in Data Analytics", accent: "cyan" },
    { text: " at Kedge Business School in France." },
  ],
  [
    { text: "With a strong foundation in " },
    { text: "economics", accent: "purple" },
    { text: " from The American University in Cairo, complemented by minors in " },
    { text: "Business Administration and Computer Science", accent: "cyan" },
    { text: ", I bring a unique blend of analytical thinking and technical expertise." },
  ],
  [
    { text: "I'm passionate about leveraging data to " },
    { text: "drive business decisions", accent: "indigo" },
    { text: " and solve complex problems. My experience spans " },
    { text: "data analytics, business intelligence, investment analysis", accent: "cyan" },
    { text: ", and AI product development." },
  ],
  [
    { text: "Outside of work, I'm a former " },
    { text: "professional basketball player", accent: "emerald" },
    { text: " with 6 years of competitive experience — discipline, teamwork, and the drive to excel under pressure." },
  ],
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Companies Worked" },
  { value: 3, suffix: "", label: "Languages Spoken" },
];

export interface SkillItem {
  name: string;
  category: string;
  icon: LucideIcon;
  /** tailwind gradient classes used on hover accents */
  gradient: string;
  /** 0–100, used by the skill constellation visualization */
  level: number;
}

export const skills: SkillItem[] = [
  { name: "Power BI", category: "Analytics", icon: BarChart3, gradient: "from-amber-400 to-orange-500", level: 95 },
  { name: "DAX", category: "Analytics", icon: Sigma, gradient: "from-indigo-400 to-violet-500", level: 88 },
  { name: "Python", category: "Programming", icon: Code2, gradient: "from-cyan-400 to-blue-500", level: 90 },
  { name: "STATA", category: "Statistics", icon: LineChart, gradient: "from-emerald-400 to-teal-500", level: 85 },
  { name: "R", category: "Statistics", icon: Activity, gradient: "from-sky-400 to-indigo-500", level: 78 },
  { name: "C++", category: "Programming", icon: Braces, gradient: "from-purple-400 to-fuchsia-500", level: 75 },
  { name: "MS Office", category: "Tools", icon: FileSpreadsheet, gradient: "from-green-400 to-emerald-500", level: 96 },
  { name: "SQL", category: "Database", icon: Database, gradient: "from-rose-400 to-pink-500", level: 86 },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type JobType = "Full-time" | "Part-time" | "Internship";

export interface Job {
  role: string;
  company: string;
  period: string;
  type: JobType;
  description: string;
  tags: string[];
}

export const mainExperience: Job[] = [
  {
    role: "Business Development Associate",
    company: "Current Company",
    period: "Jan 2026 – Present",
    type: "Full-time",
    description: "Leading business development initiatives and strategic partnerships.",
    tags: ["Business Strategy", "Client Relations", "Market Analysis"],
  },
  {
    role: "Research and Marketing Specialist",
    company: "Current Company",
    period: "Dec 2025 – Present",
    type: "Full-time",
    description: "Conducting market research and developing marketing strategies.",
    tags: ["Market Research", "Marketing Strategy", "Data Analysis"],
  },
  {
    role: "AI Product Development & Website Creation",
    company: "Brayn Solutions",
    period: "Dec 2025 – Present",
    type: "Full-time",
    description: "Developing AI-powered products and creating web solutions for clients.",
    tags: ["AI/ML", "Web Development", "Product Management"],
  },
  {
    role: "Investment Analyst",
    company: "Media Trade",
    period: "Dec 2025 – Present",
    type: "Full-time",
    description: "Analyzing investment opportunities and providing financial insights.",
    tags: ["Financial Analysis", "Investment Research", "Risk Assessment"],
  },
  {
    role: "AI Automation & Workflows Specialist",
    company: "BUB AI",
    period: "Oct 2025 – Present",
    type: "Full-time",
    description: "Designing and implementing AI automation workflows to optimize business processes.",
    tags: ["AI Automation", "Workflow Design", "Process Optimization"],
  },
  {
    role: "Data Analytics Intern",
    company: "EFG Hermes",
    period: "Aug 2025 – Sep 2025",
    type: "Internship",
    description: "Created multiple unique Power BI dashboards for financial data visualization.",
    tags: ["Power BI", "Financial Analytics", "Dashboard Design"],
  },
];

export interface PreviousJob {
  role: string;
  company: string;
  period: string;
  type: JobType;
  icon: LucideIcon;
}

export const previousExperience: PreviousJob[] = [
  { role: "Data Analytics", company: "AR CORP", period: "Jan – Jun 2025", type: "Part-time", icon: BarChart3 },
  { role: "Data Analytics Intern", company: "Pack N Move", period: "Dec 2024 – Jan 2025", type: "Internship", icon: LayoutDashboard },
  { role: "Marketeer", company: "Pack N Move", period: "May 2020 – Mar 2021", type: "Part-time", icon: Megaphone },
  { role: "Accountant", company: "Pack N Move", period: "May 2019 – Mar 2020", type: "Part-time", icon: Calculator },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectCategory = "analytics" | "development" | "research";

export interface CaseStudy {
  problem: string;
  approach: string;
  outcome: string;
}

export interface Project {
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  tools: string[];
  icon: LucideIcon;
  gradient: string;
  caseStudy: CaseStudy;
}

export const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "analytics", label: "Analytics" },
  { id: "development", label: "Development" },
  { id: "research", label: "Research" },
] as const;

export const projects: Project[] = [
  {
    title: "Renewable Energy & Economic Growth",
    category: "research",
    year: "2025",
    description:
      "Econometrics research paper testing whether a rising renewable energy share accelerates GDP per capita growth.",
    tools: ["Econometrics", "STATA", "Panel Data", "2SLS"],
    icon: Leaf,
    gradient: "from-emerald-400 to-teal-500",
    caseStudy: {
      problem:
        "Clean energy is widely assumed to be good for growth, but the empirical literature disagrees on whether that holds in the short run — and the answer shapes how aggressively a country should sequence its energy transition.",
      approach:
        "Built a World Bank WDI panel of 7 countries over 1990–2023 (238 observations) in Stata and worked through the full diagnostic chain: OLS, a White test for heteroskedasticity, robust OLS, maximum likelihood, fixed effects with year dummies, then 2SLS instrumenting renewable consumption with its own lag to address endogeneity, with Newey–West for autocorrelation and a Hausman test to choose between fixed and random effects.",
      outcome:
        "Renewable energy consumption was consistently associated with slower short-run growth — under 2SLS, a one-unit rise in the renewable share cut GDP per capita growth by 1.44 percentage points (p = 0.029). Gross capital formation stayed positive and highly significant. The paper, Stata do-file and dataset are all published on this site.",
    },
  },
  {
    title: "Nasdaq 100 Analysis",
    category: "analytics",
    year: "2025",
    description: "Analysis of Nasdaq 100 performance, trends, and market dynamics.",
    tools: ["Data Analysis", "Financial Modeling", "Python"],
    icon: CandlestickChart,
    gradient: "from-indigo-400 to-violet-500",
    caseStudy: {
      problem:
        "The Nasdaq 100 moves fast and is dominated by a handful of mega-caps — separating real trends from noise takes structured analysis, not headlines.",
      approach:
        "Pulled historical index data into Python, analyzed performance across time horizons, decomposed trends and volatility, and built financial models to frame market dynamics and concentration risk.",
      outcome:
        "A data-backed read on index behavior and its drivers, sharpening the financial-modeling toolkit I now use in investment analysis work.",
    },
  },
  {
    title: "Job Application Tracker",
    category: "development",
    year: "2025",
    description: "System to manage and monitor job-search progress.",
    tools: ["Python", "Database", "Automation"],
    icon: Briefcase,
    gradient: "from-cyan-400 to-blue-500",
    caseStudy: {
      problem:
        "An active job search means dozens of applications across companies, stages, and deadlines — spreadsheets get stale and follow-ups slip through.",
      approach:
        "Built a Python application backed by a database to log every application, track its stage, and automate status updates and reminders.",
      outcome:
        "A single always-current view of the pipeline: no missed follow-ups, and useful stats on response rates by role and channel.",
    },
  },
  {
    title: "Python Financial Tracker",
    category: "development",
    year: "2025",
    description: "Personal finance app tracking expenses, income, and goals.",
    tools: ["Python", "Data Visualization", "Finance"],
    icon: Wallet,
    gradient: "from-emerald-400 to-cyan-500",
    caseStudy: {
      problem:
        "Managing personal finances across two countries and currencies — without a clear picture of where money actually goes, budgeting is guesswork.",
      approach:
        "Developed a Python app that records income and expenses, categorizes transactions, tracks progress against savings goals, and renders the data as clear visualizations.",
      outcome:
        "A working personal-finance dashboard that turned raw transactions into monthly insights — and a practical exercise in building data products end to end.",
    },
  },
  {
    title: "Power BI Dashboards — EFG Hermes",
    category: "analytics",
    year: "2025",
    description: "Multiple dashboards for financial data visualization built during the internship.",
    tools: ["Power BI", "DAX", "Financial Analytics"],
    icon: BarChart3,
    gradient: "from-amber-400 to-orange-500",
    caseStudy: {
      problem:
        "Financial teams at EFG Hermes needed complex datasets turned into visuals that analysts and decision-makers could actually read at a glance.",
      approach:
        "Designed and built multiple unique Power BI dashboards during my internship — modeling the data, writing DAX measures, and iterating layouts with the team's feedback.",
      outcome:
        "A set of production dashboards used for financial data visualization inside one of MENA's leading investment banks.",
    },
  },
  {
    title: "ERP Cash Flow Integration",
    category: "analytics",
    year: "2025",
    description: "Cash-flow statement connected to an ERP system in Power BI for AR CORP.",
    tools: ["Power BI", "ERP", "Business Intelligence"],
    icon: Workflow,
    gradient: "from-purple-400 to-indigo-500",
    caseStudy: {
      problem:
        "AR CORP's cash-flow reporting was manual and disconnected from the ERP system — slow to produce and out of date by the time it was read.",
      approach:
        "Connected Power BI directly to the ERP data source and rebuilt the cash-flow statement as a live report, mapping ERP fields to statement lines.",
      outcome:
        "An always-current cash-flow view that removed the manual reporting cycle and gave management a live handle on liquidity.",
    },
  },
  {
    title: "Marketing Strategy Report",
    category: "research",
    year: "2025",
    description: "Strategy analysis and recommendations for business growth.",
    tools: ["Market Research", "Strategy", "Analysis"],
    icon: Megaphone,
    gradient: "from-rose-400 to-pink-500",
    caseStudy: {
      problem:
        "Growth had plateaued and the business needed a clear-eyed view of its market position before committing budget to new channels.",
      approach:
        "Ran structured market research — competitors, segments, positioning — and synthesized the findings into a strategy report with prioritized, actionable recommendations.",
      outcome:
        "A concrete growth roadmap the business could execute against, grounded in evidence rather than instinct.",
    },
  },
  {
    title: "C++ Game Development",
    category: "development",
    year: "2022",
    description: "Fully functional game demonstrating OOP skills.",
    tools: ["C++", "Game Development", "OOP"],
    icon: Gamepad2,
    gradient: "from-fuchsia-400 to-purple-500",
    caseStudy: {
      problem:
        "Object-oriented programming concepts only stick when you build something real with them — a game is the classic stress test.",
      approach:
        "Designed and coded a fully functional game in C++ from scratch, structuring it around classes, inheritance, and clean separation of game logic, state, and rendering.",
      outcome:
        "A playable, complete game — and a solid grasp of OOP fundamentals that carried into every later programming project.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Ventures                                                            */
/* ------------------------------------------------------------------ */

export interface VentureSocial {
  label: string;
  url: string;
  icon: LucideIcon;
}

export interface Venture {
  name: string;
  category: string;
  description: string;
  url: string;
  displayUrl: string;
  icon: LucideIcon;
  gradient: string;
  socials?: VentureSocial[];
}

export const venturesIntro =
  "Data analyst and entrepreneur building digital products, brands, and businesses across tech, marketing, and logistics.";

export const ventures: Venture[] = [
  {
    name: "PNM Agency",
    category: "Digital Agency",
    description: "Digital agency crafting brands, websites, and marketing for clients across the region.",
    url: "https://pnmagency.com",
    displayUrl: "pnmagency.com",
    icon: PenTool,
    gradient: "from-rose-400 to-red-500",
    socials: [
      { label: "PNM Agency on Instagram", url: "https://www.instagram.com/pnmagency1/", icon: Instagram },
    ],
  },
  {
    name: "PNM Group",
    category: "Logistics & Holding",
    description: "Moving and logistics group serving Egypt and the Gulf — the family of Pack N Move brands.",
    url: "https://pnmholding.com",
    displayUrl: "pnmholding.com",
    icon: Truck,
    gradient: "from-amber-400 to-orange-500",
    socials: [
      { label: "Pack N Move on Instagram", url: "https://www.instagram.com/packandmove", icon: Instagram },
      { label: "Pack N Move on Facebook", url: "https://www.facebook.com/packandmove", icon: Facebook },
    ],
  },
  {
    name: "NAVI",
    category: "Ed-Tech",
    description: "Your student operating system — courses, notes, schedules, study groups, and AI tools in one command center.",
    url: "https://navi.geo-ed.tech/landing",
    displayUrl: "navi.geo-ed.tech",
    icon: GraduationCap,
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    name: "Matgarak",
    category: "Digital Products",
    description: "Helping teams launch modern digital experiences with speed, clarity, and measurable results.",
    url: "https://matgarak.com",
    displayUrl: "matgarak.com",
    icon: Store,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    name: "Qemto",
    category: "AI & Markets",
    description: "Machine-learning market forecasting for the Egyptian Exchange — signals, forecasts, and live scores.",
    url: "https://kemto-egx.vercel.app",
    displayUrl: "kemto-egx.vercel.app",
    icon: BrainCircuit,
    gradient: "from-cyan-400 to-indigo-500",
  },
];

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

export interface ResearchAsset {
  label: string;
  detail: string;
  href: string;
  icon: LucideIcon;
}

export interface ResearchFinding {
  value: string;
  label: string;
}

export interface ResearchPaper {
  title: string;
  type: string;
  institution: string;
  department: string;
  course: string;
  supervisor: string;
  year: string;
  /** Plain-language summary — also used verbatim in the JSON-LD abstract. */
  abstract: string;
  question: string;
  data: string;
  findings: ResearchFinding[];
  methods: string[];
  conclusion: string;
  assets: ResearchAsset[];
}

export const researchPapers: ResearchPaper[] = [
  {
    title:
      "Predicting In-Game Spending Behaviour Using Machine Learning: An Economic and Behavioural Analysis",
    type: "MSc Thesis",
    institution: "Kedge Business School",
    department: "MSc Data Analytics for Business, Department of Data Analytics",
    course: "Academic year 2025/2026",
    supervisor: "Dr. Tianyuan Zhang",
    year: "2026",
    abstract:
      "Games now earn from microtransactions rather than boxed sales, and spending is extraordinarily concentrated — most players never pay, while a small minority generates almost all revenue. This thesis asks which behaviours predict in-game spending, and how those predictors read against economic and behavioural theories of consumer choice. It pairs an interpretable logistic baseline with a family of machine-learning models, unsupervised segmentation and NLP across five public datasets covering more than 50,000 players and 52,000 games.",
    question:
      "Which player behaviours and engagement patterns best predict in-game spending, and how can these predictors be interpreted using economic and behavioural theories of consumer choice?",
    data: "5 public datasets · 50,000+ players · 52,000+ games · mobile, Steam and Roblox catalogues",
    findings: [
      { value: "0.48–0.52", label: "ROC AUC — all 13 classifiers sat at chance on the public player data" },
      { value: "0.95", label: "ROC AUC — the same pipeline on genuine game-level data" },
      { value: "0.87", label: "Gini of revenue: the top 1% of payers generate 39% of it" },
    ],
    methods: [
      "Logistic regression",
      "13-model benchmark",
      "Random forest",
      "k-means segmentation",
      "NLP",
      "Deep learning",
      "Lorenz / Gini",
      "Cross-validation",
      "Class imbalance",
      "ROC AUC",
    ],
    conclusion:
      "The headline result is a null one, and the thesis treats it as a finding rather than a failure. Engagement and demographic features carried no reliable signal about who spends — yet the structural patterns theory predicts were plainly there: revenue and playtime were both extremely concentrated. A control analysis on two genuine game-level catalogues settles the ambiguity: the identical pipeline reaches 0.95 AUC and recovers the freemium signal from game descriptions alone. The divergence is the argument — the behavioural signal is absent from synthetic and coarse public data, not from the phenomenon, so credible prediction of individual spending requires real player-level telemetry. That conclusion carries directly into the ethics of behaviour-based monetisation.",
    assets: [
      {
        label: "Read the thesis",
        detail: "DOCX · ~18,000 words",
        href: "/research/Zyad-Husseini-MSc-Thesis-Predicting-In-Game-Spending.docx",
        icon: FileType,
      },
      {
        label: "Thesis proposal",
        detail: "PDF",
        href: "/research/Zyad-Husseini-MSc-Thesis-Proposal.pdf",
        icon: FileText,
      },
    ],
  },
  {
    title: "The Impact of Renewable Energy Adoption on Economic Growth",
    type: "Econometrics Research Paper",
    institution: "The American University in Cairo",
    department: "Department of Economics, School of Business",
    course: "ECON 408101",
    supervisor: "Dr. Mina Ayad",
    year: "2025",
    abstract:
      "A panel study of whether raising the renewable share of final energy consumption accelerates GDP per capita growth. Across OLS, robust OLS, maximum likelihood, fixed effects, and instrumental-variable estimation, renewable energy consumption is consistently associated with slower short-run growth — a result that runs against the common assumption that clean energy is straightforwardly growth-positive.",
    question: "Do increases in renewable energy consumption spur economic growth?",
    data: "World Bank World Development Indicators · 7 countries · 1990–2023 · 238 country-year observations",
    findings: [
      { value: "−1.44pp", label: "GDP per capita growth per unit rise in renewable share (2SLS)" },
      { value: "p = 0.029", label: "Significant after instrumenting for endogeneity" },
      { value: "7 × 34", label: "Countries × years of panel data" },
    ],
    methods: [
      "Panel OLS",
      "White test",
      "Robust OLS",
      "Maximum Likelihood",
      "Fixed effects",
      "2SLS / IV",
      "Cragg–Donald",
      "Newey–West",
      "Hausman test",
      "Random effects",
    ],
    conclusion:
      "Gross capital formation was positive and highly significant throughout, while tertiary enrolment, trade openness and population growth were not significant in any specification. Year dummies absorbed the 2008 financial crisis and the 2020 pandemic. The policy reading is not to slow decarbonisation but to sequence it — pairing renewable rollout with energy efficiency, grid integration, workforce training and capital-formation incentives so the transition's short-run costs are offset.",
    assets: [
      {
        label: "Read the paper",
        detail: "PDF · 71 pages",
        href: "/research/Zyad-Husseini-Renewable-Energy-Economic-Growth.pdf",
        icon: FileText,
      },
      {
        label: "Manuscript",
        detail: "DOCX",
        href: "/research/Zyad-Husseini-Renewable-Energy-Economic-Growth.docx",
        icon: FileType,
      },
      {
        label: "Stata code",
        detail: "Full replication do-file",
        href: "/research/renewable-energy-growth-stata.do",
        icon: Terminal,
      },
      {
        label: "Dataset",
        detail: "XLSX · World Bank WDI panel",
        href: "/research/renewable-energy-growth-dataset.xlsx",
        icon: Sheet,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* CV Highlights                                                       */
/* ------------------------------------------------------------------ */

export interface EducationItem {
  degree: string;
  school: string;
  place: string;
  year: string;
  highlights: string[];
}

export const education: EducationItem[] = [
  {
    degree: "MSc Data Analytics",
    school: "Kedge Business School",
    place: "France",
    year: "Expected 2027",
    highlights: ["Data Analytics Specialization", "Advanced Statistical Methods"],
  },
  {
    degree: "BA Economics",
    school: "The American University in Cairo",
    place: "Egypt",
    year: "2025",
    highlights: ["Minor: Business Administration", "Minor: Computer Science", "Dean's List"],
  },
  {
    degree: "American & International Baccalaureate (IB)",
    school: "MASE",
    place: "Egypt",
    year: "2020",
    highlights: ["Bilingual Diploma", "Extended Essay in Economics"],
  },
];

export interface Credential {
  title: string;
  issuer: string;
  year: string;
  kind: "certification" | "achievement";
  icon: LucideIcon;
}

export const credentials: Credential[] = [
  { title: "Economics Course", issuer: "ITC & United Nations", year: "2024", kind: "certification", icon: GraduationCap },
  { title: "CMA Part One", issuer: "IMA", year: "2024", kind: "certification", icon: Award },
  { title: "EFG Hermes Stock Market Competition — 3rd Place", issuer: "EFG Hermes", year: "2024", kind: "achievement", icon: Trophy },
  { title: "Finomics Stock Market Competition", issuer: "Finomics", year: "2024", kind: "achievement", icon: CandlestickChart },
  { title: "Venture Capital Competition", issuer: "AUC", year: "2023", kind: "achievement", icon: Package },
  { title: "Professional Basketball Player", issuer: "El Haras El Gomhory", year: "2018 – 2024", kind: "achievement", icon: Trophy },
];

export type LanguageLevel = "Native" | "Professional";

export interface Language {
  name: string;
  level: string;
  badge: LanguageLevel;
}

export const languages: Language[] = [
  { name: "English", level: "Native / Bilingual", badge: "Native" },
  { name: "Arabic", level: "Native / Bilingual", badge: "Native" },
  { name: "French", level: "Professional Working", badge: "Professional" },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "ventures", label: "Ventures" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
] as const;
