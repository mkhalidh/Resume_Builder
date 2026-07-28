// Maxes out every section (5 experiences, 5 projects, 5 education, 10
// skills/tools/languages — the form's actual per-section caps) so
// multi-page/pagination behavior can be tested in one click, separately
// from sampleResumeData's shorter, single-page-realistic content.
export const stressTestResumeData = {
  name: "Muhammad Khalid Hussain",
  designation: "AI Product Builder | Software Engineer",
  experiences: [
    {
      mainHeading: "AI Product Builder",
      companyName: "Personal Projects",
      date: "2024 – Present",
      description:
        "Designed and developed AI-powered web applications and SaaS products using an AI-first development approach. Conducted product discovery, requirement gathering, MVP planning, rapid prototyping, and iterative feature improvements. Leveraged ChatGPT, Claude, GitHub Copilot, and AI APIs to accelerate development, automate workflows, and deliver scalable user-focused solutions while collaborating across design and engineering.",
    },
    {
      mainHeading: "Senior Software Engineer",
      companyName: "Company 1 Inc",
      date: "2021 - 2022",
      description:
        "Led development of scalable backend systems, mentored junior engineers, and collaborated cross-functionally to ship production features serving thousands of users.",
    },
    {
      mainHeading: "Senior Software Engineer",
      companyName: "Company 2 Inc",
      date: "2022 - 2023",
      description:
        "Led development of scalable backend systems, mentored junior engineers, and collaborated cross-functionally to ship production features serving thousands of users.",
    },
    {
      mainHeading: "Senior Software Engineer",
      companyName: "Company 3 Inc",
      date: "2023 - 2024",
      description:
        "Led development of scalable backend systems, mentored junior engineers, and collaborated cross-functionally to ship production features serving thousands of users.",
    },
    {
      mainHeading: "Senior Software Engineer",
      companyName: "Company 4 Inc",
      date: "2024 - 2025",
      description:
        "Led development of scalable backend systems, mentored junior engineers, and collaborated cross-functionally to ship production features serving thousands of users.",
    },
  ],
  projects: [
    {
      mainHeading: "SSUETNotes – Educational SaaS Platform",
      date: "2025",
      description:
        "Built a scalable SaaS platform for students and teachers with role-based access, subscriptions, analytics, and content management. Defined product requirements, planned MVP features, improved user workflows, and developed a secure full-stack solution using React, Node.js, Express, and MongoDB.",
    },
    {
      mainHeading: "Fake News Detector",
      date: "2025",
      description:
        "Developed an AI-powered fake news detection system using machine learning and natural language processing. Performed data preprocessing, model evaluation, performance optimization, and built an intuitive interface for real-time prediction and user interaction.",
    },
    {
      mainHeading: "AI Resume Builder",
      date: "2026",
      description:
        "Created an AI-powered resume builder that generates ATS-optimized resumes based on job descriptions. Implemented intelligent keyword matching, prompt engineering techniques, customizable templates, and automated resume generation to improve hiring success.",
    },
    {
      mainHeading: "Extra Project 4",
      date: "2025",
      description:
        "Built and shipped a full-stack application with authentication, real-time updates, and a polished responsive UI, used by real customers in production.",
    },
    {
      mainHeading: "Extra Project 5",
      date: "2026",
      description:
        "Built and shipped a full-stack application with authentication, real-time updates, and a polished responsive UI, used by real customers in production.",
    },
  ],
  education: [
    {
      mainHeading: "Bachelor of Science in Software Engineering",
      schoolName: "Sir Syed University of Engineering & Technology (SSUET)",
      date: "2023 – Present",
    },
    {
      mainHeading: "Certificate in Advanced Engineering 1",
      schoolName: "Institute 1 of Technology",
      date: "2019",
    },
    {
      mainHeading: "Certificate in Advanced Engineering 2",
      schoolName: "Institute 2 of Technology",
      date: "2020",
    },
    {
      mainHeading: "Certificate in Advanced Engineering 3",
      schoolName: "Institute 3 of Technology",
      date: "2021",
    },
    {
      mainHeading: "Certificate in Advanced Engineering 4",
      schoolName: "Institute 4 of Technology",
      date: "2022",
    },
  ],
  rightSidebar: {
    skills: [
      "AI Product Management",
      "Product Strategy",
      "AI-First SDLC",
      "Agile Methodology",
      "MVP Development",
      "Prompt Engineering",
      "Requirement Analysis",
      "Workflow Automation",
      "Product Analytics",
      "Cross-Functional Collaboration",
    ],
    tools: [
      "ChatGPT",
      "Claude",
      "GitHub Copilot",
      "Cursor AI",
      "GitHub",
      "Postman",
      "Docker",
      "Figma",
      "Vercel",
      "Notion",
    ],
    languages: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "Go",
      "SQL",
      "C++",
      "Rust",
      "Kotlin",
      "Swift",
    ],
  },
};
