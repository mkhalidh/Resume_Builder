// Real content used to smoke-test every template without retyping the form
// by hand each time. Shape must match ResumeForm's Formik initialValues
// exactly (see src/components/form/ResumeForm.jsx). `image` is intentionally
// omitted here — it's a File object, set separately from public/photo.png.
export const sampleResumeData = {
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
  ],
  education: [
    {
      mainHeading: "Bachelor of Science in Software Engineering",
      schoolName: "Sir Syed University of Engineering & Technology (SSUET)",
      date: "2023 – Present",
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
    tools: ["ChatGPT", "Claude", "GitHub Copilot", "Cursor AI", "GitHub", "Postman"],
    languages: ["Python", "Java", "JavaScript"],
  },
};
