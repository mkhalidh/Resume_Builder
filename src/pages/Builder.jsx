import { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import { useSearchParams, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumeForm from "../components/form/ResumeForm";
import JobMatchPanel from "../components/JobMatchPanel";
import { getTemplate } from "../templates";
import { useSEO } from "../hooks/useSEO";
import {
  computePageBreaks,
  measureResumeMm,
  measureLinkRectsMm,
} from "../lib/computePageBreaks";

// Templates are built assuming a fixed desktop-width page (fixed sidebar/column
// widths in px), so on a narrow phone screen they'd otherwise just squish into
// whatever the viewport width is. Rendering at this native width and shrinking
// with CSS zoom (which — unlike transform: scale — affects layout, so the
// wrapper naturally collapses to the right size) keeps the exact same
// proportions as the desktop preview, just smaller.
const PREVIEW_NATIVE_WIDTH = 900;

const Builder = () => {
  const [searchParams] = useSearchParams();
  const template = getTemplate(searchParams.get("template"));
  const Template = template.component;

  useSEO({
    title: `Build Your Resume with the ${template.name} Template | resumebuilder`,
    description:
      "Fill in a simple form, watch your resume update live, then export a polished PDF in one click. Free, no sign-up required.",
    path: "/builder",
  });

  const [resumeData, setResumeData] = useState({
    name: "",
    designation: "",
    image: null,
    contact: { email: "", phone: "", linkedin: "", github: "" },
    experiences: [
      { mainHeading: "", companyName: "", date: "", description: "" },
    ],
    projects: [{ mainHeading: "", date: "", description: "", link: "" }],
    education: [{ mainHeading: "", schoolName: "", date: "" }],
    certifications: [{ mainHeading: "", issuer: "", date: "" }],
    sectionOrder: ["experience", "projects", "education", "certifications"],
    rightSidebar: { skills: [""], tools: [""], languages: [""] },
  });

  const resumeRef = useRef(); // Reference to the resume container
  const previewWrapperRef = useRef(); // Measures available width for scaling
  const [scale, setScale] = useState(1);
  const [showJobMatch, setShowJobMatch] = useState(false);
  // Internal page-break Y positions (mm from the top), so the preview can
  // show exactly where the PDF export would split — computed with the same
  // function handleDownload uses, so the two never disagree.
  const [pageBreaksMm, setPageBreaksMm] = useState([]);

  useLayoutEffect(() => {
    const el = previewWrapperRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      setScale(width > 0 ? Math.min(width / PREVIEW_NATIVE_WIDTH, 1) : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imageUrl = useMemo(
    () =>
      resumeData.image ? URL.createObjectURL(resumeData.image) : "/photo.png",
    [resumeData.image]
  );

  useEffect(() => {
    let cancelled = false;

    const recompute = async () => {
      await document.fonts.ready.catch(() => {});
      // Let layout settle after the DOM update before measuring.
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      );
      if (cancelled || !resumeRef.current) return;

      const { headingTopsMm, totalHeightMm } = measureResumeMm(
        resumeRef.current
      );
      const breaks = computePageBreaks({ headingTopsMm, totalHeightMm });
      setPageBreaksMm(breaks.slice(1, -1)); // internal breaks only
    };

    recompute();
    return () => {
      cancelled = true;
    };
  }, [resumeData, imageUrl]);

  const handleFormSubmit = (values) => {
    // React batches this update and re-renders asynchronously by default —
    // if "Download Resume" gets clicked quickly after "Update Preview", the
    // download could start before the DOM actually reflects the new data,
    // capturing a stale or half-updated resume (confirmed: this produced
    // both a near-empty capture and a partially-old one in testing).
    // flushSync forces the re-render to complete synchronously before this
    // handler returns, so any later click is guaranteed to see current data.
    flushSync(() => {
      setResumeData(values);
    });
  };

  const handleDownload = async () => {
    const input = resumeRef.current;

    // html2canvas measures and lays out text itself rather than screenshotting
    // pixels — if the Poppins/Inter webfonts haven't finished loading yet, it
    // measures with fallback font metrics while the visible font-size is still
    // correct, producing mismatched wrapping/spacing (oversized-looking,
    // garbled headings) only in the exported file. Waiting here, with a short
    // timeout as a safety net in case the fonts.ready promise never settles,
    // avoids that race.
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);

    // fonts.ready resolving doesn't guarantee the browser has already
    // repainted with the new metrics on the very next tick — html2canvas
    // can still measure text mid-reflow, which shows up as squished words
    // (missing spaces) or dropped punctuation right at a line-wrap point.
    // Waiting two animation frames ensures a full layout+paint pass has
    // actually happened first.
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    // Measured on the live DOM, before capture — section headings (every
    // template uses h2/h3 for these) mark points a page break should avoid
    // landing just after. Without this, a heading like "Education" can end
    // up alone at the very bottom of a page while its content spills onto
    // an otherwise-empty next page, reading as if the section vanished.
    // The same function drives the live preview's page-break indicator, so
    // the two always agree on where a break will fall.
    const { headingTopsMm } = measureResumeMm(input);
    // The flattened export image has no real hyperlinks — these positions
    // are used below to overlay actual clickable jsPDF link annotations at
    // the same spots the visible contact/project links landed on-screen.
    const linkRects = measureLinkRectsMm(input);

    html2canvas(input, {
      // Many displays report devicePixelRatio 1, which produces a soft/blurry
      // PDF once a viewer zooms in — flooring this at 2 keeps the exported
      // image crisp regardless of the exporting device's actual DPR.
      scale: Math.max(window.devicePixelRatio, 2),
      useCORS: true,
      // html2canvas's default renderer re-measures and re-draws text itself,
      // and its cloned capture document doesn't reliably pick up the
      // Poppins/Inter @font-face rules loaded from Google Fonts — it silently
      // falls back to a system font for the whole capture (wrong letterforms,
      // and punctuation landing in the wrong spot since the fallback font's
      // metrics don't match). foreignObjectRendering paints through the
      // browser's own SVG renderer instead, using the fonts exactly as they
      // already appear on screen.
      foreignObjectRendering: true,
      logging: false,
      scrollX: 0, // Prevents unwanted horizontal scroll issues
      scrollY: 0,
      backgroundColor: "#ffffff", // html2canvas's own background auto-detection is unreliable
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      const breaks = computePageBreaks({
        headingTopsMm,
        totalHeightMm: imgHeight,
      });

      // A short trailing page (e.g. just an Education section pushed onto
      // its own page) can end up wider than it is tall — jsPDF silently
      // swaps width/height to match a forced "portrait" orientation in that
      // case, corrupting the page into a tall, narrow strip instead of the
      // intended short, wide one. Passing the orientation that actually
      // matches each page's real shape avoids that swap entirely.
      const orientationFor = (height) => (height >= pageWidth ? "p" : "l");

      // Page 1 naturally starts with the template's own top padding (it's
      // part of the captured image). A page 2+ is just a raw slice starting
      // mid-content, so without this it has zero breathing room at the top
      // — content butts right up against the physical page edge, unlike
      // every other page. Adding a synthetic top margin there matches the
      // feel of page 1's real padding.
      //
      // addImage always draws the *entire* image starting at the given Y —
      // there's no way to tell it "start drawing partway down". Shifting the
      // image down to make room for a margin doesn't create blank space, it
      // just reveals more of the image *above* pageTop — i.e. the tail end
      // of the previous page, duplicated. So the image still gets placed at
      // its normal position; a white rectangle painted over the margin band
      // afterward is what actually hides that overlap and reads as margin.
      const CONTINUATION_TOP_MARGIN = 12;

      const firstPageHeight = breaks[1] - breaks[0];
      const pdf = new jsPDF({
        unit: "mm",
        format: [pageWidth, firstPageHeight],
        orientation: orientationFor(firstPageHeight),
      });

      for (let i = 0; i < breaks.length - 1; i++) {
        const pageTop = breaks[i];
        const topMargin = i > 0 ? CONTINUATION_TOP_MARGIN : 0;
        const thisPageHeight = breaks[i + 1] - pageTop + topMargin;
        if (i > 0) {
          pdf.addPage([pageWidth, thisPageHeight], orientationFor(thisPageHeight));
        }
        pdf.addImage(imgData, "PNG", 0, -pageTop + topMargin, pageWidth, imgHeight);
        if (topMargin > 0) {
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, pageWidth, topMargin, "F");
        }

        const pageBottom = breaks[i + 1];
        linkRects
          .filter((link) => link.yMm >= pageTop && link.yMm < pageBottom)
          .forEach((link) => {
            pdf.link(
              link.xMm,
              link.yMm - pageTop + topMargin,
              link.widthMm,
              link.heightMm,
              { url: link.href }
            );
          });
      }

      pdf.save("resume.pdf");

      // The actual conversion for this app — GA4 doesn't count anything as a
      // "key event" unless a real event fires for it (page_view alone won't
      // do), so this is what gets marked as the key event in GA4 admin.
      if (typeof window.gtag === "function") {
        window.gtag("event", "resume_download", {
          template_name: template.name,
        });
      }
    });
  };

  return (
    <div className="bg-surface min-h-screen overflow-x-hidden">
      <div className="flex flex-col justify-center items-center pt-14 pb-8 px-6">
        <p className="font-body text-jade text-sm font-medium mb-2">
          {template.name} template ·{" "}
          <Link to="/templates" className="underline hover:no-underline">
            change
          </Link>
        </p>
        <h1 className="font-display font-extrabold text-4xl text-ink mb-8">
          Build your resume
        </h1>
        <div className="w-full max-w-3xl">
          <ResumeForm onSubmit={handleFormSubmit} />
        </div>
      </div>

      <div className="flex justify-center gap-3 my-4">
        <button
          onClick={handleDownload}
          className="font-body font-semibold bg-jade text-white px-7 py-3.5 rounded-full hover:bg-jade/90 transition-colors"
        >
          Download Resume
        </button>
        <button
          onClick={() => setShowJobMatch((v) => !v)}
          className="font-body font-semibold text-jade border border-jade px-7 py-3.5 rounded-full hover:bg-jade-50 transition-colors"
        >
          {showJobMatch ? "Hide Job Match" : "Match to a Job"}
        </button>
      </div>

      {showJobMatch && (
        <div className="flex justify-center px-6 mb-4">
          <div className="w-full max-w-2xl">
            <JobMatchPanel resumeData={resumeData} />
          </div>
        </div>
      )}

      {/* Resume Preview shown to the user — zoomed to fit the screen */}
      <div className="flex justify-center px-6 pb-16">
        <div ref={previewWrapperRef} className="w-full max-w-4xl">
          {pageBreaksMm.length > 0 && (
            <p className="font-body text-xs text-ink/40 text-center mb-2">
              Dashed lines show where the downloaded PDF will split across
              pages.
            </p>
          )}
          <div
            style={{ width: PREVIEW_NATIVE_WIDTH, zoom: scale, position: "relative" }}
          >
            <Template data={resumeData} imageUrl={imageUrl} />
            {pageBreaksMm.map((mm, i) => (
              <div
                key={mm}
                className="absolute left-0 right-0 pointer-events-none"
                style={{ top: mm * (PREVIEW_NATIVE_WIDTH / 210) }}
              >
                <div className="border-t-2 border-dashed border-violet/60" />
                <span className="absolute right-2 -top-3 bg-violet text-white text-[11px] font-body font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                  Page {i + 2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*
        Hidden copy rendered at native width for html2canvas to capture.
        html2canvas doesn't understand the non-standard `zoom` property used
        above to fit the preview to the screen, so PDF export always reads
        from this untouched, full-size copy instead of the visible one. Kept
        in normal document flow (not pushed off-screen with a large negative
        offset) and clipped via a zero-height ancestor — html2canvas's region
        capture gets unreliable when the source element sits far outside its
        rendering viewport.
      */}
      <div className="h-0 overflow-hidden" aria-hidden="true">
        <div ref={resumeRef} style={{ width: PREVIEW_NATIVE_WIDTH }}>
          <Template data={resumeData} imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Builder;
