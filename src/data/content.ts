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
  Sparkles,
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
  // Romanising an Arabic name has no single correct answer, so people who know
  // him genuinely do type it three different ways. Stated once, in his own
  // voice, as a fact about the name rather than a list of keywords — and every
  // form here is also in the Person schema's alternateName, which Google
  // requires to be visible on the page.
  [
    { text: "One practical note: my name gets written a few different ways — " },
    { text: "Ziad", accent: "cyan" },
    { text: ", " },
    { text: "Zeyad", accent: "cyan" },
    { text: " or " },
    { text: "Ziyad Husseini", accent: "cyan" },
    { text: ". They're all me." },
  ],
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Written so each answer stands alone: an assistant quoting any single one
 * should be correct without the surrounding page. Deliberately varied in
 * phrasing — ten answers all opening "Zyad Husseini is…" is the pattern
 * Google's spam guidance calls keyword stuffing.
 */
export const faqs: FaqItem[] = [
  {
    question: "Who is Zyad Husseini?",
    answer:
      "Zyad Husseini is a data analyst, economist and entrepreneur working between France and Egypt. He is studying for an MSc in Data Analytics for Business at Kedge Business School, having graduated from The American University in Cairo in 2025 with a BA in Economics and minors in Business Administration and Computer Science. His work spans business intelligence, econometrics, investment analysis and AI product development.",
  },
  {
    question: "What does Zyad Husseini do?",
    answer:
      "He turns business data into decisions — building Power BI dashboards and data models, running econometric analysis, and developing AI products. He currently works on AI automation at BUB AI, AI product development at Brayn Solutions and investment analysis at Media Trade, alongside a Business Development Associate role and a Research and Marketing Specialist role.",
  },
  {
    question: "Where did he study?",
    answer:
      "He is studying for an MSc in Data Analytics for Business at Kedge Business School in France, expected 2027. Before that he read Economics at The American University in Cairo, graduating in 2025 with minors in Business Administration and Computer Science and a place on the Dean's List. He completed an American and International Baccalaureate at MASE in Egypt in 2020.",
  },
  {
    question: "What is his research about?",
    answer:
      "His MSc thesis, \"Predicting In-Game Spending Behaviour Using Machine Learning: An Economic and Behavioural Analysis\", tests whether player behaviour predicts spending in free-to-play games. Across five datasets covering 50,000+ players, thirteen classifiers performed no better than chance — while the same pipeline reached 0.95 AUC on genuine game-level data, showing the signal was missing from the data rather than from the phenomenon.",
  },
  {
    question: "What did his econometrics paper find?",
    answer:
      "Studying World Bank data across seven countries from 1990 to 2023, he found that a rising renewable share of energy consumption was associated with slower short-run growth — a one-unit rise in the renewable share corresponded to a 1.44 percentage point fall in GDP per capita growth under two-stage least squares. The reading is not to slow decarbonisation but to sequence it.",
  },
  {
    question: "What was the L'Oréal project?",
    answer:
      "A L'Oréal hackathon on classifying skin conditions from beauty product descriptions, judged on carbon cost and model size as well as accuracy. Working in a five-person team, the lightweight pipeline held roughly 93% of a fine-tuned Longformer's micro-F1 while emitting about 2,000 times less CO₂. The team presented the work at L'Oréal's Paris headquarters.",
  },
  {
    question: "What ventures is he involved in?",
    answer:
      "He builds several ventures alongside his analytics work: PNM Agency, a digital agency; PNM Group, a logistics and holding company; NAVI, a student operating system; Matgarak, which helps teams launch digital products; and Qemto, machine-learning forecasting for the Egyptian Exchange.",
  },
  {
    question: "What tools and languages does he work in?",
    answer:
      "Power BI and DAX, Python, SQL, STATA, R, C++ and the Microsoft Office suite, with econometrics and machine learning underpinning the analysis. He works in English and Arabic at native level and French at professional working level.",
  },
  {
    question: "Is Zyad Husseini available for hire?",
    answer:
      "Yes — he is open to full-time roles, internships and consulting in data analytics, business intelligence and economics, and is completing his MSc at Kedge Business School. Email is the fastest route: zyadmhrhusseini@aucegypt.edu, or zmr@pnmico.com for business enquiries.",
  },
  {
    question: "Is his name spelled other ways?",
    answer:
      "It is. Romanising an Arabic name has no single standard, so Zyad Husseini is also written Ziad Husseini, Zeyad Husseini and Ziyad Husseini. Academic work is filed under his full name, Zyad Mohamed Mahmoud Reda Husseini. They all refer to the same person — the data analyst and economist behind zyadhusseini.com.",
  },
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
    title: "L'Oréal Hackathon — Sustainable Skin-Condition Classification",
    category: "analytics",
    year: "2026",
    description:
      "Multi-label NLP model classifying skin conditions from beauty product descriptions, judged on carbon cost as well as accuracy. Presented at L'Oréal HQ in Paris.",
    tools: ["Python", "PyTorch", "Transformers", "LightGBM", "CodeCarbon"],
    icon: Sparkles,
    gradient: "from-pink-400 to-rose-500",
    caseStudy: {
      problem:
        "L'Oréal set a hackathon with an unusual scoring rule: classify skin conditions from beauty product descriptions, but be judged on model size and CO₂ emissions alongside F1. Chasing accuracy alone would lose. The data made it harder — 6,240 LLM-labelled products, dozens of binary labels at once, and severe class imbalance where some labels appeared only a handful of times.",
      approach:
        "Rather than treat every label the same, I split them by how much signal the text actually carried: 'strong' labels stated in the copy (acne, wrinkles, eye contour, SPF) versus 'weak' inferred ones (age bracket, gender, sensitivity). Each got its own model. Then I benchmarked a lightweight TF-IDF and LightGBM pipeline against sentence-transformer embeddings and a fine-tuned Longformer, tuning per-label decision thresholds and instrumenting every run with CodeCarbon so the carbon cost was measured, not estimated.",
      outcome:
        "The Longformer scored highest at 0.688 micro-F1, but took 3.5 hours on a Tesla T4 and emitted 113.8 g of CO₂. The lightweight pipeline reached 0.638 micro-F1 — about 93% of the performance — for 0.05 g, roughly 2,000× less carbon. On strong labels alone it hit 0.77 F1. That trade-off was the argument we took to L'Oréal's Paris headquarters: for production deployment, near-parity at a thousandth of the footprint is the better engineering decision. Built with a five-person team.",
    },
  },
  {
    title: "LSTM Product Classifier",
    category: "development",
    year: "2026",
    description:
      "PyTorch LSTM classifying e-commerce products from their page text — tokenisation and embeddings through to inference on unseen listings.",
    tools: ["PyTorch", "LSTM", "NLTK", "NLP"],
    icon: Braces,
    gradient: "from-violet-400 to-purple-500",
    caseStudy: {
      problem:
        "Product pages are messy free text — title and description mixing marketing language with specifications — and the task was to infer a product's category from that text alone, without any structured fields to lean on.",
      approach:
        "Built the pipeline end to end in PyTorch: cleaning and tokenising the corpus, constructing the vocabulary, padding sequences, and defining an LSTM classifier with an embedding layer and dropout. Trained with Adam, checkpointing on validation performance, then reloaded the best checkpoint for evaluation and wrote a prediction function to run it against product text it had never seen.",
      outcome:
        "A working text classifier and a concrete grasp of how recurrent architectures handle variable-length language — the sequence-modelling groundwork that fed directly into the transformer work on the L'Oréal hackathon.",
    },
  },
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
    description:
      "Sector-by-sector descriptive statistics across all 100 Nasdaq constituents. Three-person team project.",
    tools: ["Descriptive Statistics", "Financial Analysis", "Excel"],
    icon: CandlestickChart,
    gradient: "from-indigo-400 to-violet-500",
    caseStudy: {
      problem:
        "The Nasdaq 100 is dominated by a handful of mega-caps, so index-level headlines say little about what is actually happening underneath. Comparing individual stocks against the index needs structured, like-for-like statistics.",
      approach:
        "Built a per-ticker dataset covering all 100 constituents and organised the analysis by sector — information technology, consumer services and discretionary, staples, health care, industrials, utilities, energy and financial services — so each sector's risk and return characteristics could be compared on the same basis.",
      outcome:
        "A sector-structured read on where the index's performance and volatility actually come from. Submitted for ECON 404101 at The American University in Cairo under Dr. Mohamed Bouaddi, co-authored with two classmates.",
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
    title: "Elevate — Marketing Plan",
    category: "research",
    year: "2025",
    description:
      "Full marketing plan and progress report for the Elevate brand. Six-person team project.",
    tools: ["Market Research", "Segmentation", "Positioning", "Strategy"],
    icon: Megaphone,
    gradient: "from-rose-400 to-pink-500",
    caseStudy: {
      problem:
        "Elevate needed a marketing plan grounded in evidence rather than instinct — who the customer actually is, where the brand sits against competitors, and which moves deserve budget first.",
      approach:
        "Worked as part of a six-person team on structured market research covering competitors, segments and positioning, then synthesised it into a written plan with prioritised recommendations.",
      outcome:
        "A complete marketing plan and progress report submitted for MKTG 2101 at The American University in Cairo under Dr. Hend Abou Ghaly.",
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
/* Companies — slideshow                                               */
/* ------------------------------------------------------------------ */

export type CompanyRelation = "Current role" | "Venture" | "Previous" | "Collaboration";

export interface Company {
  name: string;
  relation: CompanyRelation;
  role: string;
  period: string;
  /** One line on what the work actually was. */
  summary: string;
  highlights: string[];
  url?: string;
  /**
   * Path under /logos. Optional on purpose: only six of the twelve marks were
   * available to source, so the logo strip falls back to a wordmark rather than
   * shipping a gap or an invented asset. Drop a file in and add the path here.
   */
  logo?: string;
}

/** Newest and most significant first — this is the order the slideshow plays in. */
export const companies: Company[] = [
  {
    name: "L'Oréal",
    relation: "Collaboration",
    role: "Hackathon — Sustainable ML",
    period: "2026",
    summary:
      "Built a multi-label model classifying skin conditions from product descriptions, judged on carbon cost as well as accuracy, and presented it at L'Oréal's Paris headquarters.",
    highlights: ["6,240 products", "~2,000× less CO₂", "Presented in Paris"],
  },
  {
    name: "Brayn Solutions",
    relation: "Current role",
    role: "AI Product Development & Website Creation",
    period: "Dec 2025 — present",
    summary: "Developing AI-powered products and building web solutions for clients.",
    highlights: ["AI/ML", "Web development", "Product management"],
  },
  {
    name: "Media Trade",
    relation: "Current role",
    role: "Investment Analyst",
    period: "Dec 2025 — present",
    summary: "Analysing investment opportunities and producing the financial reads behind them.",
    highlights: ["Financial analysis", "Investment research", "Risk assessment"],
  },
  {
    name: "BUB AI",
    relation: "Current role",
    role: "AI Automation & Workflows Specialist",
    period: "Oct 2025 — present",
    summary: "Designing and shipping AI automation workflows that take manual steps out of business processes.",
    highlights: ["AI automation", "Workflow design", "Process optimisation"],
  },
  {
    name: "EFG Hermes",
    relation: "Previous",
    role: "Data Analytics Intern",
    period: "Aug — Sep 2025",
    summary:
      "Built Power BI dashboards for financial data visualisation inside one of MENA's leading investment banks.",
    highlights: ["Power BI", "DAX", "Financial analytics"],
  },
  {
    name: "AR CORP",
    relation: "Previous",
    role: "Data Analytics",
    period: "Jan — Jun 2025",
    summary:
      "Connected a cash-flow statement directly to the ERP system in Power BI, replacing a manual monthly reporting cycle with a live report.",
    highlights: ["ERP integration", "Power BI", "Business intelligence"],
  },
  {
    name: "Pack N Move",
    logo: "/logos/pack-n-move.png",
    relation: "Previous",
    role: "Data Analytics · Marketing · Accounting",
    period: "2019 — 2025",
    summary:
      "Six years across three roles — starting in accounts, moving through marketing across the Gulf, and returning to build business-intelligence dashboards.",
    highlights: ["BI dashboards", "Gulf market marketing", "Accounting"],
  },
  {
    name: "PNM Agency",
    logo: "/logos/pnm-agency.png",
    relation: "Venture",
    role: "Digital agency",
    period: "Ongoing",
    summary: "Brands, websites and marketing built for clients across the region.",
    highlights: ["Branding", "Web", "Marketing"],
    url: "https://pnmagency.com",
  },
  {
    name: "PNM Group",
    logo: "/logos/pnm-group.png",
    relation: "Venture",
    role: "Logistics & holding",
    period: "Ongoing",
    summary: "The moving and logistics group behind the Pack N Move family of brands.",
    highlights: ["Logistics", "Egypt & Gulf", "Holding"],
    url: "https://pnmholding.com",
  },
  {
    name: "NAVI",
    logo: "/logos/navi.png",
    relation: "Venture",
    role: "Ed-tech",
    period: "Ongoing",
    summary:
      "A student operating system — courses, notes, schedules, study groups and AI tools in one command centre.",
    highlights: ["Ed-tech", "AI tools", "Product"],
    url: "https://navi.geo-ed.tech/landing",
  },
  {
    name: "Matgarak",
    relation: "Venture",
    role: "Digital products",
    period: "Ongoing",
    summary: "Helping teams launch modern digital experiences with speed and measurable results.",
    highlights: ["Digital products", "Launch", "Growth"],
    url: "https://matgarak.com",
  },
  {
    name: "Qemto",
    relation: "Venture",
    role: "AI & markets",
    period: "Ongoing",
    summary: "Machine-learning forecasting for the Egyptian Exchange — signals, forecasts and live scores.",
    highlights: ["Machine learning", "EGX", "Forecasting"],
    url: "https://kemto-egx.vercel.app",
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
  { id: "companies", label: "Companies" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "ventures", label: "Ventures" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" },
] as const;
