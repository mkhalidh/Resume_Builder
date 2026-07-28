// Client-side, dictionary-based keyword matching — no external API calls,
// intentionally simple/deterministic rather than "AI-powered."
export const SKILL_KEYWORDS = [
  // Languages
  "javascript", "typescript", "python", "java", "c++", "c#", "go", "rust",
  "php", "ruby", "swift", "kotlin", "sql", "html", "css", "bash", "r",
  // Frontend
  "react", "vue", "angular", "next.js", "nuxt", "svelte", "redux", "tailwind",
  "bootstrap", "webpack", "vite", "sass", "responsive design", "accessibility",
  // Backend
  "node.js", "express", "django", "flask", "spring", "laravel", "rails",
  "graphql", "rest api", "microservices", "api design",
  // Data / infra
  "postgresql", "mysql", "mongodb", "redis", "docker", "kubernetes", "aws",
  "azure", "gcp", "ci/cd", "git", "linux", "terraform", "elasticsearch",
  // Practices
  "agile", "scrum", "kanban", "unit testing", "test automation", "tdd",
  "code review", "debugging", "performance optimization", "security",
  // Data / AI
  "machine learning", "data analysis", "data visualization", "pandas",
  "numpy", "tensorflow", "pytorch", "excel", "power bi", "tableau",
  // Design / product
  "figma", "ui/ux", "wireframing", "prototyping", "user research",
  "product management", "roadmap planning",
  // Soft skills
  "communication", "leadership", "teamwork", "collaboration",
  "problem solving", "critical thinking", "time management",
  "project management", "attention to detail", "adaptability",
  "mentoring", "stakeholder management", "presentation skills",
  "customer service", "negotiation",
];

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Matches whole dictionary terms (case-insensitive), counts occurrences,
// and returns them ranked by frequency.
export function extractKeywords(text, dictionary = SKILL_KEYWORDS) {
  if (!text) return [];
  const haystack = text.toLowerCase();

  const found = [];
  for (const term of dictionary) {
    const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi");
    const matches = haystack.match(pattern);
    if (matches) found.push({ term, count: matches.length });
  }

  return found.sort((a, b) => b.count - a.count).map((f) => f.term);
}

// Flattens the resumeData shape (see Builder.jsx) into one lowercase string.
export function getResumeText(resumeData) {
  if (!resumeData) return "";

  const parts = [
    resumeData.name,
    resumeData.designation,
    ...(resumeData.experiences || []).flatMap((e) => [
      e.mainHeading,
      e.companyName,
      e.description,
    ]),
    ...(resumeData.projects || []).flatMap((p) => [p.mainHeading, p.description]),
    ...(resumeData.education || []).flatMap((ed) => [ed.mainHeading, ed.schoolName]),
    ...((resumeData.rightSidebar && resumeData.rightSidebar.skills) || []),
    ...((resumeData.rightSidebar && resumeData.rightSidebar.tools) || []),
    ...((resumeData.rightSidebar && resumeData.rightSidebar.languages) || []),
  ];

  return parts.filter(Boolean).join(" ").toLowerCase();
}

const MAX_KEYWORDS = 20;

export function matchJobToResume(jobDescriptionText, resumeData) {
  const jdKeywords = extractKeywords(jobDescriptionText).slice(0, MAX_KEYWORDS);
  const resumeText = getResumeText(resumeData);

  const matched = jdKeywords.filter((term) =>
    new RegExp(`\\b${escapeRegExp(term)}\\b`, "i").test(resumeText)
  );
  const missing = jdKeywords.filter((term) => !matched.includes(term));

  const totalFound = jdKeywords.length;
  const matchScore = totalFound > 0 ? Math.round((matched.length / totalFound) * 100) : 0;

  return { matched, missing, matchScore, totalFound };
}
