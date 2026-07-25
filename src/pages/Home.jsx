import { useEffect, useRef } from "react";
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
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const trustPoints = ["Free forever", "No sign-up", "Export as PDF"];

const heroStats = [
  { value: "3", label: "templates to pick from" },
  { value: "1-click", label: "PDF export" },
  { value: "$0", label: "cost, always" },
];

const builtWith = ["React", "Tailwind CSS", "GSAP", "Vite"];

const features = [
  {
    title: "Live preview",
    body: "Every field you fill updates the document on the right instantly, so you always see the resume you're actually sending.",
  },
  {
    title: "One-click PDF",
    body: "Export a print-ready PDF the moment you're happy with it. No formatting to fix, no layout to fight.",
  },
  {
    title: "No sign-up",
    body: "Start building right away. No account, no email, no paywall between you and a finished resume.",
  },
];

const Home = () => {
  const heroRef = useRef(null);
  const mockupRef = useRef(null);
  const featuresRef = useRef(null);

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

      gsap.from("[data-feature-card]", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      });
    }, heroRef);

    return () => {
      ctx.revert();
      lenis?.destroy();
    };
  }, []);

  return (
    <div ref={heroRef} className="bg-surface">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-jade-50 via-surface to-[#FFE4DA]" />
        <div
          className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-jade/25 blur-3xl -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 -right-24 w-96 h-96 rounded-full bg-coral/20 blur-3xl -z-10"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-24 md:pt-20 md:pb-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
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
                Create your resume
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                data-hero-cta
                href="#features"
                className="font-body font-semibold text-ink px-7 py-3.5 rounded-full border border-ink/10 hover:border-ink/30 transition-colors"
              >
                See how it works
              </a>
            </div>
            <p
              data-hero-cta
              className="font-body text-sm text-ink/40 mb-10"
            >
              No sign-up. No credit card. Just a finished resume.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  data-hero-cta
                  className="bg-white rounded-xl border border-black/5 shadow-sm px-3 py-4"
                >
                  <p className="font-display font-bold text-ink text-lg leading-none mb-1.5">
                    {stat.value}
                  </p>
                  <p className="font-body text-ink/50 text-xs leading-snug">
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
              {/* Editor toolbar */}
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

              {/* Resume canvas */}
              <div className="rounded-2xl bg-white overflow-hidden">
                <div className="bg-[#85680e] h-[3px]" />
                <div className="flex items-center justify-between bg-[#fee28a] px-6 py-5">
                  <div>
                    <p className="font-display font-bold text-[#423306] text-lg">
                      Muhammad Khalid Hussain
                    </p>
                    <p className="text-[#85680e] text-sm font-body">
                      Software Engineer
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[#a17c07] bg-[#fff4d6]" />
                </div>
                <div className="flex">
                  <div className="flex-1 p-5 space-y-3">
                    <div className="rounded-xl bg-[#fef0c3] p-3">
                      <p className="text-[10px] uppercase tracking-wide text-gray-500 font-body">
                        Experience
                      </p>
                      <p className="text-[#423306] font-display font-semibold text-sm">
                        Frontend Engineer
                      </p>
                      <div className="mt-1.5 h-1.5 w-4/5 rounded bg-[#e9d9a3]" />
                    </div>
                    <div className="rounded-xl bg-[#fef0c3] p-3">
                      <p className="text-[10px] uppercase tracking-wide text-gray-500 font-body">
                        Education
                      </p>
                      <div className="mt-1.5 h-1.5 w-3/5 rounded bg-[#e9d9a3]" />
                    </div>
                  </div>
                  <div className="w-28 bg-[#fdd147] p-4">
                    <p className="text-[#715a12] font-display font-bold text-xs mb-2">
                      Skills
                    </p>
                    <div className="space-y-1.5">
                      <div className="h-1.5 rounded bg-[#f0c94f]" />
                      <div className="h-1.5 w-4/5 rounded bg-[#f0c94f]" />
                      <div className="h-1.5 w-3/5 rounded bg-[#f0c94f]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating template-picker panel, echoing the editor's "swatches" affordance */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl border border-black/5 px-5 py-4 hidden sm:block">
              <p className="font-body text-ink/40 text-[11px] uppercase tracking-wide mb-2.5">
                Pick a style
              </p>
              <div className="flex gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#fdd147] border-2 border-white ring-2 ring-jade" />
                <span className="w-7 h-7 rounded-lg bg-ink border-2 border-white" />
                <span className="w-7 h-7 rounded-lg bg-white border-2 border-ink/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built with */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-ink/35 mb-6">
            Built in the open with
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {builtWith.map((tech) => (
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

      {/* Features */}
      <section id="features" ref={featuresRef} className="px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink text-center mb-16">
            Everything you need, nothing you don&apos;t
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                data-feature-card
                className="bg-jade-50 rounded-2xl p-8"
              >
                <h3 className="font-display font-semibold text-xl text-ink mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-ink/60 leading-relaxed">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto bg-ink rounded-3xl px-8 py-16 text-center">
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
        </div>
      </section>

      <footer className="px-6 py-8 border-t border-ink/5">
        <p className="text-center text-ink/40 text-sm font-body">
          Built with React, Tailwind, and GSAP.
        </p>
      </footer>
    </div>
  );
};

export default Home;
