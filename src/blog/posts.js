export const posts = [
  {
    slug: "resume-summary-that-doesnt-sound-generic",
    title: "How to Write a Resume Summary That Doesn't Sound Generic",
    excerpt:
      "Skip the buzzwords — here's a simple formula for a summary that actually says something.",
    gradient: "from-violet to-violet/60",
    readTime: "4 min read",
    datePublished: "2026-07-26",
    tags: ["writing", "resume-basics"],
    sections: [
      {
        heading: "Why most summaries fall flat",
        body: "“Results-driven professional with strong communication skills and a proven track record of success.” If that sentence could describe literally anyone, it's not doing its job. A resume summary is prime real estate — it's the first thing a recruiter reads — and vague adjectives waste it. The fix isn't cleverer wording. It's being specific.",
      },
      {
        heading: "A formula that actually works",
        body: "Instead of describing yourself in the abstract, name the role, the concrete thing you do well, and the kind of impact you've had. A reliable structure:",
        list: [
          "[Your role/years of experience] who [specific thing you do well]",
          "Backed by [one concrete example or number, if you have one]",
          "Looking to [what you want next, only if relevant]",
        ],
      },
      {
        heading: "Before and after",
        body: "Before: “Motivated marketing professional with excellent skills in digital marketing and team collaboration.”\n\nAfter: “Marketing coordinator with 3 years running paid social campaigns for small e-commerce brands, including one that cut cost-per-acquisition by a third over two quarters.”\n\nThe second version is longer, but every word is doing something — the first is just filler that any candidate could paste in.",
      },
      {
        heading: "Common mistakes to avoid",
        list: [
          "Leading with soft-skill adjectives (“hardworking,” “passionate”) instead of what you actually did",
          "Repeating your job title from the line right above it without adding anything",
          "Writing it last-minute as an afterthought — it's the part most people actually read first",
        ],
      },
      {
        heading: "One last check",
        body: "Read your summary out loud. If it sounds like something you'd say about a stranger rather than something true about your own work, rewrite it until it doesn't.",
      },
    ],
  },
  {
    slug: "only-resume-format-guide-you-need",
    title: "The Only Resume Format Guide You Actually Need",
    excerpt:
      "Reverse-chronological, functional, or hybrid? A quick guide to picking the right one.",
    gradient: "from-jade to-jade-600",
    readTime: "5 min read",
    datePublished: "2026-07-26",
    tags: ["formatting", "resume-basics"],
    sections: [
      {
        heading: "Reverse-chronological",
        body: "Your most recent job first, working backward. This is the format recruiters expect by default, and it's what applicant tracking systems parse most reliably — clear section headings, one linear timeline, nothing to misread. Use it if your career has moved in a fairly straight line and your most recent roles are your strongest selling point.",
      },
      {
        heading: "Functional (skills-based)",
        body: "Organized around skill categories instead of a job timeline, with employment history condensed to a short list at the bottom. It's built to de-emphasize gaps or a non-linear path. The tradeoff: many recruiters read a functional resume as a signal that something is being hidden, and it tends to parse worse in ATS software since the timeline it's looking for isn't there.",
      },
      {
        heading: "Hybrid (combination)",
        body: "A skills or highlights section up top, followed by a standard reverse-chronological work history below. You get to lead with your strongest, most relevant qualifications while still giving recruiters and software the clear timeline they expect. For most people — including career changers and people with a gap — this is the safer default.",
      },
      {
        heading: "How to actually choose",
        list: [
          "Steady, linear career in the same field → reverse-chronological",
          "Career change, re-entering the workforce, or a resume that needs to lead with skills → hybrid",
          "Pure functional format → rarely worth the ATS and recruiter-trust tradeoff; a hybrid gets you the same benefit more safely",
        ],
      },
      {
        heading: "Format is a container, not a fix",
        body: "No format rescues weak content. Pick the one that presents your actual experience honestly and clearly, then spend your remaining effort on the bullet points themselves — that's where a resume is actually won or lost.",
      },
    ],
  },
  {
    slug: "action-verbs-to-replace-responsible-for",
    title: "20 Action Verbs to Replace “Responsible For”",
    excerpt:
      "Small wording changes that make your bullet points read like accomplishments.",
    gradient: "from-indigo-400 to-indigo-600",
    readTime: "3 min read",
    datePublished: "2026-07-26",
    tags: ["writing", "bullet-points"],
    sections: [
      {
        heading: "“Responsible for” describes a job. It doesn't describe you.",
        body: "“Responsible for managing social media accounts” tells a recruiter what the role covered, not what you actually did with it. Swapping in a specific action verb — and pairing it with a result where you can — turns a duty into an accomplishment.",
      },
      {
        heading: "Leadership & ownership",
        list: ["Led", "Directed", "Championed", "Spearheaded", "Orchestrated"],
      },
      {
        heading: "Building & creating",
        list: ["Built", "Designed", "Launched", "Engineered", "Developed"],
      },
      {
        heading: "Improving & optimizing",
        list: ["Streamlined", "Reduced", "Increased", "Automated", "Overhauled"],
      },
      {
        heading: "Communicating & collaborating",
        list: ["Presented", "Negotiated", "Coordinated", "Mentored", "Facilitated"],
      },
      {
        heading: "Pair the verb with a result",
        body: "The verb swap only does half the work. “Streamlined the onboarding process” is better than “Responsible for onboarding,” but “Streamlined onboarding, cutting new-hire ramp-up time from three weeks to one” is what actually gets remembered. If you don't have a number, a concrete before/after works almost as well.",
      },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const getRelatedPosts = (slug, limit = 2) => {
  const current = getPost(slug);
  if (!current) return posts.slice(0, limit);

  const rest = posts.filter((p) => p.slug !== slug);
  const sharedTag = rest.filter((p) =>
    p.tags.some((tag) => current.tags.includes(tag))
  );
  const ranked = [...sharedTag, ...rest.filter((p) => !sharedTag.includes(p))];
  return ranked.slice(0, limit);
};
