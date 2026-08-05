// Muhammad Khalid Hussain's own resume content, used by the "Fill My Resume"
// button so production deploys can be spot-checked with real, full-length
// content instead of retyping it by hand every time.
export const myResumeData = {
  name: "Muhammad Khalid Hussain",
  designation: "Software Engineer",
  contact: {
    email: "unikhalidh@gmail.com",
    phone: "0300-0000000",
    linkedin: "linkedin.com/in/muhammad-khalid-hussain-384752202",
    github: "github.com/mkhalidh",
  },
  experiences: [
    {
      mainHeading: "Backend Developer",
      companyName: "AimNodes",
      date: "2025",
      description:
        "Worked as a Backend Developer on a Clinic Management System, building secure and scalable RESTful APIs using Node.js, Express.js, and MongoDB. Integrated third-party services including Rx, ClaimMD, OpenAI, Twilio and Mailgun, implemented role-based authentication and authorization, optimized database performance, and collaborated with frontend developers to deliver and maintain core healthcare features.",
    },
    {
      mainHeading: "MERN Developer Intern",
      companyName: "Globium",
      date: "2025",
      description:
        "Completed a MERN Stack Development internship building responsive and high-performance web applications using React.js, Next.js, HTML, CSS, and JavaScript. Developed reusable UI components, integrated backend APIs, contributed to client projects including landing pages and dashboards, and collaborated with senior developers to test, deploy, and maintain production-ready applications.",
    },
    {
      mainHeading: "Freelance Web Developer",
      companyName: "Self",
      date: "2024",
      description:
        "Worked as a Freelance Frontend Developer, building responsive and user-friendly websites for clients using HTML, CSS, and JavaScript through personal referrals.",
    },
  ],
  projects: [
    {
      mainHeading: "SSUETNotes - Educational Saas Platform",
      date: "2025",
      link: "https://ssuet-notes12.vercel.app/",
      description:
        "Built a scalable SaaS platform for students and teachers using React, Node.js, Express.js, and MongoDB. Implemented role-based access, subscriptions, analytics, and content management. Developed a secure approval workflow where teachers upload PDFs, videos, and quizzes for admin review before publishing to students. Built a payment verification system that allows students to upload payment receipts, enabling admins to review and approve subscriptions which are then activated automatically.",
    },
    {
      mainHeading: "Resume Builder",
      date: "2026",
      link: "https://resume-builder-mkhalidh.vercel.app/",
      description:
        "An ATS-friendly resume builder built with React 19 and Vite, offering 9 templates, a live preview, and one-click PDF export using Formik and Yup for form handling and html2canvas with jsPDF for the export. It also includes an AI-powered job-matching feature built on Azure AI, where the user uploads a job description and the AI extracts keywords from it, matches them against the resume's projects, skills, tools, and languages, and generates a match score based on keyword overlap. It also suggests the best keywords to add for that specific job and flags what is missing or weak in the resume relative to the job description, functioning as an ATS-optimization assistant built into the resume builder itself.",
    },
    {
      mainHeading: "Food_Analyzer",
      date: "2025",
      link: "https://github.com/mkhalidh/Food_Analyzer",
      description:
        "A machine learning based food recognition app where users upload a food image and a FastAPI backend runs it through a MobileNetV2 model, using transfer learning on the Food-41 dataset, to predict one of 101 food categories along with a confidence score. MobileNetV2 was chosen for its lightweight architecture and FastAPI was chosen for its async support and automatic request validation.",
    },
    {
      mainHeading: "SSUETConnect",
      date: "2024",
      link: "https://ssuetconnects.vercel.app/",
      description:
        "A university exclusive discussion forum built with React and Spring Boot, using a PostgreSQL database, where students post questions, comment, and engage in academic discussions with an admin dashboard for moderation. Spring Security handles authentication and the backend follows the standard Spring Boot layered architecture of Controller, Service, and Repository. This project also involved core DSA concepts, including Lists for post and comment feeds, sorting for trending and latest posts, and a parent-child (tree-like) structure for nested comment replies.",
    },
  ],
  education: [
    {
      mainHeading: "Bachelors in Software Engineering",
      schoolName: "Sir Syed University of Engineering (SSUET)",
      date: "2023 - 2027",
    },
  ],
  certifications: [
    {
      mainHeading: "Certified React Crash Course From Zero To Hero",
      issuer: "Udemy",
      date: "",
    },
    {
      mainHeading: "Community Engagement & Learning Support - GDSC",
      issuer: "GDSC",
      date: "",
    },
    {
      mainHeading: "2nd Position - Semester Project Exhibitions (1st, 3rd & 5th Semester)",
      issuer: "Sir Syed University of Engineering & Technology",
      date: "",
    },
    {
      mainHeading: "1st Position - Semester Project Exhibitions (4th Semester)",
      issuer: "Sir Syed University of Engineering & Technology",
      date: "",
    },
  ],
  sectionOrder: ["experience", "projects", "education", "certifications"],
  rightSidebar: {
    skills: [
      "Object-Oriented Programming",
      "Data Structures and Algorithms",
      "Database Management System",
      "Communication",
      "Team Collaboration",
      "Problem Solving & Debugging",
      "Time Management",
      "Fast Learner",
    ],
    tools: [
      "VsCode",
      "Git/Github",
      "Vercel",
      "MongoDb",
      "Postman",
      "Postgresql",
      "Adobe",
      "Figma",
    ],
    languages: [
      "JavaScript",
      "Java",
      "Python",
      "TypeScript",
      "Nextjs",
      "React.js",
      "Node.js",
      "ShadCn",
      "SQL",
      "TailwindCSS",
    ],
  },
};
