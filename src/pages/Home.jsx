import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

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
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-jade-50 via-surface to-[#FFE9E0]" />
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-jade/20 blur-3xl -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-10 -right-24 w-80 h-80 rounded-full bg-coral/15 blur-3xl -z-10"
          aria-hidden="true"
        />
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              data-hero-badge
              className="inline-flex items-center gap-2 bg-jade-50 text-jade font-body text-sm font-medium px-4 py-2 rounded-full mb-6"
            >
              Free. No account needed.
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
              className="font-body text-lg text-ink/60 mb-10 max-w-md"
            >
              Fill in a simple form, watch your resume take shape as you
              type, then download a polished PDF in one click.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                data-hero-cta
                to="/templates"
                className="font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
              >
                Create your resume
              </Link>
              <a
                data-hero-cta
                href="#features"
                className="font-body font-semibold text-ink px-7 py-3.5 rounded-full border border-ink/10 hover:border-ink/30 transition-colors"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Mockup built from the real builder's visual language */}
          <div ref={mockupRef} className="relative">
            <div className="rounded-3xl bg-white shadow-2xl shadow-ink/10 overflow-hidden border border-black/5">
              <div className="flex items-center gap-2 px-5 py-3 bg-surface border-b border-black/5">
                <span className="w-2.5 h-2.5 rounded-full bg-coral/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-jade/60" />
                <span className="font-body text-ink/40 text-xs ml-2">
                  Live preview
                </span>
              </div>
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
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-black/5 px-5 py-3 hidden sm:block">
              <p className="font-display font-bold text-ink text-sm">
                resume.pdf
              </p>
              <p className="text-ink/50 text-xs font-body">Ready to send</p>
            </div>
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
