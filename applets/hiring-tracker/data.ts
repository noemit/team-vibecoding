export type CandidateNote = {
  author: string;
  date: string;
  text: string;
};

export type Candidate = {
  name: string;
  status: "Active" | "Offer" | "Rejected" | "Withdrawn";
  stage: string;
  feedback: string;
  nextStep?: string;
  nextStepOwner?: string;
  nextStepDue?: string;
  notes: CandidateNote[];
};

export type Pipeline = {
  name: string;
  hiringManager: string;
  focus: string;
  status: string;
  candidates: Candidate[];
};

export const REPORT_DATE = "2026-08-17";

export const PIPELINES: Pipeline[] = [
  {
    name: "Chief of Staff",
    hiringManager: "CEO",
    focus: "Operational rigor, strategic alignment, high agency",
    status: "Active",
    candidates: [
      {
        name: "Elena Rostova",
        status: "Active",
        stage: "Final Panel (Onsite)",
        feedback:
          "Strong fit. Incredible operational background from Stripe. Scaled their EMEA ops team. Highly articulate. Concern: compensation expectations are slightly above our band.",
        nextStep: "Final hiring decision",
        nextStepOwner: "CEO",
        notes: [],
      },
      {
        name: "Marcus Thorne",
        status: "Active",
        stage: "Hiring Manager Screen",
        feedback:
          "Undecided. Classic MBB (McKinsey) background. Very strategic, but asked questions that make us worry he won't want to roll up his sleeves for startup grunt work.",
        nextStep: "Fit decision",
        nextStepOwner: "CEO",
        notes: [],
      },
      {
        name: "Sarah Jenkins",
        status: "Active",
        stage: "Assessment Phase",
        feedback:
          "Promising. Wrote a phenomenal 90-day plan for the take-home. Need to probe on her ability to influence without authority in the next round.",
        nextStep: "Probe influence-without-authority in next round",
        nextStepOwner: "CEO",
        notes: [],
      },
      {
        name: "David Chen",
        status: "Rejected",
        stage: "Rejected",
        feedback:
          "Pass. Great guy, but indexing too heavily on EA/Administrative tasks rather than strategic operations.",
        notes: [],
      },
      {
        name: "Aisha Patel",
        status: "Active",
        stage: "Recruiter Screen",
        feedback:
          "Moving forward. Former founder who successfully exited a small SaaS tool. High agency, knows what it takes. Scheduled for HM screen on Thursday.",
        nextStep: "Hiring manager screen",
        nextStepOwner: "CEO",
        nextStepDue: "2026-08-20",
        notes: [],
      },
      {
        name: "Julian Baptiste",
        status: "Active",
        stage: "Final Panel (Onsite)",
        feedback:
          "Top contender. Team loved his direct communication style. Handled the crisis management scenario flawlessly. References are glowing.",
        nextStep: "Final hiring decision",
        nextStepOwner: "CEO",
        notes: [],
      },
      {
        name: "Chloe Price",
        status: "Withdrawn",
        stage: "Withdrawn",
        feedback:
          "Accepted an offer at another Series B company before we could schedule the technical round.",
        notes: [],
      },
      {
        name: "Liam O'Connor",
        status: "Active",
        stage: "Sourced",
        feedback:
          "Referral from our VP of Eng. Ex-military officer transitioned to tech ops. Reaching out this week.",
        nextStep: "Initial outreach",
        nextStepOwner: "Recruiter",
        nextStepDue: "2026-08-21",
        notes: [],
      },
    ],
  },
  {
    name: "Software Engineer - Backend",
    hiringManager: "VP of Engineering",
    focus: "Python/Go, distributed systems, database optimization",
    status: "Active",
    candidates: [
      {
        name: "Priya Sharma",
        status: "Offer",
        stage: "Offer Extended",
        feedback:
          "Outstanding. Crushed the system design interview. Suggested a caching layer architecture we hadn't even considered. Offer out, expires Friday.",
        nextStep: "Offer expires - follow up",
        nextStepOwner: "VP of Engineering",
        nextStepDue: "2026-08-21",
        notes: [],
      },
      {
        name: "Michael Chang",
        status: "Active",
        stage: "Final Panel",
        feedback:
          "Solid. Very good at Go. A bit quiet during the behavioral round, but technical skills are undeniable.",
        nextStep: "Final hiring decision",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Omar Al-Fayed",
        status: "Active",
        stage: "Technical Screen 2",
        feedback:
          "Mixed. Breezed through the algorithms, but struggled explaining trade-offs in microservices architecture. Need a strong Senior engineer to probe further.",
        nextStep: "Senior engineer deep-dive",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Jessica Lin",
        status: "Active",
        stage: "Technical Screen 1",
        feedback:
          "Moving forward. Solved the dynamic programming question with 15 mins to spare. Very clean code.",
        nextStep: "Advance to technical screen 2",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Samir Desai",
        status: "Active",
        stage: "Assessment (Take-home)",
        feedback:
          "Submitted repo yesterday. Initial glance shows excellent test coverage, but he used a slightly bloated framework. Reviewing today.",
        nextStep: "Review take-home repo",
        nextStepOwner: "VP of Engineering",
        nextStepDue: "2026-08-17",
        notes: [],
      },
      {
        name: "Alex Rivera",
        status: "Rejected",
        stage: "Rejected",
        feedback:
          "Pass. Struggled significantly with basic SQL joins and concurrency primitives during the live coding session.",
        notes: [],
      },
      {
        name: "Nina Kraviz",
        status: "Active",
        stage: "Recruiter Screen",
        feedback:
          "Strong on paper. 4 years at AWS. Looking for remote-first. Moving to HM screen.",
        nextStep: "Hiring manager screen",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Tom Hiddles",
        status: "Active",
        stage: "Recruiter Screen",
        feedback:
          "Good energy, but might be too junior. Has mostly frontend experience despite applying for the backend role.",
        notes: [],
      },
      {
        name: "Emily Wong",
        status: "Active",
        stage: "Hiring Manager Screen",
        feedback:
          "Strong fit. Great culture add, loves building internal tooling. Fits well with our infrastructure squad's needs.",
        nextStep: "Advance to technical screen",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Daniel Kowalski",
        status: "Rejected",
        stage: "Rejected",
        feedback:
          "Pass. Code was functional but very messy. Did not take feedback well when the interviewer pointed out an edge case.",
        notes: [],
      },
      {
        name: "Fatima Zahra",
        status: "Active",
        stage: "Final Panel",
        feedback:
          "Excellent. Exceptional communication. Explained a complex race condition she fixed at her last job perfectly. Likely offer.",
        nextStep: "Extend offer",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "James O'Brien",
        status: "Active",
        stage: "Sourced",
        feedback: "Passive candidate. Responded to LinkedIn outreach. Setting up intro call.",
        nextStep: "Intro call",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Sofia Rossi",
        status: "Active",
        stage: "Technical Screen 2",
        feedback: "Pending. Interview is tomorrow. Strong background in financial data pipelines.",
        nextStep: "Technical screen 2",
        nextStepOwner: "VP of Engineering",
        nextStepDue: "2026-08-18",
        notes: [],
      },
      {
        name: "Wei Chen",
        status: "Rejected",
        stage: "Rejected (Culture)",
        feedback:
          "Technically proficient but spoke over the interviewer repeatedly. Not a collaborative fit for the team.",
        notes: [],
      },
      {
        name: "Lucas Silva",
        status: "Active",
        stage: "Take-home",
        feedback: "Asked for a 3-day extension due to personal reasons. Granted.",
        nextStep: "Take-home due (extension granted)",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Amelia Pond",
        status: "Active",
        stage: "Sourced",
        feedback: "GitHub profile shows heavy contributions to open-source Go projects. Looks very promising.",
        nextStep: "Review GitHub and schedule intro call",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Mateo Garcia",
        status: "Active",
        stage: "Recruiter Screen",
        feedback:
          "Salary expectations are misaligned (wants 30% above top band). Trying to negotiate, otherwise will pass.",
        nextStep: "Salary negotiation",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Hanna Schmidt",
        status: "Active",
        stage: "HM Screen",
        feedback:
          "Moving forward. Just transitioned from data engineering to backend. Very strong SQL skills.",
        nextStep: "Advance to technical screen",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Viktor Vance",
        status: "Active",
        stage: "Technical Screen 1",
        feedback: "Pending.",
        nextStep: "Technical screen 1",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Yuki Tanaka",
        status: "Active",
        stage: "Technical Screen 1",
        feedback: "Pending.",
        nextStep: "Technical screen 1",
        nextStepOwner: "VP of Engineering",
        notes: [],
      },
      {
        name: "Oliver Twist",
        status: "Rejected",
        stage: "Rejected",
        feedback: "Ghosted the technical interview.",
        notes: [],
      },
      {
        name: "Mia Wallace",
        status: "Active",
        stage: "Recruiter Screen",
        feedback: "Pending.",
        nextStep: "Recruiter screen",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Jackson Ford",
        status: "Active",
        stage: "Sourced",
        feedback: "Pending.",
        nextStep: "Outreach and intro call",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Ava Smith",
        status: "Active",
        stage: "Sourced",
        feedback: "Pending.",
        nextStep: "Outreach and intro call",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Ethan Hunt",
        status: "Active",
        stage: "Sourced",
        feedback: "Pending.",
        nextStep: "Outreach and intro call",
        nextStepOwner: "Recruiter",
        notes: [],
      },
    ],
  },
  {
    name: "Growth Marketer",
    hiringManager: "CMO",
    focus: "B2B SaaS, Performance Marketing, SEO, Funnel Optimization",
    status: "Active",
    candidates: [
      {
        name: "Leo Carmichael",
        status: "Active",
        stage: "Final Panel",
        feedback:
          "Strong fit. Brought CAC down 40% at his last startup while doubling lead volume. Knows HubSpot inside out. Very data-driven.",
        nextStep: "Final hiring decision",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Maya Angelise",
        status: "Active",
        stage: "Case Study Presentation",
        feedback:
          "Top contender. Her mock campaign for our new feature launch was incredibly creative and well-budgeted. She understands our target ICP perfectly.",
        nextStep: "Final hiring decision",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Jordan Lee",
        status: "Active",
        stage: "Hiring Manager Screen",
        feedback:
          "Mixed. Great energy, but heavily indexed on brand/events marketing. We really need someone analytical who can run paid ads and SEO. Might pass.",
        nextStep: "Fit decision",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Tariq Hassan",
        status: "Active",
        stage: "Recruiter Screen",
        feedback:
          "Moving forward. Managed a $100k/mo ad spend budget previously. Very articulate about attribution models.",
        nextStep: "Hiring manager screen",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Zoe Kravitz",
        status: "Rejected",
        stage: "Rejected",
        feedback:
          "Pass. Did not have B2B experience. Her portfolio is entirely D2C e-commerce. The transition would be too steep.",
        notes: [],
      },
      {
        name: "Ben Wyatt",
        status: "Active",
        stage: "Case Study Presentation",
        feedback:
          "Undecided. The math in his funnel projections was slightly off, but his creative copy was excellent. Need to see if he can partner well with a data analyst.",
        nextStep: "Data-partnership check",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Isabella Torres",
        status: "Active",
        stage: "HM Screen",
        feedback:
          "Strong fit. Comes from a direct competitor. Has the exact playbook we need to scale up our inbound engine. Fast-tracking to the case study.",
        nextStep: "Case study presentation",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Nadia Petrova",
        status: "Withdrawn",
        stage: "Withdrawn",
        feedback: "Decided to start her own agency instead of taking a full-time role.",
        notes: [],
      },
      {
        name: "Simon Pegg",
        status: "Active",
        stage: "Sourced",
        feedback: "Found via an impressive Substack article he wrote on PLG (Product-Led Growth). Reaching out today.",
        nextStep: "Reach out",
        nextStepOwner: "Recruiter",
        nextStepDue: "2026-08-17",
        notes: [],
      },
      {
        name: "Clara Oswald",
        status: "Active",
        stage: "Recruiter Screen",
        feedback: "Pending. 5 years in B2B SaaS growth. Looking for a step up to a lead role.",
        nextStep: "Recruiter screen",
        nextStepOwner: "Recruiter",
        notes: [],
      },
      {
        name: "Derek Hale",
        status: "Rejected",
        stage: "Rejected",
        feedback:
          "Wanted fully async work, but our marketing team requires heavy synchronous collaboration with sales.",
        notes: [],
      },
      {
        name: "Fiona Gallagher",
        status: "Active",
        stage: "HM Screen",
        feedback: "Pending. Strong on SEO, weaker on paid ads.",
        nextStep: "Fit decision",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Gavin Belson",
        status: "Active",
        stage: "Sourced",
        feedback: "Ex-Hooli. Great resume, but might be too senior/expensive for this specific IC role.",
        nextStep: "Fit and budget decision",
        nextStepOwner: "CMO",
        notes: [],
      },
      {
        name: "Hannah Abbott",
        status: "Active",
        stage: "Recruiter Screen",
        feedback: "Pending.",
        nextStep: "Recruiter screen",
        nextStepOwner: "Recruiter",
        notes: [],
      },
    ],
  },
];
