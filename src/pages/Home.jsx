import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  LayoutGrid,
  Type,
  Palette,
  SlidersHorizontal,
  Download,
  Check,
  X,
  ArrowRight,
  Star,
  Search,
  Layers,
  Settings2,
  Zap,
  ShieldCheck,
  Heart,
  Eye,
  MousePointerClick,
  Lock,
  Target,
  PenLine,
  ListOrdered,
} from "lucide-react";
import { templates } from "../templates";
import { posts } from "../blog/posts";
import Footer from "../components/Footer";
import TemplatePreview from "../components/TemplatePreview";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import { useSEO, SITE_URL } from "../hooks/useSEO";

gsap.registerPlugin(ScrollTrigger);

const trustPoints = ["Free forever", "No sign-up", "Export as PDF"];

const heroStats = [
  { value: "9", label: "templates to pick from", icon: LayoutGrid },
  { value: "1-click", label: "PDF export", icon: Download },
  { value: "$0", label: "cost, always", icon: Heart },
];

const techStack = ["React", "Tailwind CSS", "GSAP", "React Router", "Vite"];

const atsAreas = [
  {
    icon: Search,
    title: "Clear Section Headings",
    body: "Standard labels like “Work Experience” and “Education” so parsing software never misreads your resume.",
  },
  {
    icon: ListOrdered,
    title: "Simple, Linear Layout",
    body: "No tables, text boxes, or multi-column tricks that scramble when a resume gets parsed into plain text.",
  },
  {
    icon: Type,
    title: "Readable Typography",
    body: "Web-safe fonts and consistent sizing so both software and hiring managers can scan it easily.",
  },
  {
    icon: LayoutGrid,
    title: "Logical Section Order",
    body: "Experience, education, and skills flow in the order recruiters expect to find them.",
  },
  {
    icon: Settings2,
    title: "Clean Export",
    body: "One-click PDF export keeps your formatting intact instead of collapsing into a jumbled text file.",
  },
];

const radarValues = [82, 70, 90, 75, 88];

const proofStats = [
  { icon: Zap, value: "Minutes", label: "from blank page to finished resume" },
  { icon: ShieldCheck, value: "100%", label: "ATS-safe formatting, every template" },
  { icon: Heart, value: "$0", label: "free forever, no hidden paywall" },
];

const previewFeatures = [
  {
    icon: Eye,
    title: "Live Preview As You Type",
    body: "Every field updates the resume on the right immediately — no refresh, no guessing what it'll look like.",
  },
  {
    icon: MousePointerClick,
    title: "Guided, Simple Form",
    body: "Add experience, education, and skills through a clean form instead of wrestling with a blank document.",
  },
  {
    icon: Download,
    title: "One-Click PDF Export",
    body: "When it looks right, download a polished, print-ready PDF instantly.",
  },
  {
    icon: Lock,
    title: "Nothing Saved, Nothing Tracked",
    body: "Your resume lives in your browser tab. No account, no server-side storage.",
  },
];

const toolCards = [
  {
    icon: Heart,
    title: "Free Forever",
    body: "Every template, every feature, no credit card and no watermark.",
    to: "/templates",
  },
  {
    icon: Eye,
    title: "Live Preview",
    body: "Watch your resume update the moment you type.",
    to: "/builder",
  },
  {
    icon: ShieldCheck,
    title: "ATS-Friendly Templates",
    body: "Clean layouts built to survive applicant tracking software.",
    to: "/templates",
  },
  {
    icon: Download,
    title: "One-Click PDF",
    body: "Export a polished, print-ready PDF in a single click.",
    to: "/builder",
  },
  {
    icon: Lock,
    title: "No Sign-Up Required",
    body: "Start building immediately — no account, no email, no wait.",
    to: "/builder",
  },
  {
    icon: Layers,
    title: "Nine Distinct Styles",
    body: "Nine distinct layouts — pick the style that fits you.",
    to: "/templates",
  },
];

const shortQuotes = [
  { quote: "Finally a resume builder that doesn't ask me to sign up first.", author: "— A." },
  { quote: "The live preview alone makes this worth using.", author: "— J." },
  { quote: "Clean templates that don't look like everyone else's.", author: "— R." },
];

const jobTitles = [
  "Software Engineer",
  "Marketing Manager",
  "Product Designer",
  "Data Analyst",
  "Customer Support",
  "Sales Associate",
];

const comparisonOurs = [
  "Free, unlimited use — no paywall on export",
  "Live preview while you type",
  "ATS-friendly formatting by default",
  "No account or sign-up required",
  "Simple, readable layouts — nothing hidden",
];

const comparisonOthers = [
  "Free plan often blocks PDF export",
  "Preview hidden behind a “generate” button",
  "Templates that can fight ATS parsing",
  "Forces account creation before you start",
  "Paywalls that appear right when you're ready to download",
];

const freeForeverList = [
  "Unlimited resumes, unlimited downloads",
  "All 9 templates unlocked from the start",
  "Full PDF export, no watermark",
  "No credit card, ever",
];

const testimonials = [
  {
    title: "Easiest resume I've ever made",
    body: "I filled in the form on my lunch break and had a finished PDF before I went back to my desk.",
    name: "Priya",
    country: "India",
  },
  {
    title: "Clean and uncluttered",
    body: "No pop-ups, no upsells, just a form and a nice-looking resume at the end.",
    name: "Daniel",
    country: "Canada",
  },
  {
    title: "Exactly what I needed",
    body: "I was dreading updating my resume. This made it almost enjoyable.",
    name: "Fatima",
    country: "UAE",
  },
  {
    title: "Templates actually look modern",
    body: "Most free builders look dated. These didn't.",
    name: "Lucas",
    country: "Brazil",
  },
  {
    title: "No sign-up, no nonsense",
    body: "I could start typing immediately instead of creating yet another account.",
    name: "Mei",
    country: "Singapore",
  },
  {
    title: "Worked on the first try",
    body: "The PDF export kept my formatting exactly as shown in the preview.",
    name: "Tom",
    country: "United Kingdom",
  },
];

const roadmapFeatures = [
  {
    icon: Target,
    title: "Track Application Progress",
    body: "You'll be able to move roles across To Apply, Applied, and Interview columns.",
  },
  {
    icon: Layers,
    title: "Stay Organized",
    body: "Keep every application in one place instead of scattered across tabs and notes.",
  },
  {
    icon: PenLine,
    title: "Add Notes & Reminders",
    body: "Jot quick notes on each application so nothing falls through the cracks.",
  },
];

const kanbanColumns = [
  {
    title: "To apply",
    dot: "bg-jade",
    border: "border-jade",
    cards: ["Software Engineer", "Product Designer"],
  },
  {
    title: "Applied",
    dot: "bg-violet",
    border: "border-violet",
    cards: ["Marketing Manager", "Data Analyst"],
  },
  {
    title: "Interview",
    dot: "bg-gold",
    border: "border-gold",
    cards: ["UX Researcher"],
  },
];

const RadarChart = ({ values = radarValues, size = 260 }) => {
  const center = size / 2;
  const radius = size / 2 - 28;
  const axes = values.length;
  const angleStep = (Math.PI * 2) / axes;

  const pointFor = (i, val) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const r = (val / 100) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };

  const ringPoints = (pct) =>
    Array.from({ length: axes }, (_, i) => pointFor(i, pct).join(",")).join(" ");

  const dataPoints = values.map((v, i) => pointFor(i, v).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-xs mx-auto">
      {[20, 40, 60, 80, 100].map((pct) => (
        <polygon
          key={pct}
          points={ringPoints(pct)}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: axes }).map((_, i) => {
        const [x, y] = pointFor(i, 100);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={dataPoints}
        fill="#14B8A6"
        fillOpacity="0.25"
        stroke="#14B8A6"
        strokeWidth="2"
      />
      {values.map((v, i) => {
        const [x, y] = pointFor(i, v);
        return <circle key={i} cx={x} cy={y} r="4" fill="#14B8A6" />;
      })}
    </svg>
  );
};

// Color schemes for the hero mockup's "Pick a style" swatches. Text colors
// are chosen per-scheme for contrast (dark text on light backgrounds, white
// text on dark ones) rather than a single fixed color for every swatch.
const mockupThemes = [
  {
    id: "dark",
    swatchClass: "bg-ink",
    accentBar: "#000000",
    headerBg: "#16181D",
    nameColor: "#ffffff",
    roleColor: "#5eead4",
    avatarBorder: "#5eead4",
    avatarBg: "#2a2d35",
    cardBg: "#20232a",
    cardLabelColor: "#9ca3af",
    cardHeadingColor: "#ffffff",
    cardBarColor: "#3a3f4a",
    sidebarBg: "#0d0e11",
    sidebarLabelColor: "#ffffff",
    sidebarBarColor: "#3a3f4a",
  },
  {
    id: "gold",
    swatchClass: "bg-[#fdd147]",
    accentBar: "#85680e",
    headerBg: "#fee28a",
    nameColor: "#423306",
    roleColor: "#85680e",
    avatarBorder: "#a17c07",
    avatarBg: "#fff4d6",
    cardBg: "#fef0c3",
    cardLabelColor: "#8a7a4a",
    cardHeadingColor: "#423306",
    cardBarColor: "#e9d9a3",
    sidebarBg: "#fdd147",
    sidebarLabelColor: "#715a12",
    sidebarBarColor: "#f0c94f",
  },
  {
    id: "white",
    swatchClass: "bg-[#f3f4f6] border-2 border-ink/10",
    accentBar: "#e5e7eb",
    headerBg: "#ffffff",
    nameColor: "#16181D",
    roleColor: "#6b7280",
    avatarBorder: "#e5e7eb",
    avatarBg: "#f3f4f6",
    cardBg: "#f9fafb",
    cardLabelColor: "#9ca3af",
    cardHeadingColor: "#16181D",
    cardBarColor: "#e5e7eb",
    sidebarBg: "#f3f4f6",
    sidebarLabelColor: "#374151",
    sidebarBarColor: "#d1d5db",
  },
];

const StarRow = ({ count = 5 }) => (
  <div className="flex items-center gap-0.5" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-gold text-gold" strokeWidth={0} />
    ))}
  </div>
);

const Home = () => {
  const heroRef = useRef(null);
  const mockupRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[1].id);
  const [mockupThemeId, setMockupThemeId] = useState("dark");
  const mockupTheme =
    mockupThemes.find((t) => t.id === mockupThemeId) || mockupThemes[0];

  useSEO({
    title: "resumebuilder — Free Resume Builder & ATS-Friendly Templates",
    description:
      "Build a polished, ATS-friendly resume in minutes with 9 free templates, live preview, and one-click PDF export. No sign-up required.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "resumebuilder",
      url: SITE_URL,
    },
  });

  const activeTemplate =
    templates.find((t) => t.id === selectedTemplate) || templates[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis;
    if (!prefersReducedMotion) {
      lenis = new Lenis({ lerp: 0.1 });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-badge]", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          "[data-hero-heading]",
          { opacity: 0, y: 24, duration: 0.8 },
          "-=0.35"
        )
        .from(
          "[data-hero-sub]",
          { opacity: 0, y: 16, duration: 0.6 },
          "-=0.5"
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          mockupRef.current,
          { opacity: 0, y: 40, scale: 0.96, duration: 0.9 },
          "-=0.6"
        );

      gsap.to(mockupRef.current, {
        y: -14,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, heroRef);

    return () => {
      ctx.revert();
      lenis?.destroy();
    };
  }, []);

  return (
    <div ref={heroRef} className="bg-surface overflow-x-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-jade-50 via-surface to-violet/10" />
        <div
          className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-jade/25 blur-3xl -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 -right-24 w-96 h-96 rounded-full bg-violet/15 blur-3xl -z-10"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-24 md:pt-20 md:pb-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div data-hero-badge className="flex items-center gap-2 mb-4">
              <StarRow />
              <span className="font-body text-sm text-ink/50">
                Loved by everyone tired of formatting resumes by hand
              </span>
            </div>
            <div
              data-hero-badge
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6"
            >
              {trustPoints.map((point, i) => (
                <span
                  key={point}
                  className="flex items-center gap-1.5 font-body text-sm text-ink/70"
                >
                  <Check className="w-4 h-4 text-jade shrink-0" strokeWidth={3} />
                  {point}
                  {i < trustPoints.length - 1 && (
                    <span className="text-ink/20 ml-1.5">·</span>
                  )}
                </span>
              ))}
            </div>
            <h1
              data-hero-heading
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
            >
              Build a resume that gets you the{" "}
              <span className="text-jade">interview</span>
            </h1>
            <p
              data-hero-sub
              className="font-body text-lg text-ink/60 mb-8 max-w-md"
            >
              Fill in a simple form, watch your resume take shape as you
              type, then download a polished PDF in one click.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <Link
                data-hero-cta
                to="/templates"
                className="inline-flex items-center gap-2 font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
              >
                Create Your Resume
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                data-hero-cta
                href="#features"
                className="font-body font-semibold text-ink px-7 py-3.5 rounded-full border border-ink/10 hover:border-ink/30 transition-colors"
              >
                See How It Works
              </a>
            </div>
            <p data-hero-cta className="font-body text-sm text-ink/40 mb-10">
              No sign-up. No credit card. Just a finished resume.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  data-hero-cta
                  className="relative bg-white rounded-xl border border-black/5 shadow-sm px-3 py-4"
                >
                  <stat.icon className="w-4 h-4 text-jade absolute top-3 right-3" />
                  <p className="font-display font-bold text-ink text-lg leading-none mb-1.5">
                    {stat.value}
                  </p>
                  <p className="font-body text-ink/50 text-xs leading-snug pr-4">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup built from the real builder's visual language */}
          <div
            ref={mockupRef}
            className="relative md:rotate-1 md:scale-105 lg:translate-x-6"
          >
            <div className="rounded-3xl bg-ink shadow-2xl shadow-ink/30 overflow-hidden border border-black/5 p-2.5">
              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-3 text-white/50">
                  <LayoutGrid className="w-4 h-4" strokeWidth={2} />
                  <Type className="w-4 h-4" strokeWidth={2} />
                  <Palette className="w-4 h-4" strokeWidth={2} />
                  <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-1.5 bg-jade text-ink font-body font-semibold text-xs px-3 py-1.5 rounded-full">
                  <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
                  Download
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden transition-colors duration-300">
                <div
                  className="h-[3px] transition-colors duration-300"
                  style={{ backgroundColor: mockupTheme.accentBar }}
                />
                <div
                  className="flex items-center justify-between px-6 py-5 transition-colors duration-300"
                  style={{ backgroundColor: mockupTheme.headerBg }}
                >
                  <div>
                    <p
                      className="font-display font-bold text-lg transition-colors duration-300"
                      style={{ color: mockupTheme.nameColor }}
                    >
                      Muhammad Khalid Hussain
                    </p>
                    <p
                      className="text-sm font-body transition-colors duration-300"
                      style={{ color: mockupTheme.roleColor }}
                    >
                      Software Engineer
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full border-2 transition-colors duration-300"
                    style={{
                      borderColor: mockupTheme.avatarBorder,
                      backgroundColor: mockupTheme.avatarBg,
                    }}
                  />
                </div>
                <div className="flex">
                  <div className="flex-1 p-5 space-y-3">
                    <div
                      className="rounded-xl p-3 transition-colors duration-300"
                      style={{ backgroundColor: mockupTheme.cardBg }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-wide font-body transition-colors duration-300"
                        style={{ color: mockupTheme.cardLabelColor }}
                      >
                        Experience
                      </p>
                      <p
                        className="font-display font-semibold text-sm transition-colors duration-300"
                        style={{ color: mockupTheme.cardHeadingColor }}
                      >
                        Frontend Engineer
                      </p>
                      <div
                        className="mt-1.5 h-1.5 w-4/5 rounded transition-colors duration-300"
                        style={{ backgroundColor: mockupTheme.cardBarColor }}
                      />
                    </div>
                    <div
                      className="rounded-xl p-3 transition-colors duration-300"
                      style={{ backgroundColor: mockupTheme.cardBg }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-wide font-body transition-colors duration-300"
                        style={{ color: mockupTheme.cardLabelColor }}
                      >
                        Education
                      </p>
                      <div
                        className="mt-1.5 h-1.5 w-3/5 rounded transition-colors duration-300"
                        style={{ backgroundColor: mockupTheme.cardBarColor }}
                      />
                    </div>
                  </div>
                  <div
                    className="w-28 p-4 transition-colors duration-300"
                    style={{ backgroundColor: mockupTheme.sidebarBg }}
                  >
                    <p
                      className="font-display font-bold text-xs mb-2 transition-colors duration-300"
                      style={{ color: mockupTheme.sidebarLabelColor }}
                    >
                      Skills
                    </p>
                    <div className="space-y-1.5">
                      <div
                        className="h-1.5 rounded transition-colors duration-300"
                        style={{ backgroundColor: mockupTheme.sidebarBarColor }}
                      />
                      <div
                        className="h-1.5 w-4/5 rounded transition-colors duration-300"
                        style={{ backgroundColor: mockupTheme.sidebarBarColor }}
                      />
                      <div
                        className="h-1.5 w-3/5 rounded transition-colors duration-300"
                        style={{ backgroundColor: mockupTheme.sidebarBarColor }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl border border-black/5 px-5 py-4 hidden sm:block">
              <p className="font-body text-ink/40 text-[11px] uppercase tracking-wide mb-2.5">
                Pick a style
              </p>
              <div className="flex gap-2">
                {mockupThemes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setMockupThemeId(theme.id)}
                    aria-label={`Preview the ${theme.id} style`}
                    aria-pressed={mockupThemeId === theme.id}
                    className={`w-7 h-7 rounded-lg border-2 border-white transition-shadow ${theme.swatchClass} ${
                      mockupThemeId === theme.id ? "ring-2 ring-jade" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack strip */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/35 mb-6">
            Built in the open with
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-display font-semibold text-ink/30 text-xl"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Template showcase */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <span
            data-reveal
            className="block w-10 h-1.5 rounded-full bg-jade mb-6"
          />
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink mb-4 max-w-2xl"
          >
            Professional Resume Templates for Every Style
          </h2>
          <p
            data-reveal
            className="font-body text-ink/60 max-w-2xl mb-8 leading-relaxed"
          >
            Pick a look that fits your career path, then customize every
            section with your own content. Every template is free and built
            to pass applicant tracking systems.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {templates.map(({ id, name, description, component: Template }) => (
              <div
                key={id}
                data-reveal
                className="bg-white rounded-2xl border border-black/5 overflow-hidden flex flex-col"
              >
                <div className="h-56 overflow-hidden bg-surface pointer-events-none">
                  <TemplatePreview Template={Template} />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-ink text-lg mb-1">
                    {name}
                  </h3>
                  <p className="font-body text-ink/60 text-sm">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link
              to="/templates"
              className="font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
            >
              Browse All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* ATS friendly */}
      <section id="features" className="px-6 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
            <h2
              data-reveal
              className="font-display font-bold text-3xl md:text-4xl text-ink mb-8 leading-tight"
            >
              What Makes a Resume ATS-Friendly?
            </h2>
            <div className="divide-y divide-ink/10">
              {atsAreas.map((area) => (
                <div
                  key={area.title}
                  data-reveal
                  className="flex items-start gap-4 py-4"
                >
                  <area.icon className="w-5 h-5 text-jade shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display font-semibold text-ink mb-1">
                      {area.title}
                    </p>
                    <p className="font-body text-ink/60 text-sm leading-relaxed">
                      {area.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/builder"
              className="inline-block mt-8 font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
            >
              Start Your Resume
            </Link>
          </div>
          <div data-reveal className="bg-surface rounded-3xl p-10">
            <RadarChart />
            <p className="text-center font-body text-ink/40 text-xs mt-4">
              Illustrative breakdown of what we optimize for
            </p>
          </div>
        </div>
      </section>

      {/* Proof stats */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto bg-jade-50 rounded-3xl grid sm:grid-cols-3 gap-6 p-8 md:p-10">
          {proofStats.map((stat) => (
            <div key={stat.label} data-reveal className="text-center sm:text-left">
              <stat.icon className="w-6 h-6 text-jade mb-3 mx-auto sm:mx-0" />
              <p className="font-display font-extrabold text-ink text-3xl mb-1.5">
                {stat.value}
              </p>
              <p className="font-body text-ink/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live preview feature */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
            <h2
              data-reveal
              className="font-display font-bold text-3xl md:text-4xl text-ink mb-3 leading-tight"
            >
              See Your Resume Come Together in Real Time
            </h2>
            <p data-reveal className="font-body text-ink/50 mb-8">
              powered by a live preview that actually works
            </p>
            <div className="divide-y divide-ink/10 mb-8">
              {previewFeatures.map((feature) => (
                <div
                  key={feature.title}
                  data-reveal
                  className="flex items-start gap-4 py-4"
                >
                  <feature.icon className="w-5 h-5 text-jade shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display font-semibold text-ink mb-1">
                      {feature.title}
                    </p>
                    <p className="font-body text-ink/60 text-sm leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/builder"
              className="inline-block font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
            >
              Try the Builder
            </Link>
          </div>
          <div data-reveal className="rounded-3xl bg-white border border-black/5 shadow-xl p-6">
            <p className="text-xs uppercase tracking-wide text-ink/40 mb-3 font-body">
              You type
            </p>
            <div className="rounded-xl bg-surface border border-black/5 p-4 font-body text-sm text-ink/70 mb-6">
              “Frontend Engineer at Acme Co., 2023–Present. Built and
              shipped customer-facing features.”
            </div>
            <div className="flex justify-center mb-6">
              <ArrowRight className="w-5 h-5 text-jade rotate-90" />
            </div>
            <p className="text-xs uppercase tracking-wide text-ink/40 mb-3 font-body">
              Your resume updates instantly
            </p>
            <div className="rounded-xl bg-jade-50 p-4">
              <p className="font-display font-semibold text-ink text-sm">
                Frontend Engineer
              </p>
              <p className="font-body text-jade text-xs mb-1">
                Acme Co. · 2023–Present
              </p>
              <p className="font-body text-ink/60 text-xs">
                Built and shipped customer-facing features across the web
                app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance banner */}
      <section className="px-6 pb-16">
        <div
          data-reveal
          className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-jade-50 via-white to-violet/10 border border-black/5 px-8 py-10 text-center"
        >
          <p className="font-display font-semibold text-ink text-xl md:text-2xl">
            No paywalls. No hidden fees. No account required.
          </p>
          <p className="font-body text-ink/50 mt-2">
            Just a resume builder that respects your time.
          </p>
        </div>
      </section>

      {/* Tool grid */}
      <section className="px-6 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink mb-14 max-w-2xl"
          >
            Everything You Need, Nothing You Don&apos;t
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {toolCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                data-reveal
                className="block bg-surface rounded-2xl p-8 hover:bg-jade-50 transition-colors"
              >
                <card.icon className="w-6 h-6 text-jade mb-4" />
                <h3 className="font-display font-semibold text-ink text-lg mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-ink/60 text-sm leading-relaxed">
                  {card.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scattered quotes */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink text-center mb-14"
          >
            A Few Kind Words
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {shortQuotes.map((q, i) => (
              <div
                key={q.author}
                data-reveal
                className={`font-body ${i === 1 ? "md:mt-10" : i === 2 ? "md:-mt-4" : ""}`}
              >
                <span className="text-3xl text-jade leading-none">“</span>
                <p className="text-ink/70 text-lg leading-relaxed mb-2">
                  {q.quote}
                </p>
                <p className="text-ink/40 text-sm font-semibold">{q.author}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="text-center">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/35 mb-6">
              Built for every career path
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {jobTitles.map((title) => (
                <span
                  key={title}
                  className="font-body text-sm text-ink/60 bg-surface border border-black/5 px-4 py-2 rounded-full"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink mb-14"
          >
            Our Resume Builder Is Just Better
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div data-reveal className="bg-jade-50 rounded-2xl p-8">
              <p className="font-display font-bold text-ink text-lg mb-6">
                resumebuilder
              </p>
              <ul className="space-y-4">
                {comparisonOurs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-jade shrink-0 mt-0.5" />
                    <span className="font-body text-ink/70 text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal className="bg-surface rounded-2xl p-8">
              <p className="font-display font-bold text-ink/50 text-lg mb-6">
                other resume builders
              </p>
              <ul className="space-y-4">
                {comparisonOthers.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-ink/30 shrink-0 mt-0.5" />
                    <span className="font-body text-ink/50 text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to="/templates"
              className="font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      {/* ATS success */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div data-reveal className="order-2 md:order-1 h-64 overflow-hidden bg-white rounded-3xl border border-black/5 shadow-sm">
            <TemplatePreview Template={templates[0].component} scale={0.34} />
          </div>
          <div className="order-1 md:order-2">
            <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
            <h2
              data-reveal
              className="font-display font-bold text-3xl md:text-4xl text-ink mb-3 leading-tight"
            >
              Built With ATS-Friendly Formatting
            </h2>
            <p data-reveal className="font-body text-ink/50 mb-6">
              built to be read by both humans and software
            </p>
            <p data-reveal className="font-body text-ink/60 leading-relaxed mb-4">
              <span className="font-semibold text-ink">
                You shouldn&apos;t have to choose between a resume that looks good
                and one that gets parsed correctly.
              </span>{" "}
              Every template here uses simple, semantic layouts — no text
              boxes, no tables, no columns that confuse tracking software.
            </p>
            <Link
              to="/templates"
              className="inline-block font-body font-semibold text-ink px-7 py-3.5 rounded-full border border-ink/10 hover:border-ink/30 transition-colors"
            >
              Explore Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Free forever */}
      <section id="free" className="px-6 py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink mb-4"
          >
            Free Forever, No Catches
          </h2>
          <p data-reveal className="font-body text-ink/60 mb-10">
            Unlike builders that paywall the download button, everything
            here is unlocked from the start.
          </p>
          <div data-reveal className="bg-jade-50 rounded-3xl p-8 md:p-10 text-left grid sm:grid-cols-2 gap-4 mb-8">
            {freeForeverList.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-jade shrink-0 mt-0.5" />
                <span className="font-body text-ink/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <Link
            to="/builder"
            className="inline-block font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
          >
            Start Building
          </Link>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink mb-14"
          >
            Trusted By Job Seekers Everywhere
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                data-reveal
                className="bg-white rounded-2xl border border-black/5 p-6"
              >
                <StarRow />
                <p className="font-display font-semibold text-ink mt-3 mb-2">
                  {t.title}
                </p>
                <p className="font-body text-ink/60 text-sm leading-relaxed mb-4">
                  {t.body}
                </p>
                <p className="font-body text-ink/40 text-sm">
                  {t.name}, {t.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See it in action */}
      <section id="examples" className="px-6 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink mb-3"
          >
            See It In Action
          </h2>
          <p data-reveal className="font-body text-ink/60 mb-12 max-w-xl">
            Pick a style and see a full example instantly.
          </p>
          <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
            <div data-reveal className="bg-surface rounded-2xl p-3 flex md:flex-col gap-2 overflow-x-auto">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`shrink-0 text-left font-body text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${
                    selectedTemplate === tpl.id
                      ? "bg-jade text-white"
                      : "text-ink/60 hover:bg-white"
                  }`}
                >
                  {tpl.name}
                </button>
              ))}
              <Link
                to={`/builder?template=${activeTemplate.id}`}
                className="hidden md:block mt-4 text-center font-body font-semibold text-sm border border-jade/40 text-jade px-4 py-3 rounded-xl hover:bg-jade/5 transition-colors"
              >
                Use This Template
              </Link>
            </div>
            <div data-reveal className="h-[420px] overflow-hidden bg-surface rounded-2xl border border-black/5 shadow-sm">
              <TemplatePreview
                Template={activeTemplate.component}
                scale={0.46}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Career tips */}
      <section id="tips" className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <span className="block w-10 h-1.5 rounded-full bg-jade mb-6" />
          <h2
            data-reveal
            className="font-display font-bold text-3xl md:text-4xl text-ink mb-3"
          >
            Career Tips to Help You Get Hired
          </h2>
          <p data-reveal className="font-body text-ink/60 mb-12 max-w-xl">
            A few quick reads while your resume comes together.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                data-reveal
                className="block bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`h-32 bg-gradient-to-br ${post.gradient}`} />
                <div className="p-6">
                  <h3 className="font-display font-semibold text-ink text-lg mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-body text-ink/60 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              to="/blog"
              className="font-body font-semibold text-ink px-7 py-3.5 rounded-full border border-ink/10 hover:border-ink/30 transition-colors"
            >
              Explore All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Roadmap: job tracker */}
      <section id="roadmap" className="px-6 py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.15em] text-jade bg-jade-50 px-3 py-1.5 rounded-full mb-6">
              Coming soon
            </span>
            <h2
              data-reveal
              className="font-display font-bold text-3xl md:text-4xl text-ink mb-3 leading-tight"
            >
              Organize Your Job Hunt Easily
            </h2>
            <p data-reveal className="font-body text-ink/50 mb-8">
              A Kanban-style tracker is on the roadmap. Here&apos;s a sneak
              peek at what&apos;s planned.
            </p>
            <div className="divide-y divide-ink/10">
              {roadmapFeatures.map((feature) => (
                <div
                  key={feature.title}
                  data-reveal
                  className="flex items-start gap-4 py-4"
                >
                  <feature.icon className="w-5 h-5 text-jade shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display font-semibold text-ink mb-1">
                      {feature.title}
                    </p>
                    <p className="font-body text-ink/60 text-sm leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="flex gap-4 overflow-x-auto pb-2">
            {kanbanColumns.map((col) => (
              <div
                key={col.title}
                className="bg-ink rounded-2xl p-4 w-56 shrink-0"
              >
                <p className="font-display font-semibold text-white text-sm mb-3">
                  {col.title}
                </p>
                <div className="space-y-2">
                  {col.cards.map((card) => (
                    <div
                      key={card}
                      className={`bg-white rounded-lg p-3 border-l-4 ${col.border}`}
                    >
                      <span className={`inline-block w-2 h-2 rounded-full ${col.dot} mb-1.5`} />
                      <p className="font-body text-ink text-xs font-semibold">
                        {card}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 pb-24 pt-4">
        <div data-reveal className="max-w-6xl mx-auto bg-ink rounded-3xl px-8 py-16 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Your next job starts with a resume
          </h2>
          <p className="font-body text-white/60 mb-8 max-w-md mx-auto">
            It takes a few minutes to fill in, and you&apos;ll have a
            finished PDF before you know it.
          </p>
          <Link
            to="/builder"
            className="inline-block font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
          >
            Create your resume
          </Link>

          <div className="flex items-center justify-center gap-3 mt-10 pt-8 border-t border-white/10">
            <p className="font-body text-white/40 text-sm">
              Built by{" "}
              <a
                href="https://www.linkedin.com/in/muhammad-khalid-hussain-384752202/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
              >
                Muhammad Khalid Hussain
              </a>
            </p>
            <a
              href="https://www.linkedin.com/in/muhammad-khalid-hussain-384752202/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/mkhalidh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/40 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
