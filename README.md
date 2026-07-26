# resumebuilder

A **free, no-sign-up resume builder**: fill in a simple form, watch your resume update live, then export a polished, ATS-friendly PDF in one click. Built with React, Vite, and Tailwind CSS.

**Live site:** https://resume-builder-mkhalidh.vercel.app

---

## 🚀 Features

- **9 free templates** — Modern, Minimal, Portfolio, Editorial (dark/light), Bold, Timeline, Corporate, and ATS Simple
- **Live preview** — the resume updates as you type, no refresh needed
- **One-click PDF export** — polished, print-ready output
- **No sign-up, no paywall** — everything is unlocked from the start
- **ATS-friendly formatting** — clean, semantic layouts built to parse correctly in applicant tracking systems
- **Career blog** — original articles on resume writing, formatting, and wording, with related-post recommendations
- **Mobile-friendly builder** — the live preview and PDF export both scale correctly to any screen size

---

## 🛠 Tech stack

- **React 19 + Vite** — frontend and build tooling
- **React Router** — client-side routing (`/`, `/templates`, `/builder`, `/blog`, `/blog/:slug`)
- **Tailwind CSS** — styling
- **Formik + Yup** — resume form handling and validation
- **html2canvas + jsPDF** — resume-to-PDF export
- **GSAP + Lenis** — homepage scroll animation

---

## 📂 Local setup

```sh
git clone https://github.com/mkhalidh/Resume_Builder.git
cd Resume_Builder
npm install
npm run dev
```

Then open `http://localhost:5173/`.

Other scripts: `npm run build` (production build), `npm run lint`, `npm run preview`.

There's also a Selenium smoke test (`scripts/pdf_smoke_test.py`) that fills the builder form and downloads a PDF for every template — useful after touching any template file. Requires Python 3 and `pip install selenium` (Chrome + driver are handled automatically).

---

## 📌 How it works

1. Pick a template on `/templates`
2. Fill in the form on `/builder` — the preview updates live
3. Click **Download Resume** for a PDF

---

## 🔎 SEO — what's already done vs. what you need to do manually

This is a client-rendered single-page app (no server-side rendering), so on-page SEO only gets you so far — the rest has to happen outside the codebase. Here's the honest split:

### Already implemented in code
- Per-route `<title>`, meta description, canonical URL, Open Graph/Twitter tags, and JSON-LD structured data (`WebSite` on the homepage, `Article` on each blog post) — see `src/hooks/useSEO.js`
- `robots.txt` and `sitemap.xml` in `public/`
- Semantic headings and ATS-friendly, crawlable markup throughout

### You need to do this yourself (all free)

**1. Google Search Console** — the single most important step
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → enter `https://resume-builder-mkhalidh.vercel.app`
3. Verify ownership (HTML tag method is easiest — paste the tag it gives you and ask for it to be added to `index.html`)
4. Submit `sitemap.xml` under **Sitemaps** in the left sidebar
5. Under **URL Inspection**, request indexing for `/`, `/templates`, `/builder`, and `/blog` individually to speed up first crawl
6. First indexing usually takes a few days to ~2 weeks

**2. Bing Webmaster Tools** — same idea, 5 minutes, extra traffic from Bing/Yahoo/DuckDuckGo
- [bing.com/webmasters](https://www.bing.com/webmasters) — you can import directly from a verified Google Search Console property, then submit the same sitemap

**3. Google Analytics (GA4)** — to actually see traffic
1. [analytics.google.com](https://analytics.google.com) → create a property for the site
2. Copy the Measurement ID (`G-XXXXXXX`)
3. Add it to the codebase (ask for this to be wired in — it's a small snippet in `index.html`)

**4. Share it where real people will actually see it** — this matters more than any of the above for early traffic and is what eventually earns backlinks (which is the biggest ranking factor, more than any meta tag):
- Reddit: r/resumes, r/jobs, r/cscareerquestions, r/forhire, r/SideProject, r/InternetIsBeautiful
- [Product Hunt](https://www.producthunt.com) — launch it, free tools with no paywall do well here
- [Hacker News](https://news.ycombinator.com) — "Show HN: a free resume builder with no sign-up"
- [Indie Hackers](https://www.indiehackers.com)
- LinkedIn and X/Twitter posts
- Dev.to / Hashnode — write a short "how I built this" post with a link back
- Relevant Facebook/WhatsApp/Discord groups for job seekers or students

**5. Free directory/backlink listings** (each is a legitimate backlink, takes minutes):
- [AlternativeTo](https://alternativeto.net) — list as a free alternative to paid resume builders
- Add topics to the GitHub repo itself (`resume-builder`, `resume`, `cv`, `react`) — GitHub search is its own discovery channel
- SaaSHub, Slant.co

**6. Keep publishing to `/blog`**
Fresh, genuinely useful content is what search engines reward over time — the blog system already supports adding more posts easily in `src/blog/posts.js`.

None of the code work forces a ranking — Search Console tells Google you exist, the on-page SEO makes sure it understands the content correctly, but **real visitors and real backlinks from step 4–5 are what actually move rankings.** Do 1 and 2 today (10 minutes total), then treat 4 as ongoing.

---

## 📜 License

Open-source under the MIT License.
