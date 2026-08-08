// Grouped by MAJOR version — every minor/patch release under the same major
// (e.g. 1.0.0, 1.1.0, 1.1.1) nests inside one group, so the What's New modal
// only shows a new top-level entry on an actual major bump. Keep entries
// honest and specific to what actually shipped — no invented stats,
// consistent with the rest of this project.
//
// Ordering matters and isn't auto-sorted: groups newest-major-first, and
// each group's `releases` newest-first within it. The very first release in
// the very first group is what's shown as "Latest" and selected by default.
export const changelog = [
  {
    major: "1",
    releases: [
      {
        version: "1.2.1",
        date: "2026-08-08",
        highlights: [
          'Fixed the "Match to a Job" AI suggestions failing with an error — switched the underlying AI provider after the previous one started having outages.',
        ],
      },
      {
        version: "1.2.0",
        date: "2026-08-05",
        highlights: [
          "Added optional contact info, a clickable project link, and a Certifications & Achievements section to all 9 templates, plus drag-and-drop section reordering.",
          "Project and contact links are now real, clickable hyperlinks in the exported PDF, not just on-screen.",
          "Fixed occasional squished text and dropped punctuation in exported PDFs caused by capturing before web fonts finished settling.",
          "Added a social preview image so links shared on Reddit, X, and LinkedIn show a proper card instead of plain text.",
        ],
      },
      {
        version: "1.1.0",
        date: "2026-07-28",
        highlights: [
          'Added a keyword-match + AI-powered "Match to a Job" tool in the builder — paste a job description, see which resume keywords you already cover, and get AI suggestions for the rest.',
          "Fixed PDF export: oversized/garbled headings, pages that looked shrunk in PDF viewers, an extra blank trailing page, and profile photos losing their grayscale crop.",
        ],
      },
      {
        version: "1.0.0",
        date: "2026-07-26",
        highlights: [
          "Public launch — 9 free, ATS-friendly resume templates with live preview and one-click PDF export.",
          "Added a career-tips blog and full SEO setup (sitemap, structured data, Search Console, Analytics).",
        ],
      },
    ],
  },
];
